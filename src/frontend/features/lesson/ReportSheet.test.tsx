import { fireEvent, render, screen } from '@testing-library/react';
import { ReportSheet } from './ReportSheet';
import type { AppStrings } from '@/models';

function makeStrings(): AppStrings {
  return {
    report: 'Report an error',
    reportOn: 'Which phrase?',
    reportType: 'Error type',
    reportPhonetic: 'Phonetics',
    reportAudio: 'Audio',
    reportSpelling: 'Spelling',
    reportTranslation: 'Translation',
    reportPlaceholder: 'Add details…',
    reportSend: 'Send',
    reportThanks: 'Thank you!',
    reportSent: 'Your suggestion has been sent.',
    close: 'Close',
    cancel: 'Cancel',
  } as AppStrings;
}

describe('ReportSheet', () => {
  it('renders nothing when closed', () => {
    render(<ReportSheet open={false} source="Bonjour" target="Hello" strings={makeStrings()} onClose={() => {}} onSubmit={() => {}} />);
    expect(screen.queryByText('Which phrase?')).toBeNull();
  });

  it('renders the report form when open', () => {
    render(<ReportSheet open source="Bonjour" target="Hello" strings={makeStrings()} onClose={() => {}} onSubmit={() => {}} />);
    expect(screen.getByText('« Bonjour » → « Hello »')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('disables Send until a report type is chosen', () => {
    render(<ReportSheet open source="Bonjour" target="Hello" strings={makeStrings()} onClose={() => {}} onSubmit={() => {}} />);
    expect(screen.getByText('Send')).toBeDisabled();
    fireEvent.click(screen.getByText('Audio'));
    expect(screen.getByText('Send')).not.toBeDisabled();
  });

  it('calls onSubmit with the chosen type and comment, then shows the success view', () => {
    const onSubmit = vi.fn();
    render(<ReportSheet open source="Bonjour" target="Hello" strings={makeStrings()} onClose={() => {}} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText('Audio'));
    fireEvent.click(screen.getByText('Send'));
    expect(onSubmit).toHaveBeenCalledWith('audio', '');
    expect(screen.getByText('Thank you!')).toBeInTheDocument();
  });

  it('calls onClose when Cancel is clicked', () => {
    const onClose = vi.fn();
    render(<ReportSheet open source="Bonjour" target="Hello" strings={makeStrings()} onClose={onClose} onSubmit={() => {}} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
