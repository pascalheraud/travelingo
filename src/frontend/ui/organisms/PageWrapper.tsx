import clsx from 'clsx';
import styles from './PageWrapper.module.scss';

interface PageWrapperProps {
  children:    React.ReactNode;
  header?:     React.ReactNode;
  className?:  string;
}

export function PageWrapper({ children, header, className }: PageWrapperProps) {
  return (
    <div className={styles.page}>
      {header}
      <div className={clsx(styles.content, className)}>{children}</div>
    </div>
  );
}
