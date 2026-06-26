import { fireEvent, render, screen } from '@testing-library/react';
import { ExternalLinkButton } from './ExternalLinkButton';

describe('ExternalLinkButton', () => {
  it('renders the label', () => {
    render(<ExternalLinkButton label="Contact" href="https://example.com" />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('opens the href in a new tab when clicked', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<ExternalLinkButton label="Contact" href="https://example.com" />);
    fireEvent.click(screen.getByText('Contact'));
    expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
    openSpy.mockRestore();
  });
});
