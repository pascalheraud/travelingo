import { useState, useCallback, useRef } from 'react';
import type {
  LearningPack,
  LearningPhrase,
  GamePhrase,
  GameState,
  AnswerResult,
  LessonProgress,
  PhraseId,
} from '@/models';
import { WIN_TARGET, WINDOW_SIZE } from '@/models';

// ── Pure helpers (testable without React) ────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildChoices(correct: LearningPhrase, all: LearningPhrase[]): string[] {
  const wrong = shuffle(all.filter(p => p.id !== correct.id))
    .slice(0, 3)
    .map(p => p.target);
  return shuffle([correct.target, ...wrong]);
}

function initGame(phrases: LearningPhrase[], progress?: LessonProgress): GameState {
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

function advancePool(
  game:       GameState,
  phraseId:   PhraseId,
  correct:    boolean,
  reviewMode: boolean,
): GameState {
  const threshold = reviewMode ? 1 : WIN_TARGET;

  const active = game.active.map(p =>
    p.id === phraseId
      ? { ...p, score: correct ? p.score + 1 : 0 }
      : p
  );

  const waiting = [...game.waiting];
  const done    = [...game.done];

  // Move mastered phrases out of the active pool and pull in waiting ones
  const mastered  = active.filter(p => p.score >= threshold);
  let   remaining = active.filter(p => p.score < threshold);

  for (const p of mastered) {
    done.push(p);
    if (waiting.length > 0) remaining.push(waiting.shift()!);
  }

  return { active: remaining, waiting, done };
}

// ── Hook return type ─────────────────────────────────────────

export interface UseGameReturn {
  // Current state
  phrase:     GamePhrase | null;
  choices:    string[];
  selected:   string | null;
  validated:  boolean;
  feedback:   'correct' | 'wrong' | null;
  isFinished: boolean;
  progress:   { done: number; total: number };

  // Actions
  onSelect:   (target: string) => void;
  onValidate: () => AnswerResult | null;
  onContinue: () => void;
  reset:      () => void;
}

// ── Hook ──────────────────────────────────────────────────────

export function useGame(
  pack:           LearningPack,
  savedProgress?: LessonProgress,
  reviewMode:     boolean = false,
): UseGameReturn {

  const phrases = pack.phrases;

  const [game,      setGame]      = useState<GameState>(() => initGame(phrases, savedProgress));
  const [qIdx,      setQIdx]      = useState(0);
  const [choices,   setChoices]   = useState<string[]>([]);
  const [selected,  setSelected]  = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const [feedback,  setFeedback]  = useState<'correct' | 'wrong' | null>(null);

  // Refs to avoid stale closures in callbacks
  const gameRef   = useRef(game);
  const qIdxRef   = useRef(qIdx);
  gameRef.current = game;
  qIdxRef.current = qIdx;

  const currentPhrase = game.active.length > 0
    ? game.active[qIdx % game.active.length]
    : null;

  const refreshChoices = useCallback((p: GamePhrase) => {
    setChoices(buildChoices(p, phrases));
    setSelected(null);
    setValidated(false);
    setFeedback(null);
  }, [phrases]);

  // ── Actions ───────────────────────────────────────────────

  const onSelect = useCallback((target: string) => {
    if (validated) return;
    setSelected(target);
  }, [validated]);

  const onValidate = useCallback((): AnswerResult | null => {
    if (!currentPhrase || !selected || validated) return null;

    const correct = selected === currentPhrase.target;

    setValidated(true);
    setFeedback(correct ? 'correct' : 'wrong');

    return {
      correct,
      selectedTarget: selected,
      correctTarget:  currentPhrase.target,
      phraseId:       currentPhrase.id,
      newScore:       correct ? currentPhrase.score + 1 : 0,
      phraseDone:     correct && currentPhrase.score + 1 >= (reviewMode ? 1 : WIN_TARGET),
      lessonDone:     false, // computed in onContinue once pool is updated
    };
  }, [currentPhrase, selected, validated, reviewMode]);

  const onContinue = useCallback(() => {
    if (!currentPhrase) return;

    const correct  = feedback === 'correct';
    const nextGame = advancePool(gameRef.current, currentPhrase.id, correct, reviewMode);

    setGame(nextGame);

    if (nextGame.active.length === 0) return; // lesson finished

    const nextIdx = (qIdxRef.current + 1) % nextGame.active.length;
    setQIdx(nextIdx);
    refreshChoices(nextGame.active[nextIdx]);
  }, [currentPhrase, feedback, reviewMode, refreshChoices]);

  const reset = useCallback(() => {
    const freshGame = initGame(phrases);
    setGame(freshGame);
    setQIdx(0);
    setSelected(null);
    setValidated(false);
    setFeedback(null);
    if (freshGame.active.length > 0) {
      refreshChoices(freshGame.active[0]);
    }
  }, [phrases, refreshChoices]);

  // Initialise choices on first render
  useState(() => {
    if (currentPhrase) refreshChoices(currentPhrase);
  });

  return {
    phrase:     currentPhrase,
    choices,
    selected,
    validated,
    feedback,
    isFinished: game.active.length === 0,
    progress:   { done: game.done.length, total: phrases.length },
    onSelect,
    onValidate,
    onContinue,
    reset,
  };
}
