import clsx from 'clsx';
import styles from './Modal.module.scss';

interface ModalProps {
  open:       boolean;
  onClose:    () => void;
  children:   React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  if (!open) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={clsx(styles.modal, className)} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
