import { render } from '@testing-library/react';
import { StatusDot } from './StatusDot';

describe('StatusDot', () => {
  it('renders a span element', () => {
    const { container } = render(<StatusDot />);
    expect(container.querySelector('span')).not.toBeNull();
  });

  it('applies the default success theme class', () => {
    const { container } = render(<StatusDot />);
    expect(container.querySelector('span')!.className).toContain('success');
  });

  it('applies a non-default theme class', () => {
    const { container } = render(<StatusDot theme="error" />);
    expect(container.querySelector('span')!.className).toContain('error');
  });

  it('applies the size class', () => {
    const { container } = render(<StatusDot size="lg" />);
    expect(container.querySelector('span')!.className).toContain('lg');
  });

  it('applies the pulse class when pulse is true', () => {
    const { container } = render(<StatusDot pulse />);
    expect(container.querySelector('span')!.className).toContain('pulse');
  });

  it('does not apply the pulse class by default', () => {
    const { container } = render(<StatusDot />);
    expect(container.querySelector('span')!.className).not.toContain('pulse');
  });
});
