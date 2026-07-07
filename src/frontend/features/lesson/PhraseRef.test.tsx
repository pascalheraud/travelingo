import { render, screen } from '@testing-library/react';
import { PhraseRef } from './PhraseRef';

describe('PhraseRef', () => {
  it('renders the source and target phrases', () => {
    render(<PhraseRef source="Bonjour" target="Hello" />);
    expect(screen.getByText('« Bonjour » → « Hello »')).toBeInTheDocument();
  });
});
