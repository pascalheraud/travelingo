import type { LearningPack, LearningPhrase, GameState, GamePhrase, AnswerResult, LessonProgress, LessonId } from '@/models';
import { shuffle } from '@utils/random';

export const WIN_TARGET = 3;
const WINDOW_SIZE = 3;

export class GameService {
  private lessonPhrases(pack: LearningPack, lessonId: LessonId): LearningPhrase[] {
    return pack.lessons.find((l) => l.id === lessonId)?.phrases ?? [];
  }

  initGame(pack: LearningPack, lessonId: LessonId, progress?: LessonProgress): GameState {
    const phrases = this.lessonPhrases(pack, lessonId);
    const doneIds = new Set(progress?.doneIds ?? []);
    const scores = progress?.scores ?? {};
    const remaining = shuffle(phrases.filter((p) => !doneIds.has(p.id)));
    const done = phrases.filter((p) => doneIds.has(p.id)).map((p) => ({ ...p, score: WIN_TARGET }));
    const active: GamePhrase[] = remaining.slice(0, WINDOW_SIZE).map((p) => ({ ...p, score: scores[p.id] ?? 0 }));
    const waiting: GamePhrase[] = remaining.slice(WINDOW_SIZE).map((p) => ({ ...p, score: scores[p.id] ?? 0 }));
    return { active, waiting, done };
  }

  getChoices(game: GameState, current: GamePhrase): string[] {
    const pool = [...game.active, ...game.waiting, ...game.done];
    const distractors = shuffle(pool.filter((p) => p.id !== current.id)).slice(0, 3).map((p) => p.target);
    return shuffle([current.target, ...distractors]);
  }

  applyAnswer(
    game: GameState,
    phrase: GamePhrase,
    selectedTarget: string,
    winTarget: number = WIN_TARGET,
    alwaysAdvance: boolean = false,
  ): { result: AnswerResult; nextGame: GameState } {
    const correct = selectedTarget === phrase.target;
    const newScore = correct ? phrase.score + 1 : Math.max(0, phrase.score - 1);
    const phraseDone = alwaysAdvance || newScore >= winTarget;

    const updatedPhrase: GamePhrase = { ...phrase, score: newScore };

    let active = game.active.filter((p) => p.id !== phrase.id);
    let waiting = [...game.waiting];
    let done = [...game.done];

    if (phraseDone) {
      done = [...done, updatedPhrase];
      if (waiting.length > 0) {
        const [next, ...rest] = waiting;
        active = [...active, next];
        waiting = rest;
      }
    } else {
      active = [...active, updatedPhrase];
    }

    const lessonDone = active.length === 0 && waiting.length === 0;

    return {
      result: { correct, selectedTarget, correctTarget: phrase.target, phraseId: phrase.id, newScore, phraseDone, lessonDone },
      nextGame: { active, waiting, done },
    };
  }

  initReview(pack: LearningPack, lessonId: LessonId, progress: LessonProgress): GameState {
    const doneIds = new Set(progress.doneIds);
    const phrases = shuffle(this.lessonPhrases(pack, lessonId).filter((p) => doneIds.has(p.id)));
    const active: GamePhrase[] = phrases.slice(0, WINDOW_SIZE).map((p) => ({ ...p, score: 0 }));
    const waiting: GamePhrase[] = phrases.slice(WINDOW_SIZE).map((p) => ({ ...p, score: 0 }));
    return { active, waiting, done: [] };
  }
}
