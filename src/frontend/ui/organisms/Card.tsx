import clsx from 'clsx';
import styles from './Card.module.scss';

interface CardProps {
  title?:     string;
  children:   React.ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div className={clsx(styles.card, className)}>
      {title && <p className={styles.title}>{title}</p>}
      {children}
    </div>
  );
}
