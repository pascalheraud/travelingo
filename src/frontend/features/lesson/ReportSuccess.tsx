import styles from './ReportSuccess.module.scss';
import { Button } from '@ui/atoms';

interface ReportSuccessProps {
  thanksLabel: string;
  sentLabel:   string;
  closeLabel:  string;
  onClose:     () => void;
}

export function ReportSuccess({ thanksLabel, sentLabel, closeLabel, onClose }: ReportSuccessProps) {
  return (
    <div className={styles.success}>
      <span className={styles.icon}>✅</span>
      <p className={styles.thanks}>{thanksLabel}</p>
      <p className={styles.sent}>{sentLabel}</p>
      <Button fullWidth onClick={onClose}>{closeLabel}</Button>
    </div>
  );
}
