import styles from './LoadingState.module.scss';
import { Spinner } from '@ui/atoms';

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <div className={styles.container}>
      <Spinner size="lg" />
      {label && <p className={styles.label}>{label}</p>}
    </div>
  );
}
