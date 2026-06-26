import { render, screen } from '@testing-library/react';
import { SectionLabel } from './SectionLabel';

describe('SectionLabel', () => {
  it('renders the children', () => {
    render(<SectionLabel>Vocabulary</SectionLabel>);
    expect(screen.getByText('Vocabulary')).toBeInTheDocument();
  });
});
