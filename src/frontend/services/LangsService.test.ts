import { describe, it, expect } from 'vitest';
import { LangsService } from './LangsService';

const service = new LangsService();

describe('getLangName', () => {
  it('returns the name in the requested user language', () => {
    expect(service.getLangName('en', 'fr')).toBe('Anglais');
  });

  it('falls back to French when the requested user language has no entry', () => {
    expect(service.getLangName('en', 'xx' as never)).toBe('Anglais');
  });

  it('returns the code itself when the language is unknown', () => {
    expect(service.getLangName('zz' as never, 'fr')).toBe('zz');
  });

  it('resolves both target and source language codes', () => {
    expect(service.getLangName('es', 'en')).toBe('Spanish');
    expect(service.getLangName('pt', 'en')).toBe('Portuguese');
  });
});

describe('getLangAutonym', () => {
  it('returns the language\'s name in itself', () => {
    expect(service.getLangAutonym('de')).toBe('Deutsch');
  });

  it('returns the code itself when the language is unknown', () => {
    expect(service.getLangAutonym('zz' as never)).toBe('zz');
  });
});

describe('listTargetLanguages', () => {
  it('excludes the user\'s own source language', () => {
    expect(service.listTargetLanguages('en')).not.toContain('en');
  });

  it('only lists available target languages', () => {
    const langs = service.listTargetLanguages('fr');
    expect(langs).toEqual(['en', 'es', 'it', 'de', 'ro']);
  });
});

describe('listSourceLanguages', () => {
  it('lists every available source language', () => {
    expect(service.listSourceLanguages()).toEqual(['fr', 'en', 'es', 'de', 'it', 'ro', 'pt']);
  });
});

describe('listActiveLanguages', () => {
  it('filters target languages down to the active ones, preserving target-language order', () => {
    expect(service.listActiveLanguages(['de', 'en'], 'fr')).toEqual(['en', 'de']);
  });

  it('excludes active codes that are not valid target languages for that user lang', () => {
    expect(service.listActiveLanguages(['en', 'fr' as never], 'en')).toEqual([]);
  });

  it('returns an empty array when nothing is active', () => {
    expect(service.listActiveLanguages([], 'fr')).toEqual([]);
  });
});
