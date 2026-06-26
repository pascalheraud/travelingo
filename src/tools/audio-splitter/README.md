# audio-splitter

Splits an MP3 file containing the 10 phrases of a lesson (separated by silences) into 10 individual MP3 files, named according to the Travelingo pack convention (see `doc/tool-audio-splitter-spec.md` and `doc/initial-spec.md`).

## How it works

1. Reads the source file's total duration via `ffprobe`.
2. Detects silences using the `ffmpeg silencedetect` filter (noise threshold and minimum duration are configurable; defaults: -35dB, 1.5s).
3. Derives the 10 non-silent segments (the phrases), adding a small margin on each side so the start/end of a phrase isn't cut off.
4. If the number of detected segments isn't exactly 10, the script fails with an explicit error message (segment count found + thresholds used) instead of writing a partial result.
5. Cuts each segment via `ffmpeg -ss/-to` and exports it as MP3 into the destination folder, created if it doesn't exist.

## Requirements

- Node.js (version pinned in `.nvmrc`)
- `ffmpeg` and `ffprobe` installed and available on the `PATH` (on Ubuntu: `sudo apt install ffmpeg`)

## Install

```
cd src/tools/audio-splitter
npm install
```

## Run

```
npm run split -- <source.mp3> <lessonNum> <version> <destDir>
```

| Parameter    | Example   | Description                                                            |
|--------------|-----------|--------------------------------------------------------------------------|
| `source.mp3` | `raw.mp3` | Source MP3 containing the 10 phrases separated by silences              |
| `lessonNum`  | `1`       | Lesson number (integer)                                                  |
| `version`    | `1`       | Audio version `vX` (integer, without the `v` prefix)                    |
| `destDir`    | `audio/l01/` | Destination folder for the 10 split files                            |

Concrete example, for lesson 1 of the English pack:

```
npm run split -- raw_lesson1.mp3 1 1 ../../frontend/public/fixtures/learning/en/audio/l01/
```

Produces:

```
p01_001_v1.mp3
p01_002_v1.mp3
...
p01_010_v1.mp3
```

Called with no arguments, the script prints this same usage reminder and exits without error:

```
npm run split
```

## If splitting fails (segment count != 10)

The error message reports the number of segments detected and the thresholds used. If needed, adjust the defaults in `src/split.ts` (`DEFAULT_NOISE_DB`, `DEFAULT_MIN_SILENCE_DURATION_SEC`) — for example if the silences between phrases are shorter, or if the recording has more background noise than -35dB.

## Tests

```
npm test
```

Tests the pure logic (parsing `silencedetect` output, segment computation, output file naming, CLI argument parsing) without depending on an installed `ffmpeg` binary.

## Type checking

```
npm run typecheck
```

## Out of scope

- Does not modify the pack JSON (phrases' `audio` field) or `src/frontend/languages.ts` — see the `travelingo-pack-generation` skill for the rest of the pipeline.
- Does not generate audio (no TTS): only splits an already-recorded file.
- No volume normalization or other audio processing beyond silence-based splitting.
