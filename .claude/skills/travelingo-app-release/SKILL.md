name: travelingo-app-release

# Travelingo — App release (new app version)

Purpose: prepare a new app build version (`appVersion`, e.g. `a1` → `a2`): verify the CDN archive wasn't mutated, then update the embedded manifest stub.

Trigger: the user asks to prepare, cut, or build a new app version/release (e.g. "prépare la version a2", "build a new app release", "on sort une nouvelle version de l'app").

Inputs: current `appVersion` and `LEARNING_LANGUAGES`/`USER_LANGUAGES` in `src/frontend/languages.ts`.

## Steps

1. **Verify the CDN archive wasn't mutated.** Per `doc/initial-spec.md` §5.3/§5.6, every already-published pack version folder and every already-published audio file are permanent and append-only — a release must never ship a change to something previously published. Check, for every existing `vN` folder under `src/frontend/public/fixtures/learning/*/v*/` and `src/frontend/public/fixtures/translation/*/v*/`:
   - The JSON content of any version folder that was already part of a previous release is byte-for-byte unchanged (`git diff` against the last release commit/tag for those paths should be empty). If it isn't, stop and ask the user — this is exactly the mistake the versioning scheme exists to prevent (it means a pack was "fixed in place" instead of getting a new version folder, see [[travelingo-pack-generation]]).
   - No file under `learning/*/audio/**/*.mp3` was deleted or had its bytes changed. New `pLL_NNN_v{M+1}.mp3` files are fine (additive); a `pLL_NNN_v{M}.mp3` changing or disappearing is not.
   - Any new `v{N+1}` folder or new audio file is exactly what should differ — that's the actual content of this release, not a violation.

2. **Confirm `src/frontend/languages.ts` matches the highest version on disk.** For every target language, `LEARNING_LANGUAGES[].version` and `.translationPacks[sourceLang]` must point at the highest `vN` folder that actually exists under `learning/{targetLang}/` and `translation/{targetLang}-{sourceLang}/` respectively — not necessarily the newest version produced during this release if some packs weren't touched. Same for `USER_LANGUAGES[sourceLang]` against `translation/{sourceLang}/v{N}/`.

3. **Bump `appVersion`.** Update the `appVersion` field wherever it's set for the build (currently hardcoded in `src/frontend/contexts/ManifestContext.tsx`'s `STUB_MANIFEST`) to the next `a{N}`. Only do this if the release actually changes app code/behavior, not just pack content — a pack-only update (new lesson, fixed audio) doesn't require an `appVersion` bump on its own, since learning/translation/UI pack versions are independent of the app build version (§5.4).

4. **Typecheck.** Run `npx tsc --noEmit` in `src/frontend` after any edit (never bare `tsc`, see [[travelingo]]).

5. **CDN publication (GitHub Pages).** After the archive verification passes, publish the new/changed packs to the CDN via the GitHub Actions workflow **"Publish CDN (GitHub Pages)"** (`.github/workflows/publish-cdn.yml`) — trigger it manually from the Actions tab for each affected lang/lesson pair. The CDN base URL is `https://pascalheraud.github.io/travelingo/`, served from the `gh-pages` branch. The workflow syncs `src/frontend/public/fixtures/` (committed to `main`) to `gh-pages` — no secrets required, no audio generation. Do not manually push to `gh-pages`.

6. **App build.** Once the CDN is updated, trigger the appropriate GitHub Actions workflow:
   - **Debug APK** (QA / internal testing): **"Build Dev APK"** (`.github/workflows/build-dev.yml`) — also triggered automatically on every push to `main`.
   - **Production AAB** (Play Store): **"Build Release AAB"** (`.github/workflows/build-release.yml`) — manual trigger, requires `version_name` (e.g. `1.0.0`) and `version_code` (integer, increment each release). Requires secrets `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD` configured in repo Settings → Secrets → Actions.

## CDN / env config

- Dev: `VITE_CDN_BASE_URL=http://localhost:5173/fixtures` (`.env.development`) — assets served from `src/frontend/public/fixtures/` by Vite dev server.
- Prod: `VITE_CDN_BASE_URL=https://pascalheraud.github.io/travelingo` (`.env.production`) — injected at `npm run build`, consumed in `PacksService.ts`.
- See `README-CDN.md` at repo root for the full CDN developer guide.

## Notes

- This skill checks the archive invariant; it does not generate or fix pack content itself — use [[travelingo-pack-generation]] for that, before running this skill's verification.
- If step 1 finds a mutation of an already-published version, the fix is to revert that file and instead publish the change as a new version folder (or a new `_v{M+1}.mp3`) — never to let the release ship with a rewritten archive entry.
- CDN updates (new packs, fixed audio) do not require an `appVersion` bump — they are independent of the app build version (§5.4).
