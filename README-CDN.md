# Travelingo CDN — Developer guide

The CDN hosts the app's static assets (JSON packs + MP3 audio files).
It is served via **GitHub Pages** from the `gh-pages` branch of this repo.

## URLs

| Environment | Base URL |
|---|---|
| Dev (local) | `http://localhost:5173/fixtures` |
| Production | `https://pascalheraud.github.io/travelingo` |

`VITE_CDN_BASE_URL` is defined in `.env.development` and `.env.production` and injected at build time by Vite. It is consumed in `PacksService.ts` via `import.meta.env.VITE_CDN_BASE_URL`.

## CDN asset structure

```
/learning/{targetLang}/
  v{N}/{targetLang}.json          ← versioned learning pack
  audio/{lessonId}/{file}.mp3     ← shared audio (not versioned per folder)

/translation/{targetLang}-{sourceLang}/
  v{N}/{targetLang}-{sourceLang}.json   ← lesson translation pack

/translation/{sourceLang}/
  v{N}/{sourceLang}.json          ← UI strings translation pack

/audio/
  placeholder.mp3                 ← fallback audio on download error
```

In dev, the same paths are served from `src/frontend/public/fixtures/` by the Vite dev server.

## Publishing a pack to the CDN

Go to the repo **Actions** tab → workflow **"Publish CDN (GitHub Pages)"** → **Run workflow**:

| Input | Example | Description |
|---|---|---|
| `lang` | `en` | Target language code |
| `lesson` | `l01` | Lesson ID (leave empty to publish all lessons for the lang) |

The workflow:
1. Generates packs via the pack-builder (`src/pack-builder/`)
2. Copies the files into the `gh-pages` branch
3. Pushes — GitHub Pages redeploys automatically (~1 min)

## One-time GitHub Pages setup

1. Create the `gh-pages` branch:
   ```bash
   git checkout --orphan gh-pages
   git reset --hard
   echo '{"cdn":true}' > index.json
   git add index.json && git commit -m "init gh-pages"
   git push origin gh-pages
   git checkout main
   ```
2. In the GitHub repo: **Settings → Pages → Source** = `gh-pages` branch, root `/`

## Immutability rules

- Version folders (`v1/`, `v2/`, …) are **never deleted or overwritten** — only new version folders are ever added.
- MP3 files are published **additively** (`rsync --ignore-existing`) — a published audio file remains accessible forever.
- A pack can be updated (new version) **without a new app release**.

## GitHub Pages size limits

- Recommended repo size: < 1 GB
- Recommended individual push: < 100 MB
- Phase 1 (EN only): ~6 MB audio — well within limits
- Phase 2 (+5 target languages): ~37 MB total — still fine
