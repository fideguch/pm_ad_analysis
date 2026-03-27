# Capability 10: Attribution Model Selection

**Trigger:** Attribution questions, model comparison

Also load `references/attribution_models.md` for full guide.

## Decision Tree

```
Single-channel, direct response only?
  → Yes: Last-click is acceptable
  → No: Multiple touchpoints?
    → Yes: Data volume > 10K conversions/month?
      → Yes: Data-driven attribution (Google/Meta native)
      → No: Time-decay or position-based
    → Want causal truth?
      → Yes: Incrementality testing (Capability 9)
```

## Migration Path

```
Last-click → Time-decay → Data-driven → Incrementality
  (simple)    (better)     (ML-based)    (causal truth)
```

## Impact Simulation

When switching attribution models, report expected changes:

| Channel | Last-Click Conv | Data-Driven Conv | Delta | Budget Implication |
|---------|----------------|-----------------|-------|-------------------|
| Google Brand | 500 | 350 (-30%) | -150 | Over-credited by last-click |
| Meta Prospecting | 200 | 320 (+60%) | +120 | Under-credited by last-click |
