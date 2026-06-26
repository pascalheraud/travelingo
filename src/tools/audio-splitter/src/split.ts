import { execFile } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { formatOutputFileName } from "./naming.js";
import { computeSegments, detectSilences, getDurationSec, type SilenceRange } from "./silence.js";

const execFileAsync = promisify(execFile);

export const EXPECTED_PHRASE_COUNT = 10;

export const DEFAULT_NOISE_DB = -35;
export const DEFAULT_MIN_SILENCE_DURATION_SEC = 1.5;
export const DEFAULT_MARGIN_SEC = 0.05;

export interface SplitOptions {
  sourcePath: string;
  lessonNum: number;
  version: number;
  destDir: string;
  noiseDb?: number;
  minSilenceDurationSec?: number;
  marginSec?: number;
}

export async function splitLessonAudio(options: SplitOptions): Promise<string[]> {
  const noiseDb = options.noiseDb ?? DEFAULT_NOISE_DB;
  const minSilenceDurationSec = options.minSilenceDurationSec ?? DEFAULT_MIN_SILENCE_DURATION_SEC;
  const marginSec = options.marginSec ?? DEFAULT_MARGIN_SEC;

  const [duration, silences] = await Promise.all([
    getDurationSec(options.sourcePath),
    detectSilences(options.sourcePath, { noiseDb, minSilenceDurationSec }),
  ]);

  const segments = computeSegments(duration, silences, marginSec);

  if (segments.length !== EXPECTED_PHRASE_COUNT) {
    throw new Error(
      `Expected ${EXPECTED_PHRASE_COUNT} phrases but detected ${segments.length} segment(s) in "${options.sourcePath}". ` +
        `Adjust the silence detection thresholds (currently noise=${noiseDb}dB, minDuration=${minSilenceDurationSec}s) and retry.`,
    );
  }

  await mkdir(options.destDir, { recursive: true });

  const outputPaths: string[] = [];
  for (const [index, segment] of segments.entries()) {
    const phraseNum = index + 1;
    const fileName = formatOutputFileName(options.lessonNum, phraseNum, options.version);
    const outputPath = path.join(options.destDir, fileName);
    await extractSegment(options.sourcePath, segment, outputPath);
    outputPaths.push(outputPath);
  }
  return outputPaths;
}

async function extractSegment(sourcePath: string, segment: SilenceRange, outputPath: string): Promise<void> {
  await execFileAsync("ffmpeg", [
    "-y",
    "-i", sourcePath,
    "-ss", segment.start.toFixed(3),
    "-to", segment.end.toFixed(3),
    "-c:a", "libmp3lame",
    "-q:a", "2",
    outputPath,
  ]);
}
