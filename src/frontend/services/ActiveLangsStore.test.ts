import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ActiveLangsStore } from './ActiveLangsStore';
import { ActiveLangsService } from './ActiveLangsService';
import { IdbService } from './IdbService';
import { IDB_STORES } from '@/models';

// One shared connection for the whole file — see IdbService.test.ts for why
// `deleteDatabase` can't be used to reset state between tests here.
const idb = new IdbService();

beforeEach(async () => {
  await idb.clearAll();
  localStorage.clear();
});

const makeStore = (): ActiveLangsStore => new ActiveLangsStore(new ActiveLangsService(), idb);

describe('initial state', () => {
  it('loads its initial snapshot from ActiveLangsService', () => {
    localStorage.setItem('activeLangs', JSON.stringify(['en']));
    expect(makeStore().getSnapshot()).toEqual(['en']);
  });
});

describe('add', () => {
  it('adds a language and notifies subscribers', () => {
    const store = makeStore();
    const listener = vi.fn();
    store.subscribe(listener);
    store.add('es');
    expect(store.getSnapshot()).toEqual(['es']);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('remove', () => {
  it('removes the language from the snapshot', () => {
    const store = makeStore();
    store.add('en');
    store.add('es');
    store.remove('en');
    expect(store.getSnapshot()).toEqual(['es']);
  });

  it('purges every prefixed IDB store for that target language', async () => {
    const store = makeStore();
    store.add('en');
    await idb.set(IDB_STORES.LEARNING_PACKS, 'en', { fake: 'pack' });
    await idb.set(IDB_STORES.TRANSLATION_PACKS, 'en:fr', { fake: 'pack' });
    await idb.set(IDB_STORES.AUDIO, 'en:l01:p001', new ArrayBuffer(1));
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', { fake: 'progress' });
    await idb.set(IDB_STORES.PLACEMENT, 'en:l01', { fake: 'placement' });

    store.remove('en');
    await vi.waitFor(async () => {
      expect(await idb.get(IDB_STORES.LEARNING_PACKS, 'en')).toBeUndefined();
    });

    expect(await idb.get(IDB_STORES.TRANSLATION_PACKS, 'en:fr')).toBeUndefined();
    expect(await idb.get(IDB_STORES.AUDIO, 'en:l01:p001')).toBeUndefined();
    expect(await idb.get(IDB_STORES.PROGRESS, 'en:l01')).toBeUndefined();
    expect(await idb.get(IDB_STORES.PLACEMENT, 'en:l01')).toBeUndefined();
  });

  it('does not purge data belonging to a different target language', async () => {
    const store = makeStore();
    store.add('en');
    store.add('es');
    await idb.set(IDB_STORES.PROGRESS, 'es:l01', { fake: 'progress' });

    store.remove('en');
    await vi.waitFor(() => {
      expect(store.getSnapshot()).toEqual(['es']);
    });

    expect(await idb.get(IDB_STORES.PROGRESS, 'es:l01')).toEqual({ fake: 'progress' });
  });
});
