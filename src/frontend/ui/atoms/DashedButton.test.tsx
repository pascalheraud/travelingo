import { render, screen, fireEvent } from '@testing-library/react';
import { DashedButton } from './DashedButton';

describe('DashedButton', () => {
  it('renders the children', () => {
    render(<DashedButton onClick={() => {}}>Add item</DashedButton>);
    expect(screen.getByText('Add item')).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    render(
      <DashedButton onClick={() => {}} icon={<span>+</span>}>
        Add item
      </DashedButton>,
    );
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<DashedButton onClick={onClick}>Add item</DashedButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
