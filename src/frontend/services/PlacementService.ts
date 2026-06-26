import type { LearningPack, LearningPhrase, PlacementResult, LessonId, TargetLangCode } from '@/models';
import { IDB_STORES } from '@/models';
import type { IdbService } from './IdbService';
import { shuffle } from '@utils/random';

const PLACEMENT_QUESTIONS = 10;
const PLACEMENT_PASS_SCORE = 8;
const PLACEMENT_COOLDOWN_HOURS = 24;
const PLACEMENT_MAX_ATTEMPTS = 3;

export class PlacementService {
  constructor(private readonly idb: IdbService) {}

  drawPlacementQuestions(pack: LearningPack, lessonId: LessonId, n: number = PLACEMENT_QUESTIONS): LearningPhrase[] {
    const lesson = pack.lessons.find((l) => l.id === lessonId);
    if (!lesson) return [];
    return shuffle(lesson.phrases).slice(0, Math.min(n, lesson.phrases.length));
  }

  isPlacementOnCooldown(result: PlacementResult): boolean {
    if (result.passed || !result.nextAllowedAt) return false;
    return new Date(result.nextAllowedAt) > new Date();
  }

  isPassingScore(score: number): boolean {
    return score >= PLACEMENT_PASS_SCORE;
  }

  hasAttemptsLeft(attempts: number): boolean {
    return attempts < PLACEMENT_MAX_ATTEMPTS;
  }

  buildPlacementResult(
    attempts: number,
    score: number,
    total: number,
    failedPhraseIds: string[],
    passed: boolean,
  ): PlacementResult {
    const now = new Date();
    const nextAllowedAt = passed
      ? null
      : new Date(now.getTime() + PLACEMENT_COOLDOWN_HOURS * 3600 * 1000).toISOString();
    return {
      attempts,
      lastScore: score,
      lastTotal: total,
      passed,
      lastTestedAt: now.toISOString(),
      nextAllowedAt,
      failedPhraseIds,
    };
  }

  placementKey(targetLang: TargetLangCode, lessonId: LessonId): string {
    return `${targetLang}:${lessonId}`;
  }

  async loadPlacementResult(targetLang: TargetLangCode, lessonId: LessonId): Promise<PlacementResult | undefined> {
    return this.idb.get<PlacementResult>(IDB_STORES.PLACEMENT, this.placementKey(targetLang, lessonId));
  }

  async savePlacementResult(targetLang: TargetLangCode, lessonId: LessonId, result: PlacementResult): Promise<void> {
    return this.idb.set(IDB_STORES.PLACEMENT, this.placementKey(targetLang, lessonId), result);
  }
}
