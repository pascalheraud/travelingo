import clsx from 'clsx';
import styles from './AppHeader.module.scss';
import { Flag, IconButton, ProgressBar } from '@ui/atoms';
import { useUserLang } from '@contexts/UserLangContext';
import { langsServiceInstance, i18nServiceInstance, type LangsService, type I18nService } from '@services';

interface AppHeaderProps {
  title?:              string;
  subtitle?:           string;
  onBack?:             () => void;
  progress?:           number;
  onLangClick?:        () => void;
  onPackManagerClick?: () => void;
  onAboutClick?:       () => void;
  compact?:            boolean;
  langsService?:       LangsService;
  i18nService?:        I18nService;
}

export function AppHeader({
  title, subtitle, onBack, progress,
  onLangClick, onPackManagerClick, onAboutClick, compact,
  langsService = langsServiceInstance, i18nService = i18nServiceInstance,
}: AppHeaderProps) {
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);

  return (
    <header className={clsx(styles.hero, compact && styles.compact)}>
      <div className={styles.row}>
        {onBack ? (
          <>
            <IconButton icon="←" ariaLabel={strings.back} size="xl" variant="secondary" onClick={onBack} />
            {title ? (
              <span className={styles.title}>{title}</span>
            ) : (
              <span className={styles.logoTitle}>🌍 Travelingo</span>
            )}
          </>
        ) : (
          <>
            <span className={styles.logo}>🌍 {title ?? 'Travelingo'}</span>
            <div className={styles.actions}>
              {onPackManagerClick && (
                <IconButton icon="📦" ariaLabel={strings.packManager} size="lg" onClick={onPackManagerClick} />
              )}
              {onAboutClick && (
                <IconButton icon="ℹ️" ariaLabel={strings.about} size="lg" onClick={onAboutClick} />
              )}
              {onLangClick && (
                <button className={styles.langBtn} onClick={onLangClick}>
                  <Flag code={userLang} size="sm" />
                  {langsService.getLangName(userLang, userLang)}
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <p className={styles.sub}>{subtitle ?? strings.appSub}</p>
      {progress !== undefined && (
        <div className={styles.progressWrap}>
          <ProgressBar value={progress} size="lg" />
        </div>
      )}
    </header>
  );
}
