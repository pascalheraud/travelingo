import { render, screen } from '@testing-library/react';
import { ContributeCard } from './ContributeCard';

describe('ContributeCard', () => {
  it('renders the emoji and title', () => {
    render(<ContributeCard emoji="🎙️" title="Record audio" />);
    expect(screen.getByText('🎙️')).toBeInTheDocument();
    expect(screen.getByText('Record audio')).toBeInTheDocument();
  });
});
