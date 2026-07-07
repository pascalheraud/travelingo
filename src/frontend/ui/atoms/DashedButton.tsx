import styles from './DashedButton.module.scss';

interface DashedButtonProps {
  onClick:   () => void;
  children:  React.ReactNode;
  icon?:     React.ReactNode;
}

export function DashedButton({ onClick, children, icon }: DashedButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
}
