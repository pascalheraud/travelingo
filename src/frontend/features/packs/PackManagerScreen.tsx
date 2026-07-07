import { useEffect, useState, useSyncExternalStore } from 'react';
import styles from './PackManagerScreen.module.scss';
import { AppLayout } from '@features/layout';
import { EmptyState } from '@ui/organisms';
import { ConfirmDialog } from '@ui/molecules';
import { PackItem } from './PackItem';
import { useUserLang } from '@contexts/UserLangContext';
import {
  activeLangsStoreInstance, langsServiceInstance, packsServiceInstance, i18nServiceInstance,
  type ActiveLangsStore, type LangsService, type PacksService, type I18nService, type InstalledPackInfo,
} from '@services';
import { useAppNavigate } from '@/useAppNavigate';
import { ROUTES } from '@/routes';
import type { TargetLangCode } from '@/models';

interface PackManagerScreenProps {
  activeLangsStore?: ActiveLangsStore;
  langsService?:     LangsService;
  packsService?:     PacksService;
  i18nService?:      I18nService;
}

export function PackManagerScreen({
  activeLangsStore = activeLangsStoreInstance,
  langsService = langsServiceInstance,
  packsService = packsServiceInstance,
  i18nService = i18nServiceInstance,
}: PackManagerScreenProps) {
  const navigate = useAppNavigate();
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);
  const activeLangCodes = useSyncExternalStore(activeLangsStore.subscribe, activeLangsStore.getSnapshot);
  const [installedPacks, setInstalledPacks] = useState<InstalledPackInfo[]>([]);
  const [pendingDelete, setPendingDelete] = useState<TargetLangCode | null>(null);

  useEffect(() => {
    let cancelled = false;
    packsService.listInstalledPacks(activeLangCodes, userLang).then((packs) => {
      if (!cancelled) setInstalledPacks(packs);
    });
    return () => { cancelled = true; };
  }, [activeLangCodes, userLang, packsService]);

  function handleBack() {
    navigate(ROUTES.dashboard);
  }

  function handleDeleteRequest(targetLang: TargetLangCode) {
    setPendingDelete(targetLang);
  }

  function handleConfirmDelete() {
    if (pendingDelete) {
      activeLangsStore.remove(pendingDelete);
      setInstalledPacks((packs) => packs.filter((p) => p.targetLang !== pendingDelete));
    }
    setPendingDelete(null);
  }

  function handleCancelDelete() {
    setPendingDelete(null);
  }

  function PackEntry(pack: InstalledPackInfo) {
    function handleDelete() {
      handleDeleteRequest(pack.targetLang);
    }

    return (
      <PackItem
        key={pack.targetLang}
        pack={pack}
        name={langsService.getLangName(pack.targetLang, userLang)}
        sizeLabel={packsService.formatSize(pack.sizeBytes)}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <AppLayout title={strings.packManager} onBack={handleBack}>
      <div className={styles.screen}>
        {installedPacks.length === 0 ? (
          <EmptyState icon="📦" title={strings.noPacksInstalled} subtitle={strings.noPacksInstalledDesc} />
        ) : (
          <div className={styles.list}>
            {installedPacks.map(PackEntry)}
          </div>
        )}
      </div>
      <ConfirmDialog
        open={pendingDelete !== null}
        title={strings.deletePackConfirmTitle}
        message={strings.deletePackConfirmDesc}
        confirmLabel={strings.deletePackConfirmOk}
        cancelLabel={strings.cancel}
        danger
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AppLayout>
  );
}
