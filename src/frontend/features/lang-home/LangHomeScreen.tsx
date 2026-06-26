import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { useParams } from 'react-router-dom';
import styles from './LangHomeScreen.module.scss';
import { AppLayout } from '@features/layout';
import { EmptyState } from '@ui/organisms';
import { DevPanel, DevPanelButton } from '@features/dev';
import { Flag, ProgressBar } from '@ui/atoms';
import { LessonList } from './LessonList';
import { useUserLang } from '@contexts/UserLangContext';
import { useManifestContext } from '@contexts/ManifestContext';
import { useToastContext } from '@contexts/ToastContext';
import {
  langsServiceInstance, packsStoreInstance, packsServiceInstance, progressStoreInstance, progressServiceInstance, i18nServiceInstance,
  type LangsService, type PacksStore, type PacksService, type ProgressStore, type ProgressService, type I18nService,
} from '@services';
import { useAppNavigate } from '@/useAppNavigate';
import { ROUTES, buildRoute } from '@/routes';
import type { TargetLangCode, LessonId, LessonProgress } from '@/models';

interface LangHomeScreenProps {
  langsService?:    LangsService;
  packsStore?:      PacksStore;
  packsService?:    PacksService;
  progressStore?:   ProgressStore;
  progressService?: ProgressService;
  i18nService?:     I18nService;
}

export function LangHomeScreen({
  langsService = langsServiceInstance,
  packsStore = packsStoreInstance,
  packsService = packsServiceInstance,
  progressStore = progressStoreInstance,
  progressService = progressServiceInstance,
  i18nService = i18nServiceInstance,
}: LangHomeScreenProps) {
  const { code } = useParams<{ code: TargetLangCode }>();
  const navigate = useAppNavigate();
  const { userLang } = useUserLang();
  const { manifest } = useManifestContext();
  const strings = i18nService.getStrings(userLang);
  const { showToast } = useToastContext();
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const targetLang = code as TargetLangCode;
  const packRef = manifest.learningPacks.find((p) => p.targetLang === targetLang);

  const packPairKey = packsStore.packPairKey(targetLang, userLang);
  packsStore.load(targetLang, userLang);
  const packPairState = useSyncExternalStore(packsStore.subscribe, () => packsStore.getSnapshot(packPairKey));
  const packPair = packPairState.status === 'loaded' ? packPairState.value : undefined;

  const lessonIds = packPair?.learningPack?.lessons.map((l) => l.id) ?? [];
  const lessonIdsKey = lessonIds.join(',');
  lessonIds.forEach((id) => progressStore.load(targetLang, id));

  // useSyncExternalStore requires a referentially stable snapshot when nothing changed,
  // so it returns a primitive signal here; the actual map is built by useMemo below.
  const progressSignal = useSyncExternalStore(progressStore.subscribe, () => lessonIds
    .map((id) => {
      const state = progressStore.getSnapshot(progressService.progressKey(targetLang, id));
      return state.status === 'loaded' ? JSON.stringify(state.value) : state.status;
    })
    .join('|'));

  const progressByLesson = useMemo(() => {
    const map: Partial<Record<LessonId, LessonProgress | undefined>> = {};
    lessonIds.forEach((id) => {
      const state = progressStore.getSnapshot(progressService.progressKey(targetLang, id));
      map[id] = state.status === 'loaded' ? state.value : undefined;
    });
    return map;
  }, [progressSignal, lessonIdsKey, targetLang]);

  const hasFixture = Boolean(packRef && packRef.lessons > 0 && packRef.translationPacks[userLang]);
  const downloaded = Boolean(packPair?.learningPack);

  // Lazily fetch the translation pack once the learning pack is available.
  const translationVersion = packRef?.translationPacks[userLang];
  useEffect(() => {
    if (!downloaded || !translationVersion || packPair?.translationPack) return;
    packsStore.ensureTranslationPack(targetLang, userLang, translationVersion);
  }, [downloaded, translationVersion, packPair?.translationPack, packsStore, targetLang, userLang]);

  const [newLessonIds, setNewLessonIds] = useState<LessonId[]>([]);
  useEffect(() => {
    if (!downloaded) return;
    packsService.loadNewLessonIds(targetLang).then(setNewLessonIds);
  }, [downloaded, targetLang, packPair, packsService]);

  useEffect(() => {
    if (!packRef) {
      navigate(ROUTES.dashboard, { replace: true });
    }
  }, [packRef, navigate]);

  function handleBack() {
    navigate(ROUTES.dashboard);
  }

  function handleSelectLesson(selectedLessonId: string) {
    navigate(buildRoute.lesson(targetLang, selectedLessonId as LessonId));
  }

  async function handleDevRemoveLastLesson() {
    await packsService.devRemoveLastLesson(targetLang, userLang);
    window.location.reload();
  }

  async function handleDownload() {
    if (!packRef) return;
    setDownloading(true);
    await packsStore.download(targetLang, userLang, packRef.version, setDownloadProgress);
    setDownloading(false);
    showToast(strings.packDownloaded, 'success');
  }

  return (
    <AppLayout
      subtitle={langsService.getLangName(targetLang, userLang)}
      onBack={handleBack}
    >
      <div className={styles.screen}>
        <div className={styles.flagWrap}>
          <Flag code={targetLang} size="lg" />
        </div>

        {!hasFixture && (
          <EmptyState
            icon="🚧"
            title={strings.comingSoon}
            subtitle={strings.comingSoonDesc}
          />
        )}

        {hasFixture && !downloaded && !downloading && (
          <EmptyState
            icon="📦"
            title={strings.notDownloaded}
            subtitle={packRef ? `${packRef.lessons} ${strings.lessons} · ${packRef.phrases} ${strings.phrases}` : undefined}
            actionLabel={strings.downloadLessons}
            onAction={handleDownload}
          />
        )}

        {downloading && (
          <div className={styles.downloadBlock}>
            <ProgressBar value={downloadProgress} showLabel animated />
          </div>
        )}

        {hasFixture && downloaded && packPair?.learningPack && packPair?.translationPack && (
          <LessonList
            learningPack={packPair.learningPack}
            translationPack={packPair.translationPack}
            progressByLesson={progressByLesson}
            newLessonIds={newLessonIds}
            onSelectLesson={handleSelectLesson}
          />
        )}
      </div>
      {import.meta.env.DEV && downloaded && (
        <DevPanel>
          <DevPanelButton label="Supprimer la dernière leçon" onClick={handleDevRemoveLastLesson} />
        </DevPanel>
      )}
    </AppLayout>
  );
}
