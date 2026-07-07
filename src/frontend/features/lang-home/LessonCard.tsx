import clsx from 'clsx';
import styles from './LessonCard.module.scss';
import { Card } from '@ui/organisms';
import { Tag, MiniProgressBar } from '@ui/atoms';
import { useUserLang } from '@contexts/UserLangContext';
import { i18nServiceInstance, type I18nService } from '@services';

interface LessonCardProps {
  number:       number;
  emoji:        string;
  title:        string;
  subtitle:     string;
  donePhrases:  number;
  totalPhrases: number;
  isNew?:       boolean;
  onStart:      () => void;
  i18nService?: I18nService;
}

export function LessonCard({ number, emoji, title, subtitle, donePhrases, totalPhrases, isNew, onStart, i18nService = i18nServiceInstance }: LessonCardProps) {
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);
  const done = donePhrases >= totalPhrases && totalPhrases > 0;
  const started = donePhrases > 0;

  return (
    <Card className={styles.card}>
      <div className={clsx(styles.row, done && styles.done, isNew && styles.new)} onClick={onStart} role="button">
        <span className={styles.emoji}>{emoji}</span>
        <div className={styles.info}>
          <p className={styles.title}><span className={styles.number}>{number}.</span> {title}</p>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.progressRow}>
            <MiniProgressBar value={(donePhrases / totalPhrases) * 100} theme={done ? 'success' : 'primary'} />
            <span className={styles.count}>{donePhrases}/{totalPhrases}</span>
          </div>
        </div>
        <div className={styles.statusSlot}>
          {isNew && <Tag label={strings.newLesson} color="warning" size="sm" />}
          {done && <Tag label={strings.review} color="success" size="sm" />}
          {!done && started && <Tag label={strings.inProgress} color="info" size="sm" />}
        </div>
      </div>
    </Card>
  );
}
