import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders the children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders the title when provided', () => {
    render(<Card title="My card">Content</Card>);
    expect(screen.getByText('My card')).toBeInTheDocument();
  });

  it('omits the title when not provided', () => {
    render(<Card>Content</Card>);
    expect(screen.queryByText('My card')).toBeNull();
  });
});
