import type { LearningPack, TranslationPack, AppPack, TargetLangCode, SourceLangCode, LessonId, LessonProgress, LessonSummary, TranslationLessonMeta } from '@/models';
import { IDB_STORES } from '@/models';
import type { IdbService } from './IdbService';

const CDN_BASE = import.meta.env.VITE_CDN_BASE_URL ?? '';

export class PacksService {
  constructor(private readonly idb: IdbService) {}

  learningPackKey(targetLang: TargetLangCode): string {
    return targetLang;
  }

  translationPackKey(targetLang: TargetLangCode, sourceLang: SourceLangCode): string {
    return `${targetLang}:${sourceLang}`;
  }

  appPackKey(sourceLang: SourceLangCode): string {
    return sourceLang;
  }

  newLessonsKey(targetLang: TargetLangCode): string {
    return targetLang;
  }

  async loadNewLessonIds(targetLang: TargetLangCode): Promise<LessonId[]> {
    return (await this.idb.get<LessonId[]>(IDB_STORES.NEW_LESSONS, this.newLessonsKey(targetLang))) ?? [];
  }

  async loadLearningPack(targetLang: TargetLangCode): Promise<LearningPack | undefined> {
    return this.idb.get<LearningPack>(IDB_STORES.LEARNING_PACKS, this.learningPackKey(targetLang));
  }

  async loadTranslationPack(targetLang: TargetLangCode, sourceLang: SourceLangCode): Promise<TranslationPack | undefined> {
    return this.idb.get<TranslationPack>(IDB_STORES.TRANSLATION_PACKS, this.translationPackKey(targetLang, sourceLang));
  }

  async loadAppPack(sourceLang: SourceLangCode): Promise<AppPack | undefined> {
    return this.idb.get<AppPack>(IDB_STORES.APP_PACKS, this.appPackKey(sourceLang));
  }

  async loadPackPair(
    targetLang: TargetLangCode,
    sourceLang: SourceLangCode,
  ): Promise<{ learningPack: LearningPack | undefined; translationPack: TranslationPack | undefined }> {
    const [learningPack, translationPack] = await Promise.all([
      this.loadLearningPack(targetLang),
      this.loadTranslationPack(targetLang, sourceLang),
    ]);
    return { learningPack, translationPack };
  }

  /** Builds the per-lesson view data (title/subtitle/progress) shown in `LessonList`. */
  buildLessonSummaries(
    learningPack: LearningPack,
    translationPack: TranslationPack,
    progressByLesson: Partial<Record<LessonId, LessonProgress | undefined>>,
    newLessonIds: LessonId[] = [],
  ): LessonSummary[] {
    const newLessonIdSet = new Set(newLessonIds);
    return learningPack.lessons.map((lessonMeta) => {
      const lessonTranslation = this.findLessonTranslation(translationPack, lessonMeta.id);
      const doneIds = new Set(progressByLesson[lessonMeta.id]?.doneIds ?? []);
      const donePhrases = lessonMeta.phrases.filter((p) => doneIds.has(p.id)).length;

      return {
        id:           lessonMeta.id,
        emoji:        lessonMeta.emoji,
        title:        lessonTranslation.title,
        subtitle:     lessonTranslation.subtitle,
        donePhrases,
        totalPhrases: lessonMeta.phrases.length,
        isNew:        newLessonIdSet.has(lessonMeta.id) && donePhrases === 0,
      };
    });
  }

  private findLessonTranslation(translationPack: TranslationPack, lessonId: LessonId): TranslationLessonMeta {
    const lessonTranslation = translationPack.lessons.find((l) => l.id === lessonId);
    if (!lessonTranslation) {
      throw new Error(`Missing translation for lesson ${lessonId}`);
    }
    return lessonTranslation;
  }

  async simulateDownload(onProgress: (pct: number) => void): Promise<void> {
    for (let i = 1; i <= 10; i++) {
      await new Promise((r) => setTimeout(r, 100));
      onProgress(i * 10);
    }
  }

  /**
   * Fetches the learning + translation pack pair from the CDN and persists them
   * to IndexedDB. Reports coarse progress since fetch doesn't expose byte-level
   * progress for these small JSON payloads.
   *
   * Pack JSON is archived per version folder, per `doc/initial-spec.md` §5.2/§5.3:
   * `{CDN}/learning/{targetLang}/v{N}/{targetLang}.json` and
   * `{CDN}/translation/{targetLang}-{sourceLang}/v{N}/{targetLang}-{sourceLang}.json`.
   * `learningVersion`/`translationVersion` select which archived version to fetch
   * (callers read these from the manifest's `LearningPackRef`).
   *
   * Audio is NOT versioned per pack folder — unlike the JSON, re-publishing a pack
   * version never duplicates unchanged MP3s. Recordings live in one flat,
   * un-versioned folder per target language (`{CDN}/learning/{targetLang}/audio/{lessonId}/`),
   * and each individual file's own version is encoded in its filename
   * (`{phrase.audio}`, e.g. `p01_003_v2.mp3`). The pack JSON's `phrases[].audio` field
   * always names the exact current file for that phrase — fixing one phrase's audio
   * adds a new `_v{N+1}.mp3` file and bumps the pack version, but every other
   * phrase's filename (and file) stays untouched.
   * Phrases without a recording yet (most languages/lessons so far) fall back to the
   * shared placeholder file (`{CDN}/audio/placeholder.mp3`).
   */
  /**
   * Downloads the learning pack JSON + all audio files (the heavy part of a pack install).
   * Translation packs are fetched separately and lazily via `ensureTranslationPack`.
   */
  async downloadLearningPack(
    targetLang: TargetLangCode,
    learningVersion: string,
    onProgress: (pct: number) => void,
  ): Promise<void> {
    onProgress(10);
    const previousPack = await this.loadLearningPack(targetLang);

    // Build a map of already-downloaded audio filenames (lessonId:phraseId → audioFile)
    // so the differential download can skip phrases whose audio hasn't changed.
    const previousAudioFiles = new Map<string, string>();
    previousPack?.lessons.forEach((lesson) =>
      lesson.phrases.forEach((phrase) =>
        previousAudioFiles.set(`${lesson.id}:${phrase.id}`, phrase.audio),
      ),
    );

    const learningRes = await fetch(`${CDN_BASE}/learning/${targetLang}/${learningVersion}/${targetLang}.json`);
    const learningPack: LearningPack = await learningRes.json();
    onProgress(40);

    // Only fetch phrases whose audio is new or changed (differential download).
    const phrasesToDownload = learningPack.lessons.flatMap((lesson) =>
      lesson.phrases.filter((phrase) => previousAudioFiles.get(`${lesson.id}:${phrase.id}`) !== phrase.audio)
        .map((phrase) => ({ lesson, phrase })),
    );

    let placeholderBuffer: ArrayBuffer | undefined;
    if (phrasesToDownload.length > 0) {
      placeholderBuffer = await (await fetch(`${CDN_BASE}/audio/placeholder.mp3`)).arrayBuffer();
    }
    onProgress(70);

    await Promise.all([
      this.idb.set(IDB_STORES.LEARNING_PACKS, this.learningPackKey(targetLang), learningPack),
      ...phrasesToDownload.map(async ({ lesson, phrase }) => {
        const audioBuffer = await this.fetchPhraseAudio(targetLang, lesson.id, phrase.audio, placeholderBuffer!);
        await this.idb.set(IDB_STORES.AUDIO, this.audioKey(targetLang, lesson.id, phrase.id), audioBuffer);
      }),
      this.recordNewLessons(targetLang, previousPack, learningPack),
    ]);
    onProgress(100);
  }

  /**
   * Ensures the translation pack for `targetLang`/`sourceLang` is cached in IDB at
   * `expectedVersion`. Fetches from CDN only when missing or outdated — subsequent
   * calls with the same version are instant (IDB read only).
   */
  async ensureTranslationPack(
    targetLang: TargetLangCode,
    sourceLang: SourceLangCode,
    expectedVersion: string,
  ): Promise<TranslationPack> {
    const cached = await this.loadTranslationPack(targetLang, sourceLang);
    if (cached && cached.version === expectedVersion) return cached;

    const res = await fetch(`${CDN_BASE}/translation/${targetLang}-${sourceLang}/${expectedVersion}/${targetLang}-${sourceLang}.json`);
    const translationPack: TranslationPack = await res.json();
    await this.idb.set(IDB_STORES.TRANSLATION_PACKS, this.translationPackKey(targetLang, sourceLang), translationPack);
    return translationPack;
  }

  /**
   * Marks lessons added by this update (present in `nextPack` but not in `previousPack`) as
   * "new" until the user starts them (§5.9). On a first-ever download (`previousPack`
   * undefined), nothing is marked — there's no prior version to diff against.
   */
  private async recordNewLessons(
    targetLang: TargetLangCode,
    previousPack: LearningPack | undefined,
    nextPack: LearningPack,
  ): Promise<void> {
    if (!previousPack) return;
    const previousLessonIds = new Set(previousPack.lessons.map((l) => l.id));
    const newLessonIds = nextPack.lessons.map((l) => l.id).filter((id) => !previousLessonIds.has(id));
    if (newLessonIds.length === 0) return;
    await this.idb.set(IDB_STORES.NEW_LESSONS, this.newLessonsKey(targetLang), newLessonIds);
  }

  private async fetchPhraseAudio(
    targetLang: TargetLangCode,
    lessonId: LessonId,
    audioFile: string,
    placeholderBuffer: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    const res = await fetch(`${CDN_BASE}/learning/${targetLang}/audio/${lessonId}/${audioFile}`);
    return res.ok ? res.arrayBuffer() : placeholderBuffer;
  }

  private audioKey(targetLang: TargetLangCode, lessonId: LessonId, phraseId: string): string {
    return `${targetLang}:${lessonId}:${phraseId}`;
  }

  /** DEV ONLY — removes the last lesson from the stored learning pack and its translation pack, simulating an older pack version to test the update flow. */
  async devRemoveLastLesson(targetLang: TargetLangCode, sourceLang: SourceLangCode): Promise<void> {
    const [learningPack, translationPack] = await Promise.all([
      this.loadLearningPack(targetLang),
      this.loadTranslationPack(targetLang, sourceLang),
    ]);
    if (!learningPack || learningPack.lessons.length === 0) return;
    const trimmed: LearningPack = { ...learningPack, lessons: learningPack.lessons.slice(0, -1) };
    await this.idb.set(IDB_STORES.LEARNING_PACKS, this.learningPackKey(targetLang), trimmed);
    if (translationPack) {
      const trimmedTranslation: TranslationPack = { ...translationPack, lessons: translationPack.lessons.slice(0, -1) };
      await this.idb.set(IDB_STORES.TRANSLATION_PACKS, this.translationPackKey(targetLang, sourceLang), trimmedTranslation);
    }
  }

  /** Lists installed (downloaded) packs for the given target languages, with an estimated on-disk size. Skips languages whose pack pair isn't fully downloaded. */
  async listInstalledPacks(targetLangs: TargetLangCode[], sourceLang: SourceLangCode): Promise<InstalledPackInfo[]> {
    const infos = await Promise.all(targetLangs.map((targetLang) => this.estimateInstalledPack(targetLang, sourceLang)));
    return infos.filter((info): info is InstalledPackInfo => info !== undefined);
  }

  private async estimateInstalledPack(targetLang: TargetLangCode, sourceLang: SourceLangCode): Promise<InstalledPackInfo | undefined> {
    const { learningPack, translationPack } = await this.loadPackPair(targetLang, sourceLang);
    if (!learningPack || !translationPack) return undefined;

    const phrases = learningPack.lessons.flatMap((lesson) => lesson.phrases.map((phrase) => ({ lessonId: lesson.id, phraseId: phrase.id })));
    const audioBuffers = await Promise.all(
      phrases.map(({ lessonId, phraseId }) => this.idb.get<ArrayBuffer>(IDB_STORES.AUDIO, this.audioKey(targetLang, lessonId, phraseId))),
    );
    const audioBytes = audioBuffers.reduce((sum, buf) => sum + (buf?.byteLength ?? 0), 0);
    const jsonBytes = byteLengthOf(learningPack) + byteLengthOf(translationPack);

    return {
      targetLang,
      lessons:   learningPack.lessons.length,
      phrases:   phrases.length,
      sizeBytes: jsonBytes + audioBytes,
    };
  }

  /** Formats a byte count as a human-readable size (e.g. "850 KB", "2.3 MB"). */
  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}

function byteLengthOf(value: unknown): number {
  return new TextEncoder().encode(JSON.stringify(value)).length;
}

/** Installed pack metadata shown in `PackManagerScreen`. */
export interface InstalledPackInfo {
  targetLang: TargetLangCode;
  lessons:    number;
  phrases:    number;
  sizeBytes:  number;
}
