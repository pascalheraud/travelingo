import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProgressStore } from './ProgressStore';
import { ProgressService } from './ProgressService';
import { IdbService } from './IdbService';
import { IDB_STORES, type LessonProgress } from '@/models';

// One shared connection for the whole file — see IdbService.test.ts for why
// `deleteDatabase` can't be used to reset state between tests here.
const idb = new IdbService();

beforeEach(async () => {
  await idb.clearAll();
});

const makeStore = (): ProgressStore => new ProgressStore(new ProgressService(idb));

const progress: LessonProgress = {
  scores:  { p001: 2 },
  doneIds: [],
  mode:    'text',
  savedAt: '2026-01-01T00:00:00Z',
};

describe('load', () => {
  it('starts in loading state, then resolves to empty when nothing was saved', async () => {
    const store = makeStore();
    store.load('en', 'l01');
    expect(store.getSnapshot('en:l01')).toEqual({ status: 'loading' });
    await vi.waitFor(() => {
      expect(store.getSnapshot('en:l01')).toEqual({ status: 'empty' });
    });
  });

  it('resolves to loaded when progress was previously saved via the service', async () => {
    await idb.set(IDB_STORES.PROGRESS, 'en:l01', progress);
    const store = makeStore();
    store.load('en', 'l01');
    await vi.waitFor(() => {
      expect(store.getSnapshot('en:l01')).toEqual({ status: 'loaded', value: progress });
    });
  });
});

describe('save', () => {
  it('updates the snapshot immediately and persists through the service', async () => {
    const store = makeStore();
    await store.save('en', 'l01', progress);
    expect(store.getSnapshot('en:l01')).toEqual({ status: 'loaded', value: progress });

    // Persisted via a second store instance sharing the same IdbService.
    const otherStore = makeStore();
    otherStore.load('en', 'l01');
    await vi.waitFor(() => {
      expect(otherStore.getSnapshot('en:l01')).toEqual({ status: 'loaded', value: progress });
    });
  });
});

describe('reset', () => {
  it('clears the snapshot to empty and removes the persisted value', async () => {
    const store = makeStore();
    await store.save('en', 'l01', progress);
    await store.reset('en', 'l01');
    expect(store.getSnapshot('en:l01')).toEqual({ status: 'empty' });

    const otherStore = makeStore();
    otherStore.load('en', 'l01');
    await vi.waitFor(() => {
      expect(otherStore.getSnapshot('en:l01')).toEqual({ status: 'empty' });
    });
  });
});
