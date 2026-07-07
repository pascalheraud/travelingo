import clsx from 'clsx';
import styles from './LangOptionCard.module.scss';
import { Flag, Badge } from '@ui/atoms';
import { useUserLang } from '@contexts/UserLangContext';
import { i18nServiceInstance, type I18nService } from '@services';
import type { TargetLangCode } from '@/models';

interface LangOptionCardProps {
  lang:         TargetLangCode;
  name:         string;
  lessons:      number;
  phrases:      number;
  alreadyAdded: boolean;
  onClick:      () => void;
  i18nService?: I18nService;
}

export function LangOptionCard({ lang, name, lessons, phrases, alreadyAdded, onClick, i18nService = i18nServiceInstance }: LangOptionCardProps) {
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);

  return (
    <button
      className={clsx(styles.card, alreadyAdded && styles.added)}
      onClick={onClick}
      disabled={alreadyAdded}
    >
      <Flag code={lang} size="lg" />
      <span className={styles.name}>{name}</span>
      <span className={styles.stats}>{lessons} {strings.lessons} · {phrases} {strings.phrases}</span>
      {alreadyAdded && <Badge label="Added" color="success" size="sm" />}
    </button>
  );
}
