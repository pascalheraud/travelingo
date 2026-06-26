import styles from './GrammarSection.module.scss';
import { SectionLabel } from '@ui/atoms';

interface GrammarSectionProps {
  title: string;
  text:  string;
}

export function GrammarSection({ title, text }: GrammarSectionProps) {
  return (
    <div className={styles.section}>
      <SectionLabel>{title}</SectionLabel>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
