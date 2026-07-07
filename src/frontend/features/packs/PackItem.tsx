import styles from './PackItem.module.scss';
import { Flag } from '@ui/atoms';
import { Button } from '@ui/atoms';
import { Card } from '@ui/organisms';
import { useUserLang } from '@contexts/UserLangContext';
import { i18nServiceInstance, type I18nService } from '@services';
import type { InstalledPackInfo } from '@services';

interface PackItemProps {
  pack:          InstalledPackInfo;
  name:          string;
  sizeLabel:     string;
  onDelete:      () => void;
  i18nService?:  I18nService;
}

export function PackItem({ pack, name, sizeLabel, onDelete, i18nService = i18nServiceInstance }: PackItemProps) {
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);

  return (
    <Card>
      <div className={styles.row}>
        <span className={styles.flag}><Flag code={pack.targetLang} size="lg" /></span>
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.stats}>{pack.lessons} {strings.lessons} · {pack.phrases} {strings.phrases} · {sizeLabel}</p>
        </div>
        <Button variant="danger" size="sm" onClick={onDelete}>{strings.deletePack}</Button>
      </div>
    </Card>
  );
}
