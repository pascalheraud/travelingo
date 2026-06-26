import styles from './PhoneticLabel.module.scss';

interface PhoneticLabelProps {
  text: string;
}

export function PhoneticLabel({ text }: PhoneticLabelProps) {
  return <p className={styles.label}>{text}</p>;
}
