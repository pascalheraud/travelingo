import clsx from 'clsx';
import styles from './ChipButton.module.scss';

interface ChipButtonProps {
  label:      string;
  icon?:      React.ReactNode;
  selected?:  boolean;
  onClick:    () => void;
}

export function ChipButton({ label, icon, selected, onClick }: ChipButtonProps) {
  return (
    <button className={clsx(styles.chip, selected && styles.selected)} onClick={onClick}>
      {icon}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
