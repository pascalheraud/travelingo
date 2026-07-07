import { render, screen } from '@testing-library/react';
import { FeedbackBanner } from './FeedbackBanner';

describe('FeedbackBanner', () => {
  it('shows the bravo label and correct class when correct', () => {
    render(
      <FeedbackBanner correct correctTarget="Hello" bravoLabel="Bravo!" wrongLabel="Wrong, it was:" />,
    );
    const banner = screen.getByText('Bravo!');
    expect(banner).toBeInTheDocument();
    expect(banner.className).toContain('correct');
  });

  it('shows the wrong label with the correct target and wrong class when not correct', () => {
    render(
      <FeedbackBanner correct={false} correctTarget="Hello" bravoLabel="Bravo!" wrongLabel="Wrong, it was:" />,
    );
    const banner = screen.getByText('Wrong, it was: « Hello »');
    expect(banner).toBeInTheDocument();
    expect(banner.className).toContain('wrong');
  });
});
