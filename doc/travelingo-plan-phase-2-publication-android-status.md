# Travelingo — Phase 2 Status

Tracks progress against `doc/travelingo-plan-phase-2-publication-android.md`.

Last updated: 2026-07-12

## Pre-publication checks

- [x] CDN archive integrity — no mutations detected on existing fixtures
- [x] `languages.ts` versions — all v1, consistent with fixtures on disk
- [x] `npx tsc --noEmit` clean — fixed unused `handleOpenAbout` in `DashboardScreen.tsx`
- [x] Vitest full suite — 333 tests passing (fixed DevPanel.test.tsx toggle state, 2026-07-12)
- [x] Round 2 device feedback — APK from GitHub Actions tested OK (2026-07-12)

## CDN publication

- [ ] Trigger `publish-cdn.yml` on `main` (Actions tab, manual)
- [ ] Verify fixtures accessible at `https://pascalheraud.github.io/travelingo/`
- [ ] Add `src/fixtures/privacy-policy.html` and publish via CDN (required for Play Store)

## Keystore & signing

- [ ] Generate production keystore
- [ ] Add GitHub secrets: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`
- [ ] Trigger `build-release.yml` — `version_name=1.0.0`, `version_code=1`
- [ ] Download and verify signed AAB (`apksigner verify`)

## Google Play Console setup

- [ ] Create developer account at play.google.com/console (25 USD one-time fee)
- [ ] Create app — name: `Travelingo`, language: French, type: App, price: Free

## Play Store listing

- [ ] App name: `Travelingo`
- [ ] Short description (80 chars): `Learn languages for travel — 10-lesson packs, audio phrases, real quiz.`
- [ ] Full description — see guide in conversation (2026-07-12)
- [ ] Icon 512×512 PNG — resize `src/frontend/assets-src/icon-1024.png` (e.g. squoosh.app)
- [ ] Feature graphic 1024×500 PNG — blue gradient + 🌍 + "Travelingo" (Canva or HTML screenshot)
- [ ] Screenshots — minimum 2 phone screenshots: Dashboard, Quiz, LangHome

## Policy & compliance

- [ ] Privacy policy HTML published at `https://pascalheraud.github.io/travelingo/privacy-policy.html`
- [ ] Privacy policy URL entered in Play Console (Policy → App content → Privacy Policy)
- [ ] Data Safety — answer "No" to all data collection questions
- [ ] Content rating — category: Education, answer No to all, target: PEGI 3 / Everyone
- [ ] Target audience — 18+ (or 13+), "appeals primarily to children" → No

## Store metadata

- [ ] Category: Education
- [ ] Contact email: pascalheraud73@gmail.com

## Release

- [ ] Upload AAB in Production release (Release → Production → Create new release)
- [ ] Release name: `1.0.0`
- [ ] Release notes: `Initial release — Learn English and Spanish with audio phrase packs and interactive quizzes.`
- [ ] All left-nav sections green ✅
- [ ] Submit for review (Start rollout to Production) — review takes 3–7 days
