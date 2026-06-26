import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders the subtitle and icon when provided', () => {
    render(<EmptyState title="Nothing here" subtitle="Come back later" icon={<span>📭</span>} />);
    expect(screen.getByText('Come back later')).toBeInTheDocument();
    expect(screen.getByText('📭')).toBeInTheDocument();
  });

  it('omits the action button when onAction or actionLabel is missing', () => {
    render(<EmptyState title="Nothing here" actionLabel="Refresh" />);
    expect(screen.queryByText('Refresh')).toBeNull();
  });

  it('calls onAction when the action button is clicked', () => {
    const onAction = vi.fn();
    render(<EmptyState title="Nothing here" actionLabel="Refresh" onAction={onAction} />);
    fireEvent.click(screen.getByText('Refresh'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
