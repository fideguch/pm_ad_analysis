import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const read = (rel: string) => readFileSync(resolve(ROOT, rel), "utf-8");

// ---------------------------------------------------------------------------
// SKILL.md core sections
// ---------------------------------------------------------------------------
test.describe("SKILL.md core sections", () => {
  const skill = read("SKILL.md");

  test("has Resource Loading section", () => {
    expect(skill).toContain("## Resource Loading");
  });

  test("has Operational Rules section", () => {
    expect(skill).toContain("## Operational Rules");
  });

  test("has Autonomous Routing section", () => {
    expect(skill).toContain("## Autonomous Routing");
  });

  test("has Knowledge Store section", () => {
    expect(skill).toContain("## Knowledge Store");
  });

  test("has Pre-Flight Guardrail Checks", () => {
    expect(skill).toContain("## Pre-Flight Guardrail Checks");
  });

  test("has Confidence Scoring", () => {
    expect(skill).toContain("## Confidence Scoring");
  });

  test("has Delegation Table", () => {
    expect(skill).toContain("## Delegation Table");
  });

  test("has Language Support section", () => {
    expect(skill).toContain("## Language Support");
  });

  test("does not reference pm-ad-operations delegation", () => {
    expect(skill).not.toMatch(/DELEGATE to pm-ad-operations/);
    expect(skill).not.toMatch(/delegate to pm-ad-operations/);
  });

  test("references csv_operations.md for CSV handling", () => {
    expect(skill).toContain("references/csv_operations.md");
  });
});

// ---------------------------------------------------------------------------
// csv_operations.md core sections
// ---------------------------------------------------------------------------
test.describe("csv_operations.md core sections", () => {
  const csv = read("references/csv_operations.md");

  test("has Data Ingestion + Platform Detection section", () => {
    expect(csv).toContain("## Data Ingestion + Platform Detection");
  });

  test("has Campaign Health Check section", () => {
    expect(csv).toContain("## Campaign Health Check");
  });

  test("has Optimization Recommendations section", () => {
    expect(csv).toContain("## Optimization Recommendations");
  });

  test("has Industry Benchmarks section", () => {
    expect(csv).toContain("## Industry Benchmarks");
  });

  test("has PM-Friendly Glossary section", () => {
    expect(csv).toContain("## PM-Friendly Glossary");
  });

  test("has Known Limitations section", () => {
    expect(csv).toMatch(/Known Limitations/);
  });

  test("has Error Handling section", () => {
    expect(csv).toMatch(/Error Handling/);
  });
});

// ---------------------------------------------------------------------------
// Platform detection columns (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Platform detection", () => {
  const csv = read("references/csv_operations.md");

  test("documents Google Ads CSV indicators", () => {
    expect(csv).toContain("Google Ads CSV indicators");
  });

  test("documents Meta Ads CSV indicators", () => {
    expect(csv).toContain("Meta Ads CSV indicators");
  });
});

// ---------------------------------------------------------------------------
// Metric normalization table (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Metric normalization", () => {
  const csv = read("references/csv_operations.md");
  const unifiedMetrics = ["Spend", "Clicks", "Conversions", "CPA", "CVR", "CPM"];

  for (const metric of unifiedMetrics) {
    test(`unified metric "${metric}" is documented`, () => {
      expect(csv).toContain(metric);
    });
  }
});

// ---------------------------------------------------------------------------
// Waste detection rules (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Waste detection", () => {
  const csv = read("references/csv_operations.md");

  test("documents zero-conversion campaign detection", () => {
    expect(csv).toMatch(/zero.conversion/i);
  });

  test("documents CPA threshold (2x target)", () => {
    expect(csv).toContain("CPA > 2x target");
  });

  test("documents CTR threshold for Google Search", () => {
    expect(csv).toContain("CTR < 0.5%");
  });

  test("documents frequency threshold for Meta", () => {
    expect(csv).toContain("Frequency > 3.0");
  });
});
