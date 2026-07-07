import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders the label', () => {
    render(<Badge label="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    render(<Badge label="New" icon="🔥" />);
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('omits the icon span when not provided', () => {
    render(<Badge label="New" />);
    expect(screen.getByText('New').querySelector('span')).toBeNull();
  });

  it('applies the color and size classes', () => {
    render(<Badge label="New" color="success" size="sm" />);
    const badge = screen.getByText('New');
    expect(badge.className).toContain('success');
    expect(badge.className).toContain('sm');
  });

  it('defaults to primary color and md size', () => {
    render(<Badge label="New" />);
    const badge = screen.getByText('New');
    expect(badge.className).toContain('primary');
    expect(badge.className).toContain('md');
  });
});
