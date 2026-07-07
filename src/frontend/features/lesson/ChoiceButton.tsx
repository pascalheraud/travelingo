import clsx from 'clsx';
import styles from './ChoiceButton.module.scss';
import { PhoneticLabel } from './PhoneticLabel';

interface ChoiceButtonProps {
  target:        string;
  phonetic:      string;
  selected:      boolean;
  validated:     boolean;
  isCorrect:     boolean;
  isWrong:       boolean;
  onClick:       () => void;
  onPlayAudio:   () => void;
}

export function ChoiceButton({ target, phonetic, selected, validated, isCorrect, isWrong, onClick, onPlayAudio }: ChoiceButtonProps) {
  const prefix = !validated && selected ? '🔊' : isCorrect ? '✓' : isWrong ? '✗' : '';

  function handleClick() {
    if (validated) {
      onPlayAudio();
      return;
    }
    onClick();
  }

  return (
    <button
      type="button"
      className={clsx(
        styles.btn,
        validated && styles.validated,
        selected && !validated && styles.selected,
        isCorrect && styles.correct,
        isWrong && styles.wrong,
        validated && !isCorrect && !isWrong && styles.dimmed,
      )}
      onClick={handleClick}
    >
      <span className={styles.target}>
        <span className={styles.prefixSlot}>{prefix}</span>
        {target}
      </span>
      <PhoneticLabel text={phonetic} />
    </button>
  );
}
