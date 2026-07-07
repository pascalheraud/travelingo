import { splitLessonAudio } from "./split.js";

const USAGE = `Usage: audio-splitter <source.mp3> <lessonNum> <version> <destDir>

Splits a single MP3 containing 10 phrases separated by silences into 10
individual MP3 files named p{lessonNum}_{phraseNum}_v{version}.mp3.

Example:
  audio-splitter raw_lesson1.mp3 1 1 src/fixtures/learning/en/audio/l01/`;

export interface ParsedArgs {
  sourcePath: string;
  lessonNum: number;
  version: number;
  destDir: string;
}

export function parseArgs(argv: string[]): ParsedArgs | null {
  if (argv.length === 0) {
    return null;
  }
  if (argv.length !== 4) {
    throw new Error(`Expected 4 arguments, got ${argv.length}.\n\n${USAGE}`);
  }
  const [sourcePath, lessonNumRaw, versionRaw, destDir] = argv;
  const lessonNum = Number.parseInt(lessonNumRaw, 10);
  const version = Number.parseInt(versionRaw, 10);
  if (Number.isNaN(lessonNum)) {
    throw new Error(`lessonNum must be an integer, got "${lessonNumRaw}"`);
  }
  if (Number.isNaN(version)) {
    throw new Error(`version must be an integer, got "${versionRaw}"`);
  }
  return { sourcePath, lessonNum, version, destDir };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args === null) {
    console.log(USAGE);
    return;
  }

  const outputPaths = await splitLessonAudio({
    sourcePath: args.sourcePath,
    lessonNum: args.lessonNum,
    version: args.version,
    destDir: args.destDir,
  });

  for (const outputPath of outputPaths) {
    console.log(outputPath);
  }
}

const isMainModule = process.argv[1] !== undefined && import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  main().catch((error: Error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
