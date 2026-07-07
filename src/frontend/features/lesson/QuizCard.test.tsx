import { render, screen } from '@testing-library/react';
import { QuizCard } from './QuizCard';

describe('QuizCard', () => {
  it('renders the question and source phrase', () => {
    render(
      <QuizCard targetLang="en" howToSay="How do you say" targetName="English" source="Bonjour" />,
    );
    expect(screen.getByText('How do you say english ?')).toBeInTheDocument();
    expect(screen.getByText('« Bonjour »')).toBeInTheDocument();
  });

  it('renders children below the phrase', () => {
    render(
      <QuizCard targetLang="en" howToSay="How do you say" targetName="English" source="Bonjour">
        <span>Extra content</span>
      </QuizCard>,
    );
    expect(screen.getByText('Extra content')).toBeInTheDocument();
  });
});
