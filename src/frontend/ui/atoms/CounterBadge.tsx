import clsx from 'clsx';
import styles from './CounterBadge.module.scss';

type CounterVariant = 'primary' | 'warning' | 'error' | 'success';

interface CounterBadgeProps {
  count:     number;
  variant?:  CounterVariant;
}

export function CounterBadge({ count, variant = 'primary' }: CounterBadgeProps) {
  return (
    <span className={clsx(styles.badge, variant !== 'primary' && styles[variant])}>
      {count > 99 ? '99+' : count}
    </span>
  );
}
