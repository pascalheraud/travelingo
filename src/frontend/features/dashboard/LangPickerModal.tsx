import clsx from 'clsx';
import styles from './LangPickerModal.module.scss';
import { ModalBar } from '@ui/molecules';
import { Modal } from '@ui/organisms';
import { Flag } from '@ui/atoms';
import { useUserLang } from '@contexts/UserLangContext';
import { langsServiceInstance, type LangsService } from '@services';
import type { SourceLangCode } from '@/models';

interface LangPickerModalProps {
  open:          boolean;
  langsService?: LangsService;
  onClose:       () => void;
}

export function LangPickerModal({ open, onClose, langsService = langsServiceInstance }: LangPickerModalProps) {
  const { userLang, setUserLang } = useUserLang();

  function handleSelect(code: SourceLangCode) {
    setUserLang(code);
    onClose();
  }

  function LangOption(code: SourceLangCode) {
    const active = code === userLang;

    function handleClick() {
      handleSelect(code);
    }

    return (
      <button
        key={code}
        className={clsx(styles.option, active && styles.active)}
        onClick={handleClick}
      >
        <Flag code={code} size="md" />
        <span className={styles.name}>{langsService.getLangAutonym(code)}</span>
        {active && <span className={styles.check}>✓</span>}
      </button>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBar title="My language" onClose={onClose} />
      <div className={styles.list}>
        {langsService.listSourceLanguages().map(LangOption)}
      </div>
    </Modal>
  );
}
