import { fireEvent, render, screen } from '@testing-library/react';
import { ChoiceButton } from './ChoiceButton';

describe('ChoiceButton', () => {
  it('renders the target and phonetic text', () => {
    render(
      <ChoiceButton
        target="Hello"
        phonetic="hɛˈloʊ"
        selected={false}
        validated={false}
        isCorrect={false}
        isWrong={false}
        onClick={() => {}}
        onPlayAudio={() => {}}
      />,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('hɛˈloʊ')).toBeInTheDocument();
  });

  it('shows the speaker prefix when selected and not validated', () => {
    render(
      <ChoiceButton
        target="Hello"
        phonetic="hɛˈloʊ"
        selected
        validated={false}
        isCorrect={false}
        isWrong={false}
        onClick={() => {}}
        onPlayAudio={() => {}}
      />,
    );
    expect(screen.getByText('Hello').textContent).toBe('🔊Hello');
  });

  it('shows the check prefix and correct class when validated and correct', () => {
    render(
      <ChoiceButton
        target="Hello"
        phonetic="hɛˈloʊ"
        selected={false}
        validated
        isCorrect
        isWrong={false}
        onClick={() => {}}
        onPlayAudio={() => {}}
      />,
    );
    expect(screen.getByText('Hello').textContent).toBe('✓Hello');
    expect(screen.getByRole('button').className).toContain('correct');
  });

  it('shows the cross prefix and wrong class when validated and wrong', () => {
    render(
      <ChoiceButton
        target="Hello"
        phonetic="hɛˈloʊ"
        selected
        validated
        isCorrect={false}
        isWrong
        onClick={() => {}}
        onPlayAudio={() => {}}
      />,
    );
    expect(screen.getByText('Hello').textContent).toBe('✗Hello');
    expect(screen.getByRole('button').className).toContain('wrong');
  });

  it('applies the dimmed class when validated but not correct nor wrong', () => {
    render(
      <ChoiceButton
        target="Hello"
        phonetic="hɛˈloʊ"
        selected={false}
        validated
        isCorrect={false}
        isWrong={false}
        onClick={() => {}}
        onPlayAudio={() => {}}
      />,
    );
    expect(screen.getByRole('button').className).toContain('dimmed');
  });

  it('calls onPlayAudio instead of onClick once validated', () => {
    const onClick = vi.fn();
    const onPlayAudio = vi.fn();
    render(
      <ChoiceButton
        target="Hello"
        phonetic="hɛˈloʊ"
        selected={false}
        validated
        isCorrect={false}
        isWrong={false}
        onClick={onClick}
        onPlayAudio={onPlayAudio}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onPlayAudio).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(
      <ChoiceButton
        target="Hello"
        phonetic="hɛˈloʊ"
        selected={false}
        validated={false}
        isCorrect={false}
        isWrong={false}
        onClick={onClick}
        onPlayAudio={() => {}}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
