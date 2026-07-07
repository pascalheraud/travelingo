import { render, screen } from '@testing-library/react';
import { ContributeSection } from './ContributeSection';

describe('ContributeSection', () => {
  it('renders the title, intro and all six contribute cards with default (French) strings', () => {
    render(<ContributeSection />);
    expect(screen.getByText('Participez au projet')).toBeInTheDocument();
    expect(screen.getByText('Travelingo est un projet communautaire')).toBeInTheDocument();
    expect(screen.getByText('Valider des traductions')).toBeInTheDocument();
    expect(screen.getByText('Enregistrer des audios')).toBeInTheDocument();
    expect(screen.getByText('Proposer une leçon')).toBeInTheDocument();
    expect(screen.getByText('Signaler une erreur')).toBeInTheDocument();
    expect(screen.getByText('Contribuer au code')).toBeInTheDocument();
    expect(screen.getByText('Proposer une langue')).toBeInTheDocument();
  });
});
