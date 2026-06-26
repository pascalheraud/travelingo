import styles from './ActionBar.module.scss';
import { Button } from '@ui/atoms';

interface ActionBarProps {
  validated:     boolean;
  selected:      string | null;
  validateLabel: string;
  nextLabel:     string;
  onValidate:    () => void;
  onContinue:    () => void;
}

export function ActionBar({ validated, selected, validateLabel, nextLabel, onValidate, onContinue }: ActionBarProps) {
  return (
    <div className={styles.bar}>
      {!validated && (
        <Button variant="primary" fullWidth disabled={!selected} onClick={onValidate}>
          {validateLabel}
        </Button>
      )}
      {validated && (
        <Button variant="primary" fullWidth onClick={onContinue}>
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
