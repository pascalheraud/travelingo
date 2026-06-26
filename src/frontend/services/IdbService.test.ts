import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { IdbService } from './IdbService';
import { IDB_STORES } from '@/models';

// One shared connection for the whole file: fake-indexeddb hangs on
// `deleteDatabase` while a prior connection is still open (never closed by
// IdbService), so tests reset state via `clearAll()` instead of recreating the DB.
const idb = new IdbService();

beforeEach(async () => {
  await idb.clearAll();
});

describe('get/set', () => {
  it('returns undefined for a key that was never set', async () => {
    expect(await idb.get(IDB_STORES.PROGRESS, 'en:l01')).toBeUndefined();
  });

  it('returns the value previously set for that key', async () => {
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', { doneIds: ['p001'] });
    expect(await idb.get(IDB_STORES.PROGRESS, 'en:l01')).toEqual({ doneIds: ['p001'] });
  });

  it('overwrites the previous value on a second set', async () => {
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', { doneIds: ['p001'] });
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', { doneIds: ['p001', 'p002'] });
    expect(await idb.get(IDB_STORES.PROGRESS, 'en:l01')).toEqual({ doneIds: ['p001', 'p002'] });
  });

  it('keeps different stores independent for the same key', async () => {
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', 'progress-value');
    await idb.set(IDB_STORES.PLACEMENT, 'en:l01', 'placement-value');
    expect(await idb.get(IDB_STORES.PROGRESS, 'en:l01')).toBe('progress-value');
    expect(await idb.get(IDB_STORES.PLACEMENT, 'en:l01')).toBe('placement-value');
  });
});

describe('del', () => {
  it('removes the value so a subsequent get returns undefined', async () => {
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', 'value');
    await idb.del(IDB_STORES.PROGRESS, 'en:l01');
    expect(await idb.get(IDB_STORES.PROGRESS, 'en:l01')).toBeUndefined();
  });
});

describe('keys', () => {
  it('lists every key stored in a given store', async () => {
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', 'a');
    await idb.set(IDB_STORES.PROGRESS, 'en:l02', 'b');
    expect((await idb.keys(IDB_STORES.PROGRESS)).sort()).toEqual(['en:l01', 'en:l02']);
  });
});

describe('purgeByPrefix', () => {
  it('deletes only the keys starting with the given prefix', async () => {
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', 'a');
    await idb.set(IDB_STORES.PROGRESS, 'en:l02', 'b');
    await idb.set(IDB_STORES.PROGRESS, 'es:l01', 'c');
    await idb.purgeByPrefix(IDB_STORES.PROGRESS, 'en:');
    expect((await idb.keys(IDB_STORES.PROGRESS)).sort()).toEqual(['es:l01']);
  });
});

describe('clear', () => {
  it('empties a single store without affecting others', async () => {
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', 'a');
    await idb.set(IDB_STORES.PLACEMENT, 'en:l01', 'b');
    await idb.clear(IDB_STORES.PROGRESS);
    expect(await idb.keys(IDB_STORES.PROGRESS)).toEqual([]);
    expect(await idb.get(IDB_STORES.PLACEMENT, 'en:l01')).toBe('b');
  });
});

describe('clearAll', () => {
  it('empties every store', async () => {
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', 'a');
    await idb.set(IDB_STORES.PLACEMENT, 'en:l01', 'b');
    await idb.clearAll();
    expect(await idb.keys(IDB_STORES.PROGRESS)).toEqual([]);
    expect(await idb.keys(IDB_STORES.PLACEMENT)).toEqual([]);
  });
});
