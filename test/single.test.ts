import { generate } from "../src/index";
import { describe, test, expect } from "bun:test";

describe("generate single passphrase", () => {
  test("should generate a passphrase without options", () => {
    const generated = generate();
    expect(typeof generated).toBe("string");
    expect(generated.split("-").length).toBe(4);
  });
});

describe("with options", () => {
  test("should generate a passphrase with size length", () => {
    const generated = generate({ length: 10 });
    expect(typeof generated).toBe("string");
    expect(generated.split("-").length).toBe(10);
  });

  test("should generate all word pattern with numbers: false", () => {
    const generated = generate({ numbers: false }).split("-");
    for (const element of generated) {
      expect(element).toMatch(/[a-zA-Z]/g);
    }
  });

  test("should generate all word pattern with pattern: WWWWW", () => {
    const generated = generate({ pattern: "WWWWW" }).split("-");
    expect(generated.length).toBe(5);
    for (const element of generated) {
      expect(element).toMatch(/[a-zA-Z]/g);
    }
  });

  test("should generate all number pattern with pattern: NNNNN", () => {
    const generated = generate({ pattern: "NNNNN" }).split("-");
    expect(generated.length).toBe(5);
    for (const element of generated) {
      expect(element).toMatch(/\d/g);
    }
  });

  test("should works if pattern equal undefined", () => {
    const generated = generate({ pattern: undefined });
    expect(typeof generated).toBe("string");
    expect(generated.split("-").length).toBe(4);
  });

  test("should generate all uppercase word pattern", () => {
    const generated = generate({ numbers: false, uppercase: true }).split("-");
    for (const element of generated) {
      expect(element).toMatch(/[A-Z]/g);
    }
  });

  test("should generate all titlecase word pattern", () => {
    const generated = generate({ numbers: false, titlecase: true }).split("-");
    for (const element of generated) {
      const perWord = [...element];
      expect(perWord[0]).toMatch(/[A-Z]/g);
      expect(perWord[1]).toMatch(/[a-z]/g);
      expect(perWord[2]).toMatch(/[a-z]/g);
    }
  });

  test("should have different separator", () => {
    const generated = generate({ separator: "_" });
    expect(generated).toContain("_");
  });

  test("should use pattern if length equal also provided", () => {
    const generated = generate({ length: 10, pattern: "WWNWWW" }).split("-");
    expect(generated.length).toBe(6);
  });

  test("should still be uppercase if titlecase equal also true", () => {
    const generated = generate({
      uppercase: true,
      titlecase: true,
      numbers: false,
    }).split("-");
    for (const element of generated) {
      expect(element).toMatch(/[A-Z]/g);
    }
  });

  test("should have all uppercase words and numbers", () => {
    const generated = generate({
      pattern: "WWWNWWNWWN",
      uppercase: true,
      titlecase: true,
      numbers: true,
    }).split("-");
    for (const element of generated) {
      expect(element).toMatch(/[\dA-Z]/g);
    }
  });

  test.only("should have all titlecase words", () => {
    const generated = generate({
      pattern: "WWWWWWW",
      titlecase: true,
    }).split("-");
    console.log(generated);
    for (const element of generated) {
      const perWord = [...element];
      expect(perWord[0]).toMatch(/[\dA-Z]/g);
      expect(perWord[1]).toMatch(/[\da-z]/g);
    }
  });
});

describe("should output error", () => {
  test("should output error for unknown pattern", () => {
    expect(() => generate({ pattern: "AAA" })).toThrowError(
      "Unknown pattern found. Use N or W instead."
    );
  });

  test("should output error for length = 0", () => {
    expect(() => generate({ length: 0 })).toThrowError(
      "Length should be 1 or bigger. It should not be zero or lower."
    );
  });
});
