import { fireEvent, render, screen } from '@testing-library/react';
import { ActionBar } from './ActionBar';

describe('ActionBar', () => {
  it('shows the validate button when not validated', () => {
    render(
      <ActionBar
        validated={false}
        selected="a"
        validateLabel="Check"
        nextLabel="Continue"
        onValidate={() => {}}
        onContinue={() => {}}
      />,
    );
    expect(screen.getByText('Check')).toBeInTheDocument();
    expect(screen.queryByText('Continue')).toBeNull();
  });

  it('disables the validate button when nothing is selected', () => {
    render(
      <ActionBar
        validated={false}
        selected={null}
        validateLabel="Check"
        nextLabel="Continue"
        onValidate={() => {}}
        onContinue={() => {}}
      />,
    );
    expect(screen.getByText('Check')).toBeDisabled();
  });

  it('calls onValidate when the validate button is clicked', () => {
    const onValidate = vi.fn();
    render(
      <ActionBar
        validated={false}
        selected="a"
        validateLabel="Check"
        nextLabel="Continue"
        onValidate={onValidate}
        onContinue={() => {}}
      />,
    );
    fireEvent.click(screen.getByText('Check'));
    expect(onValidate).toHaveBeenCalledTimes(1);
  });

  it('shows the continue button when validated', () => {
    render(
      <ActionBar
        validated
        selected="a"
        validateLabel="Check"
        nextLabel="Continue"
        onValidate={() => {}}
        onContinue={() => {}}
      />,
    );
    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(screen.queryByText('Check')).toBeNull();
  });

  it('calls onContinue when the continue button is clicked', () => {
    const onContinue = vi.fn();
    render(
      <ActionBar
        validated
        selected="a"
        validateLabel="Check"
        nextLabel="Continue"
        onValidate={() => {}}
        onContinue={onContinue}
      />,
    );
    fireEvent.click(screen.getByText('Continue'));
    expect(onContinue).toHaveBeenCalledTimes(1);
  });
});
