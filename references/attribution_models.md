# Attribution Model Selection Guide

## Decision Tree

```
Single channel, direct response only?
  -> Yes: Last-click is acceptable (simple, sufficient)
  -> No: Multiple touchpoints in customer journey?
    -> Yes: Data volume > 10K conversions/month?
      -> Yes: Data-driven attribution (Google/Meta native ML)
      -> No: Position-based (40/20/40) or time-decay
    -> Need causal truth (not just credit assignment)?
      -> Yes: Incrementality testing (see mmm_incrementality.md)
```

## Model Comparison

| Model | How It Works | Pros | Cons |
|-------|------------|------|------|
| Last-click | 100% credit to last touchpoint | Simple, deterministic | Over-credits retargeting, under-credits awareness |
| First-click | 100% credit to first touchpoint | Values discovery | Ignores nurturing |
| Linear | Equal credit to all touchpoints | Fair distribution | No signal on what matters |
| Time-decay | More credit to recent touchpoints | Recency-weighted | Arbitrary decay rate |
| Position-based | 40% first, 40% last, 20% middle | Values bookends | Fixed ratios |
| Data-driven | ML assigns credit based on patterns | Best accuracy for credit assignment | Requires data volume, black box |
| Incrementality | Measures causal lift | Causal truth | Expensive, slow (4-8 weeks per test) |

## Migration Path

```
Last-click (today)
  → Time-decay (quick win, 1 day to switch)
    → Data-driven (when 10K+ monthly conversions, 1 week to calibrate)
      → Incrementality testing (ongoing, validates DDA)
```

### Expected Impact When Migrating

| Channel | Last-Click → DDA Direction | Typical Magnitude |
|---------|--------------------------|-------------------|
| Brand search | Decreases | -20 to -40% conversions |
| Retargeting | Decreases | -15 to -30% conversions |
| Prospecting (Meta) | Increases | +30 to +60% conversions |
| Display/video | Increases | +50 to +100% conversions |
| Organic (cannibalization visible) | Increases | +10 to +20% conversions |

### How to Communicate the Switch

To stakeholders:
> "We're switching from last-click to data-driven attribution. This will show:
> - Brand search looking less effective (it was over-credited)
> - Prospecting looking more effective (it was under-credited)
> - Total conversions stay the same — only the credit assignment changes.
> - Budget recommendations will shift toward upper-funnel channels."

## Platform-Specific Attribution

### Google Ads

| Setting | Recommendation |
|---------|---------------|
| Model | Data-driven (if eligible) |
| Window | 30-day click, 1-day view |
| Cross-device | Enabled (Google's default) |
| Enhanced conversions | Enable for first-party data matching |

### Meta Ads

| Setting | Recommendation |
|---------|---------------|
| Default | 7-day click, 1-day view |
| Comparison | Also check 1-day click for conservative view |
| AEM | Enable for iOS attribution |
| View-through | Controversial — report separately |

### Apple Search Ads

| Setting | Notes |
|---------|-------|
| Model | Last-touch (platform limitation) |
| Window | 30-day |
| LAT impact | See apple_search_ads_playbook.md for LAT modeling |

### Cross-Platform

- Use MMP (AppsFlyer/Adjust) as single source of truth for app
- Use GA4 as single source of truth for web
- Platform self-reported numbers always over-count (double attribution)

## Impact Simulation Template

When switching models, produce this analysis:

```markdown
## Attribution Model Impact Simulation

| Channel | Last-Click Conv | New Model Conv | Delta | % Change |
|---------|----------------|---------------|-------|---------|
| Google Brand | [n] | [n] | [-n] | -[x]% |
| Google Generic | [n] | [n] | [+n] | +[x]% |
| Meta Prospecting | [n] | [n] | [+n] | +[x]% |
| Meta Retargeting | [n] | [n] | [-n] | -[x]% |
| Total | [n] | [n] | 0 | 0% |

### Budget Reallocation Implication
Based on new model, [channel] is under-invested by ~[X]% and [channel] is over-invested by ~[Y]%.
```
