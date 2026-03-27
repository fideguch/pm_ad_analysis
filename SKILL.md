---
name: pm-ad-analysis
description: >-
  GAFA-quality ad analysis orchestrator for PMs. 5-channel coverage
  (Google Ads, Meta Ads, Apple Search Ads, TikTok Ads, Tracking/Analytics).
  Strategic portfolio optimization, creative generation, N-gram analysis,
  MMP link generation, Media Mix Modeling, incrementality testing, and
  self-learning SOPs. Delegates tactical CSV analysis to pm-ad-operations.
type: interactive
best_for:
  - "Multi-channel ad portfolio optimization and budget allocation"
  - "Creative headline/description batch generation with performance tracking"
  - "N-gram search query analysis and negative keyword mining"
  - "Apple Search Ads Discovery/Probing campaign design"
  - "TikTok Ads creative hook analysis (3-second rule)"
  - "MMP tracking link generation (AppsFlyer/Adjust) and UTM standardization"
  - "Media Mix Modeling and marginal ROI-based budget allocation"
  - "Incrementality testing design (geo-holdout, conversion lift)"
  - "Attribution model selection and migration planning"
  - "Creative fatigue detection and systematic replacement"
triggers:
  - "広告分析"
  - "広告戦略"
  - "クリエイティブ生成"
  - "見出し生成"
  - "N-gram"
  - "ネガティブキーワード"
  - "Apple Search Ads"
  - "ASA"
  - "TikTok広告"
  - "MMP"
  - "AppsFlyer"
  - "Adjust"
  - "トラッキングリンク"
  - "UTM"
  - "メディアミックス"
  - "MMM"
  - "インクリメンタリティ"
  - "クリエイティブ疲弊"
  - "アトリビューション"
  - "広告ポートフォリオ"
  - "ad strategy"
  - "creative generation"
  - "media mix"
  - "incrementality"
  - "attribution model"
  - "multi-channel ads"
  - "ad portfolio"
  - "spark ads"
  - "CPP広告"
---

# PM Ad Analysis

PMのための全自動広告運用エージェント（Ad Ops Tool Box）。5チャネルの戦略立案からクリエイティブ生成、データ分析、改善提案まで自律的に実行する。

---

## Operational Rules

- 専門用語は必要に応じて使うが、PMへの報告時は常に「それがKPI（LTV/CAC）にどう影響するか」に翻訳して伝える
- ユーザー情報のオーバーライド禁止。すべての前提条件・施策結果は **Append-only** の履歴で管理
- 大規模なAPI操作や予算変更を伴う場合はユーザーの承認（Y/N）を得る

---

## Resource Loading

References are loaded on-demand to preserve context window:

| Reference | Load When |
|-----------|-----------|
| `references/google_ads_playbook.md` | Google Ads strategy, bidding, Quality Score |
| `references/meta_ads_playbook.md` | Meta Ads CBO, audience, Advantage+ |
| `references/apple_search_ads_playbook.md` | ASA campaign design, CPP, LAT modeling |
| `references/tiktok_ads_playbook.md` | TikTok creative, Spark Ads, 3s hooks |
| `references/tracking_analytics.md` | MMP link generation, UTM, SDK events |
| `references/creative_testing.md` | Fatigue detection, rotation, A/B testing |
| `references/attribution_models.md` | Attribution model selection, migration |
| `references/mmm_incrementality.md` | MMM, marginal ROI, incrementality tests |

Do NOT pre-load all references at skill invocation.

---

## Core Principle: Autonomous Routing

This skill does NOT follow a fixed pipeline. It autonomously decides what to do based on accumulated knowledge and user input.

```
User Input (natural language)
  |
Load .claude_ad_memory/ + ads/
  |
Autonomous decision:
  |- No channel_context        -> Capability 1 (strategic hearing)
  |- CSV attached              -> DELEGATE to pm-ad-operations -> synthesize
  |- "N-gram analysis"         -> Capability 2
  |- "Generate headlines"      -> Capability 3 (creative generation)
  |- "Creative fatigue?"       -> Capability 4
  |- "Generate tracking link"  -> Capability 5 (MMP/UTM)
  |- "Apple Search Ads"        -> Capability 6
  |- "TikTok creative"         -> Capability 7
  |- "Budget across channels"  -> Capability 8 (MMM/portfolio)
  |- "Incremental lift?"       -> Capability 9
  |- "Which attribution?"      -> Capability 10
  |- "Weekly portfolio report" -> Synthesize all channels
  +- After execution: append to history_log.jsonl, update creative_vault
```

### Decision Rules

1. `.claude_ad_memory/` exists AND user has specific request -> skip hearing, execute
2. No channel context -> run Capability 1 (strategic hearing)
3. CSV attached -> identify platform, delegate to pm-ad-operations, synthesize at portfolio level
4. Past history exists -> "Last analysis showed [X]. Continue or new?"
5. Creative vault has >10 items without performance data -> prompt for performance CSV upload
6. Budget question -> Capability 8 (portfolio-level), then delegate within-channel to pm-ad-operations
7. New platform API docs provided -> trigger self-learning SOP generation

### Mandatory for ALL analyses

Before ANY analysis output, enforce:
- **Goal Statement**: "What is your target CPA / ROAS / budget constraint?" (refuse without)
- **Channel Identification**: Which channels are active
- **KPI Translation**: Every finding translated to business KPI impact (LTV/CAC effect)

---

## Knowledge Store (.claude_ad_memory/)

Every project accumulates ad intelligence in `.claude_ad_memory/` at the project root.

```
.claude_ad_memory/
|- history_log.jsonl       <- Append-only action log (every analysis, recommendation, creative)
|- creative_vault.json     <- All generated creatives + performance data
|- channel_context.md      <- Multi-channel strategic context
+- learned_sops/           <- Self-learned SOPs from API specs
    +- YYYY-MM-DD_name.md
```

Also reads from `ads/` (created by pm-ad-operations) if it exists.

### history_log.jsonl Schema

```jsonl
{"ts":"ISO8601","capability":"ngram|creative|fatigue|mmp|asa|tiktok|mmm|incrementality|attribution","channel":"google|meta|asa|tiktok|cross","summary":"1-line finding","confidence":"High|Medium|Low","artifacts":["path/to/report.md"],"delegated_to":"pm-ad-operations|null"}
```

### creative_vault.json Schema

```json
{
  "version": 1,
  "creatives": [{
    "id": "cr_001",
    "type": "headline|description",
    "text": "Content here",
    "char_count": 30,
    "channel": "google|meta|asa|tiktok",
    "campaign": "campaign_name",
    "generated_date": "YYYY-MM-DD",
    "status": "active|paused|retired",
    "tags": ["cta", "benefit", "urgency"],
    "performance": {
      "impressions": null, "clicks": null, "ctr": null,
      "conversions": null, "last_updated": null
    },
    "replaced_id": null
  }]
}
```

### Auto-Update Rules

After every execution:
1. Append action to `history_log.jsonl` with timestamp
2. Update `creative_vault.json` if creatives were generated or performance data provided
3. Update `channel_context.md` if new channel information discovered
4. Save learned SOPs if new API specs were processed

---

## Capability 1: Strategic Hearing + Multi-Channel Context

**Trigger:** `.claude_ad_memory/channel_context.md` missing or first use

### Required (must answer before analysis)

1. **Active channels**: Google Ads / Meta Ads / Apple Search Ads / TikTok Ads / Other
2. **Business goal**: CPA target, ROAS target, or monthly budget per channel
3. **Product type**: App / Web / Both (affects tracking strategy)

### Optional (accumulates over time)

4. Monthly budget split by channel
5. Attribution model per channel (last-click, data-driven, etc.)
6. MMP in use (AppsFlyer / Adjust / Branch / none)
7. iOS/Android user split (for LAT/SKAdNetwork modeling)
8. Creative strategy (formats, rotation cadence, brand guidelines)
9. Seasonality patterns
10. Competitive landscape

### Context Integration

If `ads/context.md` exists (from pm-ad-operations), import and extend with multi-channel fields. Do not duplicate.

---

## Capability 2: N-gram Analysis + Negative Keyword Mining

**Trigger:** User provides search query report CSV, or asks about keyword optimization

Load `references/google_ads_playbook.md` for context.

### Process

1. Ingest search query report CSV (Google Ads format)
2. Tokenize queries into unigrams, bigrams, trigrams
3. For each N-gram, compute:
   - Total spend, total conversions, CPA
   - Impression share, CTR
4. Rank by waste (high spend, zero/low conversions)
5. Output:

```markdown
## N-gram Waste Analysis

| N-gram | Impressions | Clicks | Spend | Conv. | CPA | Action |
|--------|------------|--------|-------|-------|-----|--------|
| [term] | [n] | [n] | [amt] | 0 | inf | Add as negative |
| [term] | [n] | [n] | [amt] | [n] | [high] | Monitor |

### Negative Keyword Candidates (sorted by wasted spend)
1. [term] — [spend] wasted, 0 conversions → Add as exact match negative
2. [term] — [spend] wasted, CPA 3x target → Add as phrase match negative

### High-Performing Themes
1. [term cluster] — CPA [amount], below target → Expand match types
```

### Python Reference

```python
import pandas as pd
from collections import Counter

def ngram_analysis(df, n=2, cost_col='Cost', conv_col='Conversions'):
    tokens = df['Search term'].str.lower().str.split()
    ngrams = tokens.apply(lambda x: list(zip(*[x[i:] for i in range(n)])))
    # ... aggregate by ngram, compute CPA, rank by waste
```

---

## Capability 3: Creative Generation (Headlines + Descriptions)

**Trigger:** User requests ad copy, or creative vault needs refresh

Load `references/creative_testing.md` for testing framework.

### Generation Process

1. Load business context + past creative performance from vault
2. Check vault for duplicate prevention (same USP + CTA combination)
3. Generate batch:
   - **Headlines**: 15 variants, max 30 characters each
   - **Descriptions**: 4 variants, max 90 characters each
4. Tag each creative: [cta, benefit, urgency, social_proof, feature, emotional]
5. Store in `creative_vault.json`

### Output Format

```markdown
## Generated Creatives for [campaign]

### Headlines (30 char max)
| # | Text | Chars | Tag | USP | Vault Duplicate? |
|---|------|-------|-----|-----|-----------------|
| 1 | [headline] | [n] | benefit | [usp] | No |

### Descriptions (90 char max)
| # | Text | Chars | Tag | CTA |
|---|------|-------|-----|-----|
| 1 | [description] | [n] | cta | [cta type] |

### Recommended Combinations
Pin headline [X] in position 1 (strongest hook), pair with description [Y].
```

### Sub-Agent Pattern

For large-scale generation (>3 ad groups):
- Dispatch headline generation and description generation as parallel sub-agents
- Each sub-agent receives: business context, USPs, character limits, existing vault (for dedup)
- Merge results, check duplicates, store in vault

---

## Capability 4: Creative Fatigue Detection + Replacement

**Trigger:** CTR declining, frequency rising, or user asks about creative health

Load `references/creative_testing.md`.

### Fatigue Signals

| Signal | Threshold | Channel |
|--------|----------|---------|
| CTR decline | >15% over 2 weeks | All |
| Frequency | >3.0 per user | Meta |
| CVR decline | >10% with stable CTR | All |
| Impression share drop | >20% decline | Google |
| Video completion rate drop | >20% decline | TikTok |

### Replacement Cadence (defaults)

| Format | Typical Lifespan | Replacement Trigger |
|--------|-----------------|-------------------|
| Static image | 2-3 weeks | CTR -15% or Freq >3 |
| Video (short) | 7-14 days | TikTok: 3s view rate -20% |
| Carousel | 3-4 weeks | CTR -15% |
| RSA headlines | 4-6 weeks | Below-average rating in Google |

### Process

1. Identify fatigued creatives from performance data
2. Check creative vault for ready replacements
3. If vault insufficient -> trigger Capability 3 (generate new)
4. Propose rotation plan with expected impact

---

## Capability 5: MMP Link + UTM Generation

**Trigger:** User needs tracking links or UTM standardization

Load `references/tracking_analytics.md`.

### UTM Standard (enforced)

```
utm_source   = {platform}           # google, meta, apple, tiktok
utm_medium   = {ad_type}            # cpc, cpm, social, video
utm_campaign = {campaign_name}      # lowercase, underscores
utm_content  = {creative_id}        # cr_001 from creative vault
utm_term     = {keyword|audience}   # search: keyword, social: audience
```

Rules: lowercase only, underscores not hyphens, no spaces, no special characters.

### MMP Link Generation

**AppsFlyer OneLink:**
```
https://app.appsflyer.com/{app_id}?pid={media_source}&c={campaign}&af_adset={adset}&af_ad={ad}&af_sub1={custom}
```

**Adjust Tracker:**
```
https://app.adjust.com/{token}?campaign={campaign}&adgroup={adgroup}&creative={creative}
```

### Output

```markdown
## Tracking Links for [campaign]

| Channel | Link Type | URL | Parameters |
|---------|----------|-----|-----------|
| Google | Click | [url] | utm_source=google&... |
| Meta | OneLink | [url] | pid=meta&... |
```

---

## Capability 6: Apple Search Ads Playbook

**Trigger:** ASA-related questions or campaign design

Load `references/apple_search_ads_playbook.md`.

### Campaign Architecture

| Campaign Type | Match Type | Purpose | Bid Strategy |
|--------------|-----------|---------|-------------|
| Brand | Exact | Defend brand terms | Aggressive max CPT |
| Category | Exact | High-intent generic | Moderate CPT |
| Competitor | Exact | Conquest | Conservative CPT |
| Discovery | Broad + Search Match ON | Keyword mining | Low CPT |

### Workflow

1. Launch Discovery campaign (broad match, low bids)
2. Mine high-performing keywords weekly
3. Migrate winners to Brand/Category/Competitor campaigns (exact match)
4. Add migrated keywords as negatives in Discovery (prevent overlap)

### CPP (Custom Product Page) Integration

- Map ad groups to Custom Product Pages
- Match keyword intent → relevant CPP screenshots + messaging
- Track CPP-level conversion rates

### LAT Modeling

```
Estimated true conversions = Reported conversions / (1 - LAT_rate)
LAT_rate ≈ 30-40% (iOS, varies by market)
```

---

## Capability 7: TikTok Ads Playbook

**Trigger:** TikTok-related questions or creative analysis

Load `references/tiktok_ads_playbook.md`.

### Spark Ads Decision

| Factor | Standard Ad | Spark Ad |
|--------|-----------|----------|
| Content | Brand-created only | Creator content (organic posts) |
| Engagement | Ad account only | Aggregates to creator's profile |
| Trust signal | Lower | Higher (native feel) |
| When to use | Direct response, control needed | UGC-style, awareness, trust |

### 3-Second Rule Analysis

From creative performance data, analyze:
1. **Hook retention**: % viewers past 3 seconds
2. **Hook taxonomy**: question, shock, demonstration, transformation, listicle
3. **Best-performing hook types** by campaign objective

```markdown
## TikTok Hook Analysis

| Creative | Hook Type | 3s Rate | 6s Rate | Completion | Conv |
|----------|----------|---------|---------|-----------|------|
| [id] | question | 65% | 45% | 12% | [n] |
```

### Creative Guidelines

- Sound ON is default (unlike Meta)
- Native feel > polished production
- 15-30 second optimal duration
- Vertical (9:16) mandatory
- First 3 seconds determine 70%+ of performance

---

## Capability 8: Media Mix Modeling + Portfolio Budget Allocation

**Trigger:** Cross-channel budget questions, portfolio optimization

Load `references/mmm_incrementality.md`.

### Marginal ROI Framework

Do NOT use average ROAS for budget decisions. Use **marginal ROI**:

```
Marginal ROI = d(Revenue) / d(Spend) at current spend level
```

Each channel has diminishing returns. Optimal allocation: equalize marginal ROI across channels.

### Process

1. Collect monthly spend + conversion data per channel (12+ months ideal)
2. Estimate response curves (log-linear: Revenue = a * ln(Spend) + b)
3. Calculate current marginal ROI per channel
4. Recommend reallocation: shift from low-marginal to high-marginal channels

### Output

```markdown
## Portfolio Budget Recommendation

| Channel | Current Spend | Marginal ROI | Rec. Spend | Delta | Expected Impact |
|---------|-------------|-------------|-----------|-------|----------------|
| Google | [amt] | [roi] | [amt] | +[%] | +[X] conv |
| Meta | [amt] | [roi] | [amt] | -[%] | -[X] conv, save [amt] |
| ASA | [amt] | [roi] | [amt] | +[%] | +[X] conv |

Total conversions: [current] -> [projected] (+[%])
Blended CPA: [current] -> [projected]
```

### Data Requirements

- Minimum 12 months of weekly spend + conversion data per channel
- If <12 months: use simpler marginal efficiency estimation (3-month rolling)
- Flag: "MMM requires 12+ months. Current data covers [X] months. Using simplified estimation."

---

## Capability 9: Incrementality Testing

**Trigger:** Causal questions ("Is this channel actually working?")

Load `references/mmm_incrementality.md`.

### Method Selection

```
Can you turn off the channel in some markets?
  -> Yes: Geo-holdout test (gold standard for non-digital)
  -> No: Does the platform offer conversion lift?
    -> Yes: Platform lift study (Meta/Google native)
    -> No: Can you create a PSA control?
      -> Yes: Ghost ads / PSA test
      -> No: Report as CORRELATION ONLY. Downgrade confidence.
```

### Geo-Holdout Design

1. Select treatment and control markets (similar size, demographics, seasonality)
2. Run for minimum 4 weeks (8 weeks preferred)
3. Measure: conversion lift = (treatment - control) / control
4. Statistical test: difference-in-differences with confidence interval

### Confidence Scoring for Incrementality

| Factor | High (3pt) | Medium (2pt) | Low (1pt) |
|--------|-----------|-------------|----------|
| Test design | Randomized holdout | Matched markets | Observational |
| Duration | 8+ weeks | 4-8 weeks | <4 weeks |
| Sample size | >100K users per group | 10K-100K | <10K |
| Confounders | Controlled (no other changes) | Partial control | Uncontrolled |

---

## Capability 10: Attribution Model Selection

**Trigger:** Attribution questions, model comparison

Load `references/attribution_models.md`.

### Decision Tree

```
Single-channel, direct response only?
  -> Yes: Last-click is acceptable
  -> No: Multiple touchpoints?
    -> Yes: Data volume > 10K conversions/month?
      -> Yes: Data-driven attribution (Google/Meta native)
      -> No: Time-decay or position-based
    -> Want causal truth?
      -> Yes: Incrementality testing (Capability 9)
```

### Migration Path

```
Last-click → Time-decay → Data-driven → Incrementality
  (simple)    (better)     (ML-based)    (causal truth)
```

### Impact Simulation

When switching attribution models, report expected changes:

```markdown
## Attribution Model Impact

| Channel | Last-Click Conv | Data-Driven Conv | Delta | Budget Implication |
|---------|----------------|-----------------|-------|-------------------|
| Google Brand | 500 | 350 (-30%) | -150 | Over-credited by last-click |
| Meta Prospecting | 200 | 320 (+60%) | +120 | Under-credited by last-click |
```

---

## Ad-Specific Guardrails (MANDATORY — auto-run before output)

```
Guardrail Checklist:
- [ ] Learning phase: Any campaigns in learning phase? (exclude from optimization)
- [ ] Attribution mismatch: Comparing channels with different attribution windows?
- [ ] Currency consistency: All spend figures in same currency?
- [ ] Seasonality: Is current period comparable to comparison period?
- [ ] LAT/SKAdNetwork: Are iOS conversions undercounted? (flag if app campaigns)
- [ ] Budget shift impact: Does reallocation exceed 30% of any channel's budget? (warn + require approval)
- [ ] Creative sample size: Enough impressions per creative for significance?
```

If any guardrail triggered: note in output, adjust confidence, require user acknowledgment.

---

## Confidence Scoring

Inherited from pm-data-analysis 4-axis/12-point rubric.

→ Full rubric: `references/mmm_incrementality.md` § "Confidence Scoring"

**Ad-specific adjustments:**
- **Attribution uncertainty**: -1pt if using last-click attribution for multi-touch journey
- **Cross-channel interference**: -1pt if channels share audiences without exclusion lists
- **Learning phase data**: -2pt if analysis includes campaigns in learning phase
- **Platform data lag**: -1pt if using Meta 1-day click vs 28-day view attribution without noting difference

**Total: 10-12pt = High, 7-9pt = Medium, <=6pt = Low**

---

## Self-Learning SOP System

When user provides new API documentation, platform specifications, or successful playbooks:

1. Parse the input for actionable patterns
2. Abstract into a structured SOP:
   ```markdown
   # SOP: [Name]
   **Source**: [URL or user input]
   **Date learned**: YYYY-MM-DD
   **Applies to**: [channel/task]
   **Steps**: [numbered procedure]
   **Constraints**: [rate limits, character limits, etc.]
   ```
3. Save to `.claude_ad_memory/learned_sops/YYYY-MM-DD_name.md`
4. On future invocations: scan `learned_sops/` for relevant SOPs before generating recommendations

---

## Delegation Table

| Need | Delegate To | How |
|------|------------|-----|
| CSV ingestion + waste detection | `pm-ad-operations` (Cap 2-4) | Delegate, receive findings, synthesize at portfolio level |
| Single-channel health check | `pm-ad-operations` (Cap 3) | Direct delegation |
| Deep statistical analysis | `pm-data-analysis` (Cap 4) | For MMM regression, incrementality significance |
| Creative A/B test design | `cro-methodology` | ICE scoring, test structure |
| Channel economics (CAC/LTV) | `pm-acquisition-channel-advisor` | Scale/test/kill per channel |
| Post-click funnel analysis | `funnel-analysis` | What happens after ad click |
| SaaS unit economics | `pm-saas-economics-efficiency-metrics` | Payback period, LTV:CAC |

---

## Execution Format

When user says "deploy ads for [X]", execute this process:

1. Load `history_log.jsonl` (past successes/failures)
2. Select target channels + define KPIs (CPA target from business model)
3. Generate tracking URLs / MMP links (Capability 5)
4. Generate creative variants (Capability 3, with sub-agent batching if >3 ad groups)
5. Present summary proposal to PM for approval (Y/N)

Do NOT execute budget changes or creative swaps without explicit PM approval.

---

## Language Support

Follow global CLAUDE.md language settings:
- Explanations and questions in Japanese
- Metric names, platform terms, code in English
- Section headers in English
