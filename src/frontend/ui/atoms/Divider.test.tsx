import { render } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders an hr element', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).not.toBeNull();
  });

  it('does not apply a spacing class for the default md spacing', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')!.className).not.toContain('md');
  });

  it('applies a spacing class for non-default spacing', () => {
    const { container } = render(<Divider spacing="lg" />);
    expect(container.querySelector('hr')!.className).toContain('lg');
  });

  it('applies the dashed class for the dashed variant', () => {
    const { container } = render(<Divider variant="dashed" />);
    expect(container.querySelector('hr')!.className).toContain('dashed');
  });

  it('does not apply the dashed class for the default solid variant', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')!.className).not.toContain('dashed');
  });
});
