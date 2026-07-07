// ============================================================
// Travelingo — Modèles de données
// ============================================================

// ── Langues ─────────────────────────────────────────────────

/** Code ISO d'une langue source (langue de l'utilisateur) */
export type SourceLangCode = 'fr' | 'en' | 'es' | 'de' | 'it' | 'ro' | 'pt';

/** Code ISO d'une langue cible (langue à apprendre) */
export type TargetLangCode = 'fr' | 'en' | 'es' | 'de' | 'it' | 'ro';

/** Tout code langue (source ou cible) */
export type LangCode = SourceLangCode | TargetLangCode;

/** Traductions d'un texte dans toutes les langues sources */
export type SourceTranslations = Partial<Record<SourceLangCode, string>>;

/** Définition d'une langue (source ou cible) */
export interface Language {
  code:      LangCode;
  flag:      string;                          // emoji drapeau
  names:     Record<SourceLangCode, string>;  // nom traduit par langue source
  available: boolean;
}

// ── Packs ────────────────────────────────────────────────────

/** Identifiant unique d'un pack (UUID v4) */
export type PackUUID = string;

/** Version d'un pack apprentissage (ex: "v1", "v2") */
export type PackVersion = string;

/** Version de l'application (ex: "a1", "a2", "a3") */
export type AppVersion = string;

/** Identifiant d'une leçon (ex: "l01" … "l10") */
export type LessonId = 'l01' | 'l02' | 'l03' | 'l04' | 'l05'
                     | 'l06' | 'l07' | 'l08' | 'l09' | 'l10';

/** Identifiant d'une phrase (ex: "p001" … "p026") */
export type PhraseId = string;

// ── Pack apprentissage ───────────────────────────────────────

/**
 * Pack apprentissage : contient les phrases en langue cible + audio.
 * Invariant par rapport à la langue source.
 * Nom logique : {targetLang}_v{N}  (ex: en_v2, fr_v1)
 */
export interface LearningPack {
  id:         string;          // ex: "en_v2"
  uuid:       PackUUID;
  targetLang: TargetLangCode;
  version:    PackVersion;
  createdAt:  string;          // ISO 8601
  lessons:    LessonMeta[];
  phrases:    LearningPhrase[];
}

/** Métadonnées d'une leçon dans le pack apprentissage */
export interface LessonMeta {
  id:          LessonId;
  emoji:       string;
  phraseCount: number;
}

/** Phrase dans un pack apprentissage */
export interface LearningPhrase {
  id:     PhraseId;
  target: string;      // phrase en langue cible
  audio:  string;      // nom du fichier MP3 (ex: "p001.mp3")
}

// ── Pack traduction phrases ──────────────────────────────────

/**
 * Pack traduction : contient les traductions, phonétiques, grammaire.
 * Spécifique à une combinaison (targetLang × sourceLang).
 * Nom logique : {targetLang}_v{N}_{sourceLang}  (ex: en_v2_fr)
 */
export interface TranslationPack {
  id:              string;          // ex: "en_v2_fr"
  uuid:            PackUUID;
  learningPackRef: PackUUID;        // UUID du pack apprentissage associé
  targetLang:      TargetLangCode;
  sourceLang:      SourceLangCode;
  version:         PackVersion;
  createdAt:       string;
  lessons:         TranslationLessonMeta[];
  phrases:         TranslationPhrase[];
}

/** Métadonnées d'une leçon dans le pack traduction */
export interface TranslationLessonMeta {
  id:       LessonId;
  title:    string;    // titre traduit dans la langue source
  subtitle: string;    // sous-titre traduit dans la langue source
}

/** Traduction d'une phrase pour une langue source */
export interface TranslationPhrase {
  id:          PhraseId;
  source:      string;      // phrase dans la langue source
  phonetic:    string;      // transcription phonétique pour la langue source
  grammar:     string;      // explication grammaticale/étymologique
  complements: string[];    // points clés à retenir
}

// ── Pack application ─────────────────────────────────────────

/**
 * Pack application : contient les textes de l'interface utilisateur.
 * Spécifique à une combinaison (appVersion × sourceLang).
 * Nom logique : app_a{N}_{sourceLang}  (ex: app_a3_fr)
 */
export interface AppPack {
  id:         string;          // ex: "app_a3_fr"
  uuid:       PackUUID;
  appVersion: AppVersion;
  sourceLang: SourceLangCode;
  createdAt:  string;
  strings:    AppStrings;
}

/** Toutes les chaînes de l'interface utilisateur */
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

  // Leçon
  quit:            string;
  validate:        string;
  next:            string;
  bravo:           string;
  wrongAnswer:     string;
  howToSay:        string;

  // Révision
  review:          string;
  reviewTitle:     string;
  reviewDesc:      string;

  // Grammaire
  learnMore:       string;
  grammar:         string;
  explanation:     string;
  toRemember:      string;
  close:           string;

  // Signalement
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

  // Langue UI
  myLang:          string;
  myLangSub:       string;

  // Fin de leçon
  doneLessons:     string;
  doneDesc:        string;
  backHome:        string;

  // Confirmation reset
  confirmTitle:    string;
  confirmDesc:     string;
  confirmOk:       string;
  cancel:          string;

  // Test de placement
  placementTest:   string;
  placementIntro:  string;
  placementPass:   string;
  placementFail:   string;
  placementRetry:  string;
  placementLearn:  string;

  // À propos
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
}

// ── Manifeste ────────────────────────────────────────────────

/**
 * Manifeste embarqué dans le build de l'application.
 * Référence tous les UUIDs des packs disponibles.
 */
export interface AppManifest {
  appVersion:   AppVersion;
  appPackRefs:  AppPackRefs;
  learningPacks: LearningPackRef[];
}

/** UUIDs des packs app par version et par langue source */
export type AppPackRefs = Record<AppVersion, Partial<Record<SourceLangCode, PackUUID>>>;

/** Référence d'un pack apprentissage dans le manifeste */
export interface LearningPackRef {
  targetLang:       TargetLangCode;
  version:          PackVersion;
  uuid:             PackUUID;
  lessons:          number;
  phrases:          number;
  translationPacks: Partial<Record<SourceLangCode, PackUUID>>;
}

// ── Progression ──────────────────────────────────────────────

/**
 * Progression d'un utilisateur sur une leçon.
 * Stockée dans IndexedDB, clé : progress:{targetLang}:{lessonId}
 */
export interface LessonProgress {
  scores:   Record<PhraseId, number>;  // score courant par phrase (0 à WIN_TARGET)
  doneIds:  PhraseId[];                // phrases maîtrisées (score = WIN_TARGET)
  mode:     LessonMode;
  savedAt:  string;                    // ISO 8601
}

/** Mode d'apprentissage choisi pour la leçon */
export type LessonMode = 'text' | 'voice' | 'text_then_voice' | 'voice_then_text';

/**
 * Résultat d'un test de placement.
 * Stocké dans IndexedDB, clé : placement:{targetLang}:{lessonId}
 */
export interface PlacementResult {
  attempts:        number;
  lastScore:       number;
  lastTotal:       number;
  passed:          boolean;
  lastTestedAt:    string;           // ISO 8601
  nextAllowedAt:   string | null;    // ISO 8601, null si passé ou réussi
  failedPhraseIds: PhraseId[];
}

// ── Jeu (état en mémoire) ─────────────────────────────────────

/** État du jeu en mémoire (non persisté tel quel) */
export interface GameState {
  active:  GamePhrase[];   // phrases actuellement dans la fenêtre active
  waiting: GamePhrase[];   // phrases en attente d'entrée dans la fenêtre
  done:    GamePhrase[];   // phrases maîtrisées (sorties du pool)
}

/** Phrase enrichie avec son score courant dans le jeu */
export interface GamePhrase extends LearningPhrase {
  score: number;
}

/** Résultat d'une réponse */
export interface AnswerResult {
  correct:       boolean;
  selectedTarget: string;
  correctTarget:  string;
  phraseId:      PhraseId;
  newScore:      number;
  phraseDone:    boolean;   // true si score atteint WIN_TARGET
  lessonDone:    boolean;   // true si toutes les phrases sont done
}

// ── Signalement ──────────────────────────────────────────────

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

// ── Préférences utilisateur ──────────────────────────────────

/**
 * Préférences stockées dans IndexedDB, clé : prefs
 */
export interface UserPreferences {
  sourceLang:     SourceLangCode;
  activeLangs:    TargetLangCode[];
  defaultMode:    LessonMode;
  voiceConsent:   VoiceConsent | null;
}

export interface VoiceConsent {
  granted:    boolean;
  grantedAt:  string;   // ISO 8601
}

// ── IndexedDB ────────────────────────────────────────────────

/** Noms des stores IndexedDB */
export const IDB_STORES = {
  LEARNING_PACKS:     'learningPacks',     // {targetLang}:{lessonId} → LearningPack
  TRANSLATION_PACKS:  'translationPacks',  // {targetLang}:{lessonId}:{sourceLang} → TranslationPack
  APP_PACKS:          'appPacks',          // {appVersion}:{sourceLang} → AppPack
  AUDIO:              'audio',             // {targetLang}:{lessonId}:{phraseId} → ArrayBuffer
  PROGRESS:           'progress',          // {targetLang}:{lessonId} → LessonProgress
  PLACEMENT:          'placement',         // {targetLang}:{lessonId} → PlacementResult
  PREFS:              'prefs',             // 'user' → UserPreferences
} as const;

export type IDBStoreName = typeof IDB_STORES[keyof typeof IDB_STORES];

// ── Constantes de jeu ─────────────────────────────────────────

/** Nombre de bonnes réponses requises pour maîtriser une phrase */
export const WIN_TARGET = 3;

/** Taille de la fenêtre glissante (phrases actives simultanément) */
export const WINDOW_SIZE = 3;

/** Nombre de questions dans un test de placement */
export const PLACEMENT_QUESTIONS = 10;

/** Score minimum pour réussir un test de placement */
export const PLACEMENT_PASS_SCORE = 8;

/** Délai en heures avant de pouvoir repasser un test raté */
export const PLACEMENT_COOLDOWN_HOURS = 24;

/** Nombre maximum de tentatives pour un test de placement */
export const PLACEMENT_MAX_ATTEMPTS = 3;
