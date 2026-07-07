import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface SilenceRange {
  start: number;
  end: number;
}

export interface SilenceDetectOptions {
  noiseDb: number;
  minSilenceDurationSec: number;
}

export async function getDurationSec(sourcePath: string): Promise<number> {
  const { stdout } = await execFileAsync("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "csv=p=0",
    sourcePath,
  ]);
  const duration = Number.parseFloat(stdout.trim());
  if (Number.isNaN(duration)) {
    throw new Error(`Unable to read duration of "${sourcePath}"`);
  }
  return duration;
}

export async function detectSilences(
  sourcePath: string,
  options: SilenceDetectOptions,
): Promise<SilenceRange[]> {
  const filter = `silencedetect=noise=${options.noiseDb}dB:d=${options.minSilenceDurationSec}`;
  const args = ["-i", sourcePath, "-af", filter, "-f", "null", "-"];
  // ffmpeg writes silencedetect markers to stderr regardless of exit code.
  const stderr = await execFileAsync("ffmpeg", args)
    .then((result) => result.stderr)
    .catch((error: { stderr?: string }) => {
      if (error.stderr === undefined) {
        throw error;
      }
      return error.stderr;
    });
  return parseSilenceDetectOutput(stderr);
}

export function parseSilenceDetectOutput(stderr: string): SilenceRange[] {
  const starts = [...stderr.matchAll(/silence_start:\s*(-?\d+(?:\.\d+)?)/g)].map((m) => Number.parseFloat(m[1]));
  const ends = [...stderr.matchAll(/silence_end:\s*(-?\d+(?:\.\d+)?)/g)].map((m) => Number.parseFloat(m[1]));
  if (starts.length !== ends.length) {
    throw new Error(
      `Mismatched silence_start/silence_end count in ffmpeg output (${starts.length} starts, ${ends.length} ends) — the source file may not end on silence`,
    );
  }
  return starts.map((start, i) => ({ start, end: ends[i] }));
}

export function computeSegments(
  durationSec: number,
  silences: SilenceRange[],
  marginSec: number,
): SilenceRange[] {
  const sorted = [...silences].sort((a, b) => a.start - b.start);
  const boundaries: number[] = [0];
  for (const silence of sorted) {
    boundaries.push(silence.start, silence.end);
  }
  boundaries.push(durationSec);

  const segments: SilenceRange[] = [];
  for (let i = 0; i < boundaries.length; i += 2) {
    const rawStart = boundaries[i];
    const rawEnd = boundaries[i + 1];
    if (rawEnd - rawStart <= marginSec * 2) {
      continue;
    }
    segments.push({
      start: Math.max(0, rawStart - marginSec),
      end: Math.min(durationSec, rawEnd + marginSec),
    });
  }
  return segments;
}
