import styles from './GrammarSheet.module.scss';
import { ModalBar } from '@ui/molecules';
import { BottomSheet } from '@ui/organisms';
import { Button } from '@ui/atoms';
import { PhraseRef } from './PhraseRef';
import { GrammarSection } from './GrammarSection';
import { ComplementSection } from './ComplementSection';

interface GrammarSheetProps {
  open:           boolean;
  source:         string;
  target:         string;
  grammar:        string;
  complements:    string[];
  titleLabel:      string;
  explanationLabel: string;
  toRememberLabel:  string;
  closeLabel:       string;
  onClose:        () => void;
}

export function GrammarSheet({
  open, source, target, grammar, complements,
  titleLabel, explanationLabel, toRememberLabel, closeLabel,
  onClose,
}: GrammarSheetProps) {
  if (!open) return null;
  return (
    <BottomSheet open={open} onClose={onClose} className={styles.sheet}>
      <ModalBar title={titleLabel} onClose={onClose} />
      <PhraseRef source={source} target={target} />
      <GrammarSection title={explanationLabel} text={grammar} />
      {complements.length > 0 && <ComplementSection title={toRememberLabel} items={complements} />}
      <Button fullWidth size="lg" onClick={onClose}>{closeLabel}</Button>
    </BottomSheet>
  );
}
