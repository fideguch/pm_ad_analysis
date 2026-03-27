# Google Ads Playbook

## Campaign Structure (2026 Best Practice)

### Intent-Based Segmentation

| Campaign Type | Keywords | Bidding | Priority |
|--------------|---------|---------|----------|
| Brand | Exact match brand terms | tCPA aggressive | Highest (defend) |
| High-Intent | Category + purchase intent | tCPA or tROAS | High |
| Competitor | Competitor brand terms | Manual CPC → tCPA | Medium |
| Discovery | Broad match, DSA | Maximize conversions | Low (mine keywords) |

### Performance Max (P-MAX)

- 71% of advertisers use P-MAX (2025 data)
- Requires clean asset groups: headlines (15), descriptions (4), images (20), videos
- Do NOT mix brand and non-brand in same P-MAX campaign
- Monitor search terms via Insights tab (limited transparency)

## Bidding Strategy Selection

```
Monthly conversions?
  -> <30: Manual CPC or Maximize Clicks (insufficient data for automation)
  -> 30-50: Maximize Conversions (build history)
  -> 50+: tCPA (target CPA — recommended)
  -> Revenue tracking available + 50+ conversions: tROAS
```

### tCPA Tuning

- Start 20% above actual CPA (give algorithm room)
- Reduce by 10% every 2 weeks if hitting target
- Never reduce >15% in one change (triggers re-learning)

### tROAS Tuning

- Start at 80% of actual ROAS
- Increase by 10-20% every 2 weeks
- Lower tROAS = more volume, higher tROAS = more efficiency

## Quality Score Optimization

| Factor | Weight | Optimization |
|--------|--------|-------------|
| Expected CTR | ~39% | Test ad copy, use power words, match intent |
| Ad relevance | ~22% | Tight ad group themes, keyword in headline |
| Landing page | ~39% | Load speed <3s, mobile-friendly, relevance |

Quality Score 7+ target. Below 5 = restructure or pause.

## Search Impression Share

| Metric | Target | Action if Below |
|--------|--------|----------------|
| Brand IS | >90% | Increase budget or bid |
| Non-brand IS | >50% | Evaluate CPC headroom |
| IS lost to budget | <10% | Increase daily budget |
| IS lost to rank | <20% | Improve QS or increase bid |

## RSA (Responsive Search Ad) Strategy

- Pin strongest headline to position 1 (brand or primary USP)
- Leave positions 2-3 unpinned for Google's ML
- Write 15 unique headlines covering: brand, benefits, CTAs, social proof, urgency
- 4 descriptions: benefit-focused, feature-focused, CTA-focused, trust-focused
- Ad strength target: "Good" or "Excellent"

## N-gram Analysis Integration

When analyzing search query reports:
1. Export "Search terms" report (minimum 30 days)
2. Run Capability 2 (N-gram Analysis)
3. Add negative keywords from waste analysis
4. Expand keywords from high-performing themes
5. Re-evaluate after 2 weeks

## Key Metrics

| Metric | B2B Benchmark | B2C Benchmark | E-commerce |
|--------|-------------|-------------|-----------|
| CTR | 2.5-3.5% | 3.0-5.0% | 2.0-4.0% |
| CVR | 2.5-5.0% | 3.0-6.0% | 2.0-4.0% |
| CPC | $2-5 | $1-3 | $0.5-2 |
| Quality Score | 7+ | 7+ | 7+ |

---

### Official References

- [キャンペーンを作成する](https://support.google.com/google-ads/answer/6324971) — キャンペーンタイプ選択から広告グループ作成までの手順
- [スマート自動入札を設定する](https://support.google.com/google-ads/answer/10893605) — tCPA/tROAS等のSmart Bidding戦略の設定方法
- [ウェブコンバージョンを設定する](https://support.google.com/google-ads/answer/16560108) — コンバージョンアクション作成とタグ設置の手順
- [P-MAXキャンペーンを作成する](https://support.google.com/google-ads/answer/10724896) — P-MAXのアセットグループ・予算・入札設定
- [除外キーワードを追加する](https://support.google.com/google-ads/answer/7102995) — ネガティブキーワードの追加と管理方法
