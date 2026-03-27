# Ad Analysis Report: [Title]

**Date**: [YYYY-MM-DD]
**Decision**: [What decision does this analysis inform?]
**Channels**: [Google / Meta / ASA / TikTok / Cross-channel]
**Data Sources**: [CSV export / MCP / manual]

---

## Hypothesis
**We hypothesized**: [If we do X, then Y metric will improve by Z% because of mechanism W.]
**Result**: [Confirmed / Partially confirmed / Rejected / Insufficient data]

## Executive Summary
[1 sentence: Period and channels covered]
[1 sentence: Key finding — translated to KPI impact]
[1 sentence: Recommended action]
Confidence: [High/Medium/Low] — [plain-language reason]

Total Spend: [amount] | Conversions: [count] | Blended CPA: [amount] (95% CI: [lo]–[hi]) | ROAS: [X]

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

## Sensitivity Analysis

| Scenario | CPM Change | CPA Impact | ROAS Impact | Conversions Impact |
|----------|-----------|-----------|------------|-------------------|
| Baseline | 0% | $[X] | [Y]x | [N] |
| CPM +20% | +20% | $[X+a] | [Y-b]x | [N-c] |
| CPM -20% | -20% | $[X-a] | [Y+b]x | [N+c] |
| CVR +10% | — | $[X-d] | [Y+e]x | [N+f] |
| Budget +30% | — | $[X+g] (diminishing returns) | [Y-h]x | [N+i] |

## LTV / Unit Economics Translation

```
Current CPA: $[X]
Estimated LTV: $[Y] (from pm-saas-economics or user input)
LTV:CAC ratio: [Y/X] (target: >3.0)
Payback period: [N] months
Break-even CPA: $[Y / target_LTV_CAC_ratio]

→ "At current CPA of $[X], each customer pays back in [N] months.
   Maximum acceptable CPA for 3x LTV:CAC: $[break-even]."
```

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

→ Full framework: `references/reproducibility.md`

### Environment
- Python: [version]
- pandas: [version]
- scipy: [version] (if used)
- Random seed: 42 (if Monte Carlo/bootstrap used)

### Data Version
- Platform: [Google Ads / Meta Ads / ASA / TikTok]
- Export method: [CSV manual / API / MCP]
- Export date: [YYYY-MM-DD HH:MM timezone]
- Data date range: [start ~ end]
- Input hash: [SHA-256 first 8 chars]
- Row count: [N]

### Config Overrides
- [List any threshold overrides from .claude_ad_memory/config.md, or "None — defaults used"]

### Code
```python
import numpy as np
np.random.seed(42)
import pandas as pd
# Full analysis pipeline
```

### Re-Run Validation
| Metric | Original | Re-Run | Delta | Tolerance | Pass? |
|--------|----------|--------|-------|-----------|-------|
| Total spend | | | | exact | |
| Total conversions | | | | exact | |
| Blended CPA | | | | ±1% | |

### Re-run Instructions
1. Export fresh CSV from [platform] > Reports > [report name]
2. Verify input hash matches (or note data has changed)
3. Run code above with new file path
4. Complete Re-Run Validation table above
