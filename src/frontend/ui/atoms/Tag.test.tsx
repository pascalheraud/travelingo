import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders the label', () => {
    render(<Tag label="Draft" />);
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('defaults to gray color and md size', () => {
    render(<Tag label="Draft" />);
    const tag = screen.getByText('Draft');
    expect(tag.className).toContain('gray');
    expect(tag.className).toContain('md');
  });

  it('applies the color and size classes', () => {
    render(<Tag label="Draft" color="success" size="sm" />);
    const tag = screen.getByText('Draft');
    expect(tag.className).toContain('success');
    expect(tag.className).toContain('sm');
  });
});
