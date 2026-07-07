import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders the value', () => {
    render(<Textarea value="hello" onChange={() => {}} />);
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    render(<Textarea value="" onChange={() => {}} label="Comment" />);
    expect(screen.getByText('Comment')).toBeInTheDocument();
  });

  it('renders the hint when provided and no error', () => {
    render(<Textarea value="" onChange={() => {}} hint="Optional" />);
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('renders the error instead of the hint when both are provided', () => {
    render(<Textarea value="" onChange={() => {}} hint="Optional" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.queryByText('Optional')).toBeNull();
  });

  it('calls onChange with the new value', () => {
    const onChange = vi.fn();
    render(<Textarea value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new text' } });
    expect(onChange).toHaveBeenCalledWith('new text');
  });
});
