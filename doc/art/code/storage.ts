// ── Storage service ───────────────────────────────────────────
//
// Abstracts all read/write operations behind a single interface.
// Uses localStorage as primary store with an in-memory fallback
// for environments where localStorage is unavailable (sandboxes,
// private browsing with strict settings, SSR).

// ── In-memory fallback ────────────────────────────────────────

const mem: Record<string, string> = {};

// ── Low-level primitives ──────────────────────────────────────

function rawGet(key: string): string | null {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) return value;
  } catch {
    // localStorage unavailable
  }
  return mem[key] ?? null;
}

function rawSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage unavailable or quota exceeded
  }
  mem[key] = value;
}

function rawDelete(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // localStorage unavailable
  }
  delete mem[key];
}

function rawKeys(): string[] {
  try {
    return Object.keys(localStorage);
  } catch {
    return Object.keys(mem);
  }
}

// ── Typed CRUD ────────────────────────────────────────────────

/**
 * Read a value from storage and parse it as T.
 * Returns null if the key does not exist or parsing fails.
 */
export function storageGet<T>(key: string): T | null {
  const raw = rawGet(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Write a value to storage by serializing it as JSON.
 */
export function storageSet<T>(key: string, value: T): void {
  rawSet(key, JSON.stringify(value));
}

/**
 * Delete a key from storage.
 */
export function storageDelete(key: string): void {
  rawDelete(key);
}

/**
 * Check whether a key exists in storage.
 */
export function storageHas(key: string): boolean {
  return rawGet(key) !== null;
}

/**
 * Return all keys matching a given prefix.
 */
export function storageKeysByPrefix(prefix: string): string[] {
  return rawKeys().filter(k => k.startsWith(prefix));
}

/**
 * Delete all keys matching a given prefix.
 */
export function storageDeleteByPrefix(prefix: string): void {
  storageKeysByPrefix(prefix).forEach(rawDelete);
}

/**
 * Clear everything from storage (use with caution).
 */
export function storageClear(): void {
  try {
    localStorage.clear();
  } catch {
    // localStorage unavailable
  }
  Object.keys(mem).forEach(k => delete mem[k]);
}

// ── Key builders ──────────────────────────────────────────────
//
// Centralised key construction prevents typos and makes
// refactoring easier.

export const StorageKeys = {
  progress:  (targetLang: string, lessonId: string) =>
    `tl:progress:${targetLang}:${lessonId}`,

  placement: (targetLang: string, lessonId: string) =>
    `tl:placement:${targetLang}:${lessonId}`,

  prefs: () =>
    `tl:prefs`,

  activeLangs: () =>
    `tl:active_langs`,

  voiceConsent: () =>
    `tl:voice_consent`,

  packMeta: (uuid: string) =>
    `tl:pack:${uuid}`,
} as const;
