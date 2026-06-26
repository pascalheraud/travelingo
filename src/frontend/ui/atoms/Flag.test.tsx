import { render, screen } from '@testing-library/react';
import { Flag } from './Flag';

describe('Flag', () => {
  it('renders the flag for a known language code', () => {
    render(<Flag code="fr" />);
    expect(screen.getByText('🇫🇷')).toBeInTheDocument();
  });

  it('falls back to a generic flag for an unknown code', () => {
    render(<Flag code="xx" />);
    expect(screen.getByText('🏳️')).toBeInTheDocument();
  });

  it('sets aria-label to the language code', () => {
    render(<Flag code="en" />);
    expect(screen.getByRole('img', { name: 'en' })).toBeInTheDocument();
  });

  it('applies the size class', () => {
    render(<Flag code="en" size="lg" />);
    expect(screen.getByRole('img', { name: 'en' }).className).toContain('lg');
  });
});
