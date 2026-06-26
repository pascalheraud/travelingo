import { render, screen } from '@testing-library/react';
import { PhoneticLabel } from './PhoneticLabel';

describe('PhoneticLabel', () => {
  it('renders the text', () => {
    render(<PhoneticLabel text="bõˈʒuʁ" />);
    expect(screen.getByText('bõˈʒuʁ')).toBeInTheDocument();
  });
});
