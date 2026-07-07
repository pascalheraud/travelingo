import clsx from 'clsx';
import styles from './Toast.module.scss';
import type { ToastItem } from '@contexts/ToastContext';

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  function handleClick() {
    onDismiss(toast.id);
  }

  return (
    <div className={clsx(styles.toast, styles[toast.type])} onClick={handleClick}>
      {toast.message}
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;
  return (
    <div className={styles.container}>
      {toasts.map((t) => <Toast key={t.id} toast={t} onDismiss={onDismiss} />)}
    </div>
  );
}
