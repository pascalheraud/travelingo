import { fireEvent, render, screen } from '@testing-library/react';
import { LessonCard } from './LessonCard';

describe('LessonCard', () => {
  it('renders title, subtitle and progress count', () => {
    render(
      <LessonCard
        number={1}
        emoji="👋"
        title="Greetings"
        subtitle="Say hello"
        donePhrases={3}
        totalPhrases={10}
        onStart={() => {}}
      />,
    );
    expect(screen.getByText('Greetings')).toBeInTheDocument();
    expect(screen.getByText('Say hello')).toBeInTheDocument();
    expect(screen.getByText('3/10')).toBeInTheDocument();
  });

  it('shows the in-progress tag when started but not done', () => {
    render(
      <LessonCard
        number={1}
        emoji="👋"
        title="Greetings"
        subtitle="Say hello"
        donePhrases={3}
        totalPhrases={10}
        onStart={() => {}}
      />,
    );
    expect(screen.getByText('En cours')).toBeInTheDocument();
  });

  it('shows the review tag and a clickable row when done', () => {
    const onStart = vi.fn();
    render(
      <LessonCard
        number={1}
        emoji="👋"
        title="Greetings"
        subtitle="Say hello"
        donePhrases={10}
        totalPhrases={10}
        onStart={onStart}
      />,
    );
    expect(screen.getByText('🔁 Réviser')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('shows no tag when not started', () => {
    render(
      <LessonCard
        number={1}
        emoji="👋"
        title="Greetings"
        subtitle="Say hello"
        donePhrases={0}
        totalPhrases={10}
        onStart={() => {}}
      />,
    );
    expect(screen.queryByText('En cours')).toBeNull();
    expect(screen.queryByText('🔁 Réviser')).toBeNull();
  });

  it('calls onStart when the row is clicked and not yet done', () => {
    const onStart = vi.fn();
    render(
      <LessonCard
        number={1}
        emoji="👋"
        title="Greetings"
        subtitle="Say hello"
        donePhrases={0}
        totalPhrases={10}
        onStart={onStart}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
