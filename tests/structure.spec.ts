import { test, expect } from "@playwright/test";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const exists = (rel: string) => existsSync(resolve(ROOT, rel));
const read = (rel: string) => readFileSync(resolve(ROOT, rel), "utf-8");

// ---------------------------------------------------------------------------
// File existence
// ---------------------------------------------------------------------------
test.describe("File existence", () => {
  const requiredFiles = [
    "SKILL.md",
    "README.md",
    "package.json",
    "tsconfig.json",
    "playwright.config.ts",
    ".prettierrc",
    ".gitignore",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "references/ad_metrics.md",
    "references/platform_csv_formats.md",
    "references/csv_operations.md",
    "templates/ad_context.md",
    "templates/ad_report.md",
  ];

  for (const file of requiredFiles) {
    test(`${file} exists`, () => {
      expect(exists(file)).toBe(true);
    });
  }
});

// ---------------------------------------------------------------------------
// Directory structure
// ---------------------------------------------------------------------------
test.describe("Directory structure", () => {
  test("references/ directory exists", () => {
    expect(exists("references")).toBe(true);
  });

  test("templates/ directory exists", () => {
    expect(exists("templates")).toBe(true);
  });

  test("examples/ directory exists", () => {
    expect(exists("examples")).toBe(true);
  });

  test("tests/ directory exists", () => {
    expect(exists("tests")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// SKILL.md frontmatter
// ---------------------------------------------------------------------------
test.describe("SKILL.md frontmatter", () => {
  const skill = read("SKILL.md");

  test("has valid YAML frontmatter delimiters", () => {
    expect(skill).toMatch(/^---\n[\s\S]+?\n---/);
  });

  test("name is pm-ad-analysis", () => {
    expect(skill).toMatch(/^name:\s*pm-ad-analysis$/m);
  });

  test("type is interactive", () => {
    expect(skill).toMatch(/^type:\s*interactive$/m);
  });

  test("has description field", () => {
    expect(skill).toMatch(/^description:/m);
  });

  test("has best_for list", () => {
    expect(skill).toMatch(/^best_for:/m);
  });

  test("has triggers list with at least 10 entries", () => {
    const triggersMatch = skill.match(/^triggers:\n((?:\s+-\s+.+\n)+)/m);
    expect(triggersMatch).not.toBeNull();
    const count = triggersMatch![1]
      .split("\n")
      .filter((l: string) => l.trim().startsWith("-")).length;
    expect(count).toBeGreaterThanOrEqual(10);
  });
});
