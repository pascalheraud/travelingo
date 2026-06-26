import { render, screen, fireEvent } from '@testing-library/react';
import { ChipButton } from './ChipButton';

describe('ChipButton', () => {
  it('renders the label', () => {
    render(<ChipButton label="French" onClick={() => {}} />);
    expect(screen.getByText('French')).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    render(<ChipButton label="French" icon={<span>🇫🇷</span>} onClick={() => {}} />);
    expect(screen.getByText('🇫🇷')).toBeInTheDocument();
  });

  it('applies the selected class when selected', () => {
    render(<ChipButton label="French" selected onClick={() => {}} />);
    expect(screen.getByRole('button').className).toContain('selected');
  });

  it('does not apply the selected class by default', () => {
    render(<ChipButton label="French" onClick={() => {}} />);
    expect(screen.getByRole('button').className).not.toContain('selected');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<ChipButton label="French" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
