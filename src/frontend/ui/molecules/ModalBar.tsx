import styles from './ModalBar.module.scss';
import { IconButton } from '@ui/atoms';

interface ModalBarProps {
  title:   string;
  onClose: () => void;
}

export function ModalBar({ title, onClose }: ModalBarProps) {
  return (
    <div className={styles.bar}>
      <span className={styles.title}>{title}</span>
      <IconButton icon="✕" ariaLabel="Close" variant="muted" size="lg" onClick={onClose} />
    </div>
  );
}
