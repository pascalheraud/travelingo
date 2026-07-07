import { describe, it, expect, beforeEach } from 'vitest';
import { ActiveLangsService } from './ActiveLangsService';

const service = new ActiveLangsService();

beforeEach(() => {
  localStorage.clear();
});

describe('load', () => {
  it('returns an empty array when nothing is stored', () => {
    expect(service.load()).toEqual([]);
  });

  it('returns the stored languages', () => {
    localStorage.setItem('activeLangs', JSON.stringify(['en', 'es']));
    expect(service.load()).toEqual(['en', 'es']);
  });

  it('falls back to an empty array on corrupt JSON', () => {
    localStorage.setItem('activeLangs', '{not json');
    expect(service.load()).toEqual([]);
  });
});

describe('add', () => {
  it('appends a new language and persists it', () => {
    const next = service.add(['en'], 'es');
    expect(next).toEqual(['en', 'es']);
    expect(service.load()).toEqual(['en', 'es']);
  });

  it('is a no-op when the language is already active', () => {
    const next = service.add(['en', 'es'], 'en');
    expect(next).toEqual(['en', 'es']);
  });
});

describe('remove', () => {
  it('removes the language and persists the change', () => {
    const next = service.remove(['en', 'es'], 'en');
    expect(next).toEqual(['es']);
    expect(service.load()).toEqual(['es']);
  });

  it('is a no-op when the language is not present', () => {
    const next = service.remove(['en'], 'es');
    expect(next).toEqual(['en']);
  });
});
