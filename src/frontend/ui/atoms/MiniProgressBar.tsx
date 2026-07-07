import clsx from 'clsx';
import styles from './MiniProgressBar.module.scss';

type MiniProgressTheme = 'primary' | 'success' | 'warning' | 'error' | 'muted';

interface MiniProgressBarProps {
  value:   number;
  theme?:  MiniProgressTheme;
}

export function MiniProgressBar({ value, theme = 'primary' }: MiniProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={styles.track}>
      <div
        className={clsx(styles.fill, theme !== 'primary' && styles[theme])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
