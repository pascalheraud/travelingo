import styles from './LessonDoneScreen.module.scss';
import { Button } from '@ui/atoms';

interface LessonDoneScreenProps {
  title:       string;
  description: string;
  backLabel:   string;
  reviewLabel: string;
  onBack:      () => void;
  onReview:    () => void;
}

export function LessonDoneScreen({ title, description, backLabel, reviewLabel, onBack, onReview }: LessonDoneScreenProps) {
  return (
    <div className={styles.screen}>
      <span className={styles.emoji}>🏆</span>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <Button variant="primary" onClick={onBack}>{backLabel}</Button>
      <button className={styles.review} onClick={onReview}>{reviewLabel}</button>
    </div>
  );
}
