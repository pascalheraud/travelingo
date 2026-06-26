import { fireEvent, render, screen } from '@testing-library/react';
import { LangOptionCard } from './LangOptionCard';

describe('LangOptionCard', () => {
  it('renders the name and stats with default (French) strings', () => {
    render(
      <LangOptionCard
        lang="en"
        name="English"
        lessons={3}
        phrases={30}
        alreadyAdded={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('3 leçons · 30 phrases')).toBeInTheDocument();
  });

  it('shows the Added badge and disables the button when alreadyAdded', () => {
    render(
      <LangOptionCard
        lang="en"
        name="English"
        lessons={3}
        phrases={30}
        alreadyAdded
        onClick={() => {}}
      />,
    );
    expect(screen.getByText('Added')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not show the Added badge when not alreadyAdded', () => {
    render(
      <LangOptionCard
        lang="en"
        name="English"
        lessons={3}
        phrases={30}
        alreadyAdded={false}
        onClick={() => {}}
      />,
    );
    expect(screen.queryByText('Added')).toBeNull();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(
      <LangOptionCard
        lang="en"
        name="English"
        lessons={3}
        phrases={30}
        alreadyAdded={false}
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
