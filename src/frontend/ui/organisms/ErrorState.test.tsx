import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  it('renders the default message when none is provided', () => {
    render(<ErrorState />);
    expect(screen.getByText('An error occurred.')).toBeInTheDocument();
  });

  it('renders a custom message when provided', () => {
    render(<ErrorState message="Network error" />);
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('omits the retry button when onRetry is not provided', () => {
    render(<ErrorState />);
    expect(screen.queryByText('Retry')).toBeNull();
  });

  it('renders the default retry label and calls onRetry when clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    fireEvent.click(screen.getByText('Retry'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders a custom retry label when provided', () => {
    render(<ErrorState onRetry={() => {}} retryLabel="Try again" />);
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });
});
