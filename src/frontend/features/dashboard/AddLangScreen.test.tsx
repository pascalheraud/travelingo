import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AddLangScreen } from './AddLangScreen';
import type { ActiveLangsStore, LangsService } from '@services';
import type { TargetLangCode } from '@/models';

function makeActiveLangsStore(codes: TargetLangCode[]): ActiveLangsStore {
  return {
    subscribe: () => () => {},
    getSnapshot: () => codes,
    add: vi.fn(),
  } as unknown as ActiveLangsStore;
}

function makeLangsService(): LangsService {
  return {
    listTargetLanguages: () => ['en', 'es'] as TargetLangCode[],
    getLangName: (code: TargetLangCode) => `Lang ${code}`,
  } as unknown as LangsService;
}

describe('AddLangScreen', () => {
  it('renders a card per target language', () => {
    render(
      <MemoryRouter>
        <AddLangScreen activeLangsStore={makeActiveLangsStore([])} langsService={makeLangsService()} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Lang en')).toBeInTheDocument();
    expect(screen.getByText('Lang es')).toBeInTheDocument();
  });

  it('marks already-added languages as disabled', () => {
    render(
      <MemoryRouter>
        <AddLangScreen activeLangsStore={makeActiveLangsStore(['en'])} langsService={makeLangsService()} />
      </MemoryRouter>,
    );
    const englishButton = screen.getByText('Lang en').closest('button');
    expect(englishButton).toBeDisabled();
  });

  it('calls activeLangsStore.add when selecting a non-added language', () => {
    const store = makeActiveLangsStore([]);
    render(
      <MemoryRouter>
        <AddLangScreen activeLangsStore={store} langsService={makeLangsService()} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText('Lang es').closest('button')!);
    expect(store.add).toHaveBeenCalledWith('es');
  });
});
