import { test, expect } from "@playwright/test";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const read = (rel: string) => readFileSync(resolve(ROOT, rel), "utf-8");
const exists = (rel: string) => existsSync(resolve(ROOT, rel));

// ---------------------------------------------------------------------------
// Scenario: Autonomous Routing
// ---------------------------------------------------------------------------
test.describe("Scenario: Autonomous Routing", () => {
  const skill = read("SKILL.md");

  test("Given .claude_ad_memory missing, When invoked, Then onboarding or hearing triggered", () => {
    expect(skill).toMatch(/\.claude_ad_memory.*exists/is);
  });

  test("Given CSV attached, When invoked, Then csv_operations.md loaded internally", () => {
    expect(skill).toMatch(/CSV.*attached.*csv_operations|csv_operations.*CSV/is);
  });

  test("Given .claude_ad_memory exists, When user has specific request, Then skip hearing", () => {
    expect(skill).toMatch(/\.claude_ad_memory.*exists.*skip/is);
  });
});

// ---------------------------------------------------------------------------
// Scenario: Platform Detection (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Scenario: Platform Detection", () => {
  const csv = read("references/csv_operations.md");

  test("Given Google Ads CSV, When detecting, Then Campaign/Ad group columns identified", () => {
    expect(csv).toMatch(/Campaign.*Ad group/i);
  });

  test("Given Meta Ads CSV, When detecting, Then Campaign name/Ad set name columns identified", () => {
    expect(csv).toMatch(/Campaign name.*Ad set name/i);
  });
});

// ---------------------------------------------------------------------------
// Scenario: Waste Detection (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Scenario: Waste Detection", () => {
  const csv = read("references/csv_operations.md");

  test("Given campaign data, When waste scan runs, Then 6 waste rules checked", () => {
    expect(csv).toMatch(/zero.conversion/i);
    expect(csv).toMatch(/CPA > 2x/);
    expect(csv).toMatch(/CTR < 0\.5%/);
    expect(csv).toMatch(/Frequency > 3\.0/);
    expect(csv).toMatch(/[Ss]earch terms/);
    expect(csv).toMatch(/[Aa]udience overlap/);
  });

  test("Given waste found, When reporting, Then action column included", () => {
    expect(csv).toMatch(/Pause or restructure|Reduce budget/);
  });
});

// ---------------------------------------------------------------------------
// Scenario: Health Score Framework (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Scenario: Health Score Framework", () => {
  const csv = read("references/csv_operations.md");

  test("Given campaign metrics, When scored, Then CRITICAL/WARN/OK thresholds applied", () => {
    expect(csv).toMatch(/CRITICAL.*50%/);
    expect(csv).toMatch(/WARN.*20-50%|20.*50.*worse/i);
    expect(csv).toMatch(/OK.*20%|within 20%/i);
  });
});

// ---------------------------------------------------------------------------
// Scenario: Budget Reallocation (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Scenario: Budget Reallocation", () => {
  const csv = read("references/csv_operations.md");

  test("Given efficiency ranking, When top quartile, Then increase recommended", () => {
    expect(csv).toMatch(/top quartile.*\+20.*50%|\+20-50%/i);
  });

  test("Given efficiency ranking, When bottom quartile, Then pause or reduce recommended", () => {
    expect(csv).toMatch(/bottom quartile.*pause|-50%/i);
  });
});

// ---------------------------------------------------------------------------
// Scenario: Industry Benchmarks (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Scenario: Industry Benchmarks", () => {
  const csv = read("references/csv_operations.md");

  test("Given benchmarks section, When referenced, Then Google Search included", () => {
    expect(csv).toMatch(/Google.*Search/);
  });

  test("Given benchmarks section, When referenced, Then Meta Ads included", () => {
    expect(csv).toMatch(/Meta Ads/);
  });

  test("Given benchmarks, When B2B and B2C, Then both verticals covered", () => {
    expect(csv).toMatch(/B2B/);
    expect(csv).toMatch(/B2C/);
  });
});

// ---------------------------------------------------------------------------
// Scenario: Delegation
// ---------------------------------------------------------------------------
test.describe("Scenario: Delegation", () => {
  const skill = read("SKILL.md");

  test("Given deep statistics needed, When delegating, Then pm-data-analysis referenced", () => {
    expect(skill).toMatch(/pm-data-analysis/);
  });

  test("Given A/B test design needed, When delegating, Then cro-methodology referenced", () => {
    expect(skill).toMatch(/cro-methodology/);
  });

  test("Given CSV analysis needed, When processing, Then handled internally (no pm-ad-operations)", () => {
    expect(skill).not.toMatch(/delegate.*pm-ad-operations/i);
  });
});

// ---------------------------------------------------------------------------
// Scenario: Knowledge Store
// ---------------------------------------------------------------------------
test.describe("Scenario: Knowledge Store", () => {
  const skill = read("SKILL.md");

  test("Given knowledge store, When structured, Then ads/ directory documented", () => {
    expect(skill).toContain("ads/");
  });

  test("Given knowledge store, When structured, Then .claude_ad_memory/ documented", () => {
    expect(skill).toContain(".claude_ad_memory/");
  });

  test("Given analysis complete, When auto-save, Then history updated", () => {
    expect(skill).toMatch(/history/);
    expect(skill).toMatch(/auto.*update|auto-update/i);
  });
});

// ---------------------------------------------------------------------------
// Scenario: PM-Friendly Glossary (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Scenario: PM-Friendly Glossary", () => {
  const csv = read("references/csv_operations.md");
  const terms = [
    "CPA",
    "ROAS",
    "CTR",
    "CVR",
    "CPM",
    "Frequency",
    "Impression Share",
    "Quality Score",
    "Learning Phase",
  ];

  for (const term of terms) {
    test(`glossary includes "${term}"`, () => {
      expect(csv).toContain(term);
    });
  }
});

// ---------------------------------------------------------------------------
// Scenario: Error Handling (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Scenario: Error Handling", () => {
  const csv = read("references/csv_operations.md");

  test("Given CSV column mismatch, When detected, Then recovery documented", () => {
    expect(csv).toMatch(/column.*mismatch|mismatch.*column/i);
  });

  test("Given missing conversion data, When detected, Then proxy metrics suggested", () => {
    expect(csv).toMatch(/[Mm]issing.*conversion/);
  });

  test("Given learning phase, When detected, Then exclusion recommended", () => {
    expect(csv).toMatch(/[Ll]earning.*phase/);
  });

  test("Given error, When displayed, Then includes what/why/next format", () => {
    expect(csv).toMatch(/what happened.*why.*what to do|Error Message Format/i);
  });
});

// ---------------------------------------------------------------------------
// Scenario: Creative Recommendations (in csv_operations.md)
// ---------------------------------------------------------------------------
test.describe("Scenario: Creative Recommendations", () => {
  const csv = read("references/csv_operations.md");

  test("Given performance data, When analyzing creatives, Then winner detection documented", () => {
    expect(csv).toMatch(/[Ww]inner.*detection/);
  });

  test("Given declining CTR, When analyzing, Then fatigue detection documented", () => {
    expect(csv).toMatch(/[Ff]atigue.*detection/);
  });
});

// ---------------------------------------------------------------------------
// Scenario: Project Infrastructure
// ---------------------------------------------------------------------------
test.describe("Scenario: Project Infrastructure", () => {
  test("CHANGELOG.md exists and has version entries", () => {
    expect(exists("CHANGELOG.md")).toBe(true);
    const changelog = read("CHANGELOG.md");
    expect(changelog).toMatch(/## \[\d+\.\d+\.\d+\]/);
  });

  test("SECURITY.md exists", () => {
    expect(exists("SECURITY.md")).toBe(true);
    const security = read("SECURITY.md");
    expect(security.length).toBeGreaterThan(100);
  });

  test("SKILL.md capability specs table has at least 10 capabilities", () => {
    const skill = read("SKILL.md");
    const capabilities = skill.match(/^\| \d+\./gm) ?? [];
    expect(capabilities.length).toBeGreaterThanOrEqual(10);
  });
});
