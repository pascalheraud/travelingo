import { render, screen, fireEvent } from '@testing-library/react';
import { CardStripe } from './CardStripe';

describe('CardStripe', () => {
  it('renders the title', () => {
    render(<CardStripe title="Lesson 1" />);
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<CardStripe title="Lesson 1" subtitle="Greetings" />);
    expect(screen.getByText('Greetings')).toBeInTheDocument();
  });

  it('renders the left and right slots when provided', () => {
    render(<CardStripe title="Lesson 1" left={<span>L</span>} right={<span>R</span>} />);
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
  });

  it('has no button role when onClick is not provided', () => {
    render(<CardStripe title="Lesson 1" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<CardStripe title="Lesson 1" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
