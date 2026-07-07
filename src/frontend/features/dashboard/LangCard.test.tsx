import { fireEvent, render, screen } from '@testing-library/react';
import { LangCard } from './LangCard';

describe('LangCard', () => {
  it('renders the name and stats with default (French) strings', () => {
    render(<LangCard lang="en" name="English" lessons={3} donePhrases={5} totalPhrases={30} onClick={() => {}} />);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('3 leçons · 30 phrases')).toBeInTheDocument();
    expect(screen.getByText('5/30')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<LangCard lang="en" name="English" lessons={3} donePhrases={5} totalPhrases={30} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders 0/0 when totalPhrases is 0, avoiding a NaN percent', () => {
    render(<LangCard lang="en" name="English" lessons={0} donePhrases={0} totalPhrases={0} onClick={() => {}} />);
    expect(screen.getByText('0/0')).toBeInTheDocument();
  });
});
