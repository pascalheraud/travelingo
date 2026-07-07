import styles from './ContributeCard.module.scss';
import { Card } from '@ui/organisms';

interface ContributeCardProps {
  emoji: string;
  title: string;
}

export function ContributeCard({ emoji, title }: ContributeCardProps) {
  return (
    <Card className={styles.card}>
      <span className={styles.emoji}>{emoji}</span>
      <p className={styles.title}>{title}</p>
    </Card>
  );
}
