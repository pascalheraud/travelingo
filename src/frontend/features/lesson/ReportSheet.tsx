import { useState } from 'react';
import styles from './ReportSheet.module.scss';
import { ModalBar } from '@ui/molecules';
import { Modal } from '@ui/organisms';
import { Button, Textarea } from '@ui/atoms';
import { PhraseRef } from './PhraseRef';
import { ReportTypeGrid } from './ReportTypeGrid';
import { ReportSuccess } from './ReportSuccess';
import type { ReportType, AppStrings } from '@/models';

interface ReportSheetProps {
  open:     boolean;
  source:   string;
  target:   string;
  strings:  AppStrings;
  onClose:  () => void;
  onSubmit: (type: ReportType, comment: string) => void;
}

export function ReportSheet({ open, source, target, strings, onClose, onSubmit }: ReportSheetProps) {
  const [type, setType] = useState<ReportType | null>(null);
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);

  if (!open) return null;

  function handleClose() {
    setType(null);
    setComment('');
    setSent(false);
    onClose();
  }

  function handleSend() {
    if (!type) return;
    onSubmit(type, comment);
    setSent(true);
  }

  return (
    <Modal open={open} onClose={handleClose} className={styles.modal}>
      <ModalBar title={strings.report} onClose={handleClose} />
      {sent ? (
        <ReportSuccess
          thanksLabel={strings.reportThanks}
          sentLabel={strings.reportSent}
          closeLabel={strings.close}
          onClose={handleClose}
        />
      ) : (
        <>
          <p className={styles.hint}>{strings.reportOn}</p>
          <PhraseRef source={source} target={target} />
          <p className={styles.hint}>{strings.reportType}</p>
          <ReportTypeGrid
            value={type}
            onChange={setType}
            phoneticLabel={strings.reportPhonetic}
            audioLabel={strings.reportAudio}
            spellingLabel={strings.reportSpelling}
            translationLabel={strings.reportTranslation}
          />
          <Textarea value={comment} onChange={setComment} placeholder={strings.reportPlaceholder} rows={3} />
          <Button fullWidth disabled={!type} onClick={handleSend}>{strings.reportSend}</Button>
          <Button fullWidth variant="ghost" onClick={handleClose}>{strings.cancel}</Button>
        </>
      )}
    </Modal>
  );
}
