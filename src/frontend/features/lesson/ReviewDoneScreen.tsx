import styles from './ReviewDoneScreen.module.scss';
import { Button } from '@ui/atoms';

interface ReviewDoneScreenProps {
  title:          string;
  scoreLabel:     string;
  correctCount:   number;
  totalCount:     number;
  incentiveLabel: string;
  restartLabel:   string;
  backLabel:      string;
  onRestart:      () => void;
  onBack:         () => void;
}

export function ReviewDoneScreen({
  title, scoreLabel, correctCount, totalCount, incentiveLabel, restartLabel, backLabel, onRestart, onBack,
}: ReviewDoneScreenProps) {
  const perfect = correctCount >= totalCount;

  return (
    <div className={styles.screen}>
      <span className={styles.emoji}>{perfect ? '🎉' : '🔁'}</span>
      <p className={styles.title}>{title}</p>
      <p className={styles.score}>{scoreLabel} : {correctCount}/{totalCount}</p>
      {!perfect && <p className={styles.incentive}>{incentiveLabel}</p>}
      <Button variant="primary" onClick={onRestart}>{restartLabel}</Button>
      <button className={styles.back} onClick={onBack}>{backLabel}</button>
    </div>
  );
}
