import { generateMultiple } from "../src/index";
import { describe, expect, test } from "bun:test";
describe("generate multiple passphrase", () => {
  test("should generate 5 multiple passphrase without options", () => {
    const generated = generateMultiple(5);
    expect(typeof generated).toBe("object");
    expect(generated.length).toBe(5);
  });

  test("should generate 25 multiple passphrase without options", () => {
    const generated = generateMultiple(25);
    expect(typeof generated).toBe("object");
    expect(generated.length).toBe(25);
  });

  test("should generate 50 multiple passphrase without options", () => {
    const generated = generateMultiple(50);
    expect(typeof generated).toBe("object");
    expect(generated.length).toBe(50);
  });
});

describe("with options", () => {
  test("should generate multiple passphrase with size length", () => {
    const generated = generateMultiple(5, { length: 10 });
    for (const element of generated) {
      const split = element.split("-");
      expect(typeof element).toBe("string");
      expect(split.length).toBe(10);
    }
  });

  test("should generate multiple all word pattern with numbers: false", () => {
    const generated = generateMultiple(5, { numbers: false });
    for (const element of generated) {
      const split = element.split("-");
      for (const element of split) {
        expect(element).toMatch(/[a-zA-Z]/g);
      }
    }
  });
});
