import { fireEvent, render, screen } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders the icon', () => {
    render(<IconButton icon="✕" ariaLabel="Close" />);
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('exposes the ariaLabel for accessibility', () => {
    render(<IconButton icon="✕" ariaLabel="Close" />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<IconButton icon="✕" ariaLabel="Close" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled is true', () => {
    render(<IconButton icon="✕" ariaLabel="Close" disabled />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled();
  });

  it('applies the variant and size classes', () => {
    render(<IconButton icon="✕" ariaLabel="Close" variant="primary" size="lg" />);
    const button = screen.getByRole('button', { name: 'Close' });
    expect(button.className).toContain('primary');
    expect(button.className).toContain('lg');
  });
});
