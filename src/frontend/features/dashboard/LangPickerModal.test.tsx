import { fireEvent, render, screen } from '@testing-library/react';
import { LangPickerModal } from './LangPickerModal';
import type { LangsService } from '@services';
import type { SourceLangCode } from '@/models';

function makeLangsService(): LangsService {
  return {
    listSourceLanguages: () => ['fr', 'en'] as SourceLangCode[],
    getLangAutonym: (code: SourceLangCode) => (code === 'fr' ? 'Français' : 'English'),
  } as LangsService;
}

describe('LangPickerModal', () => {
  it('renders nothing when closed', () => {
    render(<LangPickerModal open={false} onClose={() => {}} langsService={makeLangsService()} />);
    expect(screen.queryByText('Français')).toBeNull();
  });

  it('renders an option per source language with a check mark on the active one', () => {
    render(<LangPickerModal open onClose={() => {}} langsService={makeLangsService()} />);
    expect(screen.getByText('Français')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('calls onClose when a language option is selected', () => {
    const onClose = vi.fn();
    render(<LangPickerModal open onClose={onClose} langsService={makeLangsService()} />);
    fireEvent.click(screen.getByText('English'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
