import { fireEvent, render, screen } from '@testing-library/react';
import { DevPanel, DevPanelButton } from './DevPanel';

describe('DevPanel', () => {
  it('renders the dev tools label and its children', () => {
    render(
      <DevPanel>
        <span>Child content</span>
      </DevPanel>,
    );
    expect(screen.getByText('Dev tools')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});

describe('DevPanelButton', () => {
  it('renders the label', () => {
    render(<DevPanelButton label="Reset progress" onClick={() => {}} />);
    expect(screen.getByText('Reset progress')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<DevPanelButton label="Reset progress" onClick={onClick} />);
    fireEvent.click(screen.getByText('Reset progress'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
