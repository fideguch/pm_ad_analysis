# Capability 6: Apple Search Ads Playbook

**Trigger:** ASA-related questions or campaign design

Also load `references/apple_search_ads_playbook.md` for full playbook.

## Campaign Architecture

| Campaign Type | Match Type | Purpose | Bid Strategy |
|--------------|-----------|---------|-------------|
| Brand | Exact | Defend brand terms | Aggressive max CPT |
| Category | Exact | High-intent generic | Moderate CPT |
| Competitor | Exact | Conquest | Conservative CPT |
| Discovery | Broad + Search Match ON | Keyword mining | Low CPT |

## Workflow

1. Launch Discovery campaign (broad match, low bids)
2. Mine high-performing keywords weekly
3. Migrate winners to Brand/Category/Competitor campaigns (exact match)
4. Add migrated keywords as negatives in Discovery (prevent overlap)

## CPP (Custom Product Page) Integration

- Map ad groups to Custom Product Pages
- Match keyword intent → relevant CPP screenshots + messaging
- Track CPP-level conversion rates

## LAT Modeling

```
Estimated true conversions = Reported conversions / (1 - LAT_rate)
LAT_rate ≈ 30-40% (iOS, varies by market)
```

Always report BOTH raw CPA and LAT-adjusted CPA.
