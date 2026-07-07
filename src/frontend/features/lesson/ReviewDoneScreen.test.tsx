import { fireEvent, render, screen } from '@testing-library/react';
import { ReviewDoneScreen } from './ReviewDoneScreen';

describe('ReviewDoneScreen', () => {
  it('renders the title and the score', () => {
    render(
      <ReviewDoneScreen
        title="Review complete!"
        scoreLabel="Correct answers"
        correctCount={7}
        totalCount={10}
        incentiveLabel="Try again!"
        restartLabel="Start over"
        backLabel="Back"
        onRestart={() => {}}
        onBack={() => {}}
      />,
    );
    expect(screen.getByText('Review complete!')).toBeInTheDocument();
    expect(screen.getByText('Correct answers : 7/10')).toBeInTheDocument();
  });

  it('shows the incentive text when the score is not perfect', () => {
    render(
      <ReviewDoneScreen
        title="Review complete!"
        scoreLabel="Correct answers"
        correctCount={7}
        totalCount={10}
        incentiveLabel="Try again!"
        restartLabel="Start over"
        backLabel="Back"
        onRestart={() => {}}
        onBack={() => {}}
      />,
    );
    expect(screen.getByText('Try again!')).toBeInTheDocument();
  });

  it('hides the incentive text on a perfect score', () => {
    render(
      <ReviewDoneScreen
        title="Review complete!"
        scoreLabel="Correct answers"
        correctCount={10}
        totalCount={10}
        incentiveLabel="Try again!"
        restartLabel="Start over"
        backLabel="Back"
        onRestart={() => {}}
        onBack={() => {}}
      />,
    );
    expect(screen.queryByText('Try again!')).toBeNull();
  });

  it('calls onRestart when the restart button is clicked', () => {
    const onRestart = vi.fn();
    render(
      <ReviewDoneScreen
        title="Review complete!"
        scoreLabel="Correct answers"
        correctCount={7}
        totalCount={10}
        incentiveLabel="Try again!"
        restartLabel="Start over"
        backLabel="Back"
        onRestart={onRestart}
        onBack={() => {}}
      />,
    );
    fireEvent.click(screen.getByText('Start over'));
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it('calls onBack when the back link is clicked', () => {
    const onBack = vi.fn();
    render(
      <ReviewDoneScreen
        title="Review complete!"
        scoreLabel="Correct answers"
        correctCount={7}
        totalCount={10}
        incentiveLabel="Try again!"
        restartLabel="Start over"
        backLabel="Back"
        onRestart={() => {}}
        onBack={onBack}
      />,
    );
    fireEvent.click(screen.getByText('Back'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
