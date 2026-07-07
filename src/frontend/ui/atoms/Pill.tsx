import clsx from 'clsx';
import styles from './Pill.module.scss';

type PillTheme = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'muted';

interface PillProps {
  label:   string;
  theme?:  PillTheme;
  icon?:   string;
  size?:   'sm' | 'md';
}

export function Pill({ label, theme = 'default', icon, size = 'md' }: PillProps) {
  return (
    <span className={clsx(styles.pill, styles[size], theme !== 'default' && styles[theme])}>
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}
