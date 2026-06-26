import { fireEvent, render, screen } from '@testing-library/react';
import { ChoiceGrid, type ChoiceItem } from './ChoiceGrid';

function makeChoices(): ChoiceItem[] {
  return [
    { phraseId: 'p1', target: 'Hello', phonetic: 'hɛˈloʊ' },
    { phraseId: 'p2', target: 'Goodbye', phonetic: 'ɡʊdˈbaɪ' },
  ];
}

describe('ChoiceGrid', () => {
  it('renders one button per choice', () => {
    render(<ChoiceGrid choices={makeChoices()} selected={null} validated={false} correctTarget="Hello" onSelect={() => {}} onPlayAudio={() => {}} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Goodbye')).toBeInTheDocument();
  });

  it('marks the correct target as correct once validated', () => {
    render(<ChoiceGrid choices={makeChoices()} selected="Goodbye" validated correctTarget="Hello" onSelect={() => {}} onPlayAudio={() => {}} />);
    expect(screen.getByText('Hello').textContent).toBe('✓Hello');
  });

  it('marks the selected wrong target as wrong once validated', () => {
    render(<ChoiceGrid choices={makeChoices()} selected="Goodbye" validated correctTarget="Hello" onSelect={() => {}} onPlayAudio={() => {}} />);
    expect(screen.getByText('Goodbye').textContent).toBe('✗Goodbye');
  });

  it('calls onSelect with the clicked choice target', () => {
    const onSelect = vi.fn();
    render(<ChoiceGrid choices={makeChoices()} selected={null} validated={false} correctTarget="Hello" onSelect={onSelect} onPlayAudio={() => {}} />);
    fireEvent.click(screen.getByText('Goodbye'));
    expect(onSelect).toHaveBeenCalledWith('Goodbye');
  });

  it('calls onPlayAudio with the clicked phrase id once validated', () => {
    const onPlayAudio = vi.fn();
    render(<ChoiceGrid choices={makeChoices()} selected="Goodbye" validated correctTarget="Hello" onSelect={() => {}} onPlayAudio={onPlayAudio} />);
    fireEvent.click(screen.getByText('Goodbye'));
    expect(onPlayAudio).toHaveBeenCalledWith('p2');
  });
});
