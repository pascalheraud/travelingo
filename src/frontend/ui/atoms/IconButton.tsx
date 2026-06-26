import clsx from 'clsx';
import styles from './IconButton.module.scss';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Variant = 'primary' | 'secondary' | 'ghost' | 'muted';

interface IconButtonProps {
  icon: string;
  ariaLabel: string;
  size?: Size;
  variant?: Variant;
  disabled?: boolean;
  onClick?: () => void;
}

export function IconButton({ icon, ariaLabel, size = 'md', variant = 'ghost', disabled, onClick }: IconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.btn, styles[variant], styles[size], disabled && styles.disabled)}
    >
      {icon}
    </button>
  );
}
