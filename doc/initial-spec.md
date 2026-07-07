# Travelingo — Product Specification

**Version** 0.2
**Stack** React Web · Android via Capacitor (Ionic) · Offline-first
**Date** June 2026

**Code and documentation language:** English (project code and documentation files must be written in English).

---

## 1. Product vision

> "Learn only the phrases you need, at the right moment of your trip."

Travelingo is a travel-phrases learning app, organized by situations (airport, hotel, restaurant…). No theoretical grammar or conjugation — only ready-to-use phrases learned by practice through an adaptive quiz system.

**Key principles:**

- **100% offline** after packs are downloaded — no backend, no account
- **Self-contained packs** distributed from a static CDN
- **No server-side backups** — everything stays on the user's device

---

## 2. Languages

### 2.1 Source languages (user's UI language)

The source language is both the UI language and the reference for phonetics and grammatical explanations.

| Code | Language   | Flag | Phase |
| ---- | ---------- | ---- | ----- |
| fr   | French     | 🇫🇷   | 1     |
| en   | English    | 🇬🇧   | 1     |
| es   | Spanish    | 🇪🇸   | 1     |
| de   | German     | 🇩🇪   | 1     |
| it   | Italian    | 🇮🇹   | 1     |
| ro   | Romanian   | 🇷🇴   | 1     |
| pt   | Portuguese | 🇵🇹   | 1     |
| zh   | Mandarin   | 🇨🇳   | 3     |
| ar   | Arabic     | 🇸🇦   | 3     |
| ja   | Japanese   | 🇯🇵   | 3     |

> Note: The source language does not need to be a language the user is learning. A Mandarin speaker can learn English with phonetics and explanations in Mandarin.

### 2.2 Target languages (languages to learn)

| Code | Language | Flag | Phase |
| ---- | -------- | ---- | ----- |
| en   | English  | 🇬🇧   | 1     |
| fr   | French   | 🇫🇷   | 2     |
| es   | Spanish  | 🇪🇸   | 2     |
| it   | Italian  | 🇮🇹   | 2     |
| de   | German   | 🇩🇪   | 2     |
| ro   | Romanian | 🇷🇴   | 2     |

### 2.3 Phase 1 matrix (launch)

Phase 1: **5 combinations** — all learning combinations target English, except EN→EN.

### 2.4 Phase 2 matrix (expansion)

42 total combinations (6 target languages × 7 source languages, diagonal excluded for the 6 that are also targets).

Note: Portuguese 🇵🇹 is source-only in Phase 2 — it is not a target language initially.

---

## 3. Offline-first architecture

### 3.1 Overview

CDN static distribution (every pack version folder is permanent, see section 5.3)
└── /learning/{targetLang}/
├── v{N}/{targetLang}.json ← one folder per pack version
└── audio/ ← NOT versioned per pack folder, shared by every pack version
├── {lessonId}/
├── p01_001_v1.mp3 ← filename embeds lesson number, phrase id, and its own version
├── p01_002_v1.mp3
└── …
└── /translation/{targetLang}-{sourceLang}/v{N}/
└── {targetLang}-{sourceLang}.json ← lesson content translation
└── /translation/{sourceLang}/v{N}/
└── {sourceLang}.json ← UI strings translation

User device
└── IndexedDB
├── audio:{targetLang}:{lessonId}:{phraseId} → ArrayBuffer MP3
├── packs:{targetLang}:{lessonId} → learning pack JSON
├── packs:{targetLang}:{lessonId}\_{sourceLang} → lesson-content translation pack JSON
├── packs:ui:{sourceLang} → UI strings translation pack JSON
├── progress:{targetLang}:{lessonId} → progress object
└── prefs:\* → user preferences

### 3.2 Pack download flow

1. Fetch `pack.json` from its `v{N}` folder on the CDN
2. For each phrase: fetch `audio/{lessonId}/{phrase.audio}` (the exact versioned filename named by the pack, e.g. `p01_001_v1.mp3` — from the shared, un-versioned `audio/` folder, not from the pack's own `v{N}/` folder)
3. Store everything in IndexedDB
4. Mark the pack as available offline

### 3.3 No backend

- No user account required
- No user data sent to a server (except optional, opt‑in voice recognition in Phase 3)
- Progress is stored locally in IndexedDB
- Error reports → mailto form or external Google Form

---

## 4. Content structure

### 4.1 Lessons

29 lessons per target language, ordered by travel chronology and urgency. The first 10 lessons ship in Phase 1 (launch); lessons 11–29 are planned for a later phase (content expansion). The lesson list in the language home screen displays each lesson's number (its position in this ordering) alongside the emoji and title:

**Phase 1 (launch)**

| #   | Emoji | Title                    |
| --- | ----- | ------------------------ |
| 1   | 💬    | Politeness & basics      |
| 2   | ✈️    | Airport & flights        |
| 3   | 🛂    | Customs & immigration    |
| 4   | 🏨    | Hotel & lodging          |
| 5   | 🚕    | Transport                |
| 6   | 🍽️    | Restaurant & café        |
| 7   | 🗺️    | Getting around           |
| 8   | 🛒    | Shopping                 |
| 9   | 🏥    | Health & emergencies     |
| 10  | 🤝    | Social interactions      |

**Later phase (content expansion)**

| #   | Emoji | Title                    |
| --- | ----- | ------------------------ |
| 11  | 🧩    | To have (all persons)    |
| 12  | 🧩    | To be (all persons)      |
| 13  | 🍻    | Bar & drinks             |
| 14  | 😊    | Meeting people & flirting|
| 15  | 🌍    | Talking about travels    |
| 16  | 🏊    | Swimming, lake & sea     |
| 17  | ⚽    | Sport & stadiums         |
| 18  | 🥖    | Grocery shopping         |
| 19  | 🥦    | Vegetables                |
| 20  | 🥩    | Meats                     |
| 21  | 🍎    | Fruits                    |
| 22  | 😀    | Basic emotions             |
| 23  | 🚗    | Driving a car               |
| 24  | 🏠    | Apartment rental & Airbnb   |
| 25  | 🚌    | Public transport & tickets  |
| 26  | 🐾    | Animals                     |
| 27  | 🔢    | Numbers                     |
| 28  | 🕐    | Telling time                |
| 29  | 📅    | Dates & calendar            |

Lesson 11 ("To have") focuses on the verb "to have" conjugated across all grammatical persons (I, you, he/she/it, we, you plural, they) and genders (masculine/feminine where relevant in the target language), using simple, very common vocabulary.

Lesson 12 ("To be") focuses on the verb "to be" conjugated across all grammatical persons and genders, using simple, very common vocabulary.

Lesson 13 ("Bar & drinks") covers ordering at a bar: beer, wine, cocktails, soft drinks, and common related phrases (ordering, paying, asking for the menu, toasting).

Lesson 14 ("Meeting people & flirting") covers friendly social phrases for meeting and talking to people (girls/boys), introducing yourself, paying a compliment, inviting someone for a drink or to spend time together, and proposing to meet again.

Lesson 15 ("Talking about travels") covers chatting with other travelers: where you're from, where you've been, what's worth seeing, recommending or warning about places, and sharing opinions (what was good, what wasn't).

Lesson 16 ("Swimming, lake & sea") covers vocabulary and phrases for swimming and bathing: pool, lake, sea, beach, asking if swimming is allowed/safe, water temperature, and related common expressions.

Lesson 17 ("Sport & stadiums") covers going to watch sports (football, rugby): stadiums, matches, scores/results, teams, players, buying tickets, and common fan expressions.

Lesson 18 ("Grocery shopping") covers buying food at a supermarket or grocery store: common food items, asking for quantities, finding aisles/sections, prices, and checkout phrases.

Lesson 19 ("Vegetables") covers the names of common vegetables and simple related phrases (asking for/buying vegetables, expressing likes/dislikes).

Lesson 20 ("Meats") covers the names of common meats and cuts (steak, chicken, pork, etc.) and simple related phrases (ordering, asking for cooking preference, buying).

Lesson 21 ("Fruits") covers the names of common fruits and simple related phrases (asking for/buying fruits, expressing likes/dislikes).

Lesson 22 ("Basic emotions") covers expressing basic emotions and feelings with simple, very common words (happy, sad, tired, scared, angry, excited, etc.), across genders where relevant.

Lesson 23 ("Driving a car") covers vocabulary and phrases for driving: renting a car, fuel/gas station, parking, road signs, asking for directions while driving, breakdowns, and basic traffic rules.

Lesson 24 ("Apartment rental & Airbnb") covers vocabulary and phrases for renting an apartment or Airbnb: check-in/check-out, keys, contacting the host, amenities (Wi-Fi, kitchen, washing machine), reporting issues, and house rules.

Lesson 25 ("Public transport & tickets") covers buying and using tickets for trains, buses and metro: single/day tickets, validating a ticket, finding the right line/platform, and hop-on hop-off city bus tours.

### 4.2 Phrases

**26 phrases per lesson**, distributed across 3 pack types (see section 5):

- **Learning pack**: `target` (phrase in target language) + `audio` (MP3) — invariants
- **Translation pack (lesson content)**: `source`, `phonetic`, `grammar`, `complements` — per source language
- **Translation pack (UI strings)**: UI strings only, per source language

Key rule: a single MP3 file per phrase is shared by all users regardless of their UI language. Translations and phonetics are stored in separate packs.

### 4.3 Lesson titles

Translated into all source languages, stored in `pack.json`:

```json
"lesson": {
  "titles": { "fr": "Politesse & bases", "en": "Politeness & basics", … },
  "subs":   { "fr": "Salutations, merci…", "en": "Greetings, thank you…", … }
}
```

### 4.4 Data volume estimates

Phase 1 — Learning packs (EN):
10 lessons × 26 phrases = 260 MP3 × ~24 KB = ~6.2 MB audio
10 learning pack JSON ≈ 200 KB

Phase 1 — Translation packs (EN × 7 source langs):
7 translation packs × 10 lessons = 70 JSON files ≈ 2 MB
(no audio — text only)

Phase 1 — UI translation packs (7 source langs):
7 JSON files ≈ 100 KB

Phase 2 — Additional learning packs (+5 target langs):
5 × 260 MP3 = 1,300 MP3 × ~24 KB = ~31 MB additional audio

Phase 2 — Translation packs (+5 targets × 7 sources):
35 combinations × 10 lessons = 350 JSON files ≈ 10 MB

Total Phase 1: ~8.5 MB | Total Phase 2: ~50 MB (cumulative)

---

## 5. Pack architecture

### 5.1 Three pack types

TYPE 1 — Learning pack
Content: phrases in the target language + audio files
Example: `en/v1` (learn English, version 1)
Shared by all users regardless of UI language

TYPE 2 — Translation pack (lesson content)
Content: translation, phonetic, grammar for the lesson phrases of one learning pack
Example: `de-en/v1` (German learning content, seen by an English speaker — EN translation + EN phonetic)
One per combination (learning pack × user source language)

TYPE 3 — Translation pack (UI strings)
Content: UI strings only (replaces the former "App pack" concept)
Example: `en/v1` (UI strings in English)
One per source language. Versioned and published independently of any target language and of the app build version — a UI string fix doesn't require a new app release to reach users, only a new pack version.

### 5.2 Naming and versioning

Naming convention (logical name = folder name, file name matches the logical name without the version):

```
Learning pack               : {targetLang}/v{N}/{targetLang}.json
Translation pack (lesson)   : {targetLang}-{sourceLang}/v{N}/{targetLang}-{sourceLang}.json
Translation pack (UI)       : {sourceLang}/v{N}/{sourceLang}.json
```

Examples:

```
learning/en/v1/en.json              → learn English, content version 1
translation/en-fr/v1/en-fr.json     → phonetics + translations FR for en/v1
translation/en-pt/v1/en-pt.json     → phonetics + translations PT for en/v1
learning/en/v2/en.json              → learn English, content version 2
translation/en-fr/v2/en-fr.json     → phonetics + translations FR for en/v2

translation/en/v1/en.json           → UI strings, English, version 1
translation/fr/v1/fr.json           → UI strings, French, version 1
translation/en/v2/en.json           → UI strings, English, version 2
```

Compatibility rule:

```
translation/en-fr/v1 is compatible with learning/en/v1 only.
translation/en-fr/v2 is compatible with learning/en/v2 only.

A lesson-content translation pack is always tied to a specific learning pack version.
A UI translation pack is not tied to any learning pack — it only depends on the source language.
```

### 5.3 Versioned archive and distribution

Every pack's JSON is published under its own version folder and **never overwritten** — publishing `v2` adds a new folder next to `v1`, it doesn't replace it. The CDN therefore doubles as a permanent archive of every pack version ever published, addressable by logical name + version alone (no lookup table required):

```
https://cdn.travelingo.app/learning/{targetLang}/v{N}/{targetLang}.json
https://cdn.travelingo.app/translation/{targetLang}-{sourceLang}/v{N}/{targetLang}-{sourceLang}.json
https://cdn.travelingo.app/translation/{sourceLang}/v{N}/{sourceLang}.json
```

Audio is the exception to "one folder per version": MP3s are **not** duplicated into every new `v{N}/` folder, since most pack updates don't touch most recordings. Instead, every version of a learning pack shares one flat, un-versioned audio folder, and each individual MP3 carries its own version in its filename:

```
https://cdn.travelingo.app/learning/{targetLang}/audio/{lessonId}/p{lessonNum}_{phraseNum}_v{M}.mp3
```

The pack JSON's `phrases[].audio` field always names the exact current filename for that phrase (e.g. `"p01_003_v2.mp3"`). Fixing one phrase's recording uploads a new `p01_003_v3.mp3` next to (not over) `p01_003_v2.mp3`, and bumps the learning pack (and its lesson-content translation packs) to a new `v{N}` whose JSON now points `p003`'s `audio` field at the new file — every other phrase's `audio` field, and its file, is untouched. This keeps the audio archive append-only without re-uploading unchanged MP3s on every pack release.

Each pack also carries a **stable UUID** generated at creation, immutable across versions of that same logical pack (e.g. every version of `en` learning pack shares no UUID with `fr`'s, but `en/v1` and `en/v2` are two different UUIDs since they are two distinct, independently archived artifacts — the UUID identifies one specific version, not the logical pack lineage). It is stored inside the pack JSON for integrity/dedup purposes; it is not used for addressing — the version folder path is.

### 5.3bis Multiple voices per language (Phase 5)

A learning pack can declare more than one TTS voice for its target language, so learners hear phrase audio spoken by different voices rather than always the same one.

- The pack JSON carries a `voiceCount` field (integer, default `1`) naming how many voices that learning pack version has audio for.
- `voiceCount: 1` (the default, and the case for every Phase 1–4 pack) keeps today's flat layout unchanged: `audio/{lessonId}/p{lessonNum}_{phraseNum}_v{M}.mp3`.
- `voiceCount > 1` adds one more path segment, a 1-based voice index, between the lesson folder and the filename: `audio/{lessonId}/{voiceIndex}/p{lessonNum}_{phraseNum}_v{M}.mp3`. E.g. with 2 voices, lesson `l04`'s phrase `p001` has `audio/l04/1/p04_001_v1.mp3` and `audio/l04/2/p04_001_v1.mp3` — same filename, sibling voice folders. The pack JSON's `phrases[].audio` field still names only the filename (not the voice folder); the app resolves the full path from `voiceIndex` + `audio`.
- Every phrase in a `voiceCount > 1` pack must have a recording for every voice index from `1` to `voiceCount` — `validator.js` enforces this.
- The quiz picks which voice folder to play from in **round robin**: voice index advances by one (wrapping back to `1`) each time a phrase's audio is played during a quiz session, independent of which phrase or lesson it belongs to. This applies to both the prompt audio and the choice-card replay audio described in section 7.1.
- Audio versioning (section 5.3) and the IndexedDB cache key (section 3.1) both gain `voiceIndex` as an additional dimension when `voiceCount > 1`: `audio:{targetLang}:{lessonId}:{phraseId}:{voiceIndex}` instead of `audio:{targetLang}:{lessonId}:{phraseId}`.

### 5.4 Build manifest

The manifest is embedded in the app build. It declares the app version and references, for every learning pack and UI pack, which version is current:

```json
{
  "appVersion": "a3",
  "uiPackRefs": { "fr": "v3", "en": "v3", "de": "v2", "it": "v2" },
  "learningPacks": [
    {
      "targetLang": "en",
      "version": "v2",
      "uuid": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "lessons": 2,
      "phrases": 20,
      "translationPacks": { "fr": "v2", "de": "v2", "it": "v1", "ro": "v1", "es": "v1", "pt": "v1" }
    }
  ]
}
```

`learningPacks[].translationPacks` lists the current version of the lesson-content translation pack for **every** `SourceLangCode`, not just the user's current UI language — so the app can fetch the right translation pack as soon as the user adds that target language under any source language. `uiPackRefs` lists, for every `SourceLangCode`, the current version of the UI strings pack the app supports — independent of `appVersion` and of any target language.

The app always uses the most recent app version declared in the build. Learning packs, lesson-content translation packs, and UI translation packs can each have independent version numbers.

### 5.5 Pack JSON examples

Learning pack (`learning/{targetLang}/v{N}/{targetLang}.json`) example:

```json
{
  "uuid": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "targetLang": "en",
  "version": "v2",
  "createdAt": "2026-06-01",
  "lessons": [
    {
      "id": "l01",
      "emoji": "💬",
      "phrases": [ { "id": "p001", "target": "Hello", "audio": "p01_001_v1.mp3" }, ... ]
    },
    ...
  ]
}
```

Translation pack — lesson content (`translation/{targetLang}-{sourceLang}/v{N}/{targetLang}-{sourceLang}.json`) example:

```json
{
  "uuid": "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
  "learningPackRef": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "targetLang": "en",
  "sourceLang": "fr",
  "version": "v2",
  "createdAt": "2026-06-01",
  "lessons": [
    {
      "id": "l01",
      "title": "Politeness & basics",
      "subtitle": "Greetings, thank you…",
      "phrases": [ { "id": "p001", "source": "Bonjour", "phonetic": "hé-lo", "grammar": "The most universal English word…", "complements": ["Informal: 'Hi!'", "Very informal: 'Hey!'"] }, ... ]
    }
  ]
}
```

Translation pack — UI strings (`translation/{sourceLang}/v{N}/{sourceLang}.json`) example:

```json
{
  "uuid": "8f14e45f-ceea-367f-a027-7f626c8cf4d7",
  "sourceLang": "fr",
  "version": "v3",
  "createdAt": "2026-06-01",
  "strings": { "appSub": "Learn travel phrases in your language, offline", "validate": "Validate", "quit": "✕ Quit", ... }
}
```

### 5.6 Pack lifecycle

Creation → UUID generated, version assigned (next `v{N}` for that logical pack), pack JSON built
Audio generation → MP3 generated via TTS, added to the learning pack's flat, un-versioned `audio/{lessonId}/` folder as `p{lessonNum}_{phraseNum}_v1.mp3`; the pack JSON's `audio` field names that exact file
Validation → `validator.js` checks completeness and coherence
Publication CDN → upload the pack JSON to its version folder (`learning/{targetLang}/v{N}/`, `translation/{targetLang}-{sourceLang}/v{N}/`, or `translation/{sourceLang}/v{N}/`) and any new/changed MP3s to the shared `audio/{lessonId}/` folder — previously published version folders and audio files are left untouched, so they stay reachable as archive entries
Manifest update → new version added to the app manifest (requires a new build)

Update → new pack JSON version folder published alongside all previous ones (e.g. `learning/fr/v1/` and `learning/fr/v2/` both remain on the CDN forever); if a phrase's audio is fixed, only that phrase gets a new `p{lessonNum}_{phraseNum}_v{M+1}.mp3` file (added, not replacing the old one) and the new pack version's `audio` field points to it
Deprecation → new build points to new versions; app can notify users of updates

### 5.7 App download flow (summary)

User chooses "Learn French"
→ App reads embedded manifest
→ learningPack: fr/v1 (uuid: ...)
→ translationPack (lesson): fr-en/v1 (uuid: ...)
→ translationPack (UI): en/v3 (uuid: ...) ← typically downloaded at first launch, from `uiPackRefs[sourceLang]`

Parallel downloads:
GET /learning/fr/v1/fr.json
GET /learning/fr/audio/l01/p01_001_v1.mp3  ← path comes from the shared audio folder, filename from the pack JSON's `audio` field
GET /translation/fr-en/v1/fr-en.json
GET /translation/en/v3/en.json
…

Store in IndexedDB and mark the pack as offline available.

### 5.8 Pack update detection

The code embeds the manifest referencing all supported packs by version (see 5.4). On each app start (or whenever the manifest is checked), the app compares the pack versions referenced by the manifest against the versions already stored in IndexedDB for the languages the user is learning, and for the user's source language (UI pack).

```
For each targetLang the user is learning:
  manifestVersion = manifest.learningPacks[targetLang].version   (e.g. "v2")
  storedVersion    = IndexedDB packs:{targetLang}.version          (e.g. "v1")

  If manifestVersion != storedVersion:
    → download and store the new learning pack (and the matching lesson-content translation pack, for every source language already in use)
    → the new pack replaces the stored one in IndexedDB (the older version stays archived on the CDN, but the device only ever keeps the current one offline)

For the user's sourceLang:
  manifestUiVersion = manifest.uiPackRefs[sourceLang]              (e.g. "v3")
  storedUiVersion    = IndexedDB packs:ui:{sourceLang}.version      (e.g. "v2")

  If manifestUiVersion != storedUiVersion:
    → download and store the new UI strings pack, replacing the stored one
```

Example: the user is learning English and has `en/v1` stored offline. The manifest now references `en/v2`. The app downloads `en/v2`, replacing `en/v1` in IndexedDB, so the lesson list reflects the new, larger set of lessons.

### 5.9 New content notification

On app open, if the pack update check (5.8) finds that the manifest references lessons not yet present in IndexedDB for an active target language (new pack version adding lessons, not just fixing existing content), the app notifies the user that new content is available and asks whether to download it now. If the user accepts, the app downloads the missing learning pack, its lesson-content translation pack(s), and updates IndexedDB as in 5.8.

Each newly added lesson (one not present in the previously stored pack version) is shown with a distinct pastel background in the lesson list, marking it as new. This highlight is removed the first time the user starts the lesson (not merely views the list) — once started, the lesson reverts to the normal lesson-card style permanently.

Invariant: a new pack version can fix content of an existing lesson (typo in a phrase, re-recorded audio, corrected translation/phonetic/grammar note) and/or add new lessons, but it never changes a lesson's **structure** — the set of `lessonId`s and, within each lesson, its `pNNN` phrase ids already published is stable (phrase ids are unique within their lesson, not pack-wide — every lesson's `phrases` restarts at `p001`); a fix to `target`/`source`/`phonetic`/`grammar`/`complements` replaces that field in place under the same `lessonId`+`pNNN` id. A fix to `audio` is different: it never overwrites the existing MP3 file — it adds a new `p{lessonNum}_{phraseNum}_v{M+1}.mp3` next to the old one (in that lesson's audio folder) and updates that phrase's `audio` field in the new pack version to point to it, so old archived pack versions still resolve to a playable (if outdated) file. Either way, ids are never renumbered or removed. This means progress already recorded against existing lessons (`progress:{targetLang}:{lessonId}`, keyed by phrase id) remains valid after an update; only newly added lessons/phrases start with no progress.

---

## 6. Pack builder — Node.js module

### 6.1 Purpose

Dev tool (Node.js) to generate packs from a source data file (CSV or raw JSON) and publish them to the CDN.

### 6.2 Project layout

```
/pack-builder/
  src/
    build.js  ← CLI entry
    parser.js
    generator.js
    tts.js     ← OpenAI TTS integration
    validator.js
    uploader.js
  templates/
    pack.schema.json
  sources/
    EN_L01.csv
  dist/
```

### 6.3 Source CSV format

CSV with columns: id,target,fr_source,fr_phonetic,fr_grammar,fr_complements,en_source,en_phonetic,…

### 6.4 CLI examples

```bash
# Generate a pack (JSON + audio)
node build.js --lang en --lesson l01 --source sources/EN_L01.csv

# Generate without audio (for tests)
node build.js --lang en --lesson l01 --no-audio

# Validate a pack
node build.js --validate dist/en/l01/pack.json

# Upload to CDN (GitHub Pages branch)
node build.js --upload dist/en/l01/ --cdn github-pages

# All-in-one
node build.js --lang en --lesson l01 --source sources/EN_L01.csv --upload --cdn github-pages
```

### 6.5 Audio generation (tts.js) example

JavaScript snippet showing OpenAI TTS usage (similar to original spec).

### 6.6 Validation (validator.js) summary

Validator checks required fields, translations for required source languages, and presence of audio files before upload.

### 6.7 Output structure

```
dist/en/l01/
  ├── pack.json
  └── audio/
        ├── p01_001_v1.mp3
        └── …
```

---

## 7. Learning mechanics

### 7.1 Adaptive quiz (text mode)

Sliding window: 3 active phrases simultaneously
Mastery threshold: 3 correct answers per phrase
Lesson completion: when all phrases are mastered

Pool behavior:

- Start: 3 active phrases + N waiting
- Correct → score +1; if score = 3 → remove phrase and add a new one
- Incorrect → score reset to 0

### 7.2 Question format

Example UI layout: prompt in source language, 4 choices including phonetic hints; audio plays on selection. Validate → feedback + reveal → continue. Choice cards stay clickable after validation: tapping any of them (correct, wrong, or unselected) replays that phrase's audio without changing the answer or score.

### 7.3 Placement test (Phase 4)

See Roadmap Phase 4.

### 7.4 Review mode

Available once a phrase is mastered (button 🔁 Review):

- Mastered phrases shown in random order
- Threshold = 1 (each phrase seen once, right or wrong)
- Lesson progress is not altered
- One pass per round: each of the lesson's mastered phrases is shown exactly once per review round
- Progress bar tracks phrases answered so far in the round (0 → total reviewed)
- End screen on completion: shows the score (correct answers / total), a 🔄 restart button to shuffle and start a new round, and — only when the score isn't perfect — an incentive message encouraging another attempt
- Entry points: the 🔁 Review tag on a mastered lesson card in the language home (now clickable instead of disabled), the 🔁 Review button on the lesson-done screen (after just mastering a lesson), and re-opening a lesson that is already mastered (skips straight into review instead of redirecting to the language home)

---

## 8. User flows

### 8.1 Navigation

Dashboard
├── Language home (lang_home)
│ └── Lesson (quiz)
│ └── Lesson end
└── Add a language

### 8.2 Dashboard

- Logo 🌍 Travelingo
- UI language button (top-right) → selection popup. Each option is shown in its own language (autonym), never translated into the current UI language — e.g. "English" and "Français" always read the same regardless of the active UI language, so the user can recognize their language at a glance.
- Card per learned language: flag, translated name, overall progress. A learned language matching the user's current UI/source language is hidden here too (diagonal exclusion, §2.4) even if it was added earlier under a different UI language. This is a display filter only — the language stays in `ActiveLangsStore` and its IndexedDB data (packs, progress) is **not** purged (§9 purge rule does not apply); the card reappears with its progress intact as soon as the user switches the UI language away from it.
- Button **+ Choose a new language** → opens the language picker (see 8.2bis)

### 8.2bis Add a language picker

One card per target language, sourced from the manifest's `learningPacks` (§5.4): flag, translated name, and `{lessons} lessons · {phrases} phrases` (the same counts published in the manifest, so the user can see how much content a language currently has — e.g. "0 lessons · 0 phrases" for a target language whose pack isn't produced yet — before adding it). Already-added languages are shown disabled with an "Added" badge. The target language matching the user's current UI/source language is excluded from the list (diagonal exclusion, §2.4 — there is no `target-target` translation pack, so it can never be downloaded).

### 8.3 Language home

Hero: flag + name + source→target pair
Review button if progress > 0
All lessons accessible

### 8.4 Lesson (quiz) layout

Header: lesson number + name (small) · ✕ Quit
Progress bar
Question card + 4 choices with phonetic
Validate → Continue → Feedback
Grammar modal and error report modal available

### 8.5 Grammar modal

Bottom sheet with source→target pair, grammatical explanation and key points

### 8.6 Error report modal

Centered modal with 4 types: phonetic, audio, spelling, translation; optional textarea; submit → external form (Google Form / mailto)

---

## 9. Internationalization

### 9.1 Strict separation

| Layer                               | Content                        |
| ----------------------------------- | ------------------------------ |
| `UI[sourceLang]`                    | Interface texts only           |
| `pack.phrases[i].tr[sourceLang]`    | Translation, phonetic, grammar |
| `pack.lesson.titles[sourceLang]`    | Lesson titles & subtitles      |
| `LANGUAGES[code].names[sourceLang]` | Translated language names      |

### 9.2 UI language switch

- Instant, no reload
- Lesson progress unaffected
- Phonetics and explanations adapt to the active source language

---

## 10. Local persistence

### 10.1 Memory fallback + IndexedDB

Simple in-memory fallback if IndexedDB unavailable; primary storage is IndexedDB.

### 10.2 IndexedDB stores

- `packs` | `{targetLang}:{lessonId}` -> parsed learning pack JSON
- `packs` | `{targetLang}:{lessonId}_{sourceLang}` -> parsed lesson-content translation pack JSON
- `packs` | `ui:{sourceLang}` -> parsed UI strings translation pack JSON
- `audio` | `{targetLang}:{lessonId}:{phraseId}` -> ArrayBuffer MP3
- `progress` | `{targetLang}:{lessonId}` -> progress object
- `prefs` | various keys (voice_consent, ui_lang, active_langs)

None of these keys are qualified by pack version (`vN`) — by design, so that downloading a newer version of a pack simply overwrites the previous one's entry under the same key, with no separate orphan left behind (see 10.5).

### 10.3 Progress structure example

```json
{
  "scores": { "p001": 3, "p002": 1 },
  "doneIds": ["p001"],
  "mode": "text",
  "savedAt": "2026-06-21T10:30:00Z"
}
```

### 10.4 Pack management UI

Settings screen lists downloaded packs with size and delete button; shows total used storage.

### 10.5 IndexedDB purge

The app must not accumulate IndexedDB entries for content it no longer references. Two distinct cases:

1. **A pack version is superseded** (§5.8: the manifest now points to `v{N+1}` instead of `v{N}` for a learning pack, a lesson-content translation pack, or the UI strings pack). Since IndexedDB keys are not version-qualified (10.2), downloading the new version and `set`-ing it under the same key **is** the purge — the old version's bytes are gone the moment the new ones are stored, with nothing left to clean up afterwards. This only holds if every pack-related store key omits the version; if a key were ever made version-qualified (e.g. the historical `appPacks` key keyed by `appVersion`, since fixed to key by `sourceLang` alone — UI pack version is independent of `appVersion`), each new version would leak an orphaned entry under the old key and would need an explicit delete.

2. **A target language is no longer active** (the user removes it from their learned languages, `ActiveLangsStore.remove`). Nothing else ever re-downloads under that `targetLang`, so its entries become permanently unreferenced. The app purges them immediately on removal: every key prefixed `{targetLang}:` is deleted from `learningPacks`, `translationPacks`, `audio`, `progress`, and `placement`. `appPacks` (keyed by `sourceLang`, not `targetLang`) and `prefs` are untouched by this purge — a UI pack stays cached even if the user temporarily has no active target language.

---

## 11. Technical architecture

### 11.1 Stack

- Web: React 18 + Vite
- Mobile: Capacitor 6 (shared code → Android APK / AAB)
- Storage: IndexedDB
- Analytics: PostHog JS
- Monitoring: Sentry JS + Capacitor
- CI/CD: GitHub Actions (debug APK + release AAB)
- Audio TTS: OpenAI TTS (`tts-1`) used by pack-builder
- Distribution: Static CDN (GitHub Pages — `https://pascalheraud.github.io/travelingo/`)
- Voice recognition: Web Speech API (Phase 3, opt-in)
- Backend: None

### 11.2 Android & Play Store publishing

- Primary target: Android via Capacitor 6, single React/Vite build shared by Web and Mobile
- Dev: produce an APK debug installable with `adb install`
- Prod: produce a signed AAB for Google Play Store
- Important Android settings: `versionCode`, `versionName`, `targetSdkVersion`, `minSdkVersion`, `AndroidManifest.xml`, app icons/assets
- Play Store publishing requires screenshots, clear description, privacy policy, signed AAB with keystore managed securely in CI

### 11.3 GitHub Actions — Android workflows

Recommended two workflows:

1. `build-dev.yml` → produces an APK debug artifact
2. `build-release.yml` → manually triggered, produces a signed AAB

Required secrets: `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`, optional `SENTRY_AUTH_TOKEN` for sourcemaps

Release workflow steps: install Node, install deps, build Vite app, `npx cap sync android`, build AAB, sign and verify, upload artifact to GitHub Release

Dev workflow: use npm/Gradle caches, build APK debug, publish artifact for QA

### 11.4 GitHub Actions — CDN (GitHub Pages)

The CDN is hosted on the `gh-pages` branch of the same repository, served at `https://pascalheraud.github.io/travelingo/`. No custom domain is needed — the URL is HTTPS by default and fully compatible with Android and iOS app store policies.

One workflow: `publish-cdn.yml` — manually triggered (workflow_dispatch) with inputs `lang` and `lesson` (e.g. `en`, `l01`).

Steps:
1. Checkout `gh-pages` branch into a `cdn/` subfolder (sparse checkout, no full history)
2. Copy the generated pack files from `src/pack-builder/dist/` into the correct CDN paths
3. Commit and push to `gh-pages` — GitHub Pages redeploys automatically

The `gh-pages` branch contains only CDN assets (JSON packs + MP3 audio). It is never merged into `main`.

Required GitHub setting: repository → Settings → Pages → Source = `gh-pages` branch, root `/`.

CDN base URL used by the app: `https://pascalheraud.github.io/travelingo/` (configured via `VITE_CDN_BASE_URL` env var).

Size limits: GitHub Pages recommends keeping the repo under 1 GB and individual pushes under 100 MB — well within bounds for Phase 1 (≈6 MB audio) and Phase 2 (≈37 MB total).

### 11.5 Observability

- PostHog for analytics: `screen_viewed`, `lesson_started`, `quiz_completed`, `error_shown` — anonymous identifier stored locally, opt-in/out
- Sentry for error monitoring: capture JS exceptions and native crashes via `@sentry/capacitor` — init only in production, filter PII

---

## 12. UX principles

| Principle              | Implementation                               |
| ---------------------- | -------------------------------------------- |
| Offline-first          | Works offline after pack download            |
| Optional account       | No registration required                     |
| Max 3 clicks           | Dashboard → Lang home → Quiz                 |
| Audio on click         | Audio plays when selecting an answer         |
| Contextual phonetics   | Adapted to user source language              |
| Visible progress       | Global bar + per-lesson counter              |
| Non-destructive review | Review mode does not alter lesson progress   |
| Privacy                | No data sent (voice recognition opt-in only) |

---

## 13. Roadmap (summary)

Phase 1 — MVP English + Pack Builder

- Goal: single target language (English), working Pack Builder, minimal app features

Phase 2 — Multilingual extension

- Goal: add 5 more target languages, Portuguese as a source, expand pack matrix

Phase 3 — Voice recognition

- Goal: enable pronunciation practice with opt-in voice recognition

Phase 4 — Placement test

- Goal: allow experienced users to skip lessons via a placement test

Phase 5 — Multiple voices per language

- Goal: record additional TTS voices per target language and play them round-robin during quizzes (see section 5.3bis)

(See detailed items and test scenarios in the full spec.)

---

## 14. About & community contribution

The app includes an About page that invites community contributions: language validation, voice recordings, proposing lessons, reporting corrections, and code contributions via GitHub.

Contribution workflows include forms for validation and voice recording, and PRs for code changes. License to be determined.

---

## 15. Developer tools

A Dev tools panel is available in development only (`import.meta.env.DEV`) and removed by tree-shaking in production builds. Tools include buttons to validate phrases, mark all complete, and reset progress.

To verify removal in production:

```bash
vite build
grep -r "Dev tools" dist/   # should return nothing
```
