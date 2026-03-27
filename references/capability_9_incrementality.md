# Capability 9: Incrementality Testing

**Trigger:** Causal questions ("Is this channel actually working?")

Also load `references/mmm_incrementality.md` for full methodology.

## Method Selection

```
Can you turn off the channel in some markets?
  → Yes: Geo-holdout test (gold standard for non-digital)
  → No: Does the platform offer conversion lift?
    → Yes: Platform lift study (Meta/Google native)
    → No: Can you create a PSA control?
      → Yes: Ghost ads / PSA test
      → No: Report as CORRELATION ONLY. Downgrade confidence.
```

## Geo-Holdout Design

1. Select treatment and control markets (similar size, demographics, seasonality)
2. Run for minimum 4 weeks (8 weeks preferred)
3. Measure: conversion lift = (treatment - control) / control
4. Statistical test: difference-in-differences with confidence interval

## Confidence Scoring for Incrementality

| Factor | High (3pt) | Medium (2pt) | Low (1pt) |
|--------|-----------|-------------|----------|
| Test design | Randomized holdout | Matched markets | Observational |
| Duration | 8+ weeks | 4-8 weeks | <4 weeks |
| Sample size | >100K users per group | 10K-100K | <10K |
| Confounders | Controlled (no other changes) | Partial control | Uncontrolled |
