export function formatOutputFileName(lessonNum: number, phraseNum: number, version: number): string {
  const lessonPart = String(lessonNum).padStart(2, "0");
  const phrasePart = String(phraseNum).padStart(3, "0");
  return `p${lessonPart}_${phrasePart}_v${version}.mp3`;
}
