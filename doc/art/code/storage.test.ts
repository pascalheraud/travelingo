import { describe, it, expect, beforeEach } from 'vitest';
import {
  storageGet,
  storageSet,
  storageDelete,
  storageHas,
  storageKeysByPrefix,
  storageDeleteByPrefix,
  storageClear,
  StorageKeys,
} from './storage';

// ── Setup ─────────────────────────────────────────────────────

beforeEach(() => {
  storageClear();
});

// ── storageSet / storageGet ───────────────────────────────────

describe('storageSet / storageGet', () => {
  it('stores and retrieves a string', () => {
    storageSet('key', 'hello');
    expect(storageGet<string>('key')).toBe('hello');
  });

  it('stores and retrieves a number', () => {
    storageSet('key', 42);
    expect(storageGet<number>('key')).toBe(42);
  });

  it('stores and retrieves an object', () => {
    const obj = { a: 1, b: 'two', c: [3, 4] };
    storageSet('key', obj);
    expect(storageGet<typeof obj>('key')).toEqual(obj);
  });

  it('stores and retrieves an array', () => {
    storageSet('key', ['fr', 'en', 'ro']);
    expect(storageGet<string[]>('key')).toEqual(['fr', 'en', 'ro']);
  });

  it('returns null for a missing key', () => {
    expect(storageGet('missing')).toBeNull();
  });

  it('overwrites an existing value', () => {
    storageSet('key', 'first');
    storageSet('key', 'second');
    expect(storageGet<string>('key')).toBe('second');
  });
});

// ── storageDelete ─────────────────────────────────────────────

describe('storageDelete', () => {
  it('removes an existing key', () => {
    storageSet('key', 'value');
    storageDelete('key');
    expect(storageGet('key')).toBeNull();
  });

  it('does not throw when deleting a missing key', () => {
    expect(() => storageDelete('missing')).not.toThrow();
  });
});

// ── storageHas ────────────────────────────────────────────────

describe('storageHas', () => {
  it('returns true for an existing key', () => {
    storageSet('key', 'value');
    expect(storageHas('key')).toBe(true);
  });

  it('returns false for a missing key', () => {
    expect(storageHas('missing')).toBe(false);
  });

  it('returns false after deleting a key', () => {
    storageSet('key', 'value');
    storageDelete('key');
    expect(storageHas('key')).toBe(false);
  });
});

// ── storageKeysByPrefix ───────────────────────────────────────

describe('storageKeysByPrefix', () => {
  it('returns all matching keys', () => {
    storageSet('tl:progress:en:l01', {});
    storageSet('tl:progress:en:l02', {});
    storageSet('tl:prefs', {});

    const keys = storageKeysByPrefix('tl:progress:');
    expect(keys).toHaveLength(2);
    expect(keys).toContain('tl:progress:en:l01');
    expect(keys).toContain('tl:progress:en:l02');
  });

  it('returns an empty array when no key matches', () => {
    expect(storageKeysByPrefix('no-match:')).toHaveLength(0);
  });
});

// ── storageDeleteByPrefix ─────────────────────────────────────

describe('storageDeleteByPrefix', () => {
  it('deletes all matching keys', () => {
    storageSet('tl:progress:en:l01', {});
    storageSet('tl:progress:en:l02', {});
    storageSet('tl:prefs', 'keep');

    storageDeleteByPrefix('tl:progress:');

    expect(storageHas('tl:progress:en:l01')).toBe(false);
    expect(storageHas('tl:progress:en:l02')).toBe(false);
    expect(storageGet<string>('tl:prefs')).toBe('keep');
  });
});

// ── storageClear ──────────────────────────────────────────────

describe('storageClear', () => {
  it('removes all keys', () => {
    storageSet('a', 1);
    storageSet('b', 2);
    storageClear();
    expect(storageHas('a')).toBe(false);
    expect(storageHas('b')).toBe(false);
  });
});

// ── StorageKeys ───────────────────────────────────────────────

describe('StorageKeys', () => {
  it('progress key is unique per lang+lesson', () => {
    const k1 = StorageKeys.progress('en', 'l01');
    const k2 = StorageKeys.progress('en', 'l02');
    const k3 = StorageKeys.progress('fr', 'l01');
    expect(k1).not.toBe(k2);
    expect(k1).not.toBe(k3);
    expect(k2).not.toBe(k3);
  });

  it('placement key is unique per lang+lesson', () => {
    const k1 = StorageKeys.placement('en', 'l01');
    const k2 = StorageKeys.placement('en', 'l02');
    expect(k1).not.toBe(k2);
  });

  it('all key builders return strings', () => {
    expect(typeof StorageKeys.progress('en', 'l01')).toBe('string');
    expect(typeof StorageKeys.placement('en', 'l01')).toBe('string');
    expect(typeof StorageKeys.prefs()).toBe('string');
    expect(typeof StorageKeys.activeLangs()).toBe('string');
    expect(typeof StorageKeys.voiceConsent()).toBe('string');
    expect(typeof StorageKeys.packMeta('some-uuid')).toBe('string');
  });
});
