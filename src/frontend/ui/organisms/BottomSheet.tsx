import clsx from 'clsx';
import styles from './BottomSheet.module.scss';

interface BottomSheetProps {
  open:       boolean;
  onClose:    () => void;
  children:   React.ReactNode;
  className?: string;
}

export function BottomSheet({ open, onClose, children, className }: BottomSheetProps) {
  if (!open) return null;
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={clsx(styles.sheet, className)}>{children}</div>
    </>
  );
}
