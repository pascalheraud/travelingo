name: travelingo

# Travelingo — Skill

Purpose: Project-specific guidance for working in the Travelingo repository.

Guidelines:

- Language for code and documentation: English. All code comments, commit messages, PR descriptions and documentation should be written in English.
- Keep documentation concise and linked from `doc/`.
- Use existing project conventions defined in `doc/travelingo-naming.md`.
- For the service pattern, see [[frontend-react-services-pattern]]. This project has no custom hook files at all — components call service methods directly.
- This project requires tests (Vitest is set up in `src/frontend`): per the [[frontend-react]] test coverage rule, every component, service, and store must have a corresponding test file.
- For TypeScript type-checking, follow [[frontend-tsc-readonly]]: always use `npx tsc --noEmit`, never bare `npx tsc`. In this project `tsconfig.json` has no `noEmit`, so a bare `tsc` would emit `.js` siblings next to every source file.
- For French UI strings and JSX text in `services/I18nService.ts` and components (`PhraseRef`, `QuizCard`, `FeedbackBanner`…), follow [[frontend-i18n-french-typography]].

Useful links:

- Specification: `doc/init-spec.md`
- Phase plans: `doc/travelingo-plan-phase1.md`, `doc/travelingo-plan-phase2.md`, `doc/travelingo-phase-publication-android.md`
