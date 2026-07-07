import type { ReactNode } from 'react';
import styles from './QuizCard.module.scss';
import { Card } from '@ui/organisms';
import { Flag } from '@ui/atoms';
import { PhraseLabel } from './PhraseLabel';

interface QuizCardProps {
  targetLang: string;
  howToSay:   string;
  targetName: string;
  source:     string;
  children?:  ReactNode;
}

export function QuizCard({ targetLang, howToSay, targetName, source, children }: QuizCardProps) {
  return (
    <Card className={styles.card}>
      <span className={styles.stripe} />
      <p className={styles.label}>
        <Flag code={targetLang} size="md" /> {howToSay} {targetName.toLowerCase()}&nbsp;?
      </p>
      <PhraseLabel text={`« ${source} »`} size="lg" align="left" />
      {children}
    </Card>
  );
}
