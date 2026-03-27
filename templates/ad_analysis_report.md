# Ad Analysis Report: [Title]

**Date**: [YYYY-MM-DD]
**Decision**: [What decision does this analysis inform?]
**Channels**: [Google / Meta / ASA / TikTok / Cross-channel]
**Data Sources**: [CSV export / MCP / manual]

---

## Executive Summary
[1 sentence: Period and channels covered]
[1 sentence: Key finding — translated to KPI impact]
[1 sentence: Recommended action]
Confidence: [High/Medium/Low] — [plain-language reason]

Total Spend: [amount] | Conversions: [count] | Blended CPA: [amount] | ROAS: [X]

---

## Portfolio Performance (if multi-channel)

| Channel | Spend | Conv. | CPA | ROAS | Marginal ROI | Trend |
|---------|-------|-------|-----|------|-------------|-------|
| Google | | | | | | [up/down/flat] |
| Meta | | | | | | |
| ASA | | | | | | |
| TikTok | | | | | | |
| **Total** | | | | | | |

---

## Key Findings

| # | Finding | Confidence | Effect Size | Business Impact (LTV/CAC) | Level |
|---|---------|------------|-------------|--------------------------|-------|
| 1 | | | | | |

---

## Guardrail Check

```
- [ ] Learning phase: excluded from analysis
- [ ] Attribution windows: consistent across channels
- [ ] Currency: unified
- [ ] Seasonality: comparable periods
- [ ] LAT/SKAN: accounted for (if app)
- [ ] Budget shift: <30% per channel
- [ ] Creative sample size: sufficient
```

---

## Confidence Scoring

| Axis | Score | Reason |
|------|-------|--------|
| Statistical significance | /3 | |
| Effect size | /3 | |
| Sample size | /3 | |
| Data quality | /3 | |
| **Subtotal** | /12 | |
| Ad-specific penalties | -[n] | [reason] |
| **Adjusted Total** | /12 | High (10-12) / Medium (7-9) / Low (<=6) |

---

## So What?
[What this means for the business — tied to CPA/ROAS/LTV targets]

## Now What?

| Priority | Action | Channel | Expected Impact | Effort | Approval Needed? |
|----------|--------|---------|----------------|--------|-----------------|
| 1 | | | | | |

---

## Budget Forecast

At current efficiency:
- +[amount] additional spend -> ~[X] more conversions at ~[CPA]
- -[amount] budget reduction -> ~[X] fewer conversions, save [amount]

---

## Creative Performance (if applicable)

| Creative ID | Channel | Format | CTR | CVR | Status | Action |
|------------|---------|--------|-----|-----|--------|--------|
| | | | | | active/fatigued | |

---

## Additional Data Needed (if Medium/Low confidence)
- [data 1]
- [data 2]

## Limitations
- [What this analysis cannot tell you]
- [Attribution model limitations]
- [Data gaps]

---

## Reproduction

### Data Source
- Platform: [Google Ads / Meta Ads / ASA / TikTok]
- Export date: [date]
- Date range: [start ~ end]
- File: [path]

### Code
```python
import pandas as pd
# Full analysis pipeline
```

### Re-run Instructions
1. Export fresh CSV from [platform] > Reports > [report name]
2. Run code above with new file path
3. Compare to previous: [key metric] was [value]
