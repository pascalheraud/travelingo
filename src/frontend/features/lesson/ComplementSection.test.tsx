import { render, screen } from '@testing-library/react';
import { ComplementSection } from './ComplementSection';

describe('ComplementSection', () => {
  it('renders the title and each item', () => {
    render(<ComplementSection title="Key points" items={['First point', 'Second point']} />);
    expect(screen.getByText('Key points')).toBeInTheDocument();
    expect(screen.getByText('• First point')).toBeInTheDocument();
    expect(screen.getByText('• Second point')).toBeInTheDocument();
  });

  it('renders no list items when items is empty', () => {
    render(<ComplementSection title="Key points" items={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
