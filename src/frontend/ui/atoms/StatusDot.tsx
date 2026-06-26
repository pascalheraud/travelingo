import clsx from 'clsx';
import styles from './StatusDot.module.scss';

type StatusDotTheme = 'success' | 'primary' | 'warning' | 'error' | 'muted';

interface StatusDotProps {
  theme?: StatusDotTheme;
  size?:  'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export function StatusDot({ theme = 'success', size = 'md', pulse }: StatusDotProps) {
  return (
    <span className={clsx(styles.dot, styles[size], styles[theme], pulse && styles.pulse)} />
  );
}
