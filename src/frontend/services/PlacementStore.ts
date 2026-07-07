import type { TargetLangCode, LessonId, PlacementResult } from '@/models';
import { KeyedStore } from './Store';
import type { PlacementService } from './PlacementService';

export class PlacementStore extends KeyedStore<PlacementResult> {
  constructor(private readonly service: PlacementService) {
    super();
  }

  load = (targetLang: TargetLangCode, lessonId: LessonId): void => {
    const key = this.service.placementKey(targetLang, lessonId);
    this.ensureLoaded(key, () => this.service.loadPlacementResult(targetLang, lessonId));
  };

  save = async (targetLang: TargetLangCode, lessonId: LessonId, result: PlacementResult): Promise<void> => {
    await this.service.savePlacementResult(targetLang, lessonId, result);
    this.setValue(this.service.placementKey(targetLang, lessonId), result);
  };
}
