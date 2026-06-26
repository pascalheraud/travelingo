import type { TargetLangCode, LessonId, PhraseId } from '@/models';
import { IDB_STORES } from '@/models';
import type { IdbService } from './IdbService';

export class AudioService {
  private audioCtx: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private playToken = 0;

  constructor(private readonly idb: IdbService) {}

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) this.audioCtx = new AudioContext();
    return this.audioCtx;
  }

  stopAudio(): void {
    this.playToken += 1;
    if (!this.currentSource) return;
    this.currentSource.onended = null;
    this.currentSource.stop();
    this.currentSource = null;
  }

  async playAudio(buffer: ArrayBuffer): Promise<void> {
    this.stopAudio();
    const token = this.playToken;
    const ctx = this.getAudioContext();
    const decoded = await ctx.decodeAudioData(buffer.slice(0));
    if (token !== this.playToken) return;
    const source = ctx.createBufferSource();
    source.buffer = decoded;
    source.connect(ctx.destination);
    this.currentSource = source;
    source.start();
    return new Promise((resolve) => {
      source.onended = () => {
        if (this.currentSource === source) this.currentSource = null;
        resolve();
      };
    });
  }

  async loadAudio(targetLang: TargetLangCode, lessonId: LessonId, phraseId: PhraseId): Promise<ArrayBuffer | undefined> {
    const key = `${targetLang}:${lessonId}:${phraseId}`;
    return this.idb.get<ArrayBuffer>(IDB_STORES.AUDIO, key);
  }

  async playPhraseAudio(targetLang: TargetLangCode, lessonId: LessonId, phraseId: PhraseId): Promise<boolean> {
    const buffer = await this.loadAudio(targetLang, lessonId, phraseId);
    if (!buffer) return false;
    await this.playAudio(buffer);
    return true;
  }
}
