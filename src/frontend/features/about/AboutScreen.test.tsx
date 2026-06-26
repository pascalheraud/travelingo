import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutScreen } from './AboutScreen';
import type { I18nService } from '@services';
import type { AppStrings } from '@/models';

function makeI18nService(): I18nService {
  return {
    getStrings: () => ({
      about: 'About',
      privacy: 'Privacy policy',
      contact: 'Contact',
      rate: 'Rate the app',
      contributeTitle: 'Join the project',
      contributeIntro: 'Travelingo is a community project',
      validateLang: 'Validate translations',
      recordVoice: 'Record audio',
      proposeLesson: 'Propose a lesson',
      reportCorrection: 'Report an error',
      contributeCode: 'Contribute code',
      proposeLang: 'Propose a language',
      version: 'Version',
    } as AppStrings),
  } as I18nService;
}

describe('AboutScreen', () => {
  it('renders the heading and external link buttons', () => {
    render(
      <MemoryRouter>
        <AboutScreen i18nService={makeI18nService()} />
      </MemoryRouter>,
    );
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Privacy policy')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Rate the app')).toBeInTheDocument();
  });

  it('renders the version badge from the manifest', () => {
    render(
      <MemoryRouter>
        <AboutScreen i18nService={makeI18nService()} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Version a1')).toBeInTheDocument();
  });

  it('does not throw when the back button is clicked', () => {
    render(
      <MemoryRouter>
        <AboutScreen i18nService={makeI18nService()} />
      </MemoryRouter>,
    );
    expect(() => fireEvent.click(screen.getByRole('button', { name: '← Retour' }))).not.toThrow();
  });
});
