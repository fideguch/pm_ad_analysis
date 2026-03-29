---
name: pm-ad-analysis
description: >-
  GAFA-quality ad analysis orchestrator for PMs. 15 capabilities across 5 channels
  (Google Ads, Meta Ads, Apple Search Ads, TikTok Ads, Tracking/Analytics).
  Platform onboarding with GAFA-compliant measurement setup, strategic portfolio
  optimization, CSV analysis, creative generation, N-gram analysis, MMP link generation,
  Media Mix Modeling, incrementality testing, and self-learning SOPs.
type: interactive
best_for:
  - "Ad platform onboarding — measurement setup, account structure, first campaign"
  - "Analyzing Google Ads / Meta Ads CSV exports"
  - "Detecting ad spend waste"
  - "Generating campaign health reports"
  - "Budget reallocation recommendations"
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
  - "広告運用"
  - "広告戦略"
  - "Google Ads"
  - "Meta Ads"
  - "Facebook広告"
  - "CPA分析"
  - "ROAS"
  - "広告費"
  - "ad performance"
  - "campaign analysis"
  - "ad spend"
  - "広告レポート"
  - "CPC高い"
  - "CVR低い"
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
  - "Amazon広告"
  - "ACOS"
  - "広告を始めたい"
  - "広告セットアップ"
  - "広告アカウント設定"
  - "トラッキング設定"
  - "ad onboarding"
  - "start advertising"
  - "tracking setup"
  - "スクリーンガイド"
  - "screen guide"
---

# PM Ad Analysis

PMのための全自動広告運用エージェント。5チャネルの戦略立案→クリエイティブ生成→CSV分析→改善提案を自律実行。

---

## Operational Rules

- 専門用語は必要に応じて使うが、PMへの報告時は常に「それがKPI（LTV/CAC）にどう影響するか」に翻訳
- ユーザー情報のオーバーライド禁止。すべての前提条件・施策結果は **Append-only** 履歴で管理
- 大規模なAPI操作や予算変更を伴う場合はユーザーの承認（Y/N）を得る
- Help Links: 広告管理画面のUI操作を含む提案時に、公式ヘルプリンクと手順要約を添付（`references/official_help_links.md` を参照）
- Screen Guide Mode: 広告管理画面のUI操作を含む提案時に自動で案内を提示する。詳細は下記 Screen Guide ルール参照

---

## Resource Loading

References and capability specs are loaded on-demand. Do NOT pre-load.

### Channel Playbooks
| Reference | Load When |
|-----------|-----------|
| `references/google_ads_playbook.md` | Google Ads strategy, bidding, Quality Score |
| `references/meta_ads_playbook.md` | Meta Ads CBO, audience, Advantage+, 3-3-3 |
| `references/apple_search_ads_playbook.md` | ASA campaign design, CPP, LAT modeling |
| `references/tiktok_ads_playbook.md` | TikTok creative, Spark Ads, 3s hooks |
| `references/amazon_ads_playbook.md` | Amazon SP/SB/SD, ACOS, DSP |

### Cross-Channel References
| Reference | Load When |
|-----------|-----------|
| `references/tracking_analytics.md` | MMP link generation, UTM, SDK events |
| `references/creative_testing.md` | Fatigue detection, rotation, A/B testing |
| `references/attribution_models.md` | Attribution model selection, migration |
| `references/mmm_incrementality.md` | MMM, marginal ROI, incrementality tests |
| `references/reproducibility.md` | Environment spec, threshold config, data versioning |
| `references/official_help_links.md` | Any action that involves ad platform UI operation |
| `references/csv_operations.md` | CSV ingestion, campaign health check, optimization |
| `references/ad_metrics.md` | Metric definitions, benchmarks |
| `references/platform_csv_formats.md` | Platform-specific CSV column mappings |

### CSV Operations Templates
| Template | Load When |
|----------|-----------|
| `templates/ad_context.md` | Creating initial ads/context.md |
| `templates/ad_report.md` | Generating executive report from CSV analysis |

### Capability Specs (load the ONE matching user's request)
| Capability | Reference | Trigger |
|-----------|-----------|---------|
| 0. Platform Onboarding | `references/capability_0_onboarding.md` | New project, no ad account or tracking |
| 1. Strategic Hearing | `references/capability_1_strategic_hearing.md` | First use, no context |
| 2. N-gram Analysis | `references/capability_2_ngram_analysis.md` | Search query CSV |
| 3. Creative Generation | `references/capability_3_creative_generation.md` | "見出し生成", ad copy request |
| 4. Fatigue Detection | `references/capability_4_fatigue_detection.md` | CTR decline, frequency |
| 5. MMP/UTM Links | `references/capability_5_mmp_utm.md` | Tracking link request |
| 6. Apple Search Ads | `references/capability_6_apple_search_ads.md` | ASA questions |
| 7. TikTok Ads | `references/capability_7_tiktok_ads.md` | TikTok questions |
| 8. MMM Portfolio | `references/capability_8_mmm_portfolio.md` | Budget allocation |
| 9. Incrementality | `references/capability_9_incrementality.md` | Causal questions |
| 10. Attribution | `references/capability_10_attribution.md` | Attribution model |
| 11. CSV Ingest + Platform Detection | `references/csv_operations.md` | Google/Meta CSV attached |
| 12. Campaign Health Check + Waste | `references/csv_operations.md` | Performance review, waste scan |
| 13. Optimization Recommendations | `references/csv_operations.md` | Budget reallocation, bid strategy |
| 14. Executive Report | `templates/ad_report.md` | Report generation from CSV |

---

## Autonomous Routing

```
User Input
  |
Project Context Auto-Scan:
  |- Read CLAUDE.md → business domain
  |- Read package.json / pubspec.yaml / build.gradle → platform (Web/App/Both)
  |- Read .mcp.json → connected MCP servers
  |- Present inferences to user for confirmation
  |
Check .claude_ad_memory/ exists?
  |
  |- NO  → Check ad account & tracking status:
  |    |- No ad account OR no tracking → Load capability_0 (onboarding)
  |    |- Account exists & tracking set → Load capability_1 (strategic hearing)
  |- YES → Route by intent:
      |- CSV attached           → Load references/csv_operations.md → execute internally
      |- Search query CSV       → Load capability_2 (N-gram)
      |- "見出し/creative"       → Load capability_3 (creative gen)
      |- CTR declining          → Load capability_4 (fatigue)
      |- "tracking/UTM/MMP"     → Load capability_5 (MMP/UTM)
      |- "ASA/Apple Search"     → Load capability_6 (ASA)
      |- "TikTok"               → Load capability_7 (TikTok)
      |- "budget/portfolio/MMM" → Load capability_8 (MMM)
      |- "incremental/causal"   → Load capability_9 (incrementality)
      |- "attribution"          → Load capability_10 (attribution)
      |- "Amazon/ACOS"          → Load amazon_ads_playbook.md
      +- After execution: append to history_log.jsonl
      +- Output generation:
          |- Load official_help_links.md → attach relevant links to every action item
          |- Screen Guide auto-prompt (see below)
```

### Decision Rules

1. `.claude_ad_memory/` exists AND specific request → skip hearing, execute
2. New project (no ad account or tracking unverified) → run Capability 0
3. Capability 0 complete → auto-transition to Capability 1
4. No channel context but ad account exists → run Capability 1
5. CSV attached → load references/csv_operations.md, execute internally
6. Past history exists → "Last analysis: [X]. Continue or new?"
7. Creative vault >10 items without performance → prompt CSV upload
8. Budget question → Capability 8, load csv_operations.md for within-channel analysis
9. New API docs provided → trigger SOP learning (Layer 1)
10. Amazon data → Load amazon_ads_playbook.md, apply ACOS framework
11. Screen Guide の明示的切替: 「スクリーンガイドON/OFF」「ガイド」「SG」「画面見て」「操作教えて」→ config.md を更新

### Screen Guide Rules

UI操作を含む提案（キャンペーン作成、コンバージョン設定、Pixel設置等）を出力する際:

1. **screen_guide_mode = unset（初回）**: 操作提案の末尾に1回だけ提示:
   `「管理画面の操作が初めての場合、スクリーンショットを貼っていただければ画面を見ながらご案内します。希望しますか？」`
   → YES → config.md を true に設定 / NO → false に設定
2. **screen_guide_mode = true**: 操作指示ごとにスクショ共有を要求し、画面要素を指し示す案内を実行
3. **screen_guide_mode = false**: 操作提案 + 公式ヘルプリンクのみ（スクショ要求なし）
4. **いつでも切替可能**: 「ガイドON」「ガイドOFF」「スクリーンガイド」等で即切替。トグル動作（現在ONならOFF、OFFならON）

### Fallback Rules

- **pm-data-analysis missing**: Built-in Python stats (scipy.stats)
- **Other skills missing**: Skip delegation, note in output

### Mandatory for ALL analyses

- **Goal Statement**: "What is your target CPA / ROAS / budget constraint?" (refuse without)
- **Channel Identification**: Which channels are active
- **KPI Translation**: Every finding → business KPI impact (LTV/CAC effect)

---

## Knowledge Store (.claude_ad_memory/ + ads/)

```
.claude_ad_memory/
|- config.md               <- User preferences (screen_guide_mode, etc.)
|- history_log.jsonl       <- Append-only action log
|- creative_vault.json     <- Generated creatives + performance
|- channel_context.md      <- Multi-channel strategic context
+- learned_sops/           <- Self-learned SOPs

ads/
|- context.md              <- Ad account context (channels, goals, budgets)
|- benchmarks.md           <- Industry benchmarks + historical performance
|- history/                <- Past reports
|   |- index.md            <- Searchable index (auto-maintained)
|   |- YYYY-MM-DD_type.md  <- Reports with reproduction code
|   +- ...
+- alerts.md               <- Active alerts (anomalies, budget pacing issues)
```

### Schema Definitions

- history_log.jsonl → see `templates/history_entry_schema.md`
- creative_vault.json → see `templates/creative_vault_schema.md`

### Auto-Update Rules

After every execution:
1. Append to `history_log.jsonl`
2. Update `creative_vault.json` if creatives generated or performance provided
3. Update `channel_context.md` if new channel info discovered

---

<HARD-GATE>
Do NOT output any analysis results until ALL pre-flight guardrail checks below are completed and presented.
Present guardrail results FIRST, then analysis. If any BLOCK-level check fails, STOP and request user action.
</HARD-GATE>

## Pre-Flight Guardrail Checks

Execute these checks in order before ANY output:

- [ ] **Learning Phase** [WARN]: Campaigns with <50 conversions (Google) or "Learning" (Meta) → EXCLUDE, penalty -2pt
- [ ] **Attribution Windows** [WARN]: Different windows across channels? → NORMALIZE or FLAG, penalty -1pt
- [ ] **Currency** [BLOCK]: All spend in same currency? → If mixed: **STOP** — ask user
- [ ] **Seasonality** [WARN]: Comparable periods? → FLAG if non-comparable, penalty -1pt
- [ ] **LAT/SKAN** [WARN] (if App): Apply LAT adjustment (35% US, 25% JP default), penalty -1pt if not shown
- [ ] **Budget Shift** [BLOCK] (if reallocation): Any channel delta >30%? → **STOP** — require PM approval
- [ ] **Creative Sample** [WARN]: Min 1K impressions, 30 conversions per variant → FLAG insufficient, penalty -1pt
- [ ] **Platform Capability** [INFO]: P-MAX → skip N-gram; Advantage+ → no audience disaggregation; LAT >50% → downgrade ASA

### Severity

| Level | Behavior |
|-------|---------|
| **BLOCK** | STOP. Cannot proceed without user action (budget >30%, mixed currencies) |
| **WARN** | Proceed with confidence penalty + visible note |
| **INFO** | Note in report, no penalty |

---

## Confidence Scoring

### Base Rubric (4 axes × 3pt = 12pt max)

| Axis | High (3pt) | Medium (2pt) | Low (1pt) |
|------|-----------|-------------|----------|
| Statistical significance | p < 0.01 | p < 0.05 | p >= 0.05 or untested |
| Effect size | ROAS > 2x target or CPA < 50% target | On target (±20%) | Below target or unknown |
| Sample size | N >= recommended | N = 50-100% | N < 50% |
| Data quality | Full attribution, <5% missing | Partial (LAT, SKAN) 5-15% | Major gaps >15% |

### Per-Capability Modifiers

| Capability | Penalty | Condition |
|-----------|---------|-----------|
| Cap 2 (N-gram) | -1pt | Data < 30 days |
| Cap 3 (Creative) | -1pt | Vault <5 creatives with performance |
| Cap 4 (Fatigue) | -1pt | Comparison < 14 days |
| Cap 6 (ASA) | -1pt | LAT > 40% |
| Cap 8 (MMM) | -2pt | Data < 6 months |
| Cap 9 (Incrementality) | -1pt | Holdout < 4 weeks |

### Ad-Specific Penalties

| Penalty | Points | Trigger |
|---------|--------|---------|
| Attribution uncertainty | -1pt | Last-click for multi-touch |
| Cross-channel interference | -1pt | Shared audiences without exclusion |
| Learning phase included | -2pt | Not excluded |
| Platform data lag | -1pt | Different windows not normalized |
| LAT uncorrected | -1pt | App data without adjustment |

### Aggregation

- Score each finding independently: **Score = max(0, base_score - penalties)**
- Report confidence = **lowest individual finding**
- Always report confidence intervals: `CPA: $12.50 (95% CI: $10.80–$14.20)`

**Total: 10-12pt = High, 7-9pt = Medium, <=6pt = Low**

---

## Self-Learning (Layer 1-2)

### Layer 1: SOP Learning

When user provides new API docs or platform specs:
1. Parse for actionable patterns
2. Save to `.claude_ad_memory/learned_sops/YYYY-MM-DD_name.md`
3. Format: Source, Date, Applies to, Trigger keywords, Steps, Constraints

### Layer 2: SOP Invocation

On every invocation, before executing capability:
1. Check if `learned_sops/` exists
2. Match user request against SOP trigger keywords
3. If match: load and incorporate
4. Output: "Applied SOPs: [list]"

> Advanced layers (creative pattern detection, outcome feedback, capability tracking) are documented in `references/self_learning_advanced.md` for future Hooks implementation.

---

## Delegation Table

| Need | Delegate To | Expected Output | Fallback |
|------|------------|----------------|----------|
| Deep statistical analysis | `pm-data-analysis` | p-value, effect size, CI | Built-in scipy.stats |
| Creative A/B test design | `cro-methodology` | ICE score, test plan | Use creative_testing.md |
| Channel economics | `pm-acquisition-channel-advisor` | Scale/Test/Kill | Note unavailable |
| Post-click funnel | `funnel-analysis` | Drop-off table | Note unavailable |
| SaaS unit economics | `pm-saas-economics-efficiency-metrics` | LTV:CAC, payback | Manual calculation |

---

## Execution Format

When user says "deploy ads for [X]":

1. Load `history_log.jsonl` (past successes/failures)
2. Select target channels + define KPIs
3. Generate tracking URLs / MMP links (Capability 5)
4. Generate creative variants (Capability 3)
5. Present summary proposal to PM for approval (Y/N)

Do NOT execute budget changes or creative swaps without explicit PM approval.

---

## Language Support

- Explanations and questions in Japanese
- Metric names, platform terms, code in English
- Section headers in English
