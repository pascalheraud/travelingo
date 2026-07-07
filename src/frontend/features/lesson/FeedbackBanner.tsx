import clsx from 'clsx';
import styles from './FeedbackBanner.module.scss';

interface FeedbackBannerProps {
  correct:       boolean;
  correctTarget: string;
  bravoLabel:    string;
  wrongLabel:    string;
}

export function FeedbackBanner({ correct, correctTarget, bravoLabel, wrongLabel }: FeedbackBannerProps) {
  return (
    <div className={clsx(styles.banner, correct ? styles.correct : styles.wrong)}>
      {correct ? bravoLabel : `${wrongLabel} « ${correctTarget} »`}
    </div>
  );
}
