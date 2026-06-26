import clsx from 'clsx';
import styles from './ProgressBar.module.scss';

type ProgressSize  = 'sm' | 'md' | 'lg';
type ProgressTheme = 'primary' | 'success' | 'warning' | 'error' | 'muted';

interface ProgressBarProps {
  value:      number;
  size?:      ProgressSize;
  theme?:     ProgressTheme;
  animated?:  boolean;
  showLabel?: boolean;
}

export function ProgressBar({ value, size = 'md', theme = 'primary', animated, showLabel }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.track, size !== 'md' && styles[size])}>
        <div
          className={clsx(styles.fill, animated && styles.animated, theme !== 'primary' && styles[theme])}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && <div className={styles.label}>{pct}%</div>}
    </div>
  );
}
