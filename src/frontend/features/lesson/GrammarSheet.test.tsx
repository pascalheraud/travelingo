import { fireEvent, render, screen } from '@testing-library/react';
import { GrammarSheet } from './GrammarSheet';

describe('GrammarSheet', () => {
  it('renders nothing when closed', () => {
    render(
      <GrammarSheet
        open={false}
        source="Bonjour"
        target="Hello"
        grammar="Comes from Latin."
        complements={[]}
        titleLabel="Grammar"
        explanationLabel="Explanation"
        toRememberLabel="Key points"
        closeLabel="Close"
        onClose={() => {}}
      />,
    );
    expect(screen.queryByText('Comes from Latin.')).toBeNull();
  });

  it('renders the phrase reference and grammar explanation when open', () => {
    render(
      <GrammarSheet
        open
        source="Bonjour"
        target="Hello"
        grammar="Comes from Latin."
        complements={[]}
        titleLabel="Grammar"
        explanationLabel="Explanation"
        toRememberLabel="Key points"
        closeLabel="Close"
        onClose={() => {}}
      />,
    );
    expect(screen.getByText('« Bonjour » → « Hello »')).toBeInTheDocument();
    expect(screen.getByText('Comes from Latin.')).toBeInTheDocument();
  });

  it('renders the complement section only when there are complements', () => {
    render(
      <GrammarSheet
        open
        source="Bonjour"
        target="Hello"
        grammar="Comes from Latin."
        complements={['Tip one']}
        titleLabel="Grammar"
        explanationLabel="Explanation"
        toRememberLabel="Key points"
        closeLabel="Close"
        onClose={() => {}}
      />,
    );
    expect(screen.getByText('Key points')).toBeInTheDocument();
    expect(screen.getByText('• Tip one')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <GrammarSheet
        open
        source="Bonjour"
        target="Hello"
        grammar="Comes from Latin."
        complements={[]}
        titleLabel="Grammar"
        explanationLabel="Explanation"
        toRememberLabel="Key points"
        closeLabel="Close"
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
