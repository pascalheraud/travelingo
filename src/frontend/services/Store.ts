export abstract class Store<T> {
  private value: T;
  private readonly listeners = new Set<() => void>();

  constructor(initial: T) {
    this.value = initial;
  }

  protected setValue(next: T): void {
    this.value = next;
    this.listeners.forEach((listener) => listener());
  }

  getSnapshot = (): T => this.value;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

/** Explicit load state for a `KeyedStore` entry — avoids overloading `undefined` to mean both "still loading" and "loaded, no data". */
export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'loaded'; value: T };

/**
 * Shared reference for the "loading" state. `useSyncExternalStore` requires `getSnapshot`
 * to return a stable reference when nothing changed — a fresh `{ status: 'loading' }` literal
 * on every call would make React think the store mutates on every render and loop forever.
 */
const LOADING_STATE: LoadState<never> = { status: 'loading' };

/**
 * Base store for entities keyed by an id (e.g. `${targetLang}:${lessonId}`)
 * and fetched asynchronously (IndexedDB). Entries start in `loading` state until
 * `ensureLoaded` resolves, then every subscriber is notified.
 */
export abstract class KeyedStore<T> {
  private values: Record<string, LoadState<T>> = {};
  private pending = new Map<string, Promise<void>>();
  private readonly listeners = new Set<() => void>();

  protected setValue(key: string, next: T | undefined): void {
    const state: LoadState<T> = next === undefined ? { status: 'empty' } : { status: 'loaded', value: next };
    this.values = { ...this.values, [key]: state };
    this.listeners.forEach((listener) => listener());
  }

  getSnapshot = (key: string): LoadState<T> => this.values[key] ?? LOADING_STATE;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  protected ensureLoaded(key: string, loader: () => Promise<T | undefined>): void {
    if (key in this.values || this.pending.has(key)) return;
    const promise = loader().then((value) => {
      this.setValue(key, value);
      this.pending.delete(key);
    });
    this.pending.set(key, promise);
  }
}
