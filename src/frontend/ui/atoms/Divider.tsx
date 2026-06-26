import clsx from 'clsx';
import styles from './Divider.module.scss';

type DividerSpacing = 'sm' | 'md' | 'lg';

interface DividerProps {
  spacing?: DividerSpacing;
  variant?: 'solid' | 'dashed';
}

export function Divider({ spacing = 'md', variant = 'solid' }: DividerProps) {
  return (
    <hr className={clsx(
      styles.divider,
      spacing !== 'md' && styles[spacing],
      variant === 'dashed' && styles.dashed,
    )} />
  );
}
