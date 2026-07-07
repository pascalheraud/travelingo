import styles from "./AddLangButton.module.scss";

interface AddLangButtonProps {
  label: string;
  onClick: () => void;
}

export function AddLangButton({ label, onClick }: AddLangButtonProps) {
  return (
    <button className={styles.btn} onClick={onClick}>
      <span>+</span>
      {label}
    </button>
  );
}
