import { render, screen } from '@testing-library/react';
import { PageWrapper } from './PageWrapper';

describe('PageWrapper', () => {
  it('renders the children', () => {
    render(<PageWrapper>Content</PageWrapper>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders the header when provided', () => {
    render(<PageWrapper header={<span>Header</span>}>Content</PageWrapper>);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});
