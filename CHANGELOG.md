# Changelog

All notable changes to pm-ad-analysis will be documented in this file.

## [1.1.0] - 2026-03-28

### Added

- Error Handling & Recovery section (6 failure modes with detection/recovery)
- Test split into 3 files: structure, content, scenarios
- 50+ scenario tests with Given-When-Then pattern
- Scenarios covering: routing, platform detection, waste detection, health scoring, budget reallocation, reporting, benchmarks, delegation, glossary, creative recommendations, error handling

### Changed

- Test organization from monolithic to categorized structure

## [1.0.0] - 2026-03-28

### Added

- SKILL.md with 5 Capabilities (Hearing, Data Ingestion, Health Check, Optimization, Executive Report)
- Autonomous routing with decision rules
- Knowledge Store architecture (ads/ directory)
- Google Ads and Meta Ads CSV platform detection
- Metric normalization across platforms
- Waste detection with 6 auto-scan rules
- Budget reallocation algorithm
- Creative and audience recommendations
- Industry benchmarks (Google Ads Search, Meta Ads)
- PM-Friendly Glossary (9 terms)
- Delegation to other skills (pm-data-analysis, cro-methodology, etc.)
- Quality infrastructure (Playwright tests, TypeScript, Prettier, CI)
- Example: Google Ads Search campaign (15-row CSV + report)
- Example: Meta Ads Retargeting campaign (15-row CSV + report)
- references/ad_metrics.md and references/platform_csv_formats.md
- templates/ad_context.md and templates/ad_report.md
