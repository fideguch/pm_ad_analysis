# CSV Operations Reference

> Extracted from pm-ad-operations for unified pm-ad-analysis skill.
> Covers CSV ingestion, campaign health checks, optimization recommendations, benchmarks, glossary, limitations, and error handling.

---

## Data Ingestion + Platform Detection

**Trigger:** User provides CSV/data

### Platform Auto-Detection

**Google Ads CSV indicators:**

- Columns: `Campaign`, `Ad group`, `Impressions`, `Clicks`, `Cost`, `Conversions`
- Currency column or header metadata
- Date format: YYYY-MM-DD

**Meta Ads CSV indicators:**

- Columns: `Campaign name`, `Ad set name`, `Reach`, `Impressions`, `Amount spent`, `Results`
- May include `Link clicks`, `CTR (link click-through rate)`
- Date format varies (MM/DD/YYYY or YYYY-MM-DD)

### Data Quality Check (MANDATORY)

```
Ad Data Quality Report

| Check | Result | Impact |
|-------|--------|--------|
| Date range | [start ~ end] | — |
| Campaigns | [count] active | — |
| Missing conversions | [count] rows | [High if > 10%] |
| Zero-impression campaigns | [count] | Paused or new? |
| Currency | [detected] | Confirm with user |
| Attribution window | [if detectable] | — |
| Learning phase campaigns | [count] | Exclude from optimization |
```

### Metric Normalization

Unify metrics across platforms:
| Unified Metric | Google Ads | Meta Ads |
|---------------|-----------|----------|
| Spend | Cost | Amount spent |
| Clicks | Clicks | Link clicks |
| Conversions | Conversions | Results |
| CPA | Cost / Conversions | Cost per result |
| CVR | Conversions / Clicks | Results / Link clicks |
| CPM | Cost / Impressions \* 1000 | CPM |

---

## Campaign Health Check

**Trigger:** Data ingested, or user asks about performance

### Health Score Framework

For each campaign, compute:

```
| Metric | Value | vs Target | vs Benchmark | Status |
|--------|-------|-----------|-------------|--------|
| CPA | [value] | [% vs target] | [vs industry] | OK / WARN / CRITICAL |
| ROAS | [value] | [% vs target] | [vs industry] | OK / WARN / CRITICAL |
| CVR | [value] | — | [vs benchmark] | OK / WARN / CRITICAL |
| CTR | [value] | — | [vs benchmark] | OK / WARN / CRITICAL |
| CPM | [value] | — | [vs benchmark] | OK / WARN / CRITICAL |
| Spend pacing | [% of budget] | [days remaining] | — | On track / Over / Under |
```

Status thresholds:

- **CRITICAL**: >50% worse than target OR >2x industry benchmark
- **WARN**: 20-50% worse than target
- **OK**: Within 20% of target

### Waste Detection (CRITICAL — auto-run)

Auto-scan for:

1. **Zero-conversion campaigns** with spend > 10% of total
2. **CPA > 2x target** campaigns
3. **CTR < 0.5%** ad groups (Google Search) or **< 0.8%** (Meta)
4. **Frequency > 3.0** ad sets (Meta — ad fatigue signal)
5. **Search terms** with spend but no conversions (Google — negative keyword candidates)
6. **Audience overlap** > 30% between ad sets (Meta — cannibalization)

```
Waste Alert Summary

| Type | Campaigns | Wasted Spend | % of Total | Action |
|------|-----------|-------------|-----------|--------|
| Zero conversions | [list] | [amount] | [%] | Pause or restructure |
| CPA > 2x target | [list] | [excess] | [%] | Reduce budget or pause |
| Low CTR | [list] | [amount] | [%] | Refresh creatives |
| Ad fatigue | [list] | [amount] | [%] | Rotate creatives |
```

### Trend Analysis

Compare current period vs previous period:

- Week-over-week: CPA, ROAS, CVR, CTR, Spend
- Flag: >10% degradation in any key metric
- Seasonality check: Compare same period last year if data available

---

## Optimization Recommendations

**Trigger:** Health check complete, or user asks "where should I optimize?"

### Budget Reallocation

```
Budget Reallocation Recommendation

| Campaign | Current Spend | CPA | ROAS | Recommendation | New Budget | Expected Impact |
|----------|-------------|-----|------|---------------|-----------|----------------|
| [best] | [amount] | [low] | [high] | +[%] increase | [amount] | +[X] conversions |
| [worst] | [amount] | [high] | [low] | -[%] decrease | [amount] | Save [amount] |
```

Algorithm:

1. Rank campaigns by efficiency (CPA ascending or ROAS descending)
2. Top quartile: recommend +20-50% budget increase
3. Bottom quartile with <50% of target ROAS: recommend pause or -50% budget
4. Middle: maintain, monitor

### Creative Recommendations

Based on performance data:

- **Winner detection**: Statistically significant CTR/CVR difference between creatives
- **Fatigue detection**: CTR declining >15% over 2 weeks
- **Format comparison**: Image vs video vs carousel performance by ad set

### Audience Recommendations (Meta specific)

- **Lookalike expansion**: If top lookalike saturated (frequency > 2.5), recommend expanding %
- **Retargeting window**: If retargeting CPA increasing, suggest shortening window
- **Exclusion check**: Ensure converters are excluded from prospecting

### Bid Strategy Check (Google specific)

- **Manual vs automated**: If using manual CPC with >50 conversions/month, recommend tCPA
- **Target CPA alignment**: If actual CPA consistently >20% above target, recommend raising target or restructuring
- **Search impression share**: If <50% on brand terms, flag budget constraint

---

## Industry Benchmarks (defaults — override with ads/benchmarks.md)

### Google Ads (Search)

| Metric | B2B      | B2C      | E-commerce |
| ------ | -------- | -------- | ---------- |
| CTR    | 2.5-3.5% | 3.0-5.0% | 2.0-4.0%   |
| CVR    | 2.5-5.0% | 3.0-6.0% | 2.0-4.0%   |
| CPC    | $2-5     | $1-3     | $0.5-2     |

### Meta Ads

| Metric | B2B      | B2C      | E-commerce |
| ------ | -------- | -------- | ---------- |
| CTR    | 0.8-1.5% | 1.0-2.0% | 1.0-2.5%   |
| CVR    | 1.0-3.0% | 2.0-5.0% | 1.5-4.0%   |
| CPM    | $8-15    | $5-12    | $6-14      |

> These are rough industry averages. Always prioritize project-specific historical benchmarks stored in `ads/benchmarks.md`.

---

## PM-Friendly Glossary (auto-reference when explaining)

| Term             | Plain Language                 | Why It Matters                     |
| ---------------- | ------------------------------ | ---------------------------------- |
| CPA              | Cost per customer action       | Are we paying too much per result? |
| ROAS             | Revenue per ad dollar          | Are ads profitable?                |
| CTR              | % of people who click          | Is the ad compelling?              |
| CVR              | % of clickers who convert      | Is the landing page working?       |
| CPM              | Cost per 1,000 views           | How expensive is this audience?    |
| Frequency        | Times one person sees the ad   | >3 = ad fatigue risk               |
| Impression Share | % of available impressions won | <50% = budget or bid too low       |
| Quality Score    | Google's ad relevance rating   | Higher = lower CPC                 |
| Learning Phase   | Meta's optimization period     | Don't judge during this (~50 conv) |

---

## Known Limitations & Edge Cases

### CSV Export Format Requirements

- **Google Ads**: 「レポート」→「カスタム」→ CSV ダウンロード。「セグメント」列の有無でパースが変わる
- **Meta Ads**: Ads Manager → Export → CSV。breakdown 列のフォーマットがバージョンにより異なる場合あり
- 日本語 CSV（Shift_JIS）は自動検出するが、BOM なし UTF-8 との判別に失敗する場合がある
- 10万行超の CSV は処理時間が増加（推奨: 日付レンジを分割してエクスポート）

### Metric Calculation Caveats

- **アトリビューション窓**: Google Ads（デフォルト30日）と Meta Ads（デフォルト7日/1日）で異なる。クロスチャネル比較時に注意
- **通貨変換**: CSV 内の通貨をそのまま使用。マルチ通貨アカウントは事前に統一が必要
- **コンバージョン定義**: プラットフォーム間で定義が異なる場合、直接比較は不正確
- **Frequency データ**: Meta のみ。Google Ads からは取得不可

### Platform API Limitations (MCP なし運用時)

- リアルタイムデータは取得不可（CSV エクスポート時点のスナップショット）
- オーディエンス詳細やデモグラフィックは CSV に含まれない場合がある
- 自動入札戦略の内部パラメータは CSV に反映されない

### Benchmark Data

- デフォルトベンチマーク値は業界平均であり、業界・地域により大幅に異なる
- `ads/benchmarks.md` でプロジェクト固有のベンチマークを定義することを推奨
- ベンチマーク値は 6ヶ月ごとに見直しが必要（プラットフォーム変動）

### Non-Supported Scenarios

- TikTok Ads / Apple Search Ads の CSV パース（別途 capability spec で対応）
- リアルタイム入札最適化
- クリエイティブ画像の自動生成
- 広告アカウントへの直接書き込み（読み取り専用）

---

## Error Handling & Recovery

### Common Failure Modes

| Failure                     | Detection                            | Recovery                                                |
| --------------------------- | ------------------------------------ | ------------------------------------------------------- |
| CSV column mismatch         | Expected columns not found           | Show detected columns, ask user to map manually         |
| Mixed platform CSV          | Both Google and Meta columns present | Split into separate analyses, confirm with user         |
| Missing conversion data     | Conversion column empty or absent    | Use proxy metrics (clicks, CTR), warn about limitations |
| Currency mismatch           | Multiple currencies in same export   | Normalize to base currency, show exchange rate used     |
| Learning phase campaigns    | < 50 conversions in window           | Exclude from optimization, flag for monitoring          |
| Attribution window conflict | Different windows across campaigns   | Standardize to longest window, document in report       |

### Error Message Format

All errors must include three parts:

1. **What happened**: Clear description of the failure
2. **Why it matters**: Impact on the analysis and recommendations
3. **What to do next**: Specific recovery steps the user can take
