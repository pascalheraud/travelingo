# Travelingo — Functional Components × Models

---

## 2.1 Navigation & global layout

| Component      | Models used                         | Fields                                |
| -------------- | ----------------------------------- | ------------------------------------- |
| `AppHeader`    | `SourceLangCode`, `Language`        | `userLang`, `lang.flag`, `lang.names` |
| `LessonHeader` | `TranslationLessonMeta`, `Language` | `title`, `flag`                       |
| `BackButton`   | —                                   | text via `AppStrings.back`            |
| `AppLayout`    | —                                   | —                                     |

---

## 2.2 Dashboard

| Composant         | Modèles utilisés                                 | Champs                                                                        |
| ----------------- | ------------------------------------------------ | ----------------------------------------------------------------------------- |
| `DashboardScreen` | `Language[]`, `LessonProgress`, `SourceLangCode` | `activeLangs`, `userLang`                                                     |
| `LangCard`        | `Language`, `LessonProgress[]`                   | `lang.flag`, `lang.names[userLang]`, `progress.doneIds.length`                |
| `AddLangButton`   | `AppStrings`                                     | `strings.addLangBtn`                                                          |
| `LangPickerModal` | `Language[]`, `SourceLangCode`                   | `lang.code`, `lang.flag`, `lang.names[lang.code]` (nom dans sa propre langue) |

---

## 2.3 Sélection de langue cible

| Composant        | Modèles utilisés                                 | Champs                                                             |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| `AddLangScreen`  | `Language[]`, `TargetLangCode[]`, `AppStrings`   | `lang.code`, `lang.flag`, `lang.names[userLang]`, `lang.available` |
| `LangOptionCard` | `Language`, `TargetLangCode[]`, `SourceLangCode` | `lang.flag`, `lang.names[userLang]`, `alreadyAdded`                |

---

## 2.4 Accueil d'une langue

| Composant             | Modèles utilisés                                                                                     | Champs                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `LangHomeScreen`      | `Language`, `LearningPack`, `TranslationPack`, `LessonProgress[]`, `PlacementResult[]`, `AppStrings` | — (orchestrateur)                                                                                |
| `LangHero`            | `Language` (×2), `SourceLangCode`                                                                    | `targetLang.flag`, `targetLang.names[userLang]`, `sourceLang.flag`, `sourceLang.names[userLang]` |
| `StartResumeBar`      | `LessonProgress`, `AppStrings`                                                                       | `progress.savedAt`, `strings.resume`, `strings.start`, `strings.restart`                         |
| `ReviewButton`        | `LessonProgress`, `LearningPack`, `AppStrings`                                                       | `progress.doneIds.length`, `pack.phrases.length`, `strings.review`                               |
| `LessonList`          | `LessonMeta[]`, `TranslationLessonMeta[]`, `LessonProgress[]`, `PlacementResult[]`                   | —                                                                                                |
| `LessonCard`          | `LessonMeta`, `TranslationLessonMeta`, `LessonProgress`, `PlacementResult`, `AppStrings`             | `lesson.emoji`, `meta.title`, `meta.subtitle`, `progress.doneIds`, `placement.passed`            |
| `PlacementTestButton` | `PlacementResult`, `AppStrings`                                                                      | `placement.nextAllowedAt`, `placement.attempts`, `strings.placementTest`                         |
| `ProgressSummary`     | `LessonProgress[]`, `LearningPack`                                                                   | `doneIds` agrégés sur toutes leçons, `pack.phrases.length`                                       |
| `SavedMeta`           | `LessonProgress`, `AppStrings`                                                                       | `progress.savedAt`, `strings.savedAt`                                                            |

---

## 2.5 Leçon — quiz adaptatif

| Composant          | Modèles utilisés                                                                         | Champs                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `LessonScreen`     | `LearningPack`, `TranslationPack`, `GameState`, `LessonProgress`, `AppStrings`           | — (orchestrateur)                                                                |
| `ActivePool`       | `GamePhrase[]`, `SourceLangCode`, `TranslationPhrase[]`                                  | `phrase.id`, `phrase.score`, `tr.source`                                         |
| `PoolItem`         | `GamePhrase`, `TranslationPhrase`                                                        | `phrase.score`, `tr.source`, `WIN_TARGET`                                        |
| `QuizCard`         | `GamePhrase`, `TranslationPhrase`, `LessonMeta`, `AppStrings`                            | `phrase.target` (masqué), `tr.source`, `lesson.emoji`, `strings.howToSay`        |
| `PhraseLabel`      | `TranslationPhrase`                                                                      | `tr.source`                                                                      |
| `ChoiceGrid`       | `GamePhrase[]` (choices), `TranslationPhrase[]`, `GamePhrase` (correct), `AnswerResult?` | `phrase.target`, `tr.phonetic`                                                   |
| `ChoiceButton`     | `GamePhrase`, `TranslationPhrase`, `AnswerResult?`                                       | `phrase.target`, `tr.phonetic`, `result.correct`, `result.selectedTarget`        |
| `PhoneticLabel`    | `TranslationPhrase`                                                                      | `tr.phonetic`                                                                    |
| `ActionBar`        | `AppStrings`                                                                             | `strings.validate`, `strings.next`                                               |
| `FeedbackBanner`   | `AnswerResult`, `AppStrings`                                                             | `result.correct`, `result.correctTarget`, `strings.bravo`, `strings.wrongAnswer` |
| `AudioPlayIcon`    | —                                                                                        | état interne `playing`                                                           |
| `LessonDoneScreen` | `LearningPack`, `AppStrings`                                                             | `pack.phrases.length`, `strings.doneLessons`, `strings.doneDesc`                 |

---

## 2.6 Grammaire

| Composant           | Modèles utilisés                                                     | Champs                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `GrammarSheet`      | `LearningPhrase`, `TranslationPhrase`, `Language` (×2), `AppStrings` | `phrase.target`, `tr.source`, `tr.grammar`, `tr.complements`, `strings.grammar`, `strings.explanation`, `strings.toRemember`, `strings.close` |
| `PhraseRef`         | `LearningPhrase`, `TranslationPhrase`, `Language` (×2)               | `phrase.target`, `tr.source`, `targetLang.flag`, `sourceLang.flag`                                                                            |
| `GrammarSection`    | `TranslationPhrase`, `AppStrings`                                    | `tr.grammar`, `strings.explanation`                                                                                                           |
| `ComplementSection` | `TranslationPhrase`, `AppStrings`                                    | `tr.complements[]`, `strings.toRemember`                                                                                                      |
| `ComplementItem`    | —                                                                    | texte brut                                                                                                                                    |

---

## 2.7 Signalement

| Composant        | Modèles utilisés                                                     | Champs                                                                                                 |
| ---------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ReportSheet`    | `ReportPayload`, `LearningPhrase`, `TranslationPhrase`, `AppStrings` | `payload.phraseId`, `payload.type`, `payload.comment`, `phrase.target`, `tr.source`, `strings.report*` |
| `ReportTypeGrid` | `ReportType`, `AppStrings`                                           | `strings.reportPhonetic`, `strings.reportAudio`, `strings.reportSpelling`, `strings.reportTranslation` |
| `ReportSuccess`  | `AppStrings`                                                         | `strings.reportThanks`, `strings.reportSent`                                                           |

---

## 2.8 Fin de leçon

| Composant          | Modèles utilisés             | Champs                                                                               |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------ |
| `LessonDoneScreen` | `LearningPack`, `AppStrings` | `pack.phrases.length`, `strings.doneLessons`, `strings.doneDesc`, `strings.backHome` |

---

## 2.9 Test de placement

| Composant               | Modèles utilisés                                                           | Champs                                                                                                                                                      |
| ----------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PlacementIntroScreen`  | `TranslationLessonMeta`, `PlacementResult?`, `AppStrings`                  | `meta.title`, `placement.attempts`, `PLACEMENT_QUESTIONS`, `PLACEMENT_PASS_SCORE`, `strings.placementIntro`                                                 |
| `PlacementScreen`       | `LearningPack`, `TranslationPack`, `GameState`, `AppStrings`               | `game.active`, `PLACEMENT_QUESTIONS`, `strings.validate`, `strings.next`                                                                                    |
| `PlacementResultScreen` | `PlacementResult`, `LearningPhrase[]`, `TranslationPhrase[]`, `AppStrings` | `result.passed`, `result.lastScore`, `result.lastTotal`, `result.failedPhraseIds`, `result.nextAllowedAt`, `strings.placementPass`, `strings.placementFail` |
| `FailedPhraseList`      | `LearningPhrase[]`, `TranslationPhrase[]`                                  | `phrase.target`, `tr.source`                                                                                                                                |

---

## 2.10 Gestion des packs

| Composant            | Modèles utilisés                                      | Champs                                                                             |
| -------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `PackDownloadScreen` | `LearningPackRef`, `Language`, `AppStrings`           | `ref.uuid`, `ref.targetLang`, `ref.lessons`, `ref.phrases`, `lang.names[userLang]` |
| `PackProgressBar`    | —                                                     | `downloaded`, `total` (nombres bruts)                                              |
| `PackManagerScreen`  | `LearningPackRef[]`, `LessonProgress[]`, `AppStrings` | `ref.uuid`, `ref.targetLang`, `ref.version`                                        |
| `PackItem`           | `LearningPackRef`, `Language`, `AppStrings`           | `ref.targetLang`, `ref.version`, `lang.flag`, `lang.names[userLang]`               |

---

## 2.11 About & contribution

| Component            | Models used             | Fields                                                                                                                                              |
| -------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AboutScreen`        | `AppPack`, `AppStrings` | `pack.appVersion`, `strings.about`, `strings.contributeTitle`                                                                                       |
| `ContributeSection`  | `AppStrings`            | `strings.contributeIntro`, `strings.contributeTitle`                                                                                                |
| `ContributeCard`     | `AppStrings`            | `strings.validateLang`, `strings.recordVoice`, `strings.proposeLesson`, `strings.reportCorrection`, `strings.contributeCode`, `strings.proposeLang` |
| `ExternalLinkButton` | `AppStrings`            | `strings.privacy`, `strings.contact`, `strings.rate`                                                                                                |
| `AppVersionBadge`    | `AppPack`               | `pack.appVersion`                                                                                                                                   |

---

## 2.12 Dev tools

| Composant       | Modèles utilisés                          | Champs                                                   |
| --------------- | ----------------------------------------- | -------------------------------------------------------- |
| `DevToolsPanel` | `GameState`, `LearningPack`, `WIN_TARGET` | `game.active`, `game.done`, `pack.phrases`, `WIN_TARGET` |

---

## Summary — most used models

| Model                           | Used by N components | Main components                                                  |
| ------------------------------- | -------------------- | ---------------------------------------------------------------- |
| `AppStrings`                    | 22                   | All screens and popups                                           |
| `TranslationPhrase`             | 12                   | `ChoiceButton`, `GrammarSheet`, `ReportSheet`, `ChoiceGrid`      |
| `LearningPhrase` / `GamePhrase` | 10                   | `QuizCard`, `ChoiceGrid`, `ChoiceButton`, `ActivePool`           |
| `Language`                      | 9                    | `LangCard`, `LangHero`, `LangOptionCard`, `LangPickerModal`      |
| `LessonProgress`                | 8                    | `LangHomeScreen`, `LessonCard`, `StartResumeBar`, `ReviewButton` |
| `TranslationLessonMeta`         | 6                    | `LessonCard`, `LessonList`, `PlacementIntroScreen`               |
| `PlacementResult`               | 5                    | `LessonCard`, `PlacementTestButton`, `PlacementResultScreen`     |
| `LearningPack`                  | 5                    | `LessonScreen`, `ReviewButton`, `PackItem`, `LessonDoneScreen`   |
| `AnswerResult`                  | 4                    | `FeedbackBanner`, `ChoiceButton`, `ChoiceGrid`, `ActionBar`      |
| `ReportPayload`                 | 3                    | `ReportSheet`, `ReportTypeGrid`, `ReportSuccess`                 |
