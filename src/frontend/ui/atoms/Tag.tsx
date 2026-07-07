import clsx from 'clsx';
import styles from './Tag.module.scss';

type TagColor = 'success' | 'error' | 'warning' | 'info' | 'gray' | 'primary';

interface TagProps {
  label: string;
  color?: TagColor;
  size?: 'sm' | 'md';
}

export function Tag({ label, color = 'gray', size = 'md' }: TagProps) {
  return (
    <span className={clsx(styles.tag, styles[color], styles[size])}>
      {label}
    </span>
  );
}
