import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('sets the fill width to the given value', () => {
    const { container } = render(<ProgressBar value={37} />);
    expect(container.querySelector('[class*="fill"]')).toHaveStyle({ width: '37%' });
  });

  it('clamps values above 100 to 100%', () => {
    const { container } = render(<ProgressBar value={200} />);
    expect(container.querySelector('[class*="fill"]')).toHaveStyle({ width: '100%' });
  });

  it('clamps negative values to 0%', () => {
    const { container } = render(<ProgressBar value={-5} />);
    expect(container.querySelector('[class*="fill"]')).toHaveStyle({ width: '0%' });
  });

  it('does not render a label by default', () => {
    render(<ProgressBar value={50} />);
    expect(screen.queryByText('50%')).toBeNull();
  });

  it('renders the rounded percentage label when showLabel is true', () => {
    render(<ProgressBar value={50} showLabel />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('applies the animated class when animated is true', () => {
    const { container } = render(<ProgressBar value={50} animated />);
    expect(container.querySelector('[class*="fill"]')!.className).toContain('animated');
  });

  it('applies a theme class for non-default themes', () => {
    const { container } = render(<ProgressBar value={50} theme="error" />);
    expect(container.querySelector('[class*="fill"]')!.className).toContain('error');
  });

  it('applies a size class for non-default sizes', () => {
    const { container } = render(<ProgressBar value={50} size="lg" />);
    expect(container.querySelector('[class*="track"]')!.className).toContain('lg');
  });
});
