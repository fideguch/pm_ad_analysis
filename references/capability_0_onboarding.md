# Capability 0: GAFA-Standard Onboarding

**Trigger:** First use of pm-ad-analysis skill, or `.claude_ad_memory/` directory missing

**Principle:** Measurement before campaigns. All GAFA platforms officially recommend infrastructure setup before ad spend begins.

---

## Phase 1: Project Context Discovery (Auto + Questions)

### Auto-Scan (no user input needed)

| File | Inferred Context |
|------|-----------------|
| `CLAUDE.md` | Business domain, tech stack |
| `package.json` / `pubspec.yaml` / `build.gradle` | Platform (Web / App / Both) |
| `README.md` | Product overview |
| `.mcp.json` | Connected MCP servers (GA4, Google Ads, Meta Ads, etc.) |

### Process

1. Scan above files and infer: domain, platform, product summary, active MCPs
2. Present inferences for user confirmation ("Your product is [X], correct?")
3. Fill gaps with targeted questions only (do not re-ask what was inferred)

### Required Context (must resolve before Phase 2)

- Business domain / vertical
- Platform: Web / App / Both
- Target markets (geo)
- Existing ad accounts (if any)
- Monthly budget range (rough)

---

## Phase 2: Measurement Infrastructure

Setup tracking **before** any campaign launch.

| Platform | Stack | Notes | Official Guide |
|----------|-------|-------|----------------|
| Google | GA4 + Google Tag + Enhanced Conversions | Server-side recommended (Google 2025 official) | [コンバージョン設定](https://support.google.com/google-ads/answer/16560108) / [拡張コンバージョン](https://support.google.com/google-ads/answer/9888656) |
| Meta | Meta Pixel + Conversions API (CAPI) | Server-side mandatory trend; delivery penalized without CAPI | [Pixel設定](https://www.facebook.com/business/help/952192354843755) / [CAPI設定](https://www.facebook.com/business/help/2041148702652965) |
| Apple | SKAdNetwork 4.0 / AdAttributionKit | Required for iOS campaign measurement | [アカウント設定](https://searchads.apple.com/help/get-started/0004-set-up-an-account) |
| TikTok | TikTok Pixel + Events API | Server-side improves match rate | [Pixel設定](https://ads.tiktok.com/help/article/get-started-pixel) / [Events API](https://ads.tiktok.com/help/article/getting-started-events-api) |
| Amazon | Amazon Attribution | Cross-channel attribution for Amazon sellers | [Attribution設定](https://advertising.amazon.com/solutions/products/amazon-attribution) |

### Common Setup

- **UTM naming convention**: Standardize before first campaign
  - Format: `utm_source/utm_medium/utm_campaign/utm_content/utm_term`
  - Example: `google/cpc/brand_exact/headline_v1/brand_keyword`
- **Conversion event definition**: Define primary + secondary conversion events per platform

### Rationale

Google: Smart Bidding degrades without GA4 conversion setup (Google 2025 best practices).
Meta: CAPI-less accounts see reduced delivery volume (Meta Business Help Center 2025).

---

## Phase 3: Account Structure Design

| Platform | Recommended Structure | Source |
|----------|----------------------|--------|
| Google Ads | Brand / Non-Brand / P-MAX separation | Google 2025-2026 guide: "Do not mix Brand and Non-Brand in same campaign" |
| Meta Ads | Tier 1 (proven, 60-70%) / Tier 2 (testing, 20-30%) / Tier 3 (experiment, <10%) | Meta 2025-2026: "Advantage+ Sales Campaign delivers +22% higher ROAS" |
| Apple Search Ads | Brand / Category / Competitor / Discovery (4-campaign foundation) | Apple official "4-campaign foundation" |
| TikTok Ads | CBO + 3-stage funnel (Awareness / Consideration / Conversion) | TikTok Business Center best practices |
| Amazon Ads | Auto campaigns first → Manual migration after data collection | Amazon "test-and-learn" official recommendation |

### Key Principles

- Separate brand and non-brand traffic (all platforms)
- Isolate testing budget from proven performers
- Design for the bidding algorithm's learning requirements

---

## Phase 4: Budget Allocation Framework

### Initial Test Period (First 30 Days)

**70/20/10 Rule:**
- 70%: Most proven channel / audience
- 20%: Testing new channels / audiences
- 10%: Experimental approaches

**Funnel Allocation:**
- TOFU (Awareness): 20-30%
- MOFU (Consideration): 40-50%
- BOFU (Conversion): 30-40%

### Guidelines

- First month goal: **data collection > revenue maximization**
- Industry benchmark: 7-12% of annual revenue for ad budget
- Reallocation cadence: Review every 7-14 days, reallocate based on data (Amazon official recommendation)
- Minimum viable budget per platform: Enough for 50+ conversions/month (Google Smart Bidding threshold)

---

## Phase 5: First Campaign Launch Template

### Per-Platform Checklist

| Item | Google Ads | Meta Ads | Apple Search Ads |
|------|-----------|----------|-----------------|
| Objective | Conversions (tCPA or tROAS) | Sales / Leads (Advantage+) | Installs / In-app events |
| Min assets | 15 headlines + 4 descriptions (RSA) | 3-5 creatives + copy variants | 3+ Creative Sets |
| Bidding | Maximize Conversions → tCPA after data | Lowest Cost → Cost Cap after data | Cost-Per-Tap / Cost-Per-Install |
| Learning period | ~50 conversions | Advantage+ exit learning faster | ~100 taps |

> **Campaign creation guides:**
> - Google: [キャンペーン作成](https://support.google.com/google-ads/answer/6324971) / [P-MAX作成](https://support.google.com/google-ads/answer/10724896)
> - Meta: [Advantage+について](https://www.facebook.com/business/help/1362234537597370)
> - Apple: [Create Campaigns](https://searchads.apple.com/help/campaigns/0005-create-campaigns)
> - TikTok: [Business Center セットアップ](https://ads.tiktok.com/help/article/create-tiktok-business-center)
> - Amazon: [Sponsored Products作成](https://advertising.amazon.com/help/GKLSYGFS2YD33FER)

### Landing Page Requirements

- **Message match**: Ad copy promise = landing page headline
- Mobile-optimized (Core Web Vitals passing)
- Clear CTA above the fold
- Load time < 3 seconds

### Learning Period Benchmarks

- Google: ~50 conversions per campaign for Smart Bidding to optimize
- Meta: Advantage+ campaigns exit learning phase faster than manual
- Apple: ~100 taps for keyword-level optimization
- TikTok: ~50 conversions per ad group per week
- Amazon: 7-14 days of Auto campaign data before Manual migration

---

## Phase 6: MCP Server Setup (Claude Code Integration)

### Recommended MCP Config by Project Type

| Project Type | MCPs |
|-------------|------|
| SaaS Product | GA4, Google Ads (if running), Figma |
| Growth / Marketing | GA4, Google Ads, Meta Ads |
| App (Mobile) | GA4, Google Ads, Apple Search Ads |
| E-commerce | GA4, Google Ads, Meta Ads, Amazon Ads |
| Default (MVP) | GA4 only |

Reference: `~/.claude/rules/common/mcp-selection.md` for full setup instructions.

### Setup Process

1. Determine required MCPs from project type
2. Generate `.mcp.json` with credentials (never commit to git)
3. Test each connection: verify tool availability and data access
4. Confirm data freshness (recent data visible in reports)

---

## Readiness Validation Gate

All items must pass before transitioning to Capability 1 (Strategic Hearing).

| # | Check | Status |
|---|-------|--------|
| 1 | At least 1 ad platform account created | [ ] |
| 2 | Conversion tracking installed & verified firing | [ ] |
| 3 | Campaign structure designed (Phase 3 output) | [ ] |
| 4 | Initial budget determined (Phase 4 output) | [ ] |
| 5 | UTM naming convention standardized | [ ] |

**All complete** → Initialize Knowledge Store, then transition to Capability 1:
1. Create `.claude_ad_memory/` directory
2. Create `config.md` with user preferences (screen_guide_mode etc.)
3. Create `channel_context.md` from `templates/ad_analysis_context.md` with Phase 1-4 outputs
4. Create empty `history_log.jsonl` and `creative_vault.json`
5. → [Capability 1: Strategic Hearing](./capability_1_strategic_hearing.md)

**Incomplete** → Address gaps before proceeding. Partial setups lead to unreliable data and wasted ad spend.
