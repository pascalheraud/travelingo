import { render, screen } from '@testing-library/react';
import { AppLayout } from './AppLayout';

describe('AppLayout', () => {
  it('renders its children', () => {
    render(
      <AppLayout>
        <span>Body content</span>
      </AppLayout>,
    );
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders the header by default', () => {
    render(
      <AppLayout>
        <span>Body content</span>
      </AppLayout>,
    );
    expect(screen.getByText('🌍 Travelingo')).toBeInTheDocument();
  });

  it('hides the header when showHeader is false', () => {
    render(
      <AppLayout showHeader={false}>
        <span>Body content</span>
      </AppLayout>,
    );
    expect(screen.queryByText('🌍 Travelingo')).toBeNull();
  });
});
