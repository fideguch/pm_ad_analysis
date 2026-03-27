# Capability 8: Media Mix Modeling + Portfolio Budget Allocation

**Trigger:** Cross-channel budget questions, portfolio optimization

Also load `references/mmm_incrementality.md` for full methodology.

## Marginal ROI Framework

Do NOT use average ROAS for budget decisions. Use **marginal ROI**:

```
Marginal ROI = d(Revenue) / d(Spend) at current spend level
```

Each channel has diminishing returns. Optimal allocation: equalize marginal ROI across channels.

## Process

1. Collect monthly spend + conversion data per channel (12+ months ideal)
2. Estimate response curves (log-linear: Revenue = a * ln(Spend) + b)
3. Calculate current marginal ROI per channel
4. Recommend reallocation: shift from low-marginal to high-marginal channels

## Output Format

| Channel | Current Spend | Marginal ROI | Rec. Spend | Delta | Expected Impact |
|---------|-------------|-------------|-----------|-------|----------------|
| Google | [amt] | [roi] | [amt] | +[%] | +[X] conv |
| Meta | [amt] | [roi] | [amt] | -[%] | -[X] conv, save [amt] |

Total conversions: [current] → [projected] (+[%])
Blended CPA: [current] → [projected]

## Data Requirements

- Minimum 12 months of weekly spend + conversion data per channel
- If <12 months: use simpler marginal efficiency estimation (3-month rolling)
- Flag: "MMM requires 12+ months. Current data covers [X] months. Using simplified estimation."
