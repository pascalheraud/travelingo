import styles from './EmptyState.module.scss';
import { Button } from '@ui/atoms';

interface EmptyStateProps {
  icon?:        React.ReactNode;
  title:        string;
  subtitle?:    string;
  actionLabel?: string;
  onAction?:    () => void;
}

export function EmptyState({ icon, title, subtitle, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <p className={styles.title}>{title}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
