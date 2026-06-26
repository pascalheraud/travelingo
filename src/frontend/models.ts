// ── Languages ─────────────────────────────────────────────────

/** ISO code for a source language (user's native language) */
export type SourceLangCode = 'fr' | 'en' | 'es' | 'de' | 'it' | 'ro' | 'pt';

/** ISO code for a target language (language being learned) */
export type TargetLangCode = 'fr' | 'en' | 'es' | 'de' | 'it' | 'ro';

/** Any language code (source or target) */
export type LangCode = SourceLangCode | TargetLangCode;

/** Translations of a string in all source languages */
export type SourceTranslations = Partial<Record<SourceLangCode, string>>;

/** Language definition (source or target) */
export interface Language {
  code:      LangCode;
  flag:      string;                          // flag emoji
  names:     Record<SourceLangCode, string>;  // name translated per source language
  available: boolean;
}

// ── Packs ─────────────────────────────────────────────────────

/** Unique pack identifier (UUID v4) */
export type PackUUID = string;

/** Learning pack version (e.g. "v1", "v2") */
export type PackVersion = string;

/** Application version (e.g. "a1", "a2", "a3") */
export type AppVersion = string;

/** Lesson identifier (e.g. "l01" … "l10") */
export type LessonId = 'l01' | 'l02' | 'l03' | 'l04' | 'l05'
                     | 'l06' | 'l07' | 'l08' | 'l09' | 'l10';

/** Phrase identifier (e.g. "p001" … "p026") */
export type PhraseId = string;

// ── Learning pack ─────────────────────────────────────────────

/**
 * Learning pack: contains target-language phrases and audio.
 * Source-language-agnostic.
 * Logical name: {targetLang}_v{N}  (e.g. en_v2, fr_v1)
 */
export interface LearningPack {
  uuid:       PackUUID;
  targetLang: TargetLangCode;
  version:    PackVersion;
  createdAt:  string;          // ISO 8601
  lessons:    LessonMeta[];
}

/** Lesson metadata and phrases in a learning pack */
export interface LessonMeta {
  id:      LessonId;
  emoji:   string;
  phrases: LearningPhrase[];
}

/** Phrase in a learning pack */
export interface LearningPhrase {
  id:     PhraseId;
  target: string;      // phrase in target language
  audio:  string;      // MP3 filename (e.g. "p01_001_v1.mp3")
}

// ── Translation pack ──────────────────────────────────────────

/**
 * Translation pack: contains translations, phonetics, grammar notes.
 * Specific to a (targetLang × sourceLang) combination.
 * Logical name: {targetLang}_v{N}_{sourceLang}  (e.g. en_v2_fr)
 */
export interface TranslationPack {
  uuid:            PackUUID;
  learningPackRef: PackUUID;        // UUID of the associated learning pack
  targetLang:      TargetLangCode;
  sourceLang:      SourceLangCode;
  version:         PackVersion;
  createdAt:       string;
  lessons:         TranslationLessonMeta[];
}

/** Lesson metadata and phrases in a translation pack */
export interface TranslationLessonMeta {
  id:       LessonId;
  title:    string;    // title translated in source language
  subtitle: string;    // subtitle translated in source language
  phrases:  TranslationPhrase[];
}

/** Translation of a phrase for a given source language */
export interface TranslationPhrase {
  id:          PhraseId;
  source:      string;      // phrase in source language
  phonetic:    string;      // phonetic transcription for source language speakers
  grammar:     string;      // grammatical / etymological explanation
  complements: string[];    // key points to remember
}

/** Per-lesson view data combining learning pack metadata, translated title/subtitle and progress */
export interface LessonSummary {
  id:           LessonId;
  emoji:        string;
  title:        string;
  subtitle:     string;
  donePhrases:  number;
  totalPhrases: number;
  isNew:        boolean;       // added by a pack update the user hasn't started yet (§5.9)
}

// ── App pack ──────────────────────────────────────────────────

/**
 * App pack: contains UI strings.
 * Specific to a (appVersion × sourceLang) combination.
 * Logical name: app_a{N}_{sourceLang}  (e.g. app_a3_fr)
 */
export interface AppPack {
  uuid:       PackUUID;
  appVersion: AppVersion;
  sourceLang: SourceLangCode;
  createdAt:  string;
  strings:    AppStrings;
}

/** All UI strings */
export interface AppStrings {
  // Navigation
  home:            string;
  back:            string;
  appSub:          string;

  // Dashboard
  myLangs:         string;
  addLang:         string;
  addLangBtn:      string;
  chooseLang:      string;

  // Lang home
  allLessons:      string;
  resume:          string;
  start:           string;
  restart:         string;
  savedAt:         string;
  lessons:         string;
  phrases:         string;
  mastered:        string;
  inProgress:      string;
  allMastered:     string;
  allMasteredDesc: string;
  comingSoon:      string;
  comingSoonDesc:  string;
  notDownloaded:   string;
  downloadLessons: string;
  packDownloaded:  string;
  newContentTitle: string;
  newContentDesc:  string;
  newLesson:       string;

  // Lesson
  quit:            string;
  validate:        string;
  next:            string;
  bravo:           string;
  wrongAnswer:     string;
  howToSay:        string;

  // Review
  review:          string;
  reviewTitle:     string;
  reviewDesc:      string;
  reviewDone:      string;
  reviewScore:     string;
  reviewRestart:   string;
  reviewIncentive: string;

  // Grammar
  learnMore:       string;
  grammar:         string;
  explanation:     string;
  toRemember:      string;
  close:           string;

  // Reporting
  report:          string;
  reportOn:        string;
  reportType:      string;
  reportPhonetic:  string;
  reportAudio:     string;
  reportSpelling:  string;
  reportTranslation: string;
  reportPlaceholder: string;
  reportSend:      string;
  reportThanks:    string;
  reportSent:      string;

  // UI language
  myLang:          string;
  myLangSub:       string;

  // Lesson done
  doneLessons:     string;
  doneDesc:        string;
  backHome:        string;

  // Reset confirmation
  confirmTitle:    string;
  confirmDesc:     string;
  confirmOk:       string;
  cancel:          string;

  // Placement test
  placementTest:   string;
  placementIntro:  string;
  placementPass:   string;
  placementFail:   string;
  placementRetry:  string;
  placementLearn:  string;

  // About
  about:           string;
  contributeTitle: string;
  contributeIntro: string;
  validateLang:    string;
  recordVoice:     string;
  proposeLesson:   string;
  reportCorrection: string;
  contributeCode:  string;
  proposeLang:     string;
  privacy:         string;
  contact:         string;
  rate:            string;

  // Pack manager
  packManager:           string;
  noPacksInstalled:      string;
  noPacksInstalledDesc:  string;
  packSize:              string;
  deletePack:            string;
  deletePackConfirmTitle: string;
  deletePackConfirmDesc:  string;
  deletePackConfirmOk:    string;

  // About
  version: string;
}

// ── Manifest ──────────────────────────────────────────────────

/**
 * Manifest bundled into the app build.
 * References the current version of every available pack.
 */
export interface AppManifest {
  appVersion:    AppVersion;
  uiPackRefs:    UiPackRefs;
  learningPacks: LearningPackRef[];
}

/** Current UI strings translation pack version per source language */
export type UiPackRefs = Partial<Record<SourceLangCode, PackVersion>>;

/** Learning pack reference in the manifest */
export interface LearningPackRef {
  targetLang:       TargetLangCode;
  version:          PackVersion;
  uuid:             PackUUID;
  lessons:          number;
  phrases:          number;
  translationPacks: Partial<Record<SourceLangCode, PackVersion>>;
}

// ── Progress ──────────────────────────────────────────────────

/**
 * User progress on a lesson.
 * Stored in IndexedDB, key: progress:{targetLang}:{lessonId}
 */
export interface LessonProgress {
  scores:  Record<PhraseId, number>;  // current score per phrase (0 to WIN_TARGET)
  doneIds: PhraseId[];                // mastered phrases (score = WIN_TARGET)
  mode:    LessonMode;
  savedAt: string;                    // ISO 8601
}

/** Learning mode chosen for the lesson */
export type LessonMode = 'text' | 'voice' | 'text_then_voice' | 'voice_then_text';

/**
 * Placement test result.
 * Stored in IndexedDB, key: placement:{targetLang}:{lessonId}
 */
export interface PlacementResult {
  attempts:        number;
  lastScore:       number;
  lastTotal:       number;
  passed:          boolean;
  lastTestedAt:    string;           // ISO 8601
  nextAllowedAt:   string | null;    // ISO 8601, null if passed or cooldown expired
  failedPhraseIds: PhraseId[];
}

// ── Game state (in-memory) ────────────────────────────────────

/** In-memory game state (not persisted as-is) */
export interface GameState {
  active:  GamePhrase[];   // phrases currently in the active window
  waiting: GamePhrase[];   // phrases waiting to enter the window
  done:    GamePhrase[];   // mastered phrases (removed from pool)
}

/** Phrase enriched with its current score */
export interface GamePhrase extends LearningPhrase {
  score: number;
}

/** Result of an answer */
export interface AnswerResult {
  correct:        boolean;
  selectedTarget: string;
  correctTarget:  string;
  phraseId:       PhraseId;
  newScore:       number;
  phraseDone:     boolean;   // true when score reaches WIN_TARGET
  lessonDone:     boolean;   // true when all phrases are done
}

// ── Reporting ─────────────────────────────────────────────────

export type ReportType = 'phonetic' | 'audio' | 'spelling' | 'translation';

export interface ReportPayload {
  phraseId:   PhraseId;
  targetLang: TargetLangCode;
  sourceLang: SourceLangCode;
  lessonId:   LessonId;
  type:       ReportType;
  comment:    string;
  appVersion: AppVersion;
  reportedAt: string;     // ISO 8601
}

// ── User preferences ──────────────────────────────────────────

/**
 * User preferences stored in IndexedDB, key: prefs
 */
export interface UserPreferences {
  sourceLang:   SourceLangCode;
  activeLangs:  TargetLangCode[];
  defaultMode:  LessonMode;
  voiceConsent: VoiceConsent | null;
}

export interface VoiceConsent {
  granted:   boolean;
  grantedAt: string;   // ISO 8601
}

// ── IndexedDB ─────────────────────────────────────────────────

/** IndexedDB store names */
export const IDB_STORES = {
  LEARNING_PACKS:    'learningPacks',    // {targetLang} → LearningPack
  TRANSLATION_PACKS: 'translationPacks', // {targetLang}:{sourceLang} → TranslationPack
  APP_PACKS:         'appPacks',         // {sourceLang} → AppPack (key is NOT appVersion-qualified: a new UI pack version overwrites in place, see §5.8)
  AUDIO:             'audio',            // {targetLang}:{lessonId}:{phraseId} → ArrayBuffer
  PROGRESS:          'progress',         // {targetLang}:{lessonId} → LessonProgress
  PLACEMENT:         'placement',        // {targetLang}:{lessonId} → PlacementResult
  PREFS:             'prefs',            // 'user' → UserPreferences
  NEW_LESSONS:       'newLessons',       // {targetLang} → LessonId[] (lessons added by the last pack update, until started, see §5.9)
} as const;

export type IDBStoreName = typeof IDB_STORES[keyof typeof IDB_STORES];
