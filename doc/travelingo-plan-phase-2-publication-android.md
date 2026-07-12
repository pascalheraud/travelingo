# Travelingo — Phase 2: Google Play Store Publication

## Context

Phase 1 is complete: the React/Vite/Capacitor 8 app runs on a real Android device, the debug APK build is automated via GitHub Actions (`build-dev.yml`), icons/splash screen are in place, and Android back button / safe area are handled. Phase 2 covers only what remains to publish on the Play Store.

## Already done (Phase 1)

- React/Vite functional, Capacitor 8 synced, `android/` generated.
- `capacitor.config.ts` correct (`appId: com.travelingo.app`, no `server.url`).
- Icons and splash screen generated for all Android densities.
- `AndroidManifest.xml` clean (Kotlin stdlib conflict resolved).
- Debug APK tested on a real device (Sprint 10, round 1).
- CI workflows: `build-dev.yml` (auto debug APK on push) and `build-release.yml` (signed AAB, manual trigger).
- CDN workflow: `publish-cdn.yml` (GitHub Pages, manual trigger).

## Remaining steps

### 1. Round 2 — real device testing

Validate the round 1 fixes (installed in session 10, awaiting user feedback) and handle round 2 feedback before releasing. Block the release if critical regressions are reported.

### 2. CDN archive integrity check

Per `doc/initial-spec.md` §5.3/§5.6 — before any release build, verify that:

- No file under `src/fixtures/learning/*/v*/` or `src/fixtures/translation/*/v*/` already published has been modified (`git diff` against the first commit for those paths must be empty).
- No existing `audio/**/*.mp3` file has been deleted or had its bytes changed.
- New `v{N+1}/` folders or new `.mp3` files are the only allowed differences.

If a mutation is found: revert it and create a new version folder instead of rewriting an existing one.

### 3. CDN publication (GitHub Pages)

Trigger **"Publish CDN (GitHub Pages)"** (`publish-cdn.yml`) manually from the Actions tab on `main`. Verify fixtures are accessible at `https://pascalheraud.github.io/travelingo/`.

### 4. Keystore and GitHub secrets

Generate (or retrieve) the production keystore, then add the following to GitHub → Settings → Secrets → Actions:

- `KEYSTORE_BASE64` — base64-encoded keystore
- `KEYSTORE_PASSWORD`
- `KEY_ALIAS`
- `KEY_PASSWORD`

### 5. Release AAB build

Trigger **"Build Release AAB"** (`build-release.yml`) manually with:

- `version_name`: `1.0.0`
- `version_code`: `1`

Download the signed AAB from the GitHub artifacts and verify it (`apksigner verify`).

### 6. Play Store listing

Required elements for submission:

- **Short description** (80 chars) and **full description** (4,000 chars).
- **Screenshots**: minimum 2 per form factor (phone, optionally tablet) — Dashboard, Quiz, LangHome screens at minimum.
- **High-res icon**: 512×512 PNG (already in `assets-src/`).
- **Privacy policy**: publicly accessible URL (must be hosted — current `href="#"` are placeholders).
- **Data Safety**: declare data collected/shared per dependencies (Sentry if enabled, analytics if added).
- **Release notes** (What's new) for version 1.0.0.

### 7. Analytics and monitoring (optional before release)

- Sentry and analytics must be enabled **in production only** (`import.meta.env.PROD`).
- If not configured before the initial release, document their absence in the Data Safety form.

## Pre-submission checklist

- [ ] Round 2 device feedback validated (no blocking regressions).
- [ ] CDN archive integrity verified (step 2).
- [ ] CDN published and accessible (step 3).
- [ ] Signed AAB produced and verified (step 5).
- [ ] Privacy policy accessible at a public URL.
- [ ] `npx tsc --noEmit` clean in `src/frontend`.
- [ ] Full Vitest suite green (327 tests).

## Out of scope for Phase 2

- Multilingual content expansion (target packs FR, ES, IT, DE, RO) → next phase.
- Placement test → Phase 4 (decided in Phase 1).
- Voice features → later phase.
- iOS / App Store publication → later phase.
