import styles from './PhraseRef.module.scss';

interface PhraseRefProps {
  source: string;
  target: string;
}

export function PhraseRef({ source, target }: PhraseRefProps) {
  return <p className={styles.ref}>« {source} » → « {target} »</p>;
}
