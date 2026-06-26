import clsx from 'clsx';
import styles from './Flag.module.scss';

type FlagSize = 'sm' | 'md' | 'lg';

const FLAGS: Record<string, string> = {
  fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸', de: '🇩🇪', it: '🇮🇹', ro: '🇷🇴', pt: '🇵🇹',
};

interface FlagProps {
  code: string;
  size?: FlagSize;
}

export function Flag({ code, size = 'md' }: FlagProps) {
  return (
    <span className={clsx(styles.flag, styles[size])} role="img" aria-label={code}>
      {FLAGS[code] ?? '🏳️'}
    </span>
  );
}
