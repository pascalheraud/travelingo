import { describe, it, expect, beforeEach } from 'vitest';
import { GameService, WIN_TARGET } from './GameService';
import type { LearningPack, GamePhrase, LessonProgress } from '@/models';

const makePack = (phraseCount = 8): LearningPack => ({
  uuid:       'pack-uuid',
  targetLang: 'en',
  version:    'v1',
  createdAt:  '2026-01-01T00:00:00Z',
  lessons: [
    {
      id:     'l01',
      emoji:  '🇬🇧',
      phrases: Array.from({ length: phraseCount }, (_, i) => ({
        id:     `p${String(i + 1).padStart(3, '0')}`,
        target: `Phrase ${i + 1}`,
        audio:  `p01_${String(i + 1).padStart(3, '0')}_v1.mp3`,
      })),
    },
  ],
});

let game: GameService;

beforeEach(() => {
  game = new GameService();
});

describe('initGame', () => {
  it('puts up to 3 phrases in the active window', () => {
    const state = game.initGame(makePack(), 'l01');
    expect(state.active).toHaveLength(3);
  });

  it('starts with no done phrases when there is no saved progress', () => {
    const state = game.initGame(makePack(), 'l01');
    expect(state.done).toHaveLength(0);
  });

  it('puts the remaining phrases in waiting', () => {
    const state = game.initGame(makePack(8), 'l01');
    expect(state.waiting).toHaveLength(5);
  });

  it('returns empty pools for an unknown lesson id', () => {
    const state = game.initGame(makePack(), 'l02');
    expect(state.active).toHaveLength(0);
    expect(state.waiting).toHaveLength(0);
  });

  it('restores done phrases from saved progress and excludes them from active/waiting', () => {
    const progress: LessonProgress = {
      scores:  { p001: WIN_TARGET },
      doneIds: ['p001'],
      mode:    'text',
      savedAt: '2026-01-01T00:00:00Z',
    };
    const state = game.initGame(makePack(), 'l01', progress);
    expect(state.done.map((p) => p.id)).toContain('p001');
    expect([...state.active, ...state.waiting].find((p) => p.id === 'p001')).toBeUndefined();
  });

  it('restores partial scores from saved progress', () => {
    const progress: LessonProgress = {
      scores:  { p002: 2 },
      doneIds: [],
      mode:    'text',
      savedAt: '2026-01-01T00:00:00Z',
    };
    const state = game.initGame(makePack(), 'l01', progress);
    const p002 = [...state.active, ...state.waiting].find((p) => p.id === 'p002');
    expect(p002?.score).toBe(2);
  });
});

describe('getChoices', () => {
  it('returns 4 choices including the correct target, with no duplicates', () => {
    const state = game.initGame(makePack(), 'l01');
    const current = state.active[0];
    const choices = game.getChoices(state, current);
    expect(choices).toHaveLength(4);
    expect(new Set(choices).size).toBe(4);
    expect(choices).toContain(current.target);
  });
});

describe('applyAnswer', () => {
  it('marks correct: true and increments score on the right target', () => {
    const state = game.initGame(makePack(), 'l01');
    const phrase = state.active[0];
    const { result } = game.applyAnswer(state, phrase, phrase.target);
    expect(result.correct).toBe(true);
    expect(result.newScore).toBe(1);
  });

  it('marks correct: false and decrements (floored at 0) on a wrong target', () => {
    const state = game.initGame(makePack(), 'l01');
    const phrase = state.active[0];
    const { result } = game.applyAnswer(state, phrase, 'not the right answer');
    expect(result.correct).toBe(false);
    expect(result.newScore).toBe(0);
  });

  it(`marks phraseDone once the score reaches WIN_TARGET (${WIN_TARGET})`, () => {
    let state = game.initGame(makePack(), 'l01');
    let phrase = state.active[0] as GamePhrase;
    let result;
    for (let i = 0; i < WIN_TARGET; i++) {
      ({ result, nextGame: state } = game.applyAnswer(state, phrase, phrase.target));
      phrase = [...state.active, ...state.waiting].find((p) => p.id === phrase.id) ?? phrase;
    }
    expect(result!.phraseDone).toBe(true);
  });

  it('pulls a waiting phrase into active once a phrase becomes done', () => {
    let state = game.initGame(makePack(8), 'l01');
    const id = state.active[0].id;
    const firstWaitingId = state.waiting[0].id;
    let phrase = state.active[0];
    for (let i = 0; i < WIN_TARGET; i++) {
      const { nextGame } = game.applyAnswer(state, phrase, phrase.target);
      state = nextGame;
      phrase = [...state.active, ...state.waiting].find((p) => p.id === id) ?? phrase;
    }
    expect(state.active.find((p) => p.id === firstWaitingId)).toBeDefined();
  });

  it('marks lessonDone once active and waiting are both empty', () => {
    let state = game.initGame(makePack(3), 'l01');
    for (let round = 0; round < WIN_TARGET * 3 + 5 && state.active.length > 0; round++) {
      const phrase = state.active[0];
      const { nextGame, result } = game.applyAnswer(state, phrase, phrase.target);
      state = nextGame;
      if (state.active.length === 0 && state.waiting.length === 0) {
        expect(result.lessonDone).toBe(true);
      }
    }
    expect(state.active).toHaveLength(0);
    expect(state.done).toHaveLength(3);
  });

  it('a wrong answer keeps the phrase in active (not moved to done)', () => {
    const state = game.initGame(makePack(), 'l01');
    const phrase = state.active[0];
    const { nextGame } = game.applyAnswer(state, phrase, 'wrong');
    expect(nextGame.active.find((p) => p.id === phrase.id)).toBeDefined();
    expect(nextGame.done.find((p) => p.id === phrase.id)).toBeUndefined();
  });

  it('with alwaysAdvance, moves the phrase to done even on a wrong answer', () => {
    const state = game.initGame(makePack(), 'l01');
    const phrase = state.active[0];
    const { result, nextGame } = game.applyAnswer(state, phrase, 'wrong', WIN_TARGET, true);
    expect(result.phraseDone).toBe(true);
    expect(nextGame.done.find((p) => p.id === phrase.id)).toBeDefined();
  });
});

describe('initReview', () => {
  it('only includes phrases marked done in progress, all reset to score 0', () => {
    const progress: LessonProgress = {
      scores:  {},
      doneIds: ['p001', 'p002'],
      mode:    'text',
      savedAt: '2026-01-01T00:00:00Z',
    };
    const state = game.initReview(makePack(), 'l01', progress);
    const all = [...state.active, ...state.waiting];
    expect(all.map((p) => p.id).sort()).toEqual(['p001', 'p002']);
    expect(all.every((p) => p.score === 0)).toBe(true);
    expect(state.done).toHaveLength(0);
  });
});
