import { render, screen } from '@testing-library/react';
import { LoadingState } from './LoadingState';

describe('LoadingState', () => {
  it('renders the label when provided', () => {
    render(<LoadingState label="Loading lessons..." />);
    expect(screen.getByText('Loading lessons...')).toBeInTheDocument();
  });

  it('omits the label when not provided', () => {
    const { container } = render(<LoadingState />);
    expect(container.querySelector('p')).toBeNull();
  });
});
