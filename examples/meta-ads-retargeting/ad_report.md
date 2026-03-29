# Meta Ads Retargeting Campaign Report

## Executive Summary

Period: 2026-03-01 ~ 2026-03-08 | Channel: Meta Ads (Facebook + Instagram)
Retargeting campaigns show strong efficiency (CPA $12.08). Prospecting LAL 3% CPA rising (+25% WoW).
Key concern: Fitness Enthusiasts interest targeting CPA at $228, well above $100 target.

Total Spend: $35,935.00 | Results: 758 | Blended CPA: $47.41 | Estimated ROAS: 2.8x

## Channel Performance

| Campaign                 | Spend     | Results | CPA     | CTR   | Frequency | vs Target ($100) | Trend |
| ------------------------ | --------- | ------- | ------- | ----- | --------- | ---------------- | ----- |
| Prospecting - LAL 1%     | $8,650.00 | 95      | $91.05  | 2.00% | 1.24      | -9% (good)       | up    |
| Prospecting - LAL 3%     | $7,350.00 | 66      | $111.36 | 1.50% | 1.31      | +11% (warn)      | up    |
| Prospecting - Interest   | $6,755.00 | 34      | $198.68 | 1.45% | 1.25      | +99% (critical)  | up    |
| Retargeting - Website    | $3,935.00 | 323     | $12.18  | 5.83% | 2.88      | -88% (excellent) | flat  |
| Retargeting - Engagement | $3,325.00 | 48      | $69.27  | 1.50% | 2.23      | -31% (good)      | up    |
| DPA - Catalog            | $5,920.00 | 192     | $30.83  | 3.33% | 1.34      | -69% (good)      | flat  |

## Waste Report

| Type                  | Ad Sets             | Wasted Spend | % of Total | Action                             |
| --------------------- | ------------------- | ------------ | ---------- | ---------------------------------- |
| CPA > 2x target       | Fitness Enthusiasts | $6,755.00    | 19%        | Pause or narrow audience           |
| Ad fatigue (Freq > 3) | Cart Abandoners 3d  | $840.00      | 2%         | Rotate creatives                   |
| Rising CPA trend      | LAL 3% Purchasers   | $3,750.00    | 10%        | Monitor; expand to 5% if saturated |

## Optimization Actions

| Priority | Action                                   | Expected Impact                 | Effort |
| -------- | ---------------------------------------- | ------------------------------- | ------ |
| 1        | Pause Fitness Enthusiasts targeting      | Save ~$3,400/week               | Low    |
| 2        | Rotate Cart Abandoners 3d creatives      | Reduce frequency, maintain CVR  | Medium |
| 3        | Increase DPA - Top Sellers budget +50%   | +28 conversions/week at $25 CPA | Low    |
| 4        | Test LAL 5% to replace saturating LAL 3% | Maintain prospecting volume     | Medium |
| 5        | Exclude converters from All Visitors 7d  | Reduce wasted impressions       | Low    |

## Reproduction

### Data Source

- Platform: Meta Ads
- Export date: 2026-03-09
- Date range: 2026-03-01 ~ 2026-03-08
- File: examples/meta-ads-retargeting/input.csv

### Code

```python
import pandas as pd

df = pd.read_csv("input.csv")
summary = df.groupby("Campaign name").agg(
    Spend=("Amount spent", "sum"),
    Results=("Results", "sum"),
    Reach=("Reach", "sum"),
    Impressions=("Impressions", "sum"),
).assign(
    CPA=lambda x: x["Spend"] / x["Results"],
    Frequency=lambda x: x["Impressions"] / x["Reach"],
)
print(summary.round(2))
```

### Re-run Instructions

1. Export fresh CSV from Meta Ads Manager > Reports > Campaign performance
2. Run code above with new file path
3. Compare to previous: Blended CPA was $47.41
