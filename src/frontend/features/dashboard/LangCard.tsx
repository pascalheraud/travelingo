import styles from './LangCard.module.scss';
import { Flag, MiniProgressBar } from '@ui/atoms';
import { useUserLang } from '@contexts/UserLangContext';
import { i18nServiceInstance, type I18nService } from '@services';
import type { TargetLangCode } from '@/models';

interface LangCardProps {
  lang:         TargetLangCode;
  name:         string;
  lessons:      number;
  donePhrases:  number;
  totalPhrases: number;
  onClick:      () => void;
  i18nService?: I18nService;
}

export function LangCard({ lang, name, lessons, donePhrases, totalPhrases, onClick, i18nService = i18nServiceInstance }: LangCardProps) {
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);
  const percent = totalPhrases > 0 ? Math.round((donePhrases / totalPhrases) * 100) : 0;

  return (
    <div className={styles.card} onClick={onClick} role="button">
      <span className={styles.flag}><Flag code={lang} size="lg" /></span>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.stats}>{lessons} {strings.lessons} · {totalPhrases} {strings.phrases}</p>
      </div>
      <div className={styles.right}>
        <span className={styles.count}>{donePhrases}/{totalPhrases}</span>
        <span className={styles.bar}>
          <MiniProgressBar value={percent} theme={percent > 0 ? 'primary' : 'muted'} />
        </span>
      </div>
    </div>
  );
}
