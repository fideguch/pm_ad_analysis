# Meta Ads Playbook

## Campaign Structure (2026)

### Budget Strategy

| Approach | When | How |
|----------|------|-----|
| CBO (Campaign Budget Optimization) | Default for most campaigns | Set budget at campaign level, Meta distributes |
| Ad Set Budget | Testing phase, strict control needed | Set per ad set, manual distribution |

CBO is default recommendation. Use ad set budgets only when testing new audiences.

### Campaign Types

| Type | Objective | Audience | Creative |
|------|----------|---------|---------|
| Prospecting | Conversions | Broad or Lookalike 1-3% | Diverse formats |
| Retargeting | Conversions | Website visitors, cart abandoners | Dynamic, urgency |
| Advantage+ Shopping | Sales | Algorithmic (minimal targeting) | Feed-based + creative |
| Advantage+ App | App installs | Algorithmic | App-focused creative |

## Audience Strategy

### Expansion Ladder

```
Lookalike 1% (most similar) → stable CPA, limited scale
  ↓ When frequency > 2.5 or CPA rising
Lookalike 1-3% → more scale, slight CPA increase
  ↓ When saturated
Lookalike 3-5% → broad reach, monitor CPA closely
  ↓ When saturated
Broad targeting (Advantage+) → algorithm finds best users
```

### Audience Overlap Check

- Overlap > 30% between ad sets = cannibalization
- Use Audience Overlap tool in Ads Manager
- Solution: consolidate into fewer ad sets or add exclusions

## Creative Testing: 3-3-3 Framework (Detailed)

### Concept

Test **3 dimensions** with **3 options each** = 27 possible combinations.
Andromeda (Meta's ad ranking algorithm) learns fastest with diverse creative inputs across formats.

### Dimension Matrix

| Dimension | Option A | Option B | Option C |
|-----------|---------|---------|---------|
| Hook (first 3s) | Question | Shock/stat | Demonstration |
| Body | Testimonial | Feature list | Story |
| CTA | Direct ("Buy now") | Soft ("Learn more") | Urgency ("Today only") |

### 3-Phase Execution Protocol

**Phase 1: Pre-Flight Testing (Week 1-2)**
1. Allocate 10-20% of campaign budget as testing budget (separate from BAU)
2. Create 9 creatives (3 hooks × 1 body × 1 CTA) — test hook dimension first
3. Run each creative in separate ad set with identical audience
4. Minimum budget per ad set: 3x target CPA/day
5. Run for 5-7 days, collect >= 50 conversions per variant
6. Winner = lowest CPA with statistical significance (p < 0.05)

**Phase 2: New vs BAU Testing (Week 3-4)**
1. Take winning hook from Phase 1
2. Pair with 3 body variants → 3 new creatives
3. A/B test: best new creative vs current BAU top performer
4. Run for 7 days minimum
5. If new > BAU by >10% CTR or >15% CVR: graduate to BAU

**Phase 3: Scaling (Week 5+)**
1. Graduate winning creative to BAU budget
2. Create format variations (same message, different format):
   - Static image version
   - Carousel version (each card = one benefit)
   - Video/Reels version (15-30s)
3. Andromeda rewards format diversity: use 3+ formats per ad set
4. Monitor: if CTR drops >15% from peak → trigger Capability 4 (fatigue detection)

### Andromeda Algorithm Optimization

Meta's Andromeda system selects from 10M+ candidate ads per impression. Key factors:

| Factor | Optimization |
|--------|-------------|
| Creative diversity | 3+ formats per ad set (static, carousel, video) |
| Relevance score | Match creative message to audience segment |
| Engagement history | Creatives with early engagement get more delivery |
| Format freshness | New formats get exploration bonus |

### Advantage+ Campaigns: Capabilities & Limitations

| Can Do | Cannot Do |
|--------|-----------|
| Algorithmic audience selection | Manual audience exclusions (limited) |
| Budget optimization across 150+ segments | Per-audience performance disaggregation |
| Dynamic creative optimization | Controlled creative A/B tests |
| Cross-placement delivery | Single-placement targeting |

**Impact on analysis**: When analyzing Advantage+ campaigns, report aggregate performance only. Do NOT attempt audience-level disaggregation — data is not available.

### Testing Protocol

1. **Separate testing budget** (10-20% of total) from BAU
2. One variable at a time for conclusive results
3. Minimum 5-7 days per test
4. Minimum 50 conversions per variant for significance
5. Use Capability 4 (fatigue detection) to know when to rotate

### Format Mix

| Format | Best For | Creative Guidelines |
|--------|---------|-------------------|
| Static image | Clear message, retargeting | Bold headline, single CTA |
| Carousel | Multiple products/features | Each card tells a story |
| Video (Reels) | Awareness, engagement | Vertical, sound-on, 15-30s |
| Collection | E-commerce, catalog | Hero image + product grid |

Andromeda algorithm rewards format diversity. Use 3+ formats per ad set.

## Frequency Management

| Objective | Max Frequency | Action When Exceeded |
|-----------|-------------|---------------------|
| Prospecting | 2.0 / 7 days | Expand audience or rotate creative |
| Retargeting | 4.0 / 7 days | Shorten window or refresh creative |
| Brand awareness | 3.0 / 7 days | Cap via frequency settings |

## Attribution Settings

| Window | Use When | Impact |
|--------|---------|--------|
| 7-day click, 1-day view | Default, recommended | Balanced |
| 1-day click only | Conservative, comparison with Google | Under-counts |
| 28-day click, 1-day view | App installs, long consideration | Over-counts view-through |

Always note attribution window when comparing Meta vs Google performance.

## Key Metrics

| Metric | B2B Benchmark | B2C Benchmark | E-commerce |
|--------|-------------|-------------|-----------|
| CTR (link) | 0.8-1.5% | 1.0-2.0% | 1.0-2.5% |
| CVR | 1.0-3.0% | 2.0-5.0% | 1.5-4.0% |
| CPM | $8-15 | $5-12 | $6-14 |
| Frequency (7d) | <2.0 | <2.5 | <3.0 |
