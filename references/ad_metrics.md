# Ad Metrics Reference

## Core Metrics (every PM should know)

### Cost Metrics

| Metric                          | Formula                             | What It Tells You                |
| ------------------------------- | ----------------------------------- | -------------------------------- |
| CPA (Cost Per Action)           | Total Spend / Conversions           | How much you pay per result      |
| CPC (Cost Per Click)            | Total Spend / Clicks                | How much you pay per click       |
| CPM (Cost Per Mille)            | (Total Spend / Impressions) \* 1000 | How expensive the audience is    |
| CAC (Customer Acquisition Cost) | All marketing spend / New customers | True cost including all channels |

### Efficiency Metrics

| Metric                    | Formula                        | What It Tells You          |
| ------------------------- | ------------------------------ | -------------------------- |
| ROAS (Return On Ad Spend) | Revenue / Ad Spend             | Revenue per ad dollar      |
| ROI                       | (Revenue - Cost) / Cost \* 100 | Profit percentage          |
| CTR (Click-Through Rate)  | Clicks / Impressions \* 100    | Ad creative effectiveness  |
| CVR (Conversion Rate)     | Conversions / Clicks \* 100    | Landing page effectiveness |

### Volume Metrics

| Metric           | Formula                            | What It Tells You              |
| ---------------- | ---------------------------------- | ------------------------------ |
| Impressions      | —                                  | How many times ads were shown  |
| Reach            | —                                  | How many unique people saw ads |
| Frequency        | Impressions / Reach                | Average views per person       |
| Impression Share | Your impressions / Total available | Market coverage                |

## Diagnostic Framework

When a metric is off, trace the funnel:

```
Impressions (reach problem?)
  -> CTR (creative problem?)
    -> Clicks
      -> CVR (landing page problem?)
        -> Conversions
          -> CPA (efficiency problem?)
            -> Revenue
              -> ROAS (value problem?)
```

### Root Cause Mapping

| Symptom              | Likely Cause                | Investigation                          |
| -------------------- | --------------------------- | -------------------------------------- |
| High CPA             | Low CVR or high CPC         | Check landing page, audience targeting |
| Low CTR              | Ad fatigue or poor creative | Check frequency, refresh creatives     |
| Low CVR              | Landing page mismatch       | Check page speed, messaging alignment  |
| High CPM             | Competitive audience        | Broaden targeting, test new audiences  |
| Declining ROAS       | CPA up or AOV down          | Separate analysis of both drivers      |
| Low impression share | Budget or bid too low       | Check budget pacing, bid strategy      |

## Budget Pacing

### Daily Pacing Check

```
Expected spend to date = (Monthly budget / Days in month) * Days elapsed
Pacing ratio = Actual spend / Expected spend

| Ratio | Status | Action |
|-------|--------|--------|
| 0.85 - 1.15 | On track | Monitor |
| 0.70 - 0.85 | Underpacing | Check if campaigns are limited |
| 1.15 - 1.30 | Overpacing | May exhaust budget early |
| < 0.70 | Severely under | Campaign issues likely |
| > 1.30 | Severely over | Reduce daily budgets |
```

## Python Quick Reference

```python
import pandas as pd

# Load and compute core metrics
df = pd.read_csv("ads_export.csv")

# Google Ads column mapping
df["CPA"] = df["Cost"] / df["Conversions"].replace(0, float("nan"))
df["CTR"] = df["Clicks"] / df["Impressions"] * 100
df["CVR"] = df["Conversions"] / df["Clicks"].replace(0, float("nan")) * 100
df["CPM"] = df["Cost"] / df["Impressions"] * 1000

# Meta Ads column mapping
# df["CPA"] = df["Amount spent"] / df["Results"].replace(0, float("nan"))
# df["CTR"] = df["Link clicks"] / df["Impressions"] * 100

# Waste detection: zero-conversion campaigns with spend
waste = df[(df["Conversions"] == 0) & (df["Cost"] > 0)]
waste_pct = waste["Cost"].sum() / df["Cost"].sum() * 100

# Budget reallocation: rank by CPA
efficient = df[df["Conversions"] > 0].sort_values("CPA")
top_quartile = efficient.head(len(efficient) // 4)
bottom_quartile = efficient.tail(len(efficient) // 4)
```

## Attribution Models

| Model       | How It Works                    | Best For                     |
| ----------- | ------------------------------- | ---------------------------- |
| Last-click  | 100% credit to last click       | Simple, conservative         |
| First-click | 100% credit to first click      | Prospecting evaluation       |
| Linear      | Equal credit to all touchpoints | Multi-touch journeys         |
| Data-driven | ML-weighted by contribution     | Best accuracy (needs volume) |
| Time-decay  | More credit to recent touches   | Short sales cycles           |

> Important: Different attribution models will show different ROAS for the same campaign.
> Always note which model is in use when comparing performance.
