# Capability 4: Creative Fatigue Detection + Replacement

**Trigger:** CTR declining, frequency rising, or user asks about creative health

Also load `references/creative_testing.md` for thresholds.

## Fatigue Signals

| Signal | Threshold | Channel |
|--------|----------|---------|
| CTR decline | >15% over 2 weeks | All |
| Frequency | >3.0 per user | Meta |
| CVR decline | >10% with stable CTR | All |
| Impression share drop | >20% decline | Google |
| Video completion rate drop | >20% decline | TikTok |

## Replacement Cadence (defaults)

| Format | Typical Lifespan | Replacement Trigger |
|--------|-----------------|-------------------|
| Static image | 2-3 weeks | CTR -15% or Freq >3 |
| Video (short) | 7-14 days | TikTok: 3s view rate -20% |
| Carousel | 3-4 weeks | CTR -15% |
| RSA headlines | 4-6 weeks | Below-average rating in Google |

## Process

1. Identify fatigued creatives from performance data
2. Check creative vault for ready replacements
3. If vault insufficient → trigger Capability 3 (generate new)
4. Propose rotation plan with expected impact
