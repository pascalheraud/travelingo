import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.queryByText('Content')).toBeNull();
  });

  it('renders the children when open', () => {
    render(
      <Modal open onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );
    fireEvent.click(container.firstChild as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when the modal content is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );
    fireEvent.click(screen.getByText('Content'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
