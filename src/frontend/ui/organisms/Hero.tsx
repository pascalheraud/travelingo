import styles from './Hero.module.scss';

interface HeroProps {
  title:      string;
  subtitle?:  string;
  children?:  React.ReactNode;
}

export function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <div className={styles.hero}>
      <p className={styles.title}>{title}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}
    </div>
  );
}
