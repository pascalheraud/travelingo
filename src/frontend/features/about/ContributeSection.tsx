import styles from './ContributeSection.module.scss';
import { SectionLabel } from '@ui/atoms';
import { ContributeCard } from './ContributeCard';
import { useUserLang } from '@contexts/UserLangContext';
import { i18nServiceInstance, type I18nService } from '@services';

interface ContributeSectionProps {
  i18nService?: I18nService;
}

export function ContributeSection({ i18nService = i18nServiceInstance }: ContributeSectionProps) {
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);

  const cards = [
    { emoji: '✅', title: strings.validateLang },
    { emoji: '🎙️', title: strings.recordVoice },
    { emoji: '📝', title: strings.proposeLesson },
    { emoji: '⚑', title: strings.reportCorrection },
    { emoji: '💻', title: strings.contributeCode },
    { emoji: '🌐', title: strings.proposeLang },
  ];

  return (
    <div className={styles.section}>
      <SectionLabel>{strings.contributeTitle}</SectionLabel>
      <p className={styles.intro}>{strings.contributeIntro}</p>
      <div className={styles.grid}>
        {cards.map((card) => (
          <ContributeCard key={card.title} emoji={card.emoji} title={card.title} />
        ))}
      </div>
    </div>
  );
}
