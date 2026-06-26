import clsx from 'clsx';
import styles from './Spinner.module.scss';

type SpinnerSize  = 'sm' | 'md' | 'lg';
type SpinnerTheme = 'primary' | 'white' | 'muted';

interface SpinnerProps {
  size?:  SpinnerSize;
  theme?: SpinnerTheme;
}

export function Spinner({ size = 'md', theme = 'primary' }: SpinnerProps) {
  return (
    <span className={clsx(styles.spinner, styles[size], theme !== 'primary' && styles[theme])} />
  );
}
