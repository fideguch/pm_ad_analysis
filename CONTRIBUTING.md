# Contributing to pm-ad-analysis

## Development Setup

```bash
npm install
```

## Quality Commands

```bash
npm test           # Run Playwright regression tests
npm run typecheck  # TypeScript type checking
npm run format     # Auto-format with Prettier
npm run quality    # typecheck + format:check
```

## Making Changes

### SKILL.md Changes

When modifying SKILL.md, ensure:

1. YAML frontmatter remains valid (name, type, description, best_for, triggers)
2. All 5 Capabilities are documented (Hearing, Data Ingestion, Health Check, Optimization, Report)
3. Platform detection columns for Google Ads and Meta Ads are present
4. Metric normalization table covers all unified metrics
5. Waste detection rules include thresholds
6. Industry benchmarks table is current
7. PM-Friendly Glossary covers core ad terms

### Adding Examples

Place in `examples/<platform-campaign-type>/` with:

- `input.csv` — realistic sample data (15 rows minimum)
- `ad_report.md` — analysis output with Reproduction section
- `README.md` — Japanese description of the example

### Test Requirements

- All tests must pass before merge: `npm test`
- Tests validate SKILL.md structure, not runtime behavior
- Add tests when adding new SKILL.md sections

## Commit Convention

Use Conventional Commits:

```
feat: add TikTok Ads CSV detection
fix: correct Meta Ads frequency threshold
docs: update benchmarks for Q1 2026
test: add waste detection threshold tests
```
