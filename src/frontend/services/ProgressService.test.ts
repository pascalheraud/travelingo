import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressService } from './ProgressService';
import { IdbService } from './IdbService';
import type { LessonProgress } from '@/models';

// One shared connection for the whole file — see IdbService.test.ts for why
// `deleteDatabase` can't be used to reset state between tests here.
const idb = new IdbService();
const service = new ProgressService(idb);

beforeEach(async () => {
  await idb.clearAll();
});

const progress: LessonProgress = {
  scores:  { p001: 2 },
  doneIds: [],
  mode:    'text',
  savedAt: '2026-01-01T00:00:00Z',
};

describe('progressKey', () => {
  it('combines targetLang and lessonId', () => {
    expect(service.progressKey('en', 'l01')).toBe('en:l01');
  });
});

describe('loadProgress', () => {
  it('returns undefined when nothing was saved for that lesson', async () => {
    expect(await service.loadProgress('en', 'l01')).toBeUndefined();
  });

  it('returns the progress previously saved for that lesson', async () => {
    await service.saveProgress('en', 'l01', progress);
    expect(await service.loadProgress('en', 'l01')).toEqual(progress);
  });

  it('keeps progress for different lessons independent', async () => {
    await service.saveProgress('en', 'l01', progress);
    expect(await service.loadProgress('en', 'l02')).toBeUndefined();
  });

  it('keeps progress for different target languages independent', async () => {
    await service.saveProgress('en', 'l01', progress);
    expect(await service.loadProgress('es', 'l01')).toBeUndefined();
  });
});

describe('resetProgress', () => {
  it('removes the saved progress for that lesson', async () => {
    await service.saveProgress('en', 'l01', progress);
    await service.resetProgress('en', 'l01');
    expect(await service.loadProgress('en', 'l01')).toBeUndefined();
  });
});
