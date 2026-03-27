# Apple Search Ads Playbook

## Campaign Architecture (4-Type Model)

### Campaign Types

| Type | Match | Search Match | Purpose | Bid Strategy |
|------|-------|-------------|---------|-------------|
| Brand | Exact | OFF | Defend brand terms | Aggressive max CPT |
| Category | Exact | OFF | High-intent generic terms | Moderate CPT |
| Competitor | Exact | OFF | Conquest competitor brand terms | Conservative CPT |
| Discovery | Broad | ON | Keyword mining, new opportunities | Low CPT (exploratory) |

### Keyword Mining Workflow

```
Discovery campaign (broad match + Search Match)
  ↓ Weekly: export search terms report
  ↓ Filter: conversions > 0 AND CPA < target
Migrate winning keywords to Brand/Category/Competitor (exact match)
  ↓
Add migrated keywords as NEGATIVES in Discovery (prevent bid overlap)
  ↓ Repeat weekly
```

### Budget Allocation

| Campaign | Budget Share | Rationale |
|----------|------------|----------|
| Brand | 20-30% | High conversion, protect brand |
| Category | 30-40% | Scale driver, highest volume |
| Competitor | 10-20% | Conquest, monitor CPA closely |
| Discovery | 10-20% | Keyword mining, capped spend |

## CPP (Custom Product Page) Integration

### Strategy

Map ad groups to Custom Product Pages for relevance:

| Keyword Theme | CPP Content | Screenshots | Messaging |
|--------------|------------|------------|----------|
| Brand terms | Default page | Standard | Brand story |
| Feature-specific | Feature-focused | Feature screenshots | Feature benefits |
| Use-case specific | Use-case page | Use-case visuals | Pain point → solution |
| Competitor | Comparison page | Differentiators | "Switch from X" |

### CPP Performance Tracking

```markdown
| CPP | Impressions | Taps | TTR | Downloads | CVR | CPA |
|-----|------------|------|-----|-----------|-----|-----|
| Default | | | | | | |
| Feature-A | | | | | | |
| Use-case-B | | | | | | |
```

## LAT (Limit Ad Tracking) Modeling

### The Problem

iOS users with LAT enabled (~30-40% of iOS users) are not trackable by Apple Search Ads. This means:
- Reported conversions undercount true conversions
- CPA appears higher than reality
- Optimization decisions based on incomplete data

### Estimation Formula

```
Estimated true conversions = Reported conversions / (1 - LAT_rate)

Where LAT_rate estimates:
- US/EU: ~35-40%
- Japan: ~25-30%
- Emerging markets: ~15-20%
```

### Adjusted CPA

```
Adjusted CPA = Spend / Estimated true conversions
```

Always report both:
- **Reported CPA**: Based on tracked conversions only
- **Adjusted CPA**: Including LAT estimate (with confidence range)

## Key Metrics

| Metric | Benchmark | Notes |
|--------|----------|-------|
| TTR (Tap-Through Rate) | 5-10% (brand), 2-5% (generic) | Higher than Google CTR |
| CVR (Download Rate) | 40-60% (brand), 20-40% (generic) | After tap |
| CPA (Install) | Varies widely by category | Compare adjusted CPA |
| Search Popularity | 30+ for viable targeting | Below 20 = very low volume |

## Optimization Cadence

| Action | Frequency | Details |
|--------|----------|---------|
| Keyword mining from Discovery | Weekly | Export search terms, migrate winners |
| Bid adjustments | Bi-weekly | +/- 10-20% based on CPA vs target |
| Negative keyword cleanup | Weekly | Ensure no overlap between campaigns |
| CPP performance review | Monthly | A/B test new CPP variants |
| LAT rate re-estimation | Quarterly | Check Apple's privacy reports |

## Apple Search Ads vs Other Channels

| Advantage | Limitation |
|-----------|-----------|
| High intent (user is searching) | iOS only |
| No creative production needed | Limited creative control (CPP only) |
| Simple bidding (CPT max) | No audience targeting beyond keywords |
| High CVR post-tap | Transparency limited (no query-level data) |

---

### Official References

- [Set Up an Account](https://searchads.apple.com/help/get-started/0004-set-up-an-account) — Apple Adsアカウントの作成と支払い情報の設定
- [Create Campaigns](https://searchads.apple.com/help/campaigns/0005-create-campaigns) — キャンペーン作成・アプリ選択・予算設定の手順
- [Add and Manage Keywords](https://searchads.apple.com/help/keywords/0014-add-and-manage-keywords) — キーワード追加・マッチタイプ選択・管理方法
- [Create Ad Variations](https://searchads.apple.com/help/ads/0077-create-ad-variations) — Custom Product Pageを使った広告バリエーションの作成
