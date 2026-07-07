import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserLangProvider } from '@contexts/UserLangContext';
import { ToastProvider, useToastContext } from '@contexts/ToastContext';
import { ManifestProvider } from '@contexts/ManifestContext';
import { ToastContainer } from '@ui/molecules';
import { DashboardScreen } from '@features/dashboard/DashboardScreen';
import { AddLangScreen } from '@features/dashboard/AddLangScreen';
import { LangHomeScreen } from '@features/lang-home/LangHomeScreen';
import { LessonScreen } from '@features/lesson/LessonScreen';
import { PackManagerScreen } from '@features/packs/PackManagerScreen';
import { AboutScreen } from '@features/about/AboutScreen';
import { ROUTES, ROUTE_PATTERNS } from './routes';
import './styles/global.scss';

function ToastHost() {
  const { toasts, dismissToast } = useToastContext();
  return <ToastContainer toasts={toasts} onDismiss={dismissToast} />;
}

export function App() {
  return (
    <UserLangProvider>
      <ManifestProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path={ROUTES.dashboard} element={<DashboardScreen />} />
              <Route path={ROUTES.addLang} element={<AddLangScreen />} />
              <Route path={ROUTES.packManager} element={<PackManagerScreen />} />
              <Route path={ROUTES.about} element={<AboutScreen />} />
              <Route path={ROUTE_PATTERNS.langHome} element={<LangHomeScreen />} />
              <Route path={ROUTE_PATTERNS.lesson} element={<LessonScreen />} />
            </Routes>
          </BrowserRouter>
          <ToastHost />
        </ToastProvider>
      </ManifestProvider>
    </UserLangProvider>
  );
}
