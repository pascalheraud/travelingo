import { render, screen } from '@testing-library/react';
import { GrammarSection } from './GrammarSection';

describe('GrammarSection', () => {
  it('renders the title and text', () => {
    render(<GrammarSection title="Etymology" text="Comes from Latin." />);
    expect(screen.getByText('Etymology')).toBeInTheDocument();
    expect(screen.getByText('Comes from Latin.')).toBeInTheDocument();
  });
});
