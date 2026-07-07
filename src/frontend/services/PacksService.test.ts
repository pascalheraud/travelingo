import { describe, it, expect } from 'vitest';
import { PacksService } from './PacksService';
import type { LearningPack, TranslationPack, LessonProgress } from '@/models';
import type { IdbService } from './IdbService';

const learningPack: LearningPack = {
  uuid:       'learning-uuid',
  targetLang: 'en',
  version:    'v1',
  createdAt:  '2026-01-01T00:00:00Z',
  lessons: [
    {
      id:     'l01',
      emoji:  '🇬🇧',
      phrases: [
        { id: 'p001', target: 'Hello', audio: 'p01_001_v1.mp3' },
        { id: 'p002', target: 'Goodbye', audio: 'p01_002_v1.mp3' },
      ],
    },
  ],
};

const translationPack: TranslationPack = {
  uuid:            'translation-uuid',
  learningPackRef: 'learning-uuid',
  targetLang:      'en',
  sourceLang:      'fr',
  version:         'v1',
  createdAt:       '2026-01-01T00:00:00Z',
  lessons: [
    {
      id:       'l01',
      title:    'Salutations',
      subtitle: 'Dire bonjour et au revoir',
      phrases: [
        { id: 'p001', source: 'Bonjour', phonetic: 'eh-loh', grammar: '', complements: [] },
        { id: 'p002', source: 'Au revoir', phonetic: 'good-bye', grammar: '', complements: [] },
      ],
    },
  ],
};

// `idb` is never touched by the methods under test here.
const service = new PacksService(undefined as unknown as IdbService);

describe('buildLessonSummaries', () => {
  it('maps lesson title/subtitle from the translation pack', () => {
    const [summary] = service.buildLessonSummaries(learningPack, translationPack, {});
    expect(summary.title).toBe('Salutations');
    expect(summary.subtitle).toBe('Dire bonjour et au revoir');
  });

  it('counts donePhrases from the progress map', () => {
    const progress: LessonProgress = { scores: {}, doneIds: ['p001'], mode: 'text', savedAt: '2026-01-01T00:00:00Z' };
    const [summary] = service.buildLessonSummaries(learningPack, translationPack, { l01: progress });
    expect(summary.donePhrases).toBe(1);
    expect(summary.totalPhrases).toBe(2);
  });

  it('defaults donePhrases to 0 when there is no progress for the lesson', () => {
    const [summary] = service.buildLessonSummaries(learningPack, translationPack, {});
    expect(summary.donePhrases).toBe(0);
  });

  it('throws when the translation pack is missing a lesson present in the learning pack', () => {
    const incompleteTranslation: TranslationPack = { ...translationPack, lessons: [] };
    expect(() => service.buildLessonSummaries(learningPack, incompleteTranslation, {})).toThrow();
  });
});

describe('formatSize', () => {
  it('formats bytes under 1KB as B', () => {
    expect(service.formatSize(512)).toBe('512 B');
  });

  it('formats bytes under 1MB as KB', () => {
    expect(service.formatSize(850 * 1024)).toBe('850 KB');
  });

  it('formats bytes at or over 1MB as MB with one decimal', () => {
    expect(service.formatSize(2.3 * 1024 * 1024)).toBe('2.3 MB');
  });
});
