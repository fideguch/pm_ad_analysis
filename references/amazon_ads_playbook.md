# Amazon Ads Playbook

## Campaign Types

### Sponsored Products (SP)

| Setting | Best Practice |
|---------|-------------|
| Targeting | Auto (discovery) → Manual (exact, phrase, ASIN) |
| Bidding | Dynamic bids - down only (conservative start) |
| Budget | Start at 2-3x target ACOS × expected daily sales |
| Negatives | Add non-converting search terms weekly |

**Optimization Loop**:
1. Launch Auto campaign (broad discovery)
2. Weekly: export Search Term Report
3. Migrate high-ACOS terms to negatives
4. Migrate high-converting terms to Manual campaign (exact match)
5. Repeat — similar to ASA Discovery/Probing pattern

### Sponsored Brands (SB)

| Format | Use Case | Creative |
|--------|---------|---------|
| Product collection | Category awareness | Brand logo + 3 products |
| Store spotlight | Brand story | Custom images + store pages |
| Video | Product demo | 15-30s vertical/horizontal |

**Key metric**: New-to-Brand (NTB) percentage — measures incremental customer acquisition, not just sales.

### Sponsored Display (SD)

| Targeting | Best For | Audience |
|-----------|---------|---------|
| Product targeting | Competitor conquest | Competitor ASIN viewers |
| Audience targeting | Retargeting, lookalike | Past viewers, similar shoppers |
| Contextual | Category awareness | Related product pages |

## ACOS Optimization

### ACOS (Advertising Cost of Sales) = Ad Spend / Ad Revenue

| ACOS | Interpretation | Action |
|------|---------------|--------|
| < Break-even ACOS | Profitable | Scale budget |
| = Break-even ACOS | Break-even | Maintain, optimize |
| > Break-even ACOS | Unprofitable | Reduce bids or pause |

**Break-even ACOS = Profit Margin %**

Example: If margin is 30%, break-even ACOS = 30%. Any ACOS above 30% loses money.

### Target ACOS by Strategy

| Strategy | Target ACOS | Rationale |
|----------|-----------|----------|
| Profitability | < Margin - 5% | Leave buffer for margin safety |
| Growth | = Margin | Break-even to maximize volume |
| Launch | > Margin (up to 2x) | Invest in ranking + reviews |
| Liquidation | No limit | Clear inventory fast |

## Amazon DSP (Demand-Side Platform)

### When to Use DSP vs Sponsored Ads

| Factor | Sponsored Ads | Amazon DSP |
|--------|--------------|-----------|
| Targeting | Search intent, product page | Behavioral, demographic, retargeting |
| Placement | Amazon search results, product pages | Amazon, Twitch, Fire TV, 3P sites |
| Goal | Direct response, conversion | Brand awareness, full-funnel |
| Minimum budget | No minimum | $10K+/month typical |
| Attribution | 14-day click, 14-day view | Customizable windows |

### DSP Campaign Structure

```
Campaign (objective: awareness / consideration / conversion)
  ├── Order (audience + budget)
  │   ├── Line Item (targeting + creative)
  │   │   ├── Creative A (banner)
  │   │   ├── Creative B (video)
  │   │   └── Creative C (responsive)
  │   └── Line Item 2 ...
  └── Order 2 ...
```

## Brand + Performance Portfolio Model

### Budget Allocation Framework

| Stage | Brand % | Performance % | Rationale |
|-------|---------|-------------|----------|
| Launch | 40% | 60% | Build awareness + initial sales |
| Growth | 25% | 75% | Scale proven performers |
| Mature | 30% | 70% | Maintain brand, defend share |
| Competitive threat | 40% | 60% | Increase SOV (Share of Voice) |

### Share of Voice (SOV) Rule

**Excess SOV = SOV - SOM (Share of Market)**

| Excess SOV | Expected Impact |
|-----------|----------------|
| +10% | +0.5% market share growth per year |
| 0% | Maintain current share |
| -10% | Gradual share decline |

## Key Metrics

| Metric | Benchmark (avg) | Notes |
|--------|----------------|-------|
| ACOS (SP) | 15-30% | Varies by category |
| ROAS (SP) | 3-7x | Inverse of ACOS |
| CTR (SP) | 0.3-0.5% | Lower than Google/Meta (browsing intent) |
| CVR (SP) | 8-15% | High (bottom-of-funnel, purchase intent) |
| NTB % (SB) | 40-70% | Measures incremental reach |
| TACoS | 5-15% | Total ACOS (ad spend / total revenue incl. organic) |

### TACoS (Total ACOS) — Amazon-Specific

```
TACoS = Ad Spend / Total Revenue (organic + ad-driven)
```

TACoS is the true efficiency metric for Amazon:
- Falling TACoS with stable ad spend = organic sales growing (ads boosting organic rank)
- Rising TACoS = increasing dependency on ads (organic declining)

## Cross-Channel Integration

### Amazon within Multi-Channel Portfolio

| Scenario | Amazon Role | Budget Share |
|----------|-----------|-------------|
| D2C brand expanding to marketplace | Incremental channel | 10-20% |
| Amazon-first brand | Primary channel | 50-70% |
| Omnichannel | Consideration + conversion | 20-40% |

### Attribution Note

Amazon attribution is walled-garden:
- Cannot compare directly with Google/Meta (different windows, different models)
- Use Amazon Attribution for off-Amazon traffic → Amazon conversions
- For portfolio-level MMM: treat Amazon as separate channel with its own response curve

---

### Official References

- [広告アカウント登録](https://advertising.amazon.com/register) — Amazon Adsアカウントの作成と初期設定
- [Sponsored Productsキャンペーン作成](https://advertising.amazon.com/help/GKLSYGFS2YD33FER) — 商品選択・ターゲティング・入札設定の手順
- [Sponsored Brandsガイド](https://advertising.amazon.com/library/guides/sponsored-brands-what-to-know) — フォーマット選択・ブランドロゴ・見出し設定の概要
- [Amazon Attributionガイド](https://advertising.amazon.com/solutions/products/amazon-attribution) — アトリビューションタグ生成と外部広告への実装方法
