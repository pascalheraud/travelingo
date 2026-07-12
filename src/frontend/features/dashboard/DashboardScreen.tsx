import { useEffect, useState, useSyncExternalStore } from 'react';
import styles from './DashboardScreen.module.scss';
import { AppLayout } from '@features/layout';
import { LangCard } from './LangCard';
import { AddLangButton } from './AddLangButton';
import { LangPickerModal } from './LangPickerModal';
import { DevPanel, DevPanelButton } from '@features/dev';
import { ConfirmDialog } from '@ui/molecules';
import { useManifestContext } from '@contexts/ManifestContext';
import { useUserLang } from '@contexts/UserLangContext';
import {
  activeLangsStoreInstance, langsServiceInstance, progressStoreInstance, progressServiceInstance, i18nServiceInstance,
  idbServiceInstance, packsServiceInstance, packsStoreInstance,
  type ActiveLangsStore, type LangsService, type ProgressStore, type ProgressService, type I18nService, type IdbService,
  type PacksService, type PacksStore,
} from '@services';
import { useAppNavigate, type AppNavigate } from '@/useAppNavigate';
import { ROUTES, buildRoute } from '@/routes';
import type { TargetLangCode, LessonId, SourceLangCode, AppManifest } from '@/models';

const LESSON_ID: LessonId = 'l01';

interface DashboardScreenProps {
  activeLangsStore?: ActiveLangsStore;
  langsService?:     LangsService;
  i18nService?:      I18nService;
  idbService?:       IdbService;
  packsService?:     PacksService;
  packsStore?:       PacksStore;
}

export function DashboardScreen({
  activeLangsStore = activeLangsStoreInstance,
  langsService = langsServiceInstance,
  i18nService = i18nServiceInstance,
  idbService = idbServiceInstance,
  packsService = packsServiceInstance,
  packsStore = packsStoreInstance,
}: DashboardScreenProps) {
  const navigate = useAppNavigate();
  const { manifest } = useManifestContext();
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);
  const [pickerOpen, setPickerOpen] = useState(false);
  const activeLangCodes = useSyncExternalStore(activeLangsStore.subscribe, activeLangsStore.getSnapshot);

  const activeLanguages = langsService.listActiveLanguages(activeLangCodes, userLang);

  // §5.9: on app open, check whether any active language's manifest version is ahead of
  // what's stored offline, and if so offer to download the new content.
  const [langsWithUpdate, setLangsWithUpdate] = useState<TargetLangCode[]>([]);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  useEffect(() => {
    let cancelled = false;
    async function checkForUpdates() {
      const outdated = await Promise.all(activeLangCodes.map(async (lang) => {
        const packRef = manifest.learningPacks.find((p) => p.targetLang === lang);
        if (!packRef) return undefined;
        const storedPack = await packsService.loadLearningPack(lang);
        if (!storedPack) return undefined;
        const versionMismatch = storedPack.version !== packRef.version;
        const lessonCountMismatch = storedPack.lessons.length !== packRef.lessons;
        return versionMismatch || lessonCountMismatch ? lang : undefined;
      }));
      if (cancelled) return;
      const found = outdated.filter((lang): lang is TargetLangCode => lang !== undefined);
      if (found.length > 0) {
        setLangsWithUpdate(found);
        setUpdateDialogOpen(true);
      }
    }
    void checkForUpdates();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleConfirmUpdate() {
    setUpdateDialogOpen(false);
    await Promise.all(langsWithUpdate.map((lang) => {
      const packRef = manifest.learningPacks.find((p) => p.targetLang === lang);
      if (!packRef) return undefined;
      return packsStore.download(lang, userLang, packRef.version, () => {});
    }));
    setLangsWithUpdate([]);
  }

  function handleCancelUpdate() {
    setUpdateDialogOpen(false);
  }

  function handleOpenPicker() {
    setPickerOpen(true);
  }

  function handleClosePicker() {
    setPickerOpen(false);
  }

  function handleAddLang() {
    navigate(ROUTES.addLang);
  }

  function handleOpenPackManager() {
    navigate(ROUTES.packManager);
  }

  async function handleDevResetAll() {
    await idbService.clearAll();
    localStorage.clear();
    window.location.reload();
  }

  function handleDevHideDevtools() {
    document.body.setAttribute('data-hide-devtools', '');
  }

  function LangCardEntry(code: TargetLangCode) {
    return (
      <DashboardLangCard
        key={code}
        code={code}
        navigate={navigate}
        langsService={langsService}
        manifest={manifest}
        userLang={userLang}
      />
    );
  }

  return (
    <AppLayout onLangClick={handleOpenPicker} onPackManagerClick={handleOpenPackManager}>
      <div className={styles.screen}>
        {activeLanguages.length > 0 && (
          <>
            <p className={styles.heading}>{strings.myLangs}</p>
            <div className={styles.list}>
              {activeLanguages.map(LangCardEntry)}
            </div>
          </>
        )}
        <p className={styles.heading}>{strings.addLang}</p>
        <AddLangButton
          label={strings.addLangBtn}
          onClick={handleAddLang}
        />
      </div>
      <LangPickerModal
        open={pickerOpen}
        onClose={handleClosePicker}
      />
      <ConfirmDialog
        open={updateDialogOpen}
        title={strings.newContentTitle}
        message={strings.newContentDesc}
        confirmLabel={strings.downloadLessons}
        cancelLabel={strings.cancel}
        onConfirm={handleConfirmUpdate}
        onCancel={handleCancelUpdate}
      />
      {import.meta.env.DEV && (
        <DevPanel>
          <DevPanelButton label="Reset all data" onClick={handleDevResetAll} />
          <DevPanelButton label="Hide devtools" onClick={handleDevHideDevtools} />
        </DevPanel>
      )}
    </AppLayout>
  );
}

interface DashboardLangCardProps {
  code:            TargetLangCode;
  navigate:        AppNavigate;
  langsService:    LangsService;
  manifest:        AppManifest;
  userLang:        SourceLangCode;
  progressStore?:   ProgressStore;
  progressService?: ProgressService;
}

function DashboardLangCard({
  code, navigate, langsService, manifest, userLang,
  progressStore = progressStoreInstance,
  progressService = progressServiceInstance,
}: DashboardLangCardProps) {
  const packRef = manifest.learningPacks.find((p) => p.targetLang === code);

  const progressKey = progressService.progressKey(code, LESSON_ID);
  progressStore.load(code, LESSON_ID);
  const progressState = useSyncExternalStore(progressStore.subscribe, () => progressStore.getSnapshot(progressKey));
  const progress = progressState.status === 'loaded' ? progressState.value : undefined;

  function handleClick() {
    navigate(buildRoute.langHome(code));
  }

  return (
    <LangCard
      lang={code}
      name={langsService.getLangName(code, userLang)}
      lessons={packRef?.lessons ?? 0}
      donePhrases={progress?.doneIds.length ?? 0}
      totalPhrases={packRef?.phrases ?? 0}
      onClick={handleClick}
    />
  );
}
