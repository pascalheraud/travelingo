import { describe, it, expect, vi } from 'vitest';
import { Store, KeyedStore } from './Store';

class CounterStore extends Store<number> {
  increment(): void {
    this.setValue(this.getSnapshot() + 1);
  }
}

class TestKeyedStore extends KeyedStore<string> {
  load(key: string, loader: () => Promise<string | undefined>): void {
    this.ensureLoaded(key, loader);
  }
}

describe('Store', () => {
  it('returns the initial value before any update', () => {
    const store = new CounterStore(0);
    expect(store.getSnapshot()).toBe(0);
  });

  it('updates the snapshot after setValue', () => {
    const store = new CounterStore(0);
    store.increment();
    expect(store.getSnapshot()).toBe(1);
  });

  it('notifies subscribers on update', () => {
    const store = new CounterStore(0);
    const listener = vi.fn();
    store.subscribe(listener);
    store.increment();
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('stops notifying a listener after it unsubscribes', () => {
    const store = new CounterStore(0);
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.increment();
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('KeyedStore', () => {
  it('returns the loading state for a key that was never requested', () => {
    const store = new TestKeyedStore();
    expect(store.getSnapshot('en:l01')).toEqual({ status: 'loading' });
  });

  it('returns a stable reference for the loading state across calls (no new key triggered)', () => {
    const store = new TestKeyedStore();
    expect(store.getSnapshot('en:l01')).toBe(store.getSnapshot('en:l01'));
  });

  it('transitions to loaded once the loader resolves', async () => {
    const store = new TestKeyedStore();
    store.load('en:l01', () => Promise.resolve('value'));
    await vi.waitFor(() => {
      expect(store.getSnapshot('en:l01')).toEqual({ status: 'loaded', value: 'value' });
    });
  });

  it('transitions to empty when the loader resolves with undefined', async () => {
    const store = new TestKeyedStore();
    store.load('en:l01', () => Promise.resolve(undefined));
    await vi.waitFor(() => {
      expect(store.getSnapshot('en:l01')).toEqual({ status: 'empty' });
    });
  });

  it('does not call the loader again for a key already loading or loaded', async () => {
    const store = new TestKeyedStore();
    const loader = vi.fn(() => Promise.resolve('value'));
    store.load('en:l01', loader);
    store.load('en:l01', loader);
    await vi.waitFor(() => {
      expect(store.getSnapshot('en:l01')).toEqual({ status: 'loaded', value: 'value' });
    });
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('keeps different keys independent', async () => {
    const store = new TestKeyedStore();
    store.load('en:l01', () => Promise.resolve('en-value'));
    store.load('es:l01', () => Promise.resolve('es-value'));
    await vi.waitFor(() => {
      expect(store.getSnapshot('en:l01')).toEqual({ status: 'loaded', value: 'en-value' });
      expect(store.getSnapshot('es:l01')).toEqual({ status: 'loaded', value: 'es-value' });
    });
  });

  it('notifies subscribers once a key finishes loading', async () => {
    const store = new TestKeyedStore();
    const listener = vi.fn();
    store.subscribe(listener);
    store.load('en:l01', () => Promise.resolve('value'));
    await vi.waitFor(() => {
      expect(listener).toHaveBeenCalled();
    });
  });
});
