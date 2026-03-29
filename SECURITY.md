# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in this skill, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email the maintainer directly or use GitHub's private vulnerability reporting feature
3. Include a description of the vulnerability, steps to reproduce, and potential impact
4. Allow reasonable time for a fix before public disclosure

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.x     | Yes       |

## CSV Data Handling Security

This skill processes ad platform CSV exports (Google Ads, Meta Ads). The following security considerations apply:

### Data Sensitivity

- CSV exports may contain **business-sensitive advertising data** (spend amounts, conversion rates, campaign strategies)
- Files may include **PII** if custom columns or audience data are exported
- Campaign naming conventions may reveal **unreleased products or strategies**

### Processing Safeguards

- CSV files are processed **locally only** — no data is sent to external services beyond the LLM context
- The skill does **not** persist CSV data between sessions unless explicitly saved to `ads/` knowledge store
- Users should **review CSV columns** before processing to ensure no unintended PII is included

### Recommendations

- Store CSV exports in directories excluded from version control (add to `.gitignore`)
- Remove or anonymize PII columns before analysis when possible
- Use the `ads/context.md` knowledge store rather than raw CSVs for long-term reference
- Rotate any API credentials if CSV exports were generated via automated pipelines

### Dependencies

- All dependencies are pinned to major versions and audited in CI via `npm audit --audit-level=high`
- No runtime dependencies — this is a skill definition with test infrastructure only
