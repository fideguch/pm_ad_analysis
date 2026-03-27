# Reproducibility Framework

## Environment Specification

Every analysis report MUST include an environment block:

```markdown
### Environment
- Python: 3.11+
- pandas: 2.0+
- scipy: 1.11+
- numpy: 1.24+
- statsmodels: 0.14+ (if regression used)
- matplotlib/seaborn: latest (if charts generated)
```

If Python is unavailable, note: "Analysis performed via spreadsheet logic / SQL. No Python dependency."

## Threshold Configuration

All thresholds used in this skill are centralized below. These are defaults — override per-project in `.claude_ad_memory/config.md`.

### Creative Fatigue Thresholds

| Signal | Default | Override Key |
|--------|---------|-------------|
| CTR decline trigger | 15% over 14 days | `fatigue.ctr_decline_pct` |
| Frequency cap (Meta) | 3.0 per 7 days | `fatigue.meta_frequency_cap` |
| CVR decline trigger | 10% over 14 days | `fatigue.cvr_decline_pct` |
| Impression share drop (Google) | 20% decline | `fatigue.google_is_drop_pct` |
| 3s view rate decline (TikTok) | 20% from peak | `fatigue.tiktok_3s_decline_pct` |
| Video completion drop | 25% from peak | `fatigue.video_completion_drop_pct` |

### Campaign Health Thresholds

| Signal | Default | Override Key |
|--------|---------|-------------|
| CPA CRITICAL | >50% worse than target | `health.cpa_critical_pct` |
| CPA WARN | 20-50% worse than target | `health.cpa_warn_pct` |
| Zero-conversion waste threshold | >10% of total spend | `health.zero_conv_waste_pct` |
| CTR minimum (Google Search) | 0.5% | `health.google_search_ctr_min` |
| CTR minimum (Meta) | 0.8% | `health.meta_ctr_min` |
| Budget shift approval threshold | 30% | `health.budget_shift_approval_pct` |

### Statistical Thresholds

| Parameter | Default | Override Key |
|-----------|---------|-------------|
| Significance level (alpha) | 0.05 | `stats.alpha` |
| Minimum conversions per variant | 30 | `stats.min_conversions` |
| Minimum impressions per creative | 1000 | `stats.min_impressions` |
| MMM minimum data months | 12 | `stats.mmm_min_months` |
| Incrementality minimum weeks | 4 | `stats.incrementality_min_weeks` |

### LAT / Privacy Defaults

| Parameter | Default | Override Key |
|-----------|---------|-------------|
| LAT rate (US/EU) | 35% | `privacy.lat_rate_us` |
| LAT rate (Japan) | 25% | `privacy.lat_rate_jp` |
| LAT rate (emerging markets) | 15% | `privacy.lat_rate_emerging` |

### Config File Format (.claude_ad_memory/config.md)

```markdown
# Project-Specific Overrides
fatigue.ctr_decline_pct: 20          # More tolerant (high-volume account)
health.cpa_critical_pct: 40          # Stricter than default
stats.alpha: 0.01                    # More conservative
privacy.lat_rate_jp: 30              # Higher LAT in this app's demographic
```

## Data Versioning

Every analysis must capture:

```markdown
### Data Version
- Platform: [Google Ads / Meta Ads / ASA / TikTok]
- Export method: [CSV manual / API / MCP]
- Export date: [YYYY-MM-DD HH:MM timezone]
- Data date range: [YYYY-MM-DD to YYYY-MM-DD]
- Input hash: [SHA-256 first 8 chars of input file]
- Row count: [N]
- Platform API version: [if applicable]
```

### Input Hash Computation

```python
import hashlib

def input_hash(file_path):
    with open(file_path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:8]
```

Purpose: detect if underlying data changed between analysis runs.

## Re-Run Assertions

After reproducing an analysis, verify:

```markdown
### Re-Run Validation
| Metric | Original | Re-Run | Delta | Within Tolerance? |
|--------|----------|--------|-------|-------------------|
| Total spend | $X | $X | 0% | Yes |
| Total conversions | N | N | 0% | Yes |
| Blended CPA | $X | $X±Y | ±Z% | Yes (±5%) / No |
```

**Tolerance rules**:
- Deterministic metrics (spend, conversions): exact match required
- Computed metrics (CPA, ROAS): ±1% tolerance (rounding)
- Statistical metrics (p-values, CI): ±5% tolerance (floating point)
- MMM estimates (marginal ROI): ±10% tolerance (curve fitting non-determinism)

If re-run exceeds tolerance: flag "Non-reproducible result. Check: data version, random seed, scipy version."

## Random Seed Control

For any analysis involving randomness (Monte Carlo, bootstrap, Bayesian):

```python
import numpy as np
np.random.seed(42)  # Fixed seed for reproducibility
```

Always set seed and document it in the Reproduction section.
