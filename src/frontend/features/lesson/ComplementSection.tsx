import styles from './ComplementSection.module.scss';
import { SectionLabel } from '@ui/atoms';

interface ComplementSectionProps {
  title: string;
  items: string[];
}

export function ComplementSection({ title, items }: ComplementSectionProps) {
  function ComplementItem(text: string, index: number) {
    return (
      <li key={index} className={styles.item}>
        • {text}
      </li>
    );
  }

  return (
    <div className={styles.section}>
      <SectionLabel>{title}</SectionLabel>
      <ul className={styles.list}>{items.map(ComplementItem)}</ul>
    </div>
  );
}
