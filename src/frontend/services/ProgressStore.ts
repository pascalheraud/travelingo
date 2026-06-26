import type { TargetLangCode, LessonId, LessonProgress } from '@/models';
import { KeyedStore } from './Store';
import type { ProgressService } from './ProgressService';

export class ProgressStore extends KeyedStore<LessonProgress> {
  constructor(private readonly service: ProgressService) {
    super();
  }

  load = (targetLang: TargetLangCode, lessonId: LessonId): void => {
    const key = this.service.progressKey(targetLang, lessonId);
    this.ensureLoaded(key, () => this.service.loadProgress(targetLang, lessonId));
  };

  save = async (targetLang: TargetLangCode, lessonId: LessonId, progress: LessonProgress): Promise<void> => {
    await this.service.saveProgress(targetLang, lessonId, progress);
    this.setValue(this.service.progressKey(targetLang, lessonId), progress);
  };

  reset = async (targetLang: TargetLangCode, lessonId: LessonId): Promise<void> => {
    await this.service.resetProgress(targetLang, lessonId);
    this.setValue(this.service.progressKey(targetLang, lessonId), undefined);
  };
}
