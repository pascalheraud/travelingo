import type { TargetLangCode, LessonId, LessonProgress } from '@/models';
import { IDB_STORES } from '@/models';
import type { IdbService } from './IdbService';

export class ProgressService {
  constructor(private readonly idb: IdbService) {}

  progressKey(targetLang: TargetLangCode, lessonId: LessonId): string {
    return `${targetLang}:${lessonId}`;
  }

  async loadProgress(targetLang: TargetLangCode, lessonId: LessonId): Promise<LessonProgress | undefined> {
    return this.idb.get<LessonProgress>(IDB_STORES.PROGRESS, this.progressKey(targetLang, lessonId));
  }

  async saveProgress(targetLang: TargetLangCode, lessonId: LessonId, progress: LessonProgress): Promise<void> {
    return this.idb.set(IDB_STORES.PROGRESS, this.progressKey(targetLang, lessonId), progress);
  }

  async resetProgress(targetLang: TargetLangCode, lessonId: LessonId): Promise<void> {
    return this.idb.del(IDB_STORES.PROGRESS, this.progressKey(targetLang, lessonId));
  }
}
