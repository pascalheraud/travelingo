import { describe, expect, it } from "vitest";
import { formatOutputFileName } from "./naming.js";

describe("formatOutputFileName", () => {
  it("pads lesson to 2 digits and phrase to 3 digits", () => {
    expect(formatOutputFileName(1, 1, 1)).toBe("p01_001_v1.mp3");
    expect(formatOutputFileName(10, 9, 2)).toBe("p10_009_v2.mp3");
  });
});
