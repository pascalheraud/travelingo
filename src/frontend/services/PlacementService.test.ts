import { describe, it, expect } from 'vitest';
import { PlacementService } from './PlacementService';
import type { LearningPack, PlacementResult } from '@/models';
import type { IdbService } from './IdbService';

const makePack = (phraseCount = 5): LearningPack => ({
  uuid:       'pack-uuid',
  targetLang: 'en',
  version:    'v1',
  createdAt:  '2026-01-01T00:00:00Z',
  lessons: [
    {
      id:     'l01',
      emoji:  '🇬🇧',
      phrases: Array.from({ length: phraseCount }, (_, i) => ({
        id:     `p${String(i + 1).padStart(3, '0')}`,
        target: `Phrase ${i + 1}`,
        audio:  `p01_${String(i + 1).padStart(3, '0')}_v1.mp3`,
      })),
    },
  ],
});

const makeResult = (overrides: Partial<PlacementResult> = {}): PlacementResult => ({
  attempts:        1,
  lastScore:       5,
  lastTotal:       10,
  passed:          false,
  lastTestedAt:    '2026-01-01T00:00:00Z',
  nextAllowedAt:   null,
  failedPhraseIds: [],
  ...overrides,
});

// `idb` is never touched by the methods under test here.
const service = new PlacementService(undefined as unknown as IdbService);

describe('drawPlacementQuestions', () => {
  it('returns an empty array for an unknown lesson id', () => {
    expect(service.drawPlacementQuestions(makePack(), 'l02')).toHaveLength(0);
  });

  it('caps the number of questions at the lesson phrase count', () => {
    expect(service.drawPlacementQuestions(makePack(5), 'l01', 10)).toHaveLength(5);
  });

  it('returns exactly n questions when the lesson has enough phrases', () => {
    expect(service.drawPlacementQuestions(makePack(20), 'l01', 10)).toHaveLength(10);
  });
});

describe('isPassingScore', () => {
  it('passes at the 8/10 threshold', () => {
    expect(service.isPassingScore(8)).toBe(true);
  });

  it('fails just below the threshold', () => {
    expect(service.isPassingScore(7)).toBe(false);
  });
});

describe('hasAttemptsLeft', () => {
  it('allows attempts below the max (3)', () => {
    expect(service.hasAttemptsLeft(2)).toBe(true);
  });

  it('blocks once the max is reached', () => {
    expect(service.hasAttemptsLeft(3)).toBe(false);
  });
});

describe('isPlacementOnCooldown', () => {
  it('is never on cooldown when passed', () => {
    const result = makeResult({ passed: true, nextAllowedAt: new Date(Date.now() + 1000 * 3600).toISOString() });
    expect(service.isPlacementOnCooldown(result)).toBe(false);
  });

  it('is on cooldown when nextAllowedAt is in the future', () => {
    const result = makeResult({ nextAllowedAt: new Date(Date.now() + 1000 * 3600).toISOString() });
    expect(service.isPlacementOnCooldown(result)).toBe(true);
  });

  it('is not on cooldown when nextAllowedAt is in the past', () => {
    const result = makeResult({ nextAllowedAt: new Date(Date.now() - 1000 * 3600).toISOString() });
    expect(service.isPlacementOnCooldown(result)).toBe(false);
  });

  it('is not on cooldown when nextAllowedAt is null', () => {
    const result = makeResult({ nextAllowedAt: null });
    expect(service.isPlacementOnCooldown(result)).toBe(false);
  });
});

describe('buildPlacementResult', () => {
  it('sets nextAllowedAt to null when passed', () => {
    const result = service.buildPlacementResult(1, 9, 10, [], true);
    expect(result.nextAllowedAt).toBeNull();
  });

  it('sets nextAllowedAt 24h in the future when failed', () => {
    const before = Date.now();
    const result = service.buildPlacementResult(1, 5, 10, ['p001'], false);
    const next = new Date(result.nextAllowedAt!).getTime();
    expect(next).toBeGreaterThan(before + 23 * 3600 * 1000);
    expect(next).toBeLessThan(before + 25 * 3600 * 1000);
  });

  it('carries through score, total and failed phrase ids', () => {
    const result = service.buildPlacementResult(2, 6, 10, ['p001', 'p002'], false);
    expect(result.attempts).toBe(2);
    expect(result.lastScore).toBe(6);
    expect(result.lastTotal).toBe(10);
    expect(result.failedPhraseIds).toEqual(['p001', 'p002']);
  });
});
