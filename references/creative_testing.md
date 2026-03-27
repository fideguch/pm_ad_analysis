# Creative Testing Framework

## Fatigue Detection Signals

| Signal | Threshold | Channel | Measurement |
|--------|----------|---------|------------|
| CTR decline | >15% over 2 weeks | All | Compare rolling 7d avg to peak |
| CPA increase | >30% with stable CVR | All | CPA rising = creative issue |
| Frequency | >3.0 per user (7d) | Meta | Audience saturation |
| Impression share drop | >20% decline | Google | Quality Score degradation |
| 3s view rate decline | >20% from peak | TikTok | Hook fatigue |
| Video completion drop | >25% from peak | TikTok, Meta | Content fatigue |

### Python Detection Script

```python
import pandas as pd

def detect_fatigue(df, metric='ctr', window=14, threshold=0.15):
    """Detect creative fatigue from time-series performance data."""
    df = df.sort_values('date')
    peak = df[metric].rolling(7).mean().max()
    current = df[metric].rolling(7).mean().iloc[-1]
    decline = (peak - current) / peak
    return {
        'fatigued': decline > threshold,
        'decline_pct': round(decline * 100, 1),
        'peak_value': round(peak, 4),
        'current_value': round(current, 4),
        'days_since_peak': (df['date'].max() - df.loc[df[metric].rolling(7).mean().idxmax(), 'date']).days
    }
```

## Creative Rotation Cadence

| Format | Typical Lifespan | Replacement Trigger |
|--------|-----------------|-------------------|
| Static image | 2-3 weeks | CTR -15% or Frequency >3 |
| Short video (<15s) | 7-14 days | 3s rate -20% or CPA +30% |
| Long video (15-60s) | 2-4 weeks | Completion rate -25% |
| Carousel | 3-4 weeks | CTR -15% |
| RSA headlines | 4-6 weeks | Below "Average" rating in Google |

## Testing Methodology

### Statistical Test for Creative Winner

Use chi-squared test on conversion rates:

```python
from scipy.stats import chi2_contingency
import numpy as np

def creative_winner(clicks_a, conv_a, clicks_b, conv_b, alpha=0.05):
    """Test if creative B is significantly better than A."""
    table = np.array([
        [conv_a, clicks_a - conv_a],
        [conv_b, clicks_b - conv_b]
    ])
    chi2, p, dof, expected = chi2_contingency(table)
    winner = 'B' if conv_b/clicks_b > conv_a/clicks_a else 'A'
    return {
        'significant': p < alpha,
        'p_value': round(p, 4),
        'winner': winner if p < alpha else 'No winner yet',
        'cvr_a': round(conv_a/clicks_a*100, 2),
        'cvr_b': round(conv_b/clicks_b*100, 2)
    }
```

### Minimum Sample Size

| Baseline CVR | MDE (relative) | Clicks needed per variant |
|-------------|---------------|--------------------------|
| 2% | 20% (0.4pp) | ~19,000 |
| 5% | 20% (1.0pp) | ~7,500 |
| 10% | 15% (1.5pp) | ~4,500 |
| 20% | 10% (2.0pp) | ~3,800 |

### Multi-Armed Bandit vs Fixed Split

| Method | When to Use |
|--------|-----------|
| Fixed 50/50 split | Confirmatory test, need statistical rigor |
| Multi-armed bandit | Exploratory, want to minimize regret during test |
| 80/20 challenger | Low-risk test of new creative against proven winner |

## Creative Element Isolation

Test ONE variable at a time:

| Element | Variables | Impact |
|---------|----------|--------|
| Headline | USP, CTA, benefit, urgency | Highest impact on CTR |
| Image/video | Subject, color, composition | High impact on CTR |
| CTA button | Text, color, position | Moderate impact on CVR |
| Description | Length, tone, specificity | Moderate impact on CVR |
| Format | Static vs video vs carousel | Channel-dependent |

## Creative Performance Tracking (Creative Vault Integration)

After test completes:
1. Mark winner/loser in `creative_vault.json` (status: active/retired)
2. Update performance metrics (impressions, clicks, CTR, conversions)
3. Tag winning creative with USP/hook type for pattern detection
4. Archive losing creative (status: retired, keep for reference)
