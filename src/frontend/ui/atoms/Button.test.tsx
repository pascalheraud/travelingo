import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Save</Button>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('shows the loading indicator instead of children when loading', () => {
    render(<Button loading>Save</Button>);
    expect(screen.queryByText('Save')).toBeNull();
    expect(screen.getByText('⏳')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    fireEvent.click(screen.getByText('Save'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled is true', () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByText('Save')).toBeDisabled();
  });

  it('disables the button when loading is true', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Save</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('defaults to type="button"', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies the variant, size and fullWidth classes', () => {
    render(<Button variant="danger" size="lg" fullWidth>Save</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('danger');
    expect(button.className).toContain('lg');
    expect(button.className).toContain('fullWidth');
  });
});
