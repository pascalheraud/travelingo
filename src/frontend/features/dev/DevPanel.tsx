import { useState, type ReactNode } from 'react';
import styles from './DevPanel.module.scss';

interface DevPanelProps {
  children: ReactNode;
}

export function DevPanel({ children }: DevPanelProps) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button className={styles.toggle} onClick={() => setOpen(true)}>🛠️</button>
    );
  }

  return (
    <div className={styles.panel}>
      <span className={styles.label}>Dev tools</span>
      {children}
      <button className={styles.btn} onClick={() => setOpen(false)}>✕</button>
    </div>
  );
}

interface DevPanelButtonProps {
  label:   string;
  onClick: () => void;
}

export function DevPanelButton({ label, onClick }: DevPanelButtonProps) {
  return <button className={styles.btn} onClick={onClick}>{label}</button>;
}
