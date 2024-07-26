import { generate, generateMultiple } from "../src/index";
import { describe, expect, test } from "bun:test";

describe("should be fast! - single", () => {
  test("generate single passphrase - normal", () => {
    const generated = generate({ fast: true });
    expect(typeof generated).toBe("string");
    expect(generated.split("-").length).toBe(4);
  });

  test("generate single passphrase - with options", () => {
    const generated = generate({ length: 20, fast: true, numbers: true });
    expect(typeof generated).toBe("string");
    expect(generated.split("-").length).toBe(20);
  });
});

describe("should be fast! - multiple", () => {
  test("generate multiple passphrase - normal", () => {
    const generated = generateMultiple(20, { fast: true });
    expect(typeof generated).toBe("object");
    expect(generated.length).toBe(20);
  });

  test("generate multiple passphrase - with options", () => {
    const generated = generateMultiple(20, {
      length: 20,
      fast: true,
      numbers: true,
    });
    expect(typeof generated).toBe("object");
    expect(generated.length).toBe(20);
  });
});
