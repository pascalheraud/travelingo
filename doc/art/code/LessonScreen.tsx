import { useState } from 'react';
import type { LearningPack, TranslationPack, LessonProgress, LessonMode, AnswerResult } from '@/models';
import { initGame, buildChoices, validateAnswer, advancePool, toProgress, nextPhraseIndex } from '@services/game';
import { storageSet, storageDelete, StorageKeys } from '@services/storage';

interface LessonScreenProps {
  pack:          LearningPack;
  translation:   TranslationPack;
  lessonId:      string;
  savedProgress?: LessonProgress;
  isReview?:     boolean;
  onQuit:        () => void;
  onDone:        () => void;
}

export function LessonScreen({
  pack,
  translation,
  lessonId,
  savedProgress,
  isReview = false,
  onQuit,
  onDone,
}: LessonScreenProps) {

  const [game,      setGame]      = useState(() => initGame(pack.phrases, savedProgress));
  const [qIdx,      setQIdx]      = useState(0);
  const [choices,   setChoices]   = useState(() =>
    game.active.length > 0 ? buildChoices(game.active[0], pack.phrases) : []
  );
  const [selected,  setSelected]  = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const [result,    setResult]    = useState<AnswerResult | null>(null);

  const phrase = game.active.length > 0
    ? game.active[qIdx % game.active.length]
    : null;

  const tr = phrase
    ? translation.phrases.find(p => p.id === phrase.id) ?? null
    : null;

  // ── Handlers ───────────────────────────────────────────────

  function handleSelect(target: string) {
    if (validated) return;
    setSelected(target);
  }

  function handleValidate() {
    if (!phrase || !selected || validated) return;

    const answerResult = validateAnswer(game, phrase.id, selected, isReview);
    setResult(answerResult);
    setValidated(true);
  }

  function handleContinue() {
    if (!phrase || !result) return;

    const nextGame = advancePool(game, phrase.id, result.correct, isReview);

    // Persist progress after each advance (review mode does not save)
    if (!isReview) {
      const key = StorageKeys.progress(pack.targetLang, lessonId);
      if (nextGame.active.length === 0) {
        storageDelete(key);
      } else {
        storageSet(key, {
          ...toProgress(nextGame),
          mode:    'text' as LessonMode,
          savedAt: new Date().toISOString(),
        });
      }
    }

    if (nextGame.active.length === 0) {
      onDone();
      return;
    }

    const nextIdx    = nextPhraseIndex(qIdx, nextGame.active.length);
    const nextPhrase = nextGame.active[nextIdx];

    setGame(nextGame);
    setQIdx(nextIdx);
    setChoices(buildChoices(nextPhrase, pack.phrases));
    setSelected(null);
    setValidated(false);
    setResult(null);
  }

  // ── Render ─────────────────────────────────────────────────

  if (!phrase || !tr) return <div>Loading…</div>;

  const progress = { done: game.done.length, total: pack.phrases.length };

  return (
    <div>
      {/* Progress bar */}
      <progress value={progress.done} max={progress.total} />

      {/* Question */}
      <p>{tr.source}</p>

      {/* Choices */}
      <div>
        {choices.map(target => {
          const choiceTr = translation.phrases.find(
            p => pack.phrases.find(lp => lp.target === target)?.id === p.id
          );
          return (
            <button
              key={target}
              onClick={() => handleSelect(target)}
              aria-pressed={selected === target}
            >
              {target}
              {choiceTr && <small>{choiceTr.phonetic}</small>}
            </button>
          );
        })}
      </div>

      {/* Action */}
      {!validated && (
        <button onClick={handleValidate} disabled={!selected}>
          Validate
        </button>
      )}
      {validated && (
        <button onClick={handleContinue}>
          Continue
        </button>
      )}

      {/* Feedback */}
      {result && (
        <p role="alert">
          {result.correct ? '✅ Correct!' : `❌ The answer was: ${result.correctTarget}`}
        </p>
      )}

      {/* Quit */}
      <button onClick={onQuit}>Quit</button>
    </div>
  );
}
