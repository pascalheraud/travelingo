import { render, screen, fireEvent } from '@testing-library/react';
import { SelectGrid } from './SelectGrid';

const items = [
  { id: 'fr', label: 'French' },
  { id: 'en', label: 'English' },
];

describe('SelectGrid', () => {
  it('renders an option for each item', () => {
    render(<SelectGrid items={items} onSelect={() => {}} />);
    expect(screen.getByText('French')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('marks the selected item as selected', () => {
    render(<SelectGrid items={items} selected="fr" onSelect={() => {}} />);
    expect(screen.getByText('French').closest('button')?.className).toContain('selected');
    expect(screen.getByText('English').closest('button')?.className).not.toContain('selected');
  });

  it('calls onSelect with the clicked item id', () => {
    const onSelect = vi.fn();
    render(<SelectGrid items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('English'));
    expect(onSelect).toHaveBeenCalledWith('en');
  });
});
