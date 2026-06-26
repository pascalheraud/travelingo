import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders a span element', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('span')).not.toBeNull();
  });

  it('applies the size class', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.querySelector('span')!.className).toContain('lg');
  });

  it('does not apply a theme class for the default primary theme', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('span')!.className).not.toContain('primary');
  });

  it('applies a theme class for non-default themes', () => {
    const { container } = render(<Spinner theme="white" />);
    expect(container.querySelector('span')!.className).toContain('white');
  });
});
