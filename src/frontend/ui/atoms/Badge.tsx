import clsx from 'clsx';
import styles from './Badge.module.scss';

type BadgeColor = 'success' | 'error' | 'warning' | 'info' | 'gray' | 'primary';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: string;
}

export function Badge({ label, color = 'primary', size = 'md', icon }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, styles[color], styles[size])}>
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}
