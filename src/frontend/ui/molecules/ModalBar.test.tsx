import { render, screen, fireEvent } from '@testing-library/react';
import { ModalBar } from './ModalBar';

describe('ModalBar', () => {
  it('renders the title', () => {
    render(<ModalBar title="Settings" onClose={() => {}} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<ModalBar title="Settings" onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
