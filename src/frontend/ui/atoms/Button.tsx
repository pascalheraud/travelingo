import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function Button({ children, variant = 'primary', size = 'md', disabled, loading, fullWidth, onClick, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(styles.btn, styles[variant], styles[size], (disabled || loading) && styles.disabled, fullWidth && styles.fullWidth)}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? '⏳' : children}
    </button>
  );
}
