# Media Mix Modeling & Incrementality Testing

## Media Mix Modeling (MMM)

### When to Use

- 3+ channels active with 12+ months of weekly data
- Need portfolio-level budget allocation (not just within-channel)
- Leadership wants "how should we split next quarter's budget?"

### Core Concept: Marginal ROI

**Never use average ROAS for budget decisions.** Use marginal ROI:

```
Average ROAS = Total Revenue / Total Spend  (misleading)
Marginal ROI = dRevenue / dSpend at current level  (actionable)
```

Each channel has diminishing returns. A channel with 5x average ROAS may have 0.5x marginal ROI at current spend level.

### Response Curve Estimation

Log-linear approximation (simple, robust):

```
Revenue_channel = a * ln(Spend_channel) + b

Marginal ROI = a / Spend_channel
```

```python
import numpy as np
from scipy.optimize import curve_fit

def log_response(spend, a, b):
    return a * np.log(spend + 1) + b

# Fit per channel
popt, pcov = curve_fit(log_response, monthly_spend, monthly_revenue)
a, b = popt

# Marginal ROI at current spend
current_spend = monthly_spend.iloc[-1]
marginal_roi = a / current_spend
```

### Optimal Allocation (Equimarginal Principle)

Optimal budget: **equalize marginal ROI across all channels**.

```python
def optimal_allocation(channels, total_budget, response_params):
    """
    channels: list of channel names
    total_budget: total monthly budget
    response_params: dict of {channel: (a, b)} from log-linear fit
    """
    # Marginal ROI = a_i / spend_i
    # Equimarginal: a_1/s_1 = a_2/s_2 = ... = a_n/s_n
    # Subject to: s_1 + s_2 + ... + s_n = total_budget
    # Solution: s_i = a_i / sum(a_j) * total_budget
    a_values = {ch: response_params[ch][0] for ch in channels}
    a_sum = sum(a_values.values())
    return {ch: a_values[ch] / a_sum * total_budget for ch in channels}
```

### Data Requirements

| Requirement | Minimum | Ideal |
|------------|---------|-------|
| Time period | 12 months | 24+ months |
| Granularity | Weekly | Weekly |
| Channels | 3+ | All active channels |
| External factors | None | Seasonality, promotions, competitor activity |

If data insufficient: use 3-month rolling marginal efficiency estimation instead.

### MMM Limitations

- Correlation-based, not causal (validate with incrementality tests)
- Cannot capture short-term effects well (brand takes months)
- Assumes past patterns continue (disruptions break model)
- Requires sufficient variation in spend (flat budgets = poor estimation)

---

## Incrementality Testing

### Why Incrementality > Attribution

Attribution answers: "Which touchpoint gets credit?"
Incrementality answers: "Would this conversion have happened WITHOUT the ad?"

### Method Selection

```
Can you turn off the channel in some markets?
  -> Yes: Geo-holdout test
  -> No: Does the platform offer conversion lift?
    -> Yes: Platform lift study (Meta, Google)
    -> No: Can you create a PSA (public service announcement) control?
      -> Yes: Ghost ads / PSA test
      -> No: Quasi-experimental (DiD, propensity matching)
        -> Still insufficient: Report as CORRELATION ONLY
```

### Geo-Holdout Test Design

1. **Market selection**: Match treatment/control on:
   - Population size, demographics
   - Historical conversion rate
   - Seasonal patterns
   - No other active tests in control markets

2. **Duration**: Minimum 4 weeks, ideal 8 weeks
   - Include ramp-up (1 week) + measurement (3-7 weeks)

3. **Measurement**:
   ```
   Incremental lift = (Treatment conversions - Control conversions) / Control conversions

   Incremental CPA = Spend / (Treatment conversions - Control conversions)
   ```

4. **Statistical test**: Difference-in-Differences (DiD)
   ```python
   import statsmodels.api as sm

   # DiD regression: Y = b0 + b1*Treatment + b2*Post + b3*Treatment*Post + e
   # b3 is the incremental effect
   ```

### Platform Lift Studies

| Platform | Method | Setup |
|----------|--------|-------|
| Meta | Conversion Lift | Meta holds out random 10% from seeing ads |
| Google | Brand Lift, Conversion Lift | Google creates control group |

Pros: Easy setup, platform handles methodology
Cons: Platform controls the test, limited transparency

### Ghost Ads / PSA Test

- Show PSA (charity ad) to control group instead of real ad
- Measure: conversion rate of exposed (real ad) vs control (PSA)
- More rigorous than platform lift (true control)
- Requires DSP or ad server integration

---

## Confidence Scoring for Ad Analysis

Inherited 4-axis/12-point rubric from pm-data-analysis, adapted for ads:

| Axis | High (3pt) | Medium (2pt) | Low (1pt) |
|------|-----------|-------------|----------|
| Statistical significance | p < 0.01 | p < 0.05 | p >= 0.05 or untested |
| Effect size | ROAS > 2x or CPA < 50% target | On target | Below target or small |
| Sample size | N >= recommended (see creative_testing.md) | N = 50-100% | N < 50% |
| Data quality | Full attribution, no gaps | Partial (LAT, SKAN) | Major gaps |

### Ad-Specific Penalties

| Factor | Penalty | Condition |
|--------|---------|-----------|
| Last-click attribution | -1pt | Multi-touch journey analyzed with last-click |
| Cross-channel interference | -1pt | Shared audiences without exclusion |
| Learning phase data | -2pt | Campaigns in learning phase included |
| Platform data lag | -1pt | Comparing 1-day vs 28-day windows |
| LAT uncorrected | -1pt | App data without LAT adjustment |

**Adjusted Total: 10-12pt = High, 7-9pt = Medium, <=6pt = Low**

---

## Output Templates

### MMM Portfolio Report

```markdown
## Media Mix Optimization

| Channel | Spend | Marginal ROI | Rec. Spend | Delta |
|---------|-------|-------------|-----------|-------|
| [ch] | [amt] | [roi] | [amt] | +/-[%] |

Reallocation expected impact: +[X]% total conversions at same budget
Confidence: [H/M/L] — [data quality + model fit]
```

### Incrementality Report

```markdown
## Incrementality Test Results

| Metric | Treatment | Control | Lift | p-value |
|--------|----------|---------|------|---------|
| Conversions | [n] | [n] | +[X]% | [p] |
| Revenue | [amt] | [amt] | +[X]% | [p] |

Incremental CPA: [amount]
Confidence: [H/M/L]
```
