import { describe, expect, it } from "vitest";
import { parseArgs } from "./cli.js";

describe("parseArgs", () => {
  it("returns null when called with no arguments", () => {
    expect(parseArgs([])).toBeNull();
  });

  it("parses the 4 positional arguments", () => {
    expect(parseArgs(["raw.mp3", "1", "2", "dest/"])).toEqual({
      sourcePath: "raw.mp3",
      lessonNum: 1,
      version: 2,
      destDir: "dest/",
    });
  });

  it("throws when the argument count is wrong", () => {
    expect(() => parseArgs(["raw.mp3"])).toThrow(/Expected 4 arguments/);
  });

  it("throws when lessonNum or version aren't integers", () => {
    expect(() => parseArgs(["raw.mp3", "x", "2", "dest/"])).toThrow(/lessonNum/);
    expect(() => parseArgs(["raw.mp3", "1", "x", "dest/"])).toThrow(/version/);
  });
});
