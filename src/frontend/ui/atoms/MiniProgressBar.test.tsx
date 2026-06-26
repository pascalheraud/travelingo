import { render } from '@testing-library/react';
import { MiniProgressBar } from './MiniProgressBar';

describe('MiniProgressBar', () => {
  it('sets the fill width to the given value', () => {
    const { container } = render(<MiniProgressBar value={42} />);
    expect(container.querySelector('[class*="fill"]')).toHaveStyle({ width: '42%' });
  });

  it('clamps values above 100 to 100%', () => {
    const { container } = render(<MiniProgressBar value={150} />);
    expect(container.querySelector('[class*="fill"]')).toHaveStyle({ width: '100%' });
  });

  it('clamps negative values to 0%', () => {
    const { container } = render(<MiniProgressBar value={-10} />);
    expect(container.querySelector('[class*="fill"]')).toHaveStyle({ width: '0%' });
  });

  it('does not apply a theme class for the default primary theme', () => {
    const { container } = render(<MiniProgressBar value={50} />);
    expect(container.querySelector('[class*="fill"]')!.className).not.toContain('primary');
  });

  it('applies a theme class for non-default themes', () => {
    const { container } = render(<MiniProgressBar value={50} theme="error" />);
    expect(container.querySelector('[class*="fill"]')!.className).toContain('error');
  });
});
