import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PackManagerScreen } from './PackManagerScreen';
import type { ActiveLangsStore, LangsService, PacksService, I18nService, InstalledPackInfo } from '@services';
import type { TargetLangCode, AppStrings } from '@/models';

function makeActiveLangsStore(codes: TargetLangCode[]): ActiveLangsStore {
  return {
    subscribe: () => () => {},
    getSnapshot: () => codes,
    remove: vi.fn(),
  } as unknown as ActiveLangsStore;
}

function makeLangsService(): LangsService {
  return { getLangName: (code: TargetLangCode) => `Lang ${code}` } as unknown as LangsService;
}

function makePacksService(packs: InstalledPackInfo[]): PacksService {
  return {
    listInstalledPacks: () => Promise.resolve(packs),
    formatSize: () => '1.2 MB',
  } as unknown as PacksService;
}

function makeI18nService(): I18nService {
  return {
    getStrings: () => ({
      packManager: 'Manage packs',
      noPacksInstalled: 'No packs installed',
      noPacksInstalledDesc: 'Add a language first.',
      deletePack: 'Delete',
      deletePackConfirmTitle: 'Remove this language?',
      deletePackConfirmDesc: 'All content will be deleted.',
      deletePackConfirmOk: 'Delete',
      cancel: 'Cancel',
      lessons: 'lessons',
      phrases: 'phrases',
    } as AppStrings),
  } as I18nService;
}

describe('PackManagerScreen', () => {
  it('shows the empty state when no packs are installed', async () => {
    render(
      <MemoryRouter>
        <PackManagerScreen
          activeLangsStore={makeActiveLangsStore([])}
          langsService={makeLangsService()}
          packsService={makePacksService([])}
          i18nService={makeI18nService()}
        />
      </MemoryRouter>,
    );
    expect(await screen.findByText('No packs installed')).toBeInTheDocument();
  });

  it('lists installed packs once loaded', async () => {
    const pack: InstalledPackInfo = { targetLang: 'en', lessons: 1, phrases: 10, sizeBytes: 1000 };
    render(
      <MemoryRouter>
        <PackManagerScreen
          activeLangsStore={makeActiveLangsStore(['en'])}
          langsService={makeLangsService()}
          packsService={makePacksService([pack])}
          i18nService={makeI18nService()}
        />
      </MemoryRouter>,
    );
    expect(await screen.findByText('Lang en')).toBeInTheDocument();
  });

  it('opens a confirm dialog on delete and removes the pack on confirm', async () => {
    const pack: InstalledPackInfo = { targetLang: 'en', lessons: 1, phrases: 10, sizeBytes: 1000 };
    const store = makeActiveLangsStore(['en']);
    render(
      <MemoryRouter>
        <PackManagerScreen
          activeLangsStore={store}
          langsService={makeLangsService()}
          packsService={makePacksService([pack])}
          i18nService={makeI18nService()}
        />
      </MemoryRouter>,
    );
    await screen.findByText('Lang en');
    fireEvent.click(screen.getByText('🗑 Supprimer'));
    expect(await screen.findByText('Remove this language?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => expect(store.remove).toHaveBeenCalledWith('en'));
  });
});
