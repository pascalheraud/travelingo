import { render, screen } from '@testing-library/react';
import { CounterBadge } from './CounterBadge';

describe('CounterBadge', () => {
  it('renders the count', () => {
    render(<CounterBadge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('caps the displayed count at 99+', () => {
    render(<CounterBadge count={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not cap a count of exactly 99', () => {
    render(<CounterBadge count={99} />);
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('does not apply a variant class for the default primary variant', () => {
    render(<CounterBadge count={1} />);
    const badge = screen.getByText('1');
    expect(badge.className).not.toContain('warning');
    expect(badge.className).not.toContain('error');
    expect(badge.className).not.toContain('success');
  });

  it('applies the variant class when provided', () => {
    render(<CounterBadge count={1} variant="error" />);
    const badge = screen.getByText('1');
    expect(badge.className).toContain('error');
  });
});
