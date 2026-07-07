import styles from './AboutScreen.module.scss';
import { AppLayout } from '@features/layout';
import { ContributeSection } from './ContributeSection';
import { ExternalLinkButton } from './ExternalLinkButton';
import { AppVersionBadge } from './AppVersionBadge';
import { useUserLang } from '@contexts/UserLangContext';
import { useManifestContext } from '@contexts/ManifestContext';
import { i18nServiceInstance, type I18nService } from '@services';
import { useAppNavigate } from '@/useAppNavigate';
import { ROUTES } from '@/routes';

interface AboutScreenProps {
  i18nService?: I18nService;
}

export function AboutScreen({ i18nService = i18nServiceInstance }: AboutScreenProps) {
  const navigate = useAppNavigate();
  const { userLang } = useUserLang();
  const { manifest } = useManifestContext();
  const strings = i18nService.getStrings(userLang);

  function handleBack() {
    navigate(ROUTES.dashboard);
  }

  return (
    <AppLayout title={strings.about} onBack={handleBack}>
      <div className={styles.screen}>
        <ContributeSection />
        <div className={styles.links}>
          <ExternalLinkButton label={strings.privacy} href="#" />
          <ExternalLinkButton label={strings.contact} href="#" />
          <ExternalLinkButton label={strings.rate} href="#" />
        </div>
        <div className={styles.footer}>
          <AppVersionBadge version={manifest.appVersion} />
        </div>
      </div>
    </AppLayout>
  );
}
