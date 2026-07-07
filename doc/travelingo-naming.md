# Travelingo — Naming and Component Organization

---

## 1. General Principles

### 1.1 Naming rules

| Item                    | Convention                         | Example                                          |
| ----------------------- | ---------------------------------- | ------------------------------------------------ |
| React component         | PascalCase                         | `ChoiceButton`, `LangCard`                       |
| Service class           | PascalCase suffixed with `Service` | `GameService`, `I18nService`                     |
| Store class             | PascalCase suffixed with `Store`   | `ActiveLangsStore`, `ProgressStore`               |
| Context                 | PascalCase suffixed with `Context` | `UserLangContext`                                |
| Component file          | PascalCase + `.tsx`                | `ChoiceButton.tsx`                               |
| Service file            | same name as class + `.ts`         | `GameService.ts`                                 |
| Test file               | same name + `.test.ts(x)`          | `GameService.test.ts`, `ChoiceButton.test.tsx`   |
| Styles file (if needed) | same name + `.module.scss`         | `Button.module.scss`                             |
| Constants               | SCREAMING_SNAKE_CASE               | `WIN_TARGET`, `WINDOW_SIZE`                      |
| Interface               | PascalCase                         | `LearningPack`, `GameState`, `ChoiceButtonProps` |
| Type alias              | PascalCase                         | `LessonMode`, `TargetLangCode`, `ReportType`     |

No custom hook files: components hold `useState`/`useCallback` directly and delegate business logic to injected service instances. See [[frontend-react-services-pattern]].

For when a service needs a store on top, see [[frontend-react-services-pattern]]. In this project: `ActiveLangsStore` extends `Store<T>` (single value); `ProgressStore` and `PlacementStore` extend `KeyedStore<T>` (keyed by `${targetLang}:${lessonId}`, loaded from IndexedDB). `GameService`, `I18nService`, `AudioService`, `LangsService` have no store — their logic is stateless or single-reader.

### 1.2 Règle des dossiers

Chaque composant vit dans son propre dossier s'il possède des sous-fichiers (test, stories, styles). S'il est simple (un seul fichier), il peut rester à plat dans son dossier parent.

```
# Composant simple → fichier à plat
/ui/atoms/Button.tsx

# Composant complexe → dossier dédié
/ui/molecules/BottomSheet/
  index.tsx
  BottomSheet.test.tsx
```

### 1.3 Exports

Chaque dossier expose un `index.js` barrel pour des imports propres :

```javascript
// tsconfig.json
vite.config.ts;
src / ui / atoms / index.ts;
export { Button } from "./Button";
export { Badge } from "./Badge";
export { Flag } from "./Flag";
// …

// Usage dans un composant
import { Button, Badge, Flag } from "@/ui/atoms";
```

---

## 2. Folder structure

```
src/
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── index.html
    │
    ├── ui/                          ← Design system (independent from app)
    │   ├── atoms/
    │   │   ├── Button.tsx
    │   │   ├── IconButton.tsx
    │   │   ├── ProgressBar.tsx
    │   │   ├── MiniProgressBar.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Flag.tsx
    │   │   ├── Pill.tsx
    │   │   ├── Spinner.tsx
    │   │   ├── Divider.tsx
    │   │   ├── Tag.tsx
    │   │   ├── StatusDot.tsx
    │   │   └── index.ts
    │   │
    │   ├── molecules/
    │   │   ├── Toast.tsx
    │   │   ├── BottomSheet.tsx
    │   │   ├── Modal.tsx
    │   │   ├── ModalBar.tsx
    │   │   ├── Textarea.tsx
    │   │   ├── SelectGrid.tsx
    │   │   ├── ConfirmDialog.tsx
    │   │   ├── Hero.tsx
    │   │   ├── CardStripe.tsx
    │   │   ├── SectionLabel.tsx
    │   │   ├── InfoBanner.tsx
    │   │   ├── DashedButton.tsx
    │   │   ├── CounterBadge.tsx
    │   │   └── index.ts
    │   │
    │   ├── organisms/
    │   │   ├── Card.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── ErrorState.tsx
    │   │   ├── LoadingState.tsx
    │   │   ├── PageWrapper.tsx
    │   │   └── index.ts
    │   │
    │   └── index.ts                 ← global re-export of design system
    │
    ├── features/                    ← Functional components by domain
    │   ├── layout/                  ← Navigation & global layout
    │   │   ├── AppHeader.tsx
    │   │   ├── LessonHeader.tsx
    │   │   ├── BackButton.tsx
    │   │   ├── AppLayout.tsx
    │   │   └── index.ts
    │   │
    │   ├── dashboard/               ← Multi-language home screen
    │   │   ├── DashboardScreen.tsx
    │   │   ├── LangCard.tsx
    │   │   ├── AddLangButton.tsx
    │   │   ├── LangPickerModal.tsx
    │   │   └── index.ts
    │   │
    │   ├── lang-select/             ← Add a new target language
    │   │   ├── AddLangScreen.tsx
    │   │   ├── LangOptionCard.tsx
    │   │   └── index.ts
    │   │
    │   ├── lang-home/               ← Target language home
    │   │   ├── LangHomeScreen.tsx
    │   │   ├── LangHero.tsx
    │   │   ├── StartResumeBar.tsx
    │   │   ├── ReviewButton.tsx
    │   │   ├── LessonList.tsx
    │   │   ├── LessonCard.tsx
    │   │   ├── PlacementTestButton.tsx
    │   │   ├── ProgressSummary.tsx
    │   │   └── index.ts
    │   │
    │   ├── lesson/                  ← Adaptive quiz
    │   │   ├── LessonScreen.tsx
    │   │   ├── ActivePool.tsx
    │   │   ├── PoolItem.tsx
    │   │   ├── QuizCard.tsx
    │   │   ├── PhraseLabel.tsx
    │   │   ├── ChoiceGrid.tsx
    │   │   ├── ChoiceButton.tsx
    │   │   ├── PhoneticLabel.tsx
    │   │   ├── ActionBar.tsx
    │   │   ├── FeedbackBanner.tsx
    │   │   ├── AudioPlayIcon.tsx
    │   │   ├── LessonDoneScreen.tsx
    │   │   └── index.ts
    │   │
    │   ├── grammar/                 ← Grammar & etymology popup
    │   │   ├── GrammarSheet.tsx
    │   │   ├── PhraseRef.tsx
    │   │   ├── GrammarSection.tsx
    │   │   ├── ComplementSection.tsx
    │   │   ├── ComplementItem.tsx
    │   │   └── index.ts
    │   │
    │   ├── report/                  ← Reporting errors
    │   │   ├── ReportSheet.tsx
    │   │   ├── ReportTypeGrid.tsx
    │   │   ├── ReportSuccess.tsx
    │   │   └── index.ts
    │   │
    │   ├── placement/               ← Placement test
    │   │   ├── PlacementIntroScreen.tsx
    │   │   ├── PlacementScreen.tsx
    │   │   ├── PlacementResultScreen.tsx
    │   │   ├── FailedPhraseList.tsx
    │   │   └── index.ts
    │   │
    │   ├── packs/                   ← Packs download & management
    │   │   ├── PackDownloadScreen.tsx
    │   │   ├── PackProgressBar.tsx
    │   │   ├── PackManagerScreen.tsx
    │   │   ├── PackItem.tsx
    │   │   └── index.ts
    │   │
    │   ├── about/                   ← About & contribution page
    │   │   ├── AboutScreen.tsx
    │   │   ├── ContributeSection.tsx
    │   │   ├── ContributeCard.tsx
    │   │   ├── ExternalLinkButton.tsx
    │   │   ├── AppVersionBadge.tsx
    │   │   └── index.ts
    │   │
    │   └── dev/                     ← Development tools (DEV only)
    │       ├── DevToolsPanel.tsx
    │       └── index.ts
    │
    ├── contexts/                    ← React contexts
    │   ├── UserLangContext.tsx
    │   ├── ManifestContext.tsx
    │   ├── ToastContext.tsx
    │   └── index.ts
    │
    ├── services/                    ← Business logic, no React (injectable classes)
    │   ├── IdbService.ts            ← IndexedDB (get/set/del/clear)
    │   ├── PacksService.ts          ← Loading packs, simulating downloads
    │   ├── AudioService.ts          ← Web Audio playback
    │   ├── GameService.ts           ← Quiz logic (pool, score, shuffle)
    │   ├── PlacementService.ts      ← Placement test logic
    │   ├── ProgressService.ts       ← Lesson progress persistence
    │   ├── ActiveLangsService.ts    ← Active target languages persistence
    │   ├── I18nService.ts           ← UI strings per source language
    │   ├── LangsService.ts          ← Language name lookups
    │   ├── Store.ts                 ← Store / KeyedStore base classes (useSyncExternalStore)
    │   ├── ActiveLangsStore.ts      ← Reactive store over ActiveLangsService
    │   ├── ProgressStore.ts         ← Reactive store over ProgressService (keyed)
    │   ├── PlacementStore.ts        ← Reactive store over PlacementService (keyed)
    │   └── index.ts                 ← composition root: singleton instances
    │
    ├── models.ts                    ← All TypeScript types (single file)
    │                                   LearningPack, TranslationPack, AppPack
    │                                   LessonProgress, GameState, PlacementResult
    │                                   UserPreferences, ReportPayload
    │                                   IDB_STORES, WIN_TARGET, WINDOW_SIZE…
    │
    ├── utils/                       ← Pure utilities
    │   ├── levenshtein.ts           ← Levenshtein distance (Phase 3)
    │   ├── normalize.ts             ← String normalization
    │   ├── date.ts                  ← Date formatting
    │   └── index.ts
    │
    └── App.tsx                      ← Main router (screen management)
```

---

## 3. Naming conventions per feature

### 3.1 Standard suffixes

| Suffix    | Meaning                       | Examples                                                   |
| --------- | ----------------------------- | ---------------------------------------------------------- |
| `Screen`  | Full-screen page              | `LessonScreen`, `DashboardScreen`, `PlacementResultScreen` |
| `Card`    | Clickable or informative card | `LangCard`, `LessonCard`, `ChoiceButton`                   |
| `Sheet`   | Bottom sheet (slide up)       | `GrammarSheet`, `ReportSheet`                              |
| `Modal`   | Centered popup                | `LangPickerModal`, `ConfirmDialog`                         |
| `List`    | List of multiple items        | `LessonList`, `FailedPhraseList`                           |
| `Item`    | List element                  | `PoolItem`, `PackItem`, `ComplementItem`                   |
| `Bar`     | Horizontal bar                | `ActionBar`, `PackProgressBar`, `StartResumeBar`           |
| `Banner`  | Full-width banner             | `FeedbackBanner`, `InfoBanner`                             |
| `Section` | Grouped content block         | `GrammarSection`, `ContributeSection`, `ComplementSection` |
| `Button`  | Button with specific behavior | `ReviewButton`, `AddLangButton`, `PlacementTestButton`     |
| `Label`   | Text-only display             | `PhraseLabel`, `PhoneticLabel`, `SectionLabel`             |
| `Grid`    | Selection grid                | `ChoiceGrid`, `ReportTypeGrid`                             |
| `Panel`   | Utility panel                 | `DevToolsPanel`                                            |
| `Badge`   | Informational badge           | `AppVersionBadge`, `CounterBadge`                          |
| `Ref`     | Référence à une phrase/entité | `PhraseRef`                                                |
| `Icon`    | Icône seule avec logique      | `AudioPlayIcon`                                            |
| `Hero`    | Bloc hero illustré            | `LangHero`                                                 |

### 3.2 Préfixes par domaine

| Préfixe      | Domaine                            | Exemples                                         |
| ------------ | ---------------------------------- | ------------------------------------------------ |
| `Lang`       | Langue (sélection, carte, accueil) | `LangCard`, `LangHero`, `LangHomeScreen`         |
| `Lesson`     | Leçon (liste, carte, écran)        | `LessonCard`, `LessonScreen`, `LessonDoneScreen` |
| `Choice`     | Réponses du quiz                   | `ChoiceGrid`, `ChoiceButton`                     |
| `Quiz`       | Carte de question                  | `QuizCard`                                       |
| `Grammar`    | Popup grammaire                    | `GrammarSheet`, `GrammarSection`                 |
| `Report`     | Signalement                        | `ReportSheet`, `ReportTypeGrid`, `ReportSuccess` |
| `Placement`  | Test de placement                  | `PlacementScreen`, `PlacementResultScreen`       |
| `Pack`       | Gestion des packs                  | `PackItem`, `PackDownloadScreen`                 |
| `App`        | Niveau application                 | `AppHeader`, `AppLayout`, `AppVersionBadge`      |
| `Contribute` | Contribution communautaire         | `ContributeCard`, `ContributeSection`            |

---

## 3.3 Props des composants

Chaque composant fonctionnel définit une interface `Props` dans le même fichier :

```tsx
// LessonCard.tsx
import type {
  LessonMeta,
  TranslationLessonMeta,
  LessonProgress,
  PlacementResult,
} from "@/models";

interface LessonCardProps {
  lesson: LessonMeta;
  meta: TranslationLessonMeta;
  progress?: LessonProgress;
  placement?: PlacementResult;
  onStart: () => void;
  onTest: () => void;
}

export function LessonCard({
  lesson,
  meta,
  progress,
  placement,
  onStart,
  onTest,
}: LessonCardProps) {
  // …
}
```

**Conventions pour les props :**

| Cas                    | Convention                             | Exemple                             |
| ---------------------- | -------------------------------------- | ----------------------------------- |
| Prop optionnelle       | Suffixe `?`                            | `progress?: LessonProgress`         |
| Callback               | Préfixe `on` + PascalCase              | `onSelect`, `onClose`, `onValidate` |
| Booléen                | Préfixe `is` ou `has`                  | `isReview`, `hasProgress`           |
| Render prop / children | `children: React.ReactNode`            | —                                   |
| Ref forwardée          | `React.forwardRef<HTMLElement, Props>` | —                                   |

---

## 3.4 Service injection in components

A service is injected as a prop, defaulted to its composition-root singleton. The component owns all `useState`/`useCallback`; the service only computes/persists. See [[frontend-react-services-pattern]] for the full pattern.

```tsx
// QuizCard.tsx
import { useState, useCallback } from 'react';
import { gameService, GameService } from '@services';
import type { GameState, AnswerResult } from '@/models';

interface QuizCardProps {
  initialGame: GameState;
  game?:       GameService;
}

export function QuizCard({ initialGame, game = gameService }: QuizCardProps) {
  const [state, setState]       = useState<GameState>(initialGame);
  const [selected, setSelected] = useState<string | null>(null);

  const onValidate = useCallback((): AnswerResult | null => {
    const current = state.active[0];
    if (!current || !selected) return null;
    const { result, nextGame } = game.applyAnswer(state, current, selected);
    setState(nextGame);
    return result;
  }, [game, state, selected]);

  // …
}
```

---

## 3.5 Configuration TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target":           "ES2020",
    "lib":              ["ES2020", "DOM", "DOM.Iterable"],
    "module":           "ESNext",
    "moduleResolution": "bundler",
    "jsx":              "react-jsx",
    "strict":           true,
    "noUnusedLocals":   true,
    "noUnusedParameters": true,
    "paths": {
      "@/*":          ["./*"],
      "@ui/*":        ["./ui/*"],
      "@features/*":  ["./features/*"],
      "@contexts/*":  ["./contexts/*"],
      "@services":    ["./services/index.ts"],
      "@services/*":  ["./services/*"],
      "@utils/*":     ["./utils/*"]
    }
  },
  "include": ["."]
}
```

---

## 4. Alias d'import (vite.config.ts)

```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@':          path.resolve(__dirname),
      '@ui':        path.resolve(__dirname, 'ui'),
      '@features':  path.resolve(__dirname, 'features'),
      '@contexts':  path.resolve(__dirname, 'contexts'),
      '@services':  path.resolve(__dirname, 'services'),
      '@utils':     path.resolve(__dirname, 'utils'),
      '@types':     path.resolve(__dirname, 'types'),
    }
  }
});
```

**Exemples d'imports :**

```javascript
import { Button, Badge, Flag }          from '@ui/atoms';
import { Modal, BottomSheet }           from '@ui/molecules';
import { LessonCard }                   from '@features/lang-home';
import { ChoiceGrid, ChoiceButton }     from '@features/lesson';
import { gameService, progressService } from '@services';
import { UserLangContext }              from '@contexts';
import type { LearningPack, GameState } from '@/models';
import { IDB_STORES }                   from '@/models';
```

---

## 5. Conventions de fichiers de test

```
src/
├── services/
│   ├── GameService.ts
│   └── GameService.test.ts    ← test unitaire de la logique pure
│
├── features/lesson/
│   ├── ChoiceButton.tsx
│   └── ChoiceButton.test.tsx  ← test du composant (render + interactions)
```

**Règle** : les tests unitaires (services, utils) sont en `.test.ts`. Les tests de composants (avec rendu JSX) sont en `.test.tsx`. Pas de dossier `__tests__` séparé — les tests vivent à côté du code qu'ils testent.

```ts
// GameService.test.ts — test unitaire (logique pure, pas de JSX)
import { describe, it, expect } from "vitest";
import { GameService } from "./GameService";

// ChoiceButton.test.tsx — test composant (rendu JSX)
import { render, screen, fireEvent } from "@testing-library/react";
import { ChoiceButton } from "./ChoiceButton";
```

---

## 6. Récapitulatif des conventions

```
src/tsconfig.json
src/vite.config.ts
src/index.html
src/package.json
src/ui/           → Design system générique
src/features/     → Composants métier organisés par domaine
src/contexts/     → Contextes React (état éphémère, pas de persistance)
src/services/     → Logique métier injectable, classes (IndexedDB, audio, game, stores)
src/types/        → Définitions de types (JSDoc)
src/utils/        → Fonctions utilitaires pures, génériques

PascalCase        → Composants, Contextes, Types, Services (*Service), Stores (*Store)
camelCase         → Utils, instances singleton des services/stores
SCREAMING_SNAKE   → Constantes locales à un fichier (WIN_TARGET, WINDOW_SIZE)
kebab-case        → Noms de dossiers features (lang-home, lang-select)
```

Pas de `constants/` ni de `hooks/` au niveau racine : une constante reste co-localisée avec son unique consommateur jusqu'à ce qu'un deuxième apparaisse (voir [[frontend-react-folder-structure]]), et ce projet n'a aucun hook personnalisé (voir §1.1).
