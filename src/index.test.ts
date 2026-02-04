import { describe, expect, it } from "bun:test";

import { joyful } from "./index";

describe("joyful", () => {
  describe("default behavior", () => {
    it("returns a string with 2 words separated by hyphen by default", () => {
      const result = joyful();
      const words = result.split("-");
      expect(words).toHaveLength(2);
    });

    it("returns different results on multiple calls (randomness)", () => {
      const results = new Set<string>();
      for (let i = 0; i < 20; i += 1) {
        results.add(joyful());
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe("segments parameter", () => {
    it("generates 3 words when segments is 3", () => {
      const result = joyful(3);
      const words = result.split("-");
      expect(words).toHaveLength(3);
    });

    it("generates 5 words when segments is 5", () => {
      const result = joyful(5);
      const words = result.split("-");
      expect(words).toHaveLength(5);
    });

    it("throws error when segments is less than 2", () => {
      expect(() => joyful(1)).toThrow("Need at least 2 words");
    });

    it("throws error when segments is 0", () => {
      expect(() => joyful(0)).toThrow("Need at least 2 words");
    });

    it("throws error when segments is negative", () => {
      expect(() => joyful(-1)).toThrow("Need at least 2 words");
    });
  });

  describe("separator parameter", () => {
    it("uses underscore as separator when specified", () => {
      const result = joyful(2, "_");
      expect(result).toContain("_");
      expect(result).not.toContain("-");
    });

    it("uses space as separator when specified", () => {
      const result = joyful(2, " ");
      expect(result).toContain(" ");
    });

    it("uses custom string as separator", () => {
      const result = joyful(2, "---");
      expect(result).toContain("---");
    });

    it("throws error when separator is empty string", () => {
      expect(() => joyful(2, "")).toThrow("Need a separator");
    });
  });

  describe("word uniqueness", () => {
    it("does not contain duplicate words", () => {
      for (let i = 0; i < 50; i += 1) {
        const result = joyful(5);
        const words = result.split("-");
        const uniqueWords = new Set(words);
        expect(uniqueWords.size).toBe(words.length);
      }
    });
  });

  describe("word format", () => {
    it("all words are lowercase", () => {
      for (let i = 0; i < 20; i += 1) {
        const result = joyful(3);
        const words = result.split("-");
        for (const word of words) {
          expect(word).toBe(word.toLowerCase());
        }
      }
    });

    it("all words are non-empty strings", () => {
      for (let i = 0; i < 20; i += 1) {
        const result = joyful(3);
        const words = result.split("-");
        for (const word of words) {
          expect(word.length).toBeGreaterThan(0);
        }
      }
    });
  });
});
