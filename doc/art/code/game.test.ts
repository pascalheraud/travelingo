import { describe, it, expect } from 'vitest';
import { initGame, buildChoices, validateAnswer, advancePool, toProgress, nextPhraseIndex, shuffle } from './game';
import type { LearningPhrase, LessonProgress } from '@/models';
import { WIN_TARGET, WINDOW_SIZE } from '@/models';

// ── Fixtures ──────────────────────────────────────────────────

const makePhrases = (count = 8): LearningPhrase[] =>
  Array.from({ length: count }, (_, i) => ({
    id:    `p${String(i + 1).padStart(3, '0')}`,
    target: `Phrase ${i + 1}`,
    audio:  `p${String(i + 1).padStart(3, '0')}.mp3`,
  }));

const PHRASES = makePhrases(8);

// ── shuffle ───────────────────────────────────────────────────

describe('shuffle', () => {
  it('returns an array of the same length', () => {
    expect(shuffle([1, 2, 3, 4])).toHaveLength(4);
  });

  it('contains all original elements', () => {
    const result = shuffle([1, 2, 3, 4]);
    expect(result.sort()).toEqual([1, 2, 3, 4]);
  });

  it('does not mutate the original array', () => {
    const original = [1, 2, 3, 4];
    shuffle(original);
    expect(original).toEqual([1, 2, 3, 4]);
  });
});

// ── buildChoices ──────────────────────────────────────────────

describe('buildChoices', () => {
  it('returns exactly 4 choices', () => {
    expect(buildChoices(PHRASES[0], PHRASES)).toHaveLength(4);
  });

  it('always includes the correct target', () => {
    const choices = buildChoices(PHRASES[0], PHRASES);
    expect(choices).toContain(PHRASES[0].target);
  });

  it('returns 4 distinct choices', () => {
    const choices = buildChoices(PHRASES[0], PHRASES);
    expect(new Set(choices).size).toBe(4);
  });

  it('never includes the correct target twice', () => {
    const choices = buildChoices(PHRASES[0], PHRASES);
    const occurrences = choices.filter(c => c === PHRASES[0].target).length;
    expect(occurrences).toBe(1);
  });
});

// ── initGame ──────────────────────────────────────────────────

describe('initGame', () => {
  it(`starts with ${WINDOW_SIZE} active phrases`, () => {
    const game = initGame(PHRASES);
    expect(game.active).toHaveLength(WINDOW_SIZE);
  });

  it('starts with 0 done phrases', () => {
    const game = initGame(PHRASES);
    expect(game.done).toHaveLength(0);
  });

  it('puts remaining phrases in waiting', () => {
    const game = initGame(PHRASES);
    expect(game.waiting).toHaveLength(PHRASES.length - WINDOW_SIZE);
  });

  it('restores done phrases from saved progress', () => {
    const progress: LessonProgress = {
      scores:  { p001: WIN_TARGET },
      doneIds: ['p001'],
      mode:    'text',
      savedAt: '2026-01-01T00:00:00Z',
    };
    const game = initGame(PHRASES, progress);
    expect(game.done).toHaveLength(1);
    expect(game.done[0].id).toBe('p001');
  });

  it('restores partial scores from saved progress', () => {
    const progress: LessonProgress = {
      scores:  { p002: 2 },
      doneIds: [],
      mode:    'text',
      savedAt: '2026-01-01T00:00:00Z',
    };
    const game = initGame(PHRASES, progress);
    const p002 = [...game.active, ...game.waiting].find(p => p.id === 'p002');
    expect(p002?.score).toBe(2);
  });

  it('excludes done phrases from active and waiting', () => {
    const progress: LessonProgress = {
      scores:  { p001: WIN_TARGET },
      doneIds: ['p001'],
      mode:    'text',
      savedAt: '2026-01-01T00:00:00Z',
    };
    const game = initGame(PHRASES, progress);
    const all = [...game.active, ...game.waiting];
    expect(all.find(p => p.id === 'p001')).toBeUndefined();
  });
});

// ── validateAnswer ────────────────────────────────────────────

describe('validateAnswer', () => {
  it('returns correct: true for the right target', () => {
    const game   = initGame(PHRASES);
    const phrase = game.active[0];
    const result = validateAnswer(game, phrase.id, phrase.target);
    expect(result.correct).toBe(true);
  });

  it('returns correct: false for a wrong target', () => {
    const game   = initGame(PHRASES);
    const phrase = game.active[0];
    const result = validateAnswer(game, phrase.id, 'wrong answer');
    expect(result.correct).toBe(false);
  });

  it('increments newScore on correct answer', () => {
    const game   = initGame(PHRASES);
    const phrase = game.active[0];
    const result = validateAnswer(game, phrase.id, phrase.target);
    expect(result.newScore).toBe(1);
  });

  it('resets newScore to 0 on wrong answer', () => {
    const game   = initGame(PHRASES);
    const phrase = game.active[0];
    const result = validateAnswer(game, phrase.id, 'wrong');
    expect(result.newScore).toBe(0);
  });

  it(`marks phraseDone when newScore reaches ${WIN_TARGET}`, () => {
    let game = initGame(PHRASES);
    const id = game.active[0].id;

    // Get the score up to WIN_TARGET - 1 via advancePool
    for (let i = 0; i < WIN_TARGET - 1; i++) {
      game = advancePool(game, id, true);
    }

    const phrase = [...game.active, ...game.waiting].find(p => p.id === id)
      ?? game.active[0];
    const result = validateAnswer(game, phrase.id, phrase.target);
    expect(result.phraseDone).toBe(true);
  });

  it('in review mode, phraseDone after 1 correct answer', () => {
    const game   = initGame(PHRASES);
    const phrase = game.active[0];
    const result = validateAnswer(game, phrase.id, phrase.target, true);
    expect(result.phraseDone).toBe(true);
  });
});

// ── advancePool ───────────────────────────────────────────────

describe('advancePool', () => {
  it('a wrong answer does not remove the phrase from active', () => {
    const game   = initGame(PHRASES);
    const id     = game.active[0].id;
    const next   = advancePool(game, id, false);
    expect(next.active.find(p => p.id === id)).toBeDefined();
  });

  it('a wrong answer resets the phrase score to 0', () => {
    const game = initGame(PHRASES);
    const id   = game.active[0].id;
    const next = advancePool(game, id, false);
    expect(next.active.find(p => p.id === id)?.score).toBe(0);
  });

  it(`removes phrase after ${WIN_TARGET} correct answers`, () => {
    let game = initGame(PHRASES);
    const id = game.active[0].id;
    for (let i = 0; i < WIN_TARGET; i++) {
      game = advancePool(game, id, true);
    }
    expect(game.active.find(p => p.id === id)).toBeUndefined();
    expect(game.done.find(p => p.id === id)).toBeDefined();
  });

  it('pulls a waiting phrase in when an active one is removed', () => {
    let game = initGame(PHRASES);
    const id = game.active[0].id;
    const firstWaiting = game.waiting[0].id;

    for (let i = 0; i < WIN_TARGET; i++) {
      game = advancePool(game, id, true);
    }

    expect(game.active.find(p => p.id === firstWaiting)).toBeDefined();
  });

  it('active pool never exceeds WINDOW_SIZE', () => {
    let game = initGame(PHRASES);
    for (let round = 0; round < 20; round++) {
      const phrase = game.active[0];
      if (!phrase) break;
      game = advancePool(game, phrase.id, true);
      expect(game.active.length).toBeLessThanOrEqual(WINDOW_SIZE);
    }
  });

  it('review mode removes a phrase after 1 correct answer', () => {
    let game = initGame(PHRASES);
    const id = game.active[0].id;
    game = advancePool(game, id, true, true);
    expect(game.done.find(p => p.id === id)).toBeDefined();
  });

  it('active becomes empty when all phrases are mastered', () => {
    const phrases = makePhrases(3);
    let game = initGame(phrases);

    for (let round = 0; round < WIN_TARGET * phrases.length + 5; round++) {
      if (game.active.length === 0) break;
      game = advancePool(game, game.active[0].id, true);
    }

    expect(game.active).toHaveLength(0);
    expect(game.done).toHaveLength(phrases.length);
  });
});

// ── toProgress ────────────────────────────────────────────────

describe('toProgress', () => {
  it('includes scores for all phrases', () => {
    const game     = initGame(PHRASES);
    const progress = toProgress(game);
    expect(Object.keys(progress.scores)).toHaveLength(PHRASES.length);
  });

  it('doneIds reflects done phrases', () => {
    let game = initGame(PHRASES);
    const id = game.active[0].id;
    for (let i = 0; i < WIN_TARGET; i++) {
      game = advancePool(game, id, true);
    }
    const progress = toProgress(game);
    expect(progress.doneIds).toContain(id);
  });
});

// ── nextPhraseIndex ───────────────────────────────────────────

describe('nextPhraseIndex', () => {
  it('increments index by 1', () => {
    expect(nextPhraseIndex(0, 3)).toBe(1);
    expect(nextPhraseIndex(1, 3)).toBe(2);
  });

  it('wraps around at the end', () => {
    expect(nextPhraseIndex(2, 3)).toBe(0);
  });

  it('returns 0 when active pool is empty', () => {
    expect(nextPhraseIndex(0, 0)).toBe(0);
  });
});
