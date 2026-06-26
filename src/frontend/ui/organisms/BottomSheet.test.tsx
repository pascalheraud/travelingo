import { render, screen, fireEvent } from '@testing-library/react';
import { BottomSheet } from './BottomSheet';

describe('BottomSheet', () => {
  it('renders nothing when closed', () => {
    render(
      <BottomSheet open={false} onClose={() => {}}>
        Content
      </BottomSheet>,
    );
    expect(screen.queryByText('Content')).toBeNull();
  });

  it('renders the children when open', () => {
    render(
      <BottomSheet open onClose={() => {}}>
        Content
      </BottomSheet>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(
      <BottomSheet open onClose={onClose}>
        Content
      </BottomSheet>,
    );
    fireEvent.click(container.firstChild as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
