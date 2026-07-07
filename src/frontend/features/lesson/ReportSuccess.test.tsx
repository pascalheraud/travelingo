import { fireEvent, render, screen } from '@testing-library/react';
import { ReportSuccess } from './ReportSuccess';

describe('ReportSuccess', () => {
  it('renders the thanks and sent messages', () => {
    render(
      <ReportSuccess thanksLabel="Thanks!" sentLabel="Sent." closeLabel="Close" onClose={() => {}} />,
    );
    expect(screen.getByText('Thanks!')).toBeInTheDocument();
    expect(screen.getByText('Sent.')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <ReportSuccess thanksLabel="Thanks!" sentLabel="Sent." closeLabel="Close" onClose={onClose} />,
    );
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
