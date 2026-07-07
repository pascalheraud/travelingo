import { useSyncExternalStore } from 'react';
import styles from './AddLangScreen.module.scss';
import { AppLayout } from '@features/layout';
import { LangOptionCard } from './LangOptionCard';
import { useUserLang } from '@contexts/UserLangContext';
import { useManifestContext } from '@contexts/ManifestContext';
import {
  activeLangsStoreInstance, langsServiceInstance, i18nServiceInstance,
  type ActiveLangsStore, type LangsService, type I18nService,
} from '@services';
import { useAppNavigate } from '@/useAppNavigate';
import { ROUTES } from '@/routes';
import type { TargetLangCode } from '@/models';

interface AddLangScreenProps {
  activeLangsStore?: ActiveLangsStore;
  langsService?:     LangsService;
  i18nService?:      I18nService;
}

export function AddLangScreen({
  activeLangsStore = activeLangsStoreInstance,
  langsService = langsServiceInstance,
  i18nService = i18nServiceInstance,
}: AddLangScreenProps) {
  const navigate = useAppNavigate();
  const { userLang } = useUserLang();
  const { manifest } = useManifestContext();
  const strings = i18nService.getStrings(userLang);
  const activeLangCodes = useSyncExternalStore(activeLangsStore.subscribe, activeLangsStore.getSnapshot);

  function handleBack() {
    navigate(ROUTES.dashboard);
  }

  function handleSelect(code: TargetLangCode) {
    activeLangsStore.add(code);
    navigate(ROUTES.dashboard);
  }

  function LangOption(code: TargetLangCode) {
    const alreadyAdded = activeLangCodes.includes(code);
    const packRef = manifest.learningPacks.find((p) => p.targetLang === code);

    function handleClick() {
      handleSelect(code);
    }

    return (
      <LangOptionCard
        key={code}
        lang={code}
        name={langsService.getLangName(code, userLang)}
        lessons={packRef?.lessons ?? 0}
        phrases={packRef?.phrases ?? 0}
        alreadyAdded={alreadyAdded}
        onClick={handleClick}
      />
    );
  }

  return (
    <AppLayout title={strings.chooseLang} onBack={handleBack}>
      <div className={styles.screen}>
        <div className={styles.grid}>
          {langsService.listTargetLanguages(userLang).map(LangOption)}
        </div>
      </div>
    </AppLayout>
  );
}
