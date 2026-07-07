import styles from './AppLayout.module.scss';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children:            React.ReactNode;
  showHeader?:         boolean;
  title?:              string;
  subtitle?:           string;
  onBack?:             () => void;
  onLangClick?:        () => void;
  onPackManagerClick?: () => void;
  onAboutClick?:       () => void;
}

export function AppLayout({
  children, showHeader = true, title, subtitle, onBack,
  onLangClick, onPackManagerClick, onAboutClick,
}: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      {showHeader && (
        <AppHeader
          title={title}
          subtitle={subtitle}
          onBack={onBack}
          onLangClick={onLangClick}
          onPackManagerClick={onPackManagerClick}
          onAboutClick={onAboutClick}
        />
      )}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
