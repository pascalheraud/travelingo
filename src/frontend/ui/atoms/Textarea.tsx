import clsx from 'clsx';
import styles from './Textarea.module.scss';

interface TextareaProps {
  value:        string;
  onChange:     (v: string) => void;
  label?:       string;
  placeholder?: string;
  hint?:        string;
  error?:       string;
  rows?:        number;
}

export function Textarea({ value, onChange, label, placeholder, hint, error, rows }: TextareaProps) {
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={clsx(styles.textarea, error && styles.error)}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {(hint || error) && (
        <span className={clsx(styles.hint, error && styles.errorHint)}>{error ?? hint}</span>
      )}
    </div>
  );
}
