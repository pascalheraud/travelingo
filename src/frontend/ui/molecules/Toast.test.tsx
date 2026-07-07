import { render, screen, fireEvent } from '@testing-library/react';
import { Toast, ToastContainer } from './Toast';
import type { ToastItem } from '@contexts/ToastContext';

const toast: ToastItem = { id: '1', message: 'Saved', type: 'success' };

describe('Toast', () => {
  it('renders the message', () => {
    render(<Toast toast={toast} onDismiss={() => {}} />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('calls onDismiss with the toast id when clicked', () => {
    const onDismiss = vi.fn();
    render(<Toast toast={toast} onDismiss={onDismiss} />);
    fireEvent.click(screen.getByText('Saved'));
    expect(onDismiss).toHaveBeenCalledWith('1');
  });
});

describe('ToastContainer', () => {
  it('renders nothing when there are no toasts', () => {
    const { container } = render(<ToastContainer toasts={[]} onDismiss={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a toast for each item', () => {
    const toasts: ToastItem[] = [toast, { id: '2', message: 'Failed', type: 'error' }];
    render(<ToastContainer toasts={toasts} onDismiss={() => {}} />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });
});
