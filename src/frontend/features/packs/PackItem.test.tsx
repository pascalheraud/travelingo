import { fireEvent, render, screen } from '@testing-library/react';
import { PackItem } from './PackItem';
import type { InstalledPackInfo } from '@services';

function makePack(): InstalledPackInfo {
  return { targetLang: 'en', lessons: 1, phrases: 10, sizeBytes: 1000 };
}

describe('PackItem', () => {
  it('renders the name and stats with size label', () => {
    render(<PackItem pack={makePack()} name="English" sizeLabel="1.2 MB" onDelete={() => {}} />);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('1 leçons · 10 phrases · 1.2 MB')).toBeInTheDocument();
  });

  it('calls onDelete when the delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<PackItem pack={makePack()} name="English" sizeLabel="1.2 MB" onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
