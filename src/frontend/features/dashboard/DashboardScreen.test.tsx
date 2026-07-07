import 'fake-indexeddb/auto';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DashboardScreen } from './DashboardScreen';
import type { ActiveLangsStore, LangsService, I18nService, IdbService } from '@services';
import type { TargetLangCode, AppStrings } from '@/models';

function makeActiveLangsStore(codes: TargetLangCode[]): ActiveLangsStore {
  return {
    subscribe: () => () => {},
    getSnapshot: () => codes,
  } as unknown as ActiveLangsStore;
}

function makeLangsService(): LangsService {
  return {
    listActiveLanguages: (codes: TargetLangCode[]) => codes,
    getLangName: (code: TargetLangCode) => `Lang ${code}`,
    listTargetLanguages: () => [],
  } as unknown as LangsService;
}

function makeI18nService(): I18nService {
  return {
    getStrings: () => ({
      myLangs: 'My languages',
      addLang: 'Add a language',
      addLangBtn: 'Choose a new language',
    } as AppStrings),
  } as I18nService;
}

function makeIdbService(): IdbService {
  return { clearAll: vi.fn() } as unknown as IdbService;
}

describe('DashboardScreen', () => {
  it('shows only the add-language section when there are no active languages', () => {
    render(
      <MemoryRouter>
        <DashboardScreen
          activeLangsStore={makeActiveLangsStore([])}
          langsService={makeLangsService()}
          i18nService={makeI18nService()}
          idbService={makeIdbService()}
        />
      </MemoryRouter>,
    );
    expect(screen.queryByText('My languages')).toBeNull();
    expect(screen.getByText('Add a language')).toBeInTheDocument();
    expect(screen.getByText('Choose a new language')).toBeInTheDocument();
  });

  it('shows a lang card per active language', () => {
    render(
      <MemoryRouter>
        <DashboardScreen
          activeLangsStore={makeActiveLangsStore(['en', 'es'])}
          langsService={makeLangsService()}
          i18nService={makeI18nService()}
          idbService={makeIdbService()}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('My languages')).toBeInTheDocument();
    expect(screen.getByText('Lang en')).toBeInTheDocument();
    expect(screen.getByText('Lang es')).toBeInTheDocument();
  });

  it('navigates to the add-lang route when the add button is clicked', () => {
    render(
      <MemoryRouter>
        <DashboardScreen
          activeLangsStore={makeActiveLangsStore([])}
          langsService={makeLangsService()}
          i18nService={makeI18nService()}
          idbService={makeIdbService()}
        />
      </MemoryRouter>,
    );
    expect(() => fireEvent.click(screen.getByText('Choose a new language'))).not.toThrow();
  });
});
