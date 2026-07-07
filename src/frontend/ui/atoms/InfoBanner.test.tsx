import { render, screen } from '@testing-library/react';
import { InfoBanner } from './InfoBanner';

describe('InfoBanner', () => {
  it('renders the children', () => {
    render(<InfoBanner>Something to know</InfoBanner>);
    expect(screen.getByText('Something to know')).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    render(<InfoBanner icon={<span>ℹ️</span>}>Something to know</InfoBanner>);
    expect(screen.getByText('ℹ️')).toBeInTheDocument();
  });

  it('defaults to the info variant', () => {
    render(<InfoBanner>Something to know</InfoBanner>);
    expect(screen.getByText('Something to know').parentElement?.className).toContain('info');
  });

  it('applies the given variant', () => {
    render(<InfoBanner variant="error">Something failed</InfoBanner>);
    expect(screen.getByText('Something failed').parentElement?.className).toContain('error');
  });
});
