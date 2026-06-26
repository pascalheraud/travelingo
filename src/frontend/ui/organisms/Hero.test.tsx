import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the title', () => {
    render(<Hero title="Welcome" />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<Hero title="Welcome" subtitle="Let's learn" />);
    expect(screen.getByText("Let's learn")).toBeInTheDocument();
  });

  it('renders the children when provided', () => {
    render(
      <Hero title="Welcome">
        <button>Start</button>
      </Hero>,
    );
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
