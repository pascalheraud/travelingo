import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('renders nothing when closed', () => {
    render(
      <ConfirmDialog open={false} title="Title" message="Message" onConfirm={() => {}} onCancel={() => {}} />,
    );
    expect(screen.queryByText('Title')).toBeNull();
  });

  it('renders the title and message when open', () => {
    render(
      <ConfirmDialog open title="Delete item" message="Are you sure?" onConfirm={() => {}} onCancel={() => {}} />,
    );
    expect(screen.getByText('Delete item')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('uses default button labels', () => {
    render(
      <ConfirmDialog open title="Title" message="Message" onConfirm={() => {}} onCancel={() => {}} />,
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('uses custom button labels when provided', () => {
    render(
      <ConfirmDialog
        open
        title="Title"
        message="Message"
        confirmLabel="Delete"
        cancelLabel="Keep"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Keep')).toBeInTheDocument();
  });

  it('calls onConfirm when the confirm button is clicked', () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog open title="Title" message="Message" onConfirm={onConfirm} onCancel={() => {}} />,
    );
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when the cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog open title="Title" message="Message" onConfirm={() => {}} onCancel={onCancel} />,
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
