import { fireEvent, render, screen } from '@testing-library/react';
import { AddLangButton } from './AddLangButton';

describe('AddLangButton', () => {
  it('renders the label', () => {
    render(<AddLangButton label="Add a language" onClick={() => {}} />);
    expect(screen.getByText('Add a language')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<AddLangButton label="Add a language" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
