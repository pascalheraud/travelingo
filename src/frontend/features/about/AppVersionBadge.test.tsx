import { render, screen } from '@testing-library/react';
import { AppVersionBadge } from './AppVersionBadge';

describe('AppVersionBadge', () => {
  it('renders the version label with the default (French) strings', () => {
    render(<AppVersionBadge version="a1" />);
    expect(screen.getByText('Version a1')).toBeInTheDocument();
  });

  it('applies the gray color and sm size to the underlying badge', () => {
    render(<AppVersionBadge version="a1" />);
    const badge = screen.getByText('Version a1');
    expect(badge.className).toContain('gray');
    expect(badge.className).toContain('sm');
  });
});
