import type { TargetLangCode, SourceLangCode, LearningPack, TranslationPack } from '@/models';
import { KeyedStore } from './Store';
import type { PacksService } from './PacksService';

export interface PackPair {
  learningPack: LearningPack | undefined;
  translationPack: TranslationPack | undefined;
}

export class PacksStore extends KeyedStore<PackPair> {
  constructor(private readonly service: PacksService) {
    super();
  }

  packPairKey(targetLang: TargetLangCode, sourceLang: SourceLangCode): string {
    return this.service.translationPackKey(targetLang, sourceLang);
  }

  load = (targetLang: TargetLangCode, sourceLang: SourceLangCode): void => {
    const key = this.packPairKey(targetLang, sourceLang);
    this.ensureLoaded(key, () => this.service.loadPackPair(targetLang, sourceLang));
  };

  download = async (
    targetLang: TargetLangCode,
    sourceLang: SourceLangCode,
    learningVersion: string,
    onProgress: (pct: number) => void,
  ): Promise<void> => {
    await this.service.downloadLearningPack(targetLang, learningVersion, onProgress);
    const pair = await this.service.loadPackPair(targetLang, sourceLang);
    this.setValue(this.packPairKey(targetLang, sourceLang), pair);
  };

  ensureTranslationPack = async (
    targetLang: TargetLangCode,
    sourceLang: SourceLangCode,
    expectedVersion: string,
  ): Promise<void> => {
    const translationPack = await this.service.ensureTranslationPack(targetLang, sourceLang, expectedVersion);
    const key = this.packPairKey(targetLang, sourceLang);
    const current = this.getSnapshot(key);
    const learningPack = current.status === 'loaded' ? current.value?.learningPack : undefined;
    this.setValue(key, { learningPack, translationPack });
  };
}
