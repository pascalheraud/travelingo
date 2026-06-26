# Travelingo — Plan d'exécution Phase 1

**Langue du code et de la documentation :** English (code and docs in English).

## Documents de référence

- `doc/init-spec.md` : spécification produit, vision, architecture offline-first et roadmap de développement.
- `doc/travelingo-naming.md` : conventions de nommage, organisation des composants et stratégie d'export.
- `doc/travelingo-components-models.md` : correspondance entre composants fonctionnels et modèles de données.
- `doc/art/proto/packs.js` : prototype de packs langue, structure de données et exemples de contenu.
- `doc/art/proto/travelingo-quiz.jsx` : prototype d'interface utilisateur pour le quiz et le dashboard.
- `doc/art/code/models.ts` : modèle de données TypeScript du prototype utilisé comme source d'inspiration.
- `doc/art/proto` et `doc/art/code` : ressources supplémentaires pour l'implémentation et le design technique.

## Liste exhaustive des composants

---

## 1. Composants techniques (Design System)

Composants génériques, réutilisables, sans dépendance métier Travelingo.

### 1.1 Atomes

| Composant         | Description                      | Props clés                                                                                                   | États                                         |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `Button`          | Bouton standard                  | `variant` (primary/secondary/danger/ghost), `size` (sm/md/lg), `disabled`, `loading`, `fullWidth`, `onClick` | default · hover · active · disabled · loading |
| `IconButton`      | Bouton icône seul                | `icon`, `ariaLabel`, `size`, `variant`, `onClick`                                                            | default · hover · active · disabled           |
| `ProgressBar`     | Barre de progression linéaire    | `value` (0-100), `color`, `height`, `animated`, `showLabel`                                                  | —                                             |
| `MiniProgressBar` | Barre compacte (dans les cartes) | `value` (0-100), `color`, `width`                                                                            | —                                             |
| `Badge`           | Pastille texte colorée           | `label`, `color`, `size`, `icon`                                                                             | —                                             |
| `Flag`            | Drapeau emoji encapsulé          | `code` (fr/en/…), `size` (sm/md/lg)                                                                          | —                                             |
| `Pill`            | Capsule de texte arrondie        | `label`, `color`, `icon`, `size`                                                                             | —                                             |
| `Spinner`         | Indicateur de chargement rotatif | `size`, `color`                                                                                              | —                                             |
| `Divider`         | Séparateur horizontal            | `spacing`, `color`, `variant` (solid/dashed)                                                                 | —                                             |
| `Tag`             | Étiquette catégorie              | `label`, `color`, `size`                                                                                     | —                                             |
| `StatusDot`       | Point de statut coloré           | `color`, `size`, `pulse`                                                                                     | —                                             |

### 1.2 Molécules

| Composant       | Description                                 | Props clés                                                                                                        | États                                         |
| --------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `Toast`         | Notification éphémère bas d'écran           | `message`, `type` (success/error/info/warning), `duration`, `onDismiss`                                           | visible · exiting                             |
| `BottomSheet`   | Panneau coulissant depuis le bas            | `open`, `onClose`, `maxHeight`, `children`                                                                        | closed · open · closing                       |
| `Modal`         | Popup centrée avec overlay                  | `open`, `onClose`, `title`, `children`, `size`                                                                    | closed · open                                 |
| `ModalBar`      | Barre de glissement (handle) de BottomSheet | `color`                                                                                                           | —                                             |
| `Textarea`      | Zone de texte multi-lignes                  | `placeholder`, `value`, `onChange`, `rows`, `maxLength`, `disabled`                                               | default · focus · error · disabled            |
| `SelectGrid`    | Grille de boutons à sélection unique        | `options[]` ({id, label, icon}), `value`, `onChange`, `columns`                                                   | — (chaque option : default/selected/disabled) |
| `ConfirmDialog` | Modal de confirmation destructive           | `open`, `emoji`, `title`, `description`, `confirmLabel`, `cancelLabel`, `confirmVariant`, `onConfirm`, `onCancel` | —                                             |
| `Hero`          | Bloc hero dégradé pleine largeur            | `flag`, `langName`, `subtitle`, `pill`, `onBack`, `backLabel`, `children`                                         | —                                             |
| `CardStripe`    | Barre décorative haut de carte              | `gradient`                                                                                                        | —                                             |
| `SectionLabel`  | Label de section uppercase tracké           | `label`, `spacing`                                                                                                | —                                             |
| `InfoBanner`    | Bandeau d'information coloré                | `message`, `color`, `icon`                                                                                        | —                                             |
| `DashedButton`  | Bouton à bordure pointillée                 | `label`, `icon`, `onClick`                                                                                        | default · hover                               |
| `CounterBadge`  | Badge avec compteur numérique               | `value`, `max`, `color`                                                                                           | —                                             |

### 1.3 Organismes techniques

| Composant      | Description                                    | Props clés                                                   | États                          |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| `Card`         | Carte blanche avec ombre et stripe optionnelle | `children`, `stripe`, `stripeGradient`, `padding`, `onClick` | default · hover (si clickable) |
| `EmptyState`   | État vide illustré                             | `emoji`, `title`, `description`, `action`                    | —                              |
| `ErrorState`   | État d'erreur avec retry                       | `message`, `onRetry`, `emoji`                                | —                              |
| `LoadingState` | État de chargement pleine page                 | `message`                                                    | —                              |
| `PageWrapper`  | Conteneur pleine hauteur centré                | `background`, `children`                                     | —                              |

---

## 2. Composants fonctionnels (Travelingo)

### 2.1 Navigation & layout global

| Composant      | Description                                 | Props clés                | États | Utilise              |
| -------------- | ------------------------------------------- | ------------------------- | ----- | -------------------- |
| `AppHeader`    | En-tête dashboard : logo + bouton langue UI | `userLang`, `onLangClick` | —     | `Flag`, `IconButton` |
| `LessonHeader` | En-tête leçon : titre leçon + ✕ Quitter     | `title`, `flag`, `onQuit` | —     | `Button`             |
| `BackButton`   | Bouton ← retour translucide sur fond hero   | `label`, `onClick`        | —     | `IconButton`         |
| `AppLayout`    | Wrapper global avec fond dégradé            | `children`, `screen`      | —     | `PageWrapper`        |

### 2.2 Dashboard

| Composant         | Description                                   | Props clés                                                               | États             | Utilise                                                     |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------------ | ----------------- | ----------------------------------------------------------- |
| `DashboardScreen` | Écran principal de l'app                      | `activeLangs[]`, `userLang`, `onSelectLang`, `onAddLang`, `onChangeLang` | empty · populated | `AppHeader`, `LangCard`, `AddLangButton`, `LangPickerModal` |
| `LangCard`        | Carte langue apprise avec progression globale | `lang`, `donePhrases`, `totalPhrases`, `onClick`                         | default · hover   | `Flag`, `MiniProgressBar`, `CounterBadge`                   |
| `AddLangButton`   | Bouton pointillé ajout de langue              | `label`, `onClick`                                                       | default · hover   | `DashedButton`                                              |
| `LangPickerModal` | Popup centrée sélection de la langue UI       | `open`, `userLang`, `onSelect`, `onClose`                                | —                 | `Modal`, `Flag`, `SelectGrid`                               |

### 2.3 Sélection de langue cible (ajout)

| Composant        | Description                           | Props clés                                                  | États                   | Utilise                                     |
| ---------------- | ------------------------------------- | ----------------------------------------------------------- | ----------------------- | ------------------------------------------- |
| `AddLangScreen`  | Grille des langues cibles disponibles | `available[]`, `active[]`, `userLang`, `onSelect`, `onBack` | —                       | `AppHeader`, `LangOptionCard`, `BackButton` |
| `LangOptionCard` | Carte langue sélectionnable           | `lang`, `userLang`, `alreadyAdded`, `onClick`               | default · added · hover | `Flag`, `Badge`                             |

### 2.4 Accueil d'une langue (lang home)

| Composant             | Description                                        | Props clés                                                                                            | États                                 | Utilise                                                                     |
| --------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| `LangHomeScreen`      | Écran central d'une langue apprise                 | `lang`, `userLang`, `lessons[]`, `progress`, `onStart`, `onResume`, `onRestart`, `onReview`, `onBack` | no-progress · in-progress · completed | `LangHero`, `ReviewButton`, `StartResumeBar`, `LessonList`, `ConfirmDialog` |
| `LangHero`            | Bloc hero avec drapeau, nom, paire de langues      | `targetLang`, `sourceLang`, `userLang`                                                                | —                                     | `Hero`, `Flag`, `Pill`, `BackButton`                                        |
| `StartResumeBar`      | Groupe boutons Commencer / Reprendre / Recommencer | `hasSave`, `savedDate`, `onStart`, `onResume`, `onRestart`                                            | no-save · has-save                    | `Button`, `InfoBanner`                                                      |
| `ReviewButton`        | Bouton 🔁 Réviser avec compteur progression        | `donePhrases`, `totalPhrases`, `onClick`                                                              | hidden · visible                      | `Button`, `Badge`                                                           |
| `LessonList`          | Liste scrollable des 10 leçons                     | `lessons[]`, `progress{}`, `userLang`, `onSelect`, `onTest`                                           | —                                     | `LessonCard` ×10                                                            |
| `LessonCard`          | Carte d'une leçon avec statut visuel               | `lesson`, `donePhrases`, `totalPhrases`, `userLang`, `onStart`, `onTest`                              | untouched · in-progress · done        | `Card`, `Flag`, `MiniProgressBar`, `Tag`, `PlacementTestButton`             |

Une leçon `done` (maîtrisée, `donePhrases >= totalPhrases`) n'est pas cliquable dans la `LessonList` : `onStart` n'est pas déclenché. Côté `LessonScreen`, si la route d'une leçon déjà maîtrisée est appelée directement (URL, deep link), l'écran redirige vers la `LangHomeScreen` au lieu d'afficher le quiz.

Quand toutes les leçons d'une langue sont `done`, la `LessonList` affiche en haut de la liste une `Card` informative (🏆 + `strings.allMastered` / `strings.allMasteredDesc`) invitant l'utilisateur à revenir plus tard.
| `PlacementTestButton` | Bouton 📋 Tester mes connaissances (inline)        | `onClick`, `disabled`, `nextAllowedAt`                                                                | available · cooldown                  | `Button`, `Pill`                                                            |
| `ProgressSummary`     | Résumé visuel global (X/260 phrases)               | `done`, `total`                                                                                       | —                                     | `ProgressBar`, `CounterBadge`                                               |

### 2.5 Leçon — quiz adaptatif

| Composant        | Description                                | Props clés                                                                       | États                                         | Utilise                                                                                                                                              |
| ---------------- | ------------------------------------------ | -------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LessonScreen`   | Écran principal de la leçon                | `pack`, `sourceLang`, `lessonId`, `isReview`, `onQuit`, `onDone`                 | loading · active · done                       | `LessonHeader`, `ProgressBar`, `ActivePool`, `QuizCard`, `ChoiceGrid`, `ActionBar`, `FeedbackBanner`, `GrammarSheet`, `ReportSheet`, `DevToolsPanel` |
| `ActivePool`     | Indicateur visuel des 3 phrases actives    | `phrases[]`, `currentId`                                                         | —                                             | `PoolItem` ×3                                                                                                                                        |
| `PoolItem`       | Item du pool avec score en points          | `phrase`, `score`, `isActive`, `sourceLang`                                      | active · inactive                             | `StatusDot`, `MiniProgressBar`                                                                                                                       |
| `QuizCard`       | Carte de la question courante              | `phrase`, `sourceLang`, `lessonEmoji`                                            | —                                             | `Card`, `CardStripe`, `Tag`, `PhraseLabel`                                                                                                           |
| `PhraseLabel`    | Phrase source en grand caractères          | `text`, `size`                                                                   | —                                             | —                                                                                                                                                    |
| `ChoiceGrid`     | Grille 2×2 des 4 réponses possibles        | `choices[]`, `selected`, `validated`, `correctTarget`, `onSelect`                | —                                             | `ChoiceButton` ×4                                                                                                                                    |
| `ChoiceButton`   | Bouton réponse + phonétique + état visuel  | `target`, `phonetic`, `selected`, `validated`, `isCorrect`, `isWrong`, `onClick` | default · selected · correct · wrong · dimmed | `PhoneticLabel`                                                                                                                                      |
| `PhoneticLabel`  | Transcription phonétique sous le mot cible | `text`                                                                           | —                                             | —                                                                                                                                                    |
| `ActionBar`      | Zone bas d'écran : Valider ou Continuer    | `validated`, `selected`, `onValidate`, `onContinue`                              | pre-answer · post-answer                      | `Button`                                                                                                                                             |
| `FeedbackBanner` | Bandeau résultat après validation          | `type` (correct/wrong), `correctAnswer`                                          | correct · wrong                               | `InfoBanner`                                                                                                                                         |
| `AudioPlayIcon`  | Icône son animée pendant lecture           | `playing`                                                                        | idle · playing                                | —                                                                                                                                                    |

### 2.6 Popups métier — grammaire

| Composant           | Description                                 | Props clés                                     | États         | Utilise                                                                                 |
| ------------------- | ------------------------------------------- | ---------------------------------------------- | ------------- | --------------------------------------------------------------------------------------- |
| `GrammarSheet`      | Bottom sheet grammaire & étymologie         | `open`, `phrase`, `tr`, `onClose`              | closed · open | `BottomSheet`, `ModalBar`, `PhraseRef`, `GrammarSection`, `ComplementSection`, `Button` |
| `PhraseRef`         | Bloc « source » → « cible » mis en évidence | `source`, `target`, `sourceLang`, `targetLang` | —             | `Flag`                                                                                  |
| `GrammarSection`    | Bloc titre + texte explicatif               | `title`, `text`                                | —             | `SectionLabel`                                                                          |
| `ComplementSection` | Liste des points clés à retenir             | `title`, `items[]`                             | —             | `SectionLabel`                                                                          |
| `ComplementItem`    | Un point clé avec puce                      | `text`                                         | —             | —                                                                                       |

### 2.7 Popups métier — signalement

| Composant        | Description                               | Props clés                        | États       | Utilise                                                                                   |
| ---------------- | ----------------------------------------- | --------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `ReportSheet`    | Popup signalement d'erreur sur une phrase | `open`, `phrase`, `tr`, `onClose` | idle · sent | `Modal`, `ModalBar`, `PhraseRef`, `ReportTypeGrid`, `Textarea`, `Button`, `ReportSuccess` |
| `ReportTypeGrid` | Sélecteur du type d'erreur (4 options)    | `value`, `onChange`, `userLang`   | —           | `SelectGrid`                                                                              |
| `ReportSuccess`  | Écran ✅ confirmation après envoi         | `onClose`, `userLang`             | —           | `Button`                                                                                  |

### 2.8 Fin de leçon

| Composant          | Description              | Props clés                                       | États                     | Utilise  |
| ------------------ | ------------------------ | ------------------------------------------------ | ------------------------- | -------- |
| `LessonDoneScreen` | Écran 🏆 leçon maîtrisée | `isReview`, `totalPhrases`, `userLang`, `onBack` | lesson-done · review-done | `Button` |

### 2.9 Test de placement (Phase 4 — à prévoir dès Phase 1)

| Composant               | Description                              | Props clés                                                                                                  | États           | Utilise                                                              |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------- | -------------------------------------------------------------------- |
| `PlacementIntroScreen`  | Écran d'introduction au test             | `lesson`, `userLang`, `onStart`, `onCancel`                                                                 | —               | `Card`, `Button`                                                     |
| `PlacementScreen`       | Écran du test (10 questions)             | `pack`, `sourceLang`, `lessonId`, `onDone`                                                                  | active · done   | `LessonHeader`, `ProgressBar`, `QuizCard`, `ChoiceGrid`, `ActionBar` |
| `PlacementResultScreen` | Résultat du test (réussi / raté)         | `score`, `total`, `passed`, `failedPhrases[]`, `nextAllowedAt`, `userLang`, `onContinue`, `onLearnNormally` | passed · failed | `Card`, `Button`, `FailedPhraseList`                                 |
| `FailedPhraseList`      | Liste des phrases ratées avec correction | `phrases[]`, `sourceLang`                                                                                   | —               | `ComplementItem`                                                     |

### 2.10 Gestion des packs

| Composant            | Description                                         | Props clés                                                       | États                             | Utilise                                       |
| -------------------- | --------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------- | --------------------------------------------- |
| `PackDownloadScreen` | Écran de téléchargement d'un pack                   | `targetLang`, `lessonId`, `userLang`, `onDownloaded`, `onCancel` | idle · downloading · done · error | `Card`, `ProgressBar`, `Button`, `ErrorState` |
| `PackProgressBar`    | Barre de progression du téléchargement              | `downloaded`, `total`, `percent`                                 | —                                 | `ProgressBar`, `Badge`                        |
| `PackManagerScreen`  | Écran de gestion des packs installés                | `packs[]`, `onDelete`                                            | —                                 | `PackItem`, `SectionLabel`                    |
| `PackItem`           | Ligne d'un pack installé avec taille et suppression | `pack`, `size`, `onDelete`                                       | —                                 | `Card`, `Button`, `Badge`                     |

### 2.11 À propos & contribution

| Composant            | Description                                  | Props clés                                             | États           | Utilise                                                                  |
| -------------------- | -------------------------------------------- | ------------------------------------------------------ | --------------- | ------------------------------------------------------------------------ |
| `AboutScreen`        | Page À propos complète                       | `appVersion`, `userLang`, `onBack`                     | —               | `AppHeader`, `ContributeSection`, `ContributeCard`, `ExternalLinkButton` |
| `ContributeSection`  | Bloc "Participez au projet"                  | `userLang`                                             | —               | `SectionLabel`, `ContributeCard` ×6                                      |
| `ContributeCard`     | Carte d'une forme de contribution            | `emoji`, `title`, `description`, `ctaLabel`, `onClick` | default · hover | `Card`, `Button`                                                         |
| `ExternalLinkButton` | Bouton lien externe (Privacy, Contact, etc.) | `label`, `icon`, `href`                                | —               | `Button`                                                                 |
| `AppVersionBadge`    | Affichage version de l'app                   | `version`                                              | —               | `Badge`                                                                  |

### 2.12 Dev tools (DEV uniquement)

| Composant       | Description                     | Props clés                                     | États | Condition                        |
| --------------- | ------------------------------- | ---------------------------------------------- | ----- | -------------------------------- |
| `DevToolsPanel` | Panneau 🛠 avec actions de test | `onValidatePhrase`, `onCompleteAll`, `onReset` | —     | `import.meta.env.DEV` uniquement |

---

## 3. Hooks personnalisés

| Hook               | Signature                                 | Rôle                                                             |
| ------------------ | ----------------------------------------- | ---------------------------------------------------------------- |
| `useGame`          | `(pack, sourceLang, lessonId, isReview?)` | Logique quiz : pool actif, scoring, avancement, fin de leçon     |
| `usePack`          | `(targetLang, lessonId)`                  | Chargement pack apprentissage + pack traduction depuis IndexedDB |
| `usePackDownload`  | `(targetLang, lessonId)`                  | Téléchargement d'un pack depuis le CDN avec progression          |
| `useProgress`      | `(targetLang, lessonId)`                  | Lecture / écriture / reset de la progression locale              |
| `useAudio`         | `(pack, targetLang, lessonId)`            | Lecture audio depuis IndexedDB via Web Audio API                 |
| `useI18n`          | `(sourceLang)`                            | Accès aux chaînes UI du pack app, avec fallback FR               |
| `useLangName`      | `(langCode, userLang)`                    | Résolution du nom d'une langue selon la langue UI                |
| `useActiveLangs`   | `()`                                      | Liste des langues actives, ajout, suppression                    |
| `useManifest`      | `()`                                      | Lecture du manifeste embarqué (UUID des packs disponibles)       |
| `usePlacementTest` | `(targetLang, lessonId)`                  | Logique du test de placement (tirage, scoring, cooldown)         |
| `useReview`        | `(pack, sourceLang, progress)`            | Initialisation et logique du mode révision                       |
| `useToast`         | `()`                                      | Affichage et gestion des toasts (queue, durée)                   |

---

## 4. Contextes React

| Contexte          | Contenu                               | Consommé par                 |
| ----------------- | ------------------------------------- | ---------------------------- |
| `UserLangContext` | Langue source active de l'utilisateur | Tous les composants i18n     |
| `ManifestContext` | Manifeste des packs embarqué          | `usePack`, `usePackDownload` |
| `ToastContext`    | Queue des notifications toast         | `useToast`, `Toast`          |

---

## 5. Ordre d'implémentation suggéré

```
Sprint 1 — Fondations
  Contextes (UserLangContext, ToastContext)
  Atomes : Button, ProgressBar, Badge, Flag, Pill, Spinner, Tag
  Molécules : Toast, Modal, BottomSheet, ConfirmDialog, SelectGrid

Sprint 2 — Layout & navigation
  Card, PageWrapper, AppLayout
  AppHeader, BackButton, Hero, SectionLabel
  Hooks : useI18n, useLangName, useManifest, useActiveLangs
  Routing infrastructure : React Router v6 setup, route shell et compatibilité Capacitor back button (prépare Phase 2)

Sprint 3 — Dashboard & sélection de langue
  DashboardScreen, LangCard, AddLangButton, LangPickerModal
  AddLangScreen, LangOptionCard

Sprint 4 — Accueil langue
  Hooks : useProgress, usePackDownload
  PackDownloadScreen, PackProgressBar
  LangHomeScreen, LangHero, StartResumeBar, ReviewButton
  LessonList, LessonCard, PlacementTestButton, ProgressSummary

Sprint 5 — Cœur du quiz
  Hooks : useGame, useAudio, useReview
  LessonScreen, ActivePool, PoolItem
  QuizCard, PhraseLabel, ChoiceGrid, ChoiceButton, PhoneticLabel
  ActionBar, FeedbackBanner, AudioPlayIcon
  LessonDoneScreen

Sprint 6 — Popups métier
  GrammarSheet, PhraseRef, GrammarSection, ComplementSection
  ReportSheet, ReportTypeGrid, ReportSuccess

Sprint 7 — Test de placement
  Hook : usePlacementTest
  PlacementIntroScreen, PlacementScreen, PlacementResultScreen, FailedPhraseList

Sprint 8 — Gestion des packs & À propos
  PackManagerScreen, PackItem
  AboutScreen, ContributeSection, ContributeCard, ExternalLinkButton

Sprint 9 — Finalisation
  DevToolsPanel (DEV only)
  Tests Vitest (scénarios Phase 1)
  Capacitor build Android
```

---

## 6. Récapitulatif

| Catégorie                             | Nombre |
| ------------------------------------- | ------ |
| Atomes (design system)                | 11     |
| Molécules (design system)             | 13     |
| Organismes techniques (design system) | 5      |
| Composants fonctionnels               | 47     |
| Hooks personnalisés                   | 12     |
| Contextes React                       | 3      |
| **Total**                             | **91** |
