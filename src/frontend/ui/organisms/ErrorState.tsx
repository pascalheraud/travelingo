import styles from './ErrorState.module.scss';
import { Button } from '@ui/atoms';

interface ErrorStateProps {
  message?:     string;
  onRetry?:     () => void;
  retryLabel?:  string;
}

export function ErrorState({ message = 'An error occurred.', onRetry, retryLabel = 'Retry' }: ErrorStateProps) {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>⚠️</span>
      <p className={styles.title}>Something went wrong</p>
      <p className={styles.message}>{message}</p>
      {onRetry && <Button variant="secondary" onClick={onRetry}>{retryLabel}</Button>}
    </div>
  );
}
