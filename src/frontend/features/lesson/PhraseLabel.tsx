import clsx from 'clsx';
import styles from './PhraseLabel.module.scss';

type PhraseLabelSize = 'md' | 'lg';
type PhraseLabelAlign = 'center' | 'left';

interface PhraseLabelProps {
  text:   string;
  size?:  PhraseLabelSize;
  align?: PhraseLabelAlign;
}

export function PhraseLabel({ text, size = 'lg', align = 'center' }: PhraseLabelProps) {
  return <p className={clsx(styles.label, styles[size], align === 'left' && styles.left)}>{text}</p>;
}
