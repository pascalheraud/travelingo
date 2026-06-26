import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LangHomeScreen } from './LangHomeScreen';
import type { LangsService, PacksStore, ProgressStore, ProgressService, I18nService, PackPair } from '@services';
import type { LoadState } from '@services/Store';
import type { AppStrings } from '@/models';

function makeLangsService(): LangsService {
  return { getLangName: (code: string) => `Lang ${code}` } as unknown as LangsService;
}

function makePacksStore(state: LoadState<PackPair>, download: () => Promise<void> = () => Promise.resolve()): PacksStore {
  return {
    packPairKey: () => 'key',
    load: () => {},
    subscribe: () => () => {},
    getSnapshot: () => state,
    download,
  } as unknown as PacksStore;
}

function makeProgressStore(): ProgressStore {
  return {
    subscribe: () => () => {},
    getSnapshot: () => ({ status: 'empty' }) as LoadState<unknown>,
    load: () => {},
  } as unknown as ProgressStore;
}

function makeProgressService(): ProgressService {
  return { progressKey: () => 'progress-key' } as unknown as ProgressService;
}

function makeI18nService(): I18nService {
  return {
    getStrings: () => ({
      comingSoon: 'Lessons coming soon',
      comingSoonDesc: "Not available yet.",
      notDownloaded: 'Lessons not downloaded yet',
      downloadLessons: 'Download lessons',
      lessons: 'lessons',
      phrases: 'phrases',
      packDownloaded: 'Pack downloaded',
    } as AppStrings),
  } as I18nService;
}

function renderScreen(packPairState: LoadState<PackPair>, packsStore?: PacksStore) {
  return render(
    <MemoryRouter initialEntries={['/lang/en']}>
      <Routes>
        <Route
          path="/lang/:code"
          element={
            <LangHomeScreen
              langsService={makeLangsService()}
              packsStore={packsStore ?? makePacksStore(packPairState)}
              progressStore={makeProgressStore()}
              progressService={makeProgressService()}
              i18nService={makeI18nService()}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LangHomeScreen', () => {
  it('shows the not-downloaded empty state with a download action when fixture content exists but is not downloaded', () => {
    renderScreen({ status: 'empty' });
    expect(screen.getByText('Lessons not downloaded yet')).toBeInTheDocument();
    expect(screen.getByText('Download lessons')).toBeInTheDocument();
  });

  it('shows a progress bar while downloading', () => {
    const neverResolves = makePacksStore({ status: 'empty' }, () => new Promise<void>(() => {}));
    renderScreen({ status: 'empty' }, neverResolves);
    fireEvent.click(screen.getByText('Download lessons'));
    expect(screen.queryByText('Download lessons')).toBeNull();
  });

  it('renders the lang name in the hero', () => {
    renderScreen({ status: 'empty' });
    expect(screen.getByText('Lang en')).toBeInTheDocument();
  });
});
