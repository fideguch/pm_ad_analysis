# Google Ads Search Campaign Report

## Executive Summary

Period: 2026-03-01 ~ 2026-03-08 | Channel: Google Ads (Search + Display + Shopping)
Brand campaigns maintain strong efficiency (CPA $3.70). Performance Search CPA rising week-over-week.
Key concern: Competitor Terms CPA doubled from $120 to $170 with declining CVR.

Total Spend: $22,258.50 | Conversions: 1,049 | Blended CPA: $21.22 | ROAS: estimated 3.2x

## Channel Performance

| Campaign              | Spend      | Conv. | CPA    | CVR   | vs Target ($25)  | Trend |
| --------------------- | ---------- | ----- | ------ | ----- | ---------------- | ----- |
| Brand - Exact         | $1,848.50  | 433   | $4.27  | 7.54% | -83% (good)      | flat  |
| Performance - Search  | $15,190.00 | 217   | $70.00 | 3.80% | +180% (over)     | up    |
| Display - Remarketing | $3,150.00  | 119   | $26.47 | 1.89% | +6% (borderline) | mixed |
| Shopping - Standard   | $7,070.00  | 280   | $25.25 | 3.73% | +1% (on target)  | up    |

## Waste Report

| Type            | Campaigns          | Wasted Spend | % of Total | Action               |
| --------------- | ------------------ | ------------ | ---------- | -------------------- |
| CPA > 2x target | Competitor Terms   | $5,940.00    | 27%        | Pause or reduce bids |
| Low CVR (<1%)   | Homepage Visitors  | $1,275.00    | 6%         | Narrow audience      |
| Low CVR (<1%)   | Long Tail Shopping | $420.00      | 2%         | Review product feed  |

## Optimization Actions

| Priority | Action                                       | Expected Impact                | Effort |
| -------- | -------------------------------------------- | ------------------------------ | ------ |
| 1        | Pause Competitor Terms or reduce budget 50%  | Save ~$3,000/week              | Low    |
| 2        | Tighten Homepage Visitors remarketing window | Save ~$600/week                | Low    |
| 3        | Increase Brand Exact budget +30%             | +50 conversions/week at $4 CPA | Low    |
| 4        | Add negative keywords to Performance Search  | Reduce CPA 10-15%              | Medium |

## Reproduction

### Data Source

- Platform: Google Ads
- Export date: 2026-03-09
- Date range: 2026-03-01 ~ 2026-03-08
- File: examples/google-ads-search/input.csv

### Code

```python
import pandas as pd

df = pd.read_csv("input.csv")
summary = df.groupby("Campaign").agg(
    Spend=("Cost", "sum"),
    Conversions=("Conversions", "sum"),
    Clicks=("Clicks", "sum"),
    Impressions=("Impressions", "sum"),
).assign(
    CPA=lambda x: x["Spend"] / x["Conversions"],
    CVR=lambda x: x["Conversions"] / x["Clicks"] * 100,
    CTR=lambda x: x["Clicks"] / x["Impressions"] * 100,
)
print(summary.round(2))
```

### Re-run Instructions

1. Export fresh CSV from Google Ads > Reports > Campaign performance
2. Run code above with new file path
3. Compare to previous: Blended CPA was $21.22
