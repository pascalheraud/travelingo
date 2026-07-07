import type {
  LearningPhrase,
  GamePhrase,
  GameState,
  AnswerResult,
  LessonProgress,
  PhraseId,
} from '@/models';
import { WIN_TARGET, WINDOW_SIZE } from '@/models';

// ── Shuffle ───────────────────────────────────────────────────

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Build choices ─────────────────────────────────────────────

export function buildChoices(
  correct: LearningPhrase,
  all:     LearningPhrase[],
): string[] {
  const wrong = shuffle(all.filter(p => p.id !== correct.id))
    .slice(0, 3)
    .map(p => p.target);
  return shuffle([correct.target, ...wrong]);
}

// ── Init game ─────────────────────────────────────────────────

export function initGame(
  phrases:   LearningPhrase[],
  progress?: LessonProgress,
): GameState {
  const doneIds = new Set<PhraseId>(progress?.doneIds ?? []);
  const scores  = progress?.scores ?? {};

  const pool = phrases
    .filter(p => !doneIds.has(p.id))
    .map(p => ({ ...p, score: scores[p.id] ?? 0 }));

  const done = phrases
    .filter(p => doneIds.has(p.id))
    .map(p => ({ ...p, score: WIN_TARGET }));

  return {
    active:  pool.slice(0, WINDOW_SIZE),
    waiting: pool.slice(WINDOW_SIZE),
    done,
  };
}

// ── Validate answer ───────────────────────────────────────────

export function validateAnswer(
  game:       GameState,
  phraseId:   PhraseId,
  selected:   string,
  reviewMode: boolean = false,
): AnswerResult {
  const phrase  = game.active.find(p => p.id === phraseId);
  const correct = selected === phrase?.target;
  const newScore = correct ? (phrase?.score ?? 0) + 1 : 0;
  const threshold = reviewMode ? 1 : WIN_TARGET;

  return {
    correct,
    selectedTarget: selected,
    correctTarget:  phrase?.target ?? '',
    phraseId,
    newScore,
    phraseDone: correct && newScore >= threshold,
    lessonDone: false, // computed after advancePool
  };
}

// ── Advance pool ──────────────────────────────────────────────

export function advancePool(
  game:       GameState,
  phraseId:   PhraseId,
  correct:    boolean,
  reviewMode: boolean = false,
): GameState {
  const threshold = reviewMode ? 1 : WIN_TARGET;

  const active = game.active.map(p =>
    p.id === phraseId
      ? { ...p, score: correct ? p.score + 1 : 0 }
      : p
  );

  const waiting = [...game.waiting];
  const done    = [...game.done];

  const mastered  = active.filter(p => p.score >= threshold);
  let   remaining = active.filter(p => p.score < threshold);

  for (const p of mastered) {
    done.push(p);
    if (waiting.length > 0) remaining.push(waiting.shift()!);
  }

  return { active: remaining, waiting, done };
}

// ── Derive lesson progress from game state ────────────────────

export function toProgress(game: GameState): Pick<LessonProgress, 'scores' | 'doneIds'> {
  const all: GamePhrase[] = [...game.active, ...game.waiting, ...game.done];
  return {
    scores:  Object.fromEntries(all.map(p => [p.id, p.score])),
    doneIds: game.done.map(p => p.id),
  };
}

// ── Next phrase index ─────────────────────────────────────────

export function nextPhraseIndex(currentIdx: number, activeLength: number): number {
  if (activeLength === 0) return 0;
  return (currentIdx + 1) % activeLength;
}
