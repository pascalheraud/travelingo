import styles from './SectionLabel.module.scss';

interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return <p className={styles.label}>{children}</p>;
}
