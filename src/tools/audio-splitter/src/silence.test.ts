import { describe, expect, it } from "vitest";
import { computeSegments, parseSilenceDetectOutput } from "./silence.js";

describe("parseSilenceDetectOutput", () => {
  it("pairs silence_start/silence_end markers", () => {
    const stderr = `
[silencedetect] silence_start: 2.5
[silencedetect] silence_end: 4.1 | silence_duration: 1.6
[silencedetect] silence_start: 10
[silencedetect] silence_end: 12.25 | silence_duration: 2.25
`;
    expect(parseSilenceDetectOutput(stderr)).toEqual([
      { start: 2.5, end: 4.1 },
      { start: 10, end: 12.25 },
    ]);
  });

  it("throws when starts and ends counts don't match", () => {
    const stderr = "[silencedetect] silence_start: 2.5\n";
    expect(() => parseSilenceDetectOutput(stderr)).toThrow(/Mismatched/);
  });
});

describe("computeSegments", () => {
  it("returns the non-silent ranges with margin applied", () => {
    const duration = 30;
    const silences = [
      { start: 5, end: 7 },
      { start: 15, end: 17 },
    ];
    const segments = computeSegments(duration, silences, 0.1);
    expect(segments).toEqual([
      { start: 0, end: 5.1 },
      { start: 6.9, end: 15.1 },
      { start: 16.9, end: 30 },
    ]);
  });

  it("drops segments shorter than twice the margin", () => {
    const duration = 10;
    const silences = [
      { start: 1, end: 1.05 },
      { start: 1.06, end: 9 },
    ];
    const segments = computeSegments(duration, silences, 0.1);
    expect(segments).toEqual([
      { start: 0, end: 1.1 },
      { start: 8.9, end: 10 },
    ]);
  });
});
