import styles from './CardStripe.module.scss';

interface CardStripeProps {
  title:      string;
  subtitle?:  string;
  left?:      React.ReactNode;
  right?:     React.ReactNode;
  onClick?:   () => void;
}

export function CardStripe({ title, subtitle, left, right, onClick }: CardStripeProps) {
  return (
    <div className={styles.card} onClick={onClick} role={onClick ? 'button' : undefined}>
      {left  && <div className={styles.left}>{left}</div>}
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {right && <div className={styles.right}>{right}</div>}
    </div>
  );
}
