import clsx from 'clsx';
import styles from './InfoBanner.module.scss';

type BannerVariant = 'info' | 'success' | 'warning' | 'error';

interface InfoBannerProps {
  variant?:  BannerVariant;
  icon?:     React.ReactNode;
  children:  React.ReactNode;
}

export function InfoBanner({ variant = 'info', icon, children }: InfoBannerProps) {
  return (
    <div className={clsx(styles.banner, styles[variant])}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </div>
  );
}
