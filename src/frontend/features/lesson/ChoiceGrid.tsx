import clsx from 'clsx';
import styles from './ChoiceGrid.module.scss';
import { ChoiceButton } from './ChoiceButton';

export interface ChoiceItem {
  phraseId: string;
  target:   string;
  phonetic: string;
}

interface ChoiceGridProps {
  choices:       ChoiceItem[];
  selected:      string | null;
  validated:     boolean;
  correctTarget: string;
  onSelect:      (target: string) => void;
  onPlayAudio:   (phraseId: string) => void;
}

export function ChoiceGrid({ choices, selected, validated, correctTarget, onSelect, onPlayAudio }: ChoiceGridProps) {
  function ChoiceItemButton(choice: ChoiceItem) {
    const isCorrect = validated && choice.target === correctTarget;
    const isWrong   = validated && choice.target === selected && choice.target !== correctTarget;

    return (
      <ChoiceButton
        key={choice.phraseId}
        target={choice.target}
        phonetic={choice.phonetic}
        selected={selected === choice.target}
        validated={validated}
        isCorrect={isCorrect}
        isWrong={isWrong}
        onClick={() => onSelect(choice.target)}
        onPlayAudio={() => onPlayAudio(choice.phraseId)}
      />
    );
  }

  return (
    <div className={clsx(styles.grid, validated && styles.validated)}>
      {choices.map(ChoiceItemButton)}
    </div>
  );
}
