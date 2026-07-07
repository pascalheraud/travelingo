import { render, screen } from '@testing-library/react';
import { Pill } from './Pill';

describe('Pill', () => {
  it('renders the label', () => {
    render(<Pill label="Beta" />);
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    render(<Pill label="Beta" icon="⭐" />);
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('omits the icon span when not provided', () => {
    render(<Pill label="Beta" />);
    expect(screen.getByText('Beta').querySelector('span')).toBeNull();
  });

  it('does not apply a theme class for the default theme', () => {
    render(<Pill label="Beta" />);
    expect(screen.getByText('Beta').className).not.toContain('default');
  });

  it('applies a theme class for non-default themes', () => {
    render(<Pill label="Beta" theme="success" />);
    expect(screen.getByText('Beta').className).toContain('success');
  });

  it('applies the size class', () => {
    render(<Pill label="Beta" size="sm" />);
    expect(screen.getByText('Beta').className).toContain('sm');
  });
});
