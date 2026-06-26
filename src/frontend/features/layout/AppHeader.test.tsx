import { fireEvent, render, screen } from '@testing-library/react';
import { AppHeader } from './AppHeader';
import type { LangsService, I18nService } from '@services';
import type { AppStrings } from '@/models';

function makeI18nService(): I18nService {
  return { getStrings: () => ({ packManager: 'Manage packs', about: 'About', appSub: 'Subtitle', back: 'Go back' } as AppStrings) } as I18nService;
}

function makeLangsService(): LangsService {
  return { getLangName: () => 'English' } as unknown as LangsService;
}

describe('AppHeader', () => {
  it('renders the subtitle from the strings', () => {
    render(<AppHeader i18nService={makeI18nService()} langsService={makeLangsService()} />);
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('does not render the pack manager, about or lang buttons when their handlers are absent', () => {
    render(<AppHeader i18nService={makeI18nService()} langsService={makeLangsService()} />);
    expect(screen.queryByText('English')).toBeNull();
  });

  it('renders the lang button and calls onLangClick when clicked', () => {
    const onLangClick = vi.fn();
    render(<AppHeader onLangClick={onLangClick} i18nService={makeI18nService()} langsService={makeLangsService()} />);
    fireEvent.click(screen.getByText('English'));
    expect(onLangClick).toHaveBeenCalledTimes(1);
  });

  it('renders the pack manager icon button and calls onPackManagerClick when clicked', () => {
    const onPackManagerClick = vi.fn();
    render(<AppHeader onPackManagerClick={onPackManagerClick} i18nService={makeI18nService()} langsService={makeLangsService()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Manage packs' }));
    expect(onPackManagerClick).toHaveBeenCalledTimes(1);
  });

  it('renders the about icon button and calls onAboutClick when clicked', () => {
    const onAboutClick = vi.fn();
    render(<AppHeader onAboutClick={onAboutClick} i18nService={makeI18nService()} langsService={makeLangsService()} />);
    fireEvent.click(screen.getByRole('button', { name: 'About' }));
    expect(onAboutClick).toHaveBeenCalledTimes(1);
  });

  it('renders a back button and title instead of the logo/actions row when onBack is given', () => {
    const onBack = vi.fn();
    render(<AppHeader title="Lesson 1" onBack={onBack} i18nService={makeI18nService()} langsService={makeLangsService()} />);
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
    expect(screen.queryByText('Travelingo')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Go back' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders a progress bar when progress is provided', () => {
    const { container } = render(<AppHeader progress={40} i18nService={makeI18nService()} langsService={makeLangsService()} />);
    expect(container.querySelector('[class*="progressWrap"]')).not.toBeNull();
  });
});
