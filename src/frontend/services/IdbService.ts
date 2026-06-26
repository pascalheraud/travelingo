import { IDB_STORES, type IDBStoreName } from '@/models';

const DB_NAME = 'travelingo';
const DB_VERSION = 2;

export class IdbService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private openDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;
    this.dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        Object.values(IDB_STORES).forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return this.dbPromise;
  }

  async get<T>(store: IDBStoreName, key: string): Promise<T | undefined> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => resolve(req.result as T | undefined);
      req.onerror = () => reject(req.error);
    });
  }

  async set<T>(store: IDBStoreName, key: string, value: T): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async del(store: IDBStoreName, key: string): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async clear(store: IDBStoreName): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async keys(store: IDBStoreName): Promise<string[]> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAllKeys();
      req.onsuccess = () => resolve(req.result as string[]);
      req.onerror = () => reject(req.error);
    });
  }

  /** Deletes every entry in `store` whose key starts with `prefix` (e.g. `"en:"` to purge all of a target language's entries). */
  async purgeByPrefix(store: IDBStoreName, prefix: string): Promise<void> {
    const keys = await this.keys(store);
    await Promise.all(keys.filter((k) => k.startsWith(prefix)).map((k) => this.del(store, k)));
  }

  /** Clears every object store in the database. */
  async clearAll(): Promise<void> {
    await Promise.all(Object.values(IDB_STORES).map((store) => this.clear(store)));
  }
}
