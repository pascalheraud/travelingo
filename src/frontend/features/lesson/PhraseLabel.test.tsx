import { render, screen } from '@testing-library/react';
import { PhraseLabel } from './PhraseLabel';

describe('PhraseLabel', () => {
  it('renders the text', () => {
    render(<PhraseLabel text="Bonjour" />);
    expect(screen.getByText('Bonjour')).toBeInTheDocument();
  });

  it('defaults to size lg and align center', () => {
    render(<PhraseLabel text="Bonjour" />);
    const label = screen.getByText('Bonjour');
    expect(label.className).toContain('lg');
    expect(label.className).not.toContain('left');
  });

  it('applies the md size and left align classes', () => {
    render(<PhraseLabel text="Bonjour" size="md" align="left" />);
    const label = screen.getByText('Bonjour');
    expect(label.className).toContain('md');
    expect(label.className).toContain('left');
  });
});
