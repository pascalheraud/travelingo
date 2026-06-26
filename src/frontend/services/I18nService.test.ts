import { describe, it, expect } from 'vitest';
import { I18nService } from './I18nService';

const service = new I18nService();

describe('getStrings', () => {
  it('returns strings for a known source language', () => {
    expect(service.getStrings('en').home).toBe('← Home');
  });

  it('falls back to French for an unknown source language', () => {
    expect(service.getStrings('zz' as never)).toEqual(service.getStrings('fr'));
  });

  it('every language has the exact same set of string keys as French', () => {
    const referenceKeys = Object.keys(service.getStrings('fr')).sort();
    for (const lang of ['en', 'es', 'de', 'it', 'pt', 'ro'] as const) {
      expect(Object.keys(service.getStrings(lang)).sort()).toEqual(referenceKeys);
    }
  });

  it('no string value is empty', () => {
    for (const lang of ['fr', 'en', 'es', 'de', 'it', 'pt', 'ro'] as const) {
      const strings = service.getStrings(lang);
      for (const [key, value] of Object.entries(strings)) {
        expect(value, `${lang}.${key}`).not.toBe('');
      }
    }
  });
});
