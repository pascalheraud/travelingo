import { fireEvent, render, screen } from '@testing-library/react';
import { ReportTypeGrid } from './ReportTypeGrid';

describe('ReportTypeGrid', () => {
  it('renders the four type labels', () => {
    render(
      <ReportTypeGrid
        value={null}
        onChange={() => {}}
        phoneticLabel="Phonetics"
        audioLabel="Audio"
        spellingLabel="Spelling"
        translationLabel="Translation"
      />,
    );
    expect(screen.getByText('Phonetics')).toBeInTheDocument();
    expect(screen.getByText('Audio')).toBeInTheDocument();
    expect(screen.getByText('Spelling')).toBeInTheDocument();
    expect(screen.getByText('Translation')).toBeInTheDocument();
  });

  it('calls onChange with the selected type id', () => {
    const onChange = vi.fn();
    render(
      <ReportTypeGrid
        value={null}
        onChange={onChange}
        phoneticLabel="Phonetics"
        audioLabel="Audio"
        spellingLabel="Spelling"
        translationLabel="Translation"
      />,
    );
    fireEvent.click(screen.getByText('Audio'));
    expect(onChange).toHaveBeenCalledWith('audio');
  });
});
