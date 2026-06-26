import { fireEvent, render, screen } from '@testing-library/react';
import { LessonDoneScreen } from './LessonDoneScreen';

describe('LessonDoneScreen', () => {
  it('renders the title and description', () => {
    render(<LessonDoneScreen title="Lesson mastered!" description="Well done." backLabel="Back" reviewLabel="Review" onBack={() => {}} onReview={() => {}} />);
    expect(screen.getByText('Lesson mastered!')).toBeInTheDocument();
    expect(screen.getByText('Well done.')).toBeInTheDocument();
  });

  it('calls onBack when the back button is clicked', () => {
    const onBack = vi.fn();
    render(<LessonDoneScreen title="Lesson mastered!" description="Well done." backLabel="Back" reviewLabel="Review" onBack={onBack} onReview={() => {}} />);
    fireEvent.click(screen.getByText('Back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('calls onReview when the review link is clicked', () => {
    const onReview = vi.fn();
    render(<LessonDoneScreen title="Lesson mastered!" description="Well done." backLabel="Back" reviewLabel="Review" onBack={() => {}} onReview={onReview} />);
    fireEvent.click(screen.getByText('Review'));
    expect(onReview).toHaveBeenCalledTimes(1);
  });
});
