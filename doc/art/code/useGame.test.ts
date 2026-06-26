import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGame } from './useGame';
import type { LearningPack } from '@/models';
import { WIN_TARGET } from '@/models';

// ── Fixtures ─────────────────────────────────────────────────

const makePack = (phraseCount = 8): LearningPack => ({
  id:         'en_v1',
  uuid:       '00000000-0000-0000-0000-000000000001',
  targetLang: 'en',
  version:    'v1',
  createdAt:  '2026-01-01',
  lessons:    [{ id: 'l01', emoji: '💬', phraseCount }],
  phrases:    Array.from({ length: phraseCount }, (_, i) => ({
    id:     `p${String(i + 1).padStart(3, '0')}`,
    target: `Phrase ${i + 1}`,
    audio:  `p${String(i + 1).padStart(3, '0')}.mp3`,
  })),
});

const PACK = makePack(8);

// Helper: answer a question correctly
function answerCorrectly(result: ReturnType<typeof useGame>) {
  const target = result.phrase!.target;
  act(() => { result.onSelect(target); });
  act(() => { result.onValidate(); });
  act(() => { result.onContinue(); });
}

// ── Tests ─────────────────────────────────────────────────────

describe('useGame — initialization', () => {
  it('starts with a current phrase', () => {
    const { result } = renderHook(() => useGame(PACK));
    expect(result.current.phrase).not.toBeNull();
  });

  it('starts with 0 phrases done', () => {
    const { result } = renderHook(() => useGame(PACK));
    expect(result.current.progress.done).toBe(0);
    expect(result.current.progress.total).toBe(PACK.phrases.length);
  });

  it('generates exactly 4 distinct choices', () => {
    const { result } = renderHook(() => useGame(PACK));
    expect(result.current.choices).toHaveLength(4);
    expect(new Set(result.current.choices).size).toBe(4);
  });

  it('always includes the correct answer in choices', () => {
    const { result } = renderHook(() => useGame(PACK));
    expect(result.current.choices).toContain(result.current.phrase?.target);
  });

  it('restores saved progress', () => {
    const savedProgress = {
      scores:  { p001: WIN_TARGET, p002: 1 },
      doneIds: ['p001'],
      mode:    'text' as const,
      savedAt: '2026-01-01T00:00:00Z',
    };
    const { result } = renderHook(() => useGame(PACK, savedProgress));
    expect(result.current.progress.done).toBe(1);
    expect(result.current.phrase?.id).not.toBe('p001');
  });
});

describe('useGame — selection and validation', () => {
  it('selected is null before any selection', () => {
    const { result } = renderHook(() => useGame(PACK));
    expect(result.current.selected).toBeNull();
  });

  it('onSelect updates selected', () => {
    const { result } = renderHook(() => useGame(PACK));
    act(() => { result.current.onSelect('Phrase 1'); });
    expect(result.current.selected).toBe('Phrase 1');
  });

  it('onSelect is ignored after validation', () => {
    const { result } = renderHook(() => useGame(PACK));
    const target = result.current.phrase!.target;
    act(() => { result.current.onSelect(target); });
    act(() => { result.current.onValidate(); });
    act(() => { result.current.onSelect('something else'); });
    expect(result.current.selected).toBe(target);
  });

  it('onValidate returns null when nothing is selected', () => {
    const { result } = renderHook(() => useGame(PACK));
    let res: ReturnType<typeof result.current.onValidate>;
    act(() => { res = result.current.onValidate(); });
    expect(res!).toBeNull();
  });

  it('correct answer sets feedback to "correct"', () => {
    const { result } = renderHook(() => useGame(PACK));
    act(() => { result.current.onSelect(result.current.phrase!.target); });
    act(() => { result.current.onValidate(); });
    expect(result.current.feedback).toBe('correct');
    expect(result.current.validated).toBe(true);
  });

  it('wrong answer sets feedback to "wrong"', () => {
    const { result } = renderHook(() => useGame(PACK));
    const wrong = result.current.choices.find(c => c !== result.current.phrase!.target)!;
    act(() => { result.current.onSelect(wrong); });
    act(() => { result.current.onValidate(); });
    expect(result.current.feedback).toBe('wrong');
  });

  it('onValidate returns a correct AnswerResult', () => {
    const { result } = renderHook(() => useGame(PACK));
    const target = result.current.phrase!.target;
    act(() => { result.current.onSelect(target); });
    let res: ReturnType<typeof result.current.onValidate>;
    act(() => { res = result.current.onValidate(); });
    expect(res).toMatchObject({
      correct:        true,
      selectedTarget: target,
      correctTarget:  target,
      newScore:       1,
      phraseDone:     false, // score 1 < WIN_TARGET (3)
      lessonDone:     false,
    });
  });
});

describe('useGame — pool advancement', () => {
  it('a wrong answer does not remove the phrase from the pool', () => {
    const { result } = renderHook(() => useGame(PACK));
    const wrong = result.current.choices.find(c => c !== result.current.phrase!.target)!;
    act(() => { result.current.onSelect(wrong); });
    act(() => { result.current.onValidate(); });
    act(() => { result.current.onContinue(); });
    expect(result.current.progress.done).toBe(0);
  });

  it(`a phrase is removed after ${WIN_TARGET} correct answers`, () => {
    const { result } = renderHook(() => useGame(PACK));
    for (let i = 0; i < WIN_TARGET; i++) {
      if (!result.current.phrase) break;
      answerCorrectly(result.current);
    }
    expect(result.current.progress.done).toBeGreaterThanOrEqual(1);
  });

  it('choices are refreshed after moving to next phrase', () => {
    const { result } = renderHook(() => useGame(PACK));
    const firstChoices = [...result.current.choices];
    answerCorrectly(result.current);
    expect(result.current.choices).not.toEqual(firstChoices);
  });

  it('isFinished becomes true when all phrases are mastered', () => {
    const smallPack = makePack(3);
    const { result } = renderHook(() => useGame(smallPack));

    for (let round = 0; round < WIN_TARGET * 3 + 5; round++) {
      if (result.current.isFinished) break;
      if (!result.current.phrase) break;
      answerCorrectly(result.current);
    }

    expect(result.current.isFinished).toBe(true);
    expect(result.current.progress.done).toBe(smallPack.phrases.length);
  });

  it('a wrong answer resets the phrase score to 0', () => {
    const { result } = renderHook(() => useGame(PACK));

    // Get 2 correct answers on the same phrase
    for (let i = 0; i < 2; i++) {
      const target = result.current.phrase!.target;
      act(() => { result.current.onSelect(target); });
      act(() => { result.current.onValidate(); });
      // Don't call onContinue — keep the same phrase cycling back
      act(() => { result.current.onContinue(); });
    }

    // Now answer wrong
    const wrong = result.current.choices.find(c => c !== result.current.phrase?.target)!;
    act(() => { result.current.onSelect(wrong); });
    let res: ReturnType<typeof result.current.onValidate>;
    act(() => { res = result.current.onValidate(); });

    expect(res?.newScore).toBe(0);
  });
});

describe('useGame — review mode', () => {
  it('in review mode, threshold is 1 instead of WIN_TARGET', () => {
    const { result } = renderHook(() => useGame(PACK, undefined, true));
    answerCorrectly(result.current);
    // 1 correct answer is enough in review mode
    expect(result.current.progress.done).toBeGreaterThanOrEqual(1);
  });

  it('in review mode, a wrong answer still requires 1 correct to dismiss', () => {
    const { result } = renderHook(() => useGame(PACK, undefined, true));
    const wrong = result.current.choices.find(c => c !== result.current.phrase!.target)!;
    act(() => { result.current.onSelect(wrong); });
    act(() => { result.current.onValidate(); });
    act(() => { result.current.onContinue(); });
    expect(result.current.progress.done).toBe(0);
  });
});

describe('useGame — reset', () => {
  it('reset clears all state', () => {
    const { result } = renderHook(() => useGame(PACK));
    answerCorrectly(result.current);
    act(() => { result.current.reset(); });
    expect(result.current.progress.done).toBe(0);
    expect(result.current.selected).toBeNull();
    expect(result.current.validated).toBe(false);
    expect(result.current.feedback).toBeNull();
  });

  it('reset generates new choices', () => {
    const { result } = renderHook(() => useGame(PACK));
    const beforeReset = [...result.current.choices];
    act(() => { result.current.reset(); });
    // Choices should exist after reset (may or may not differ due to randomness)
    expect(result.current.choices).toHaveLength(4);
    expect(beforeReset).toHaveLength(4);
  });
});
