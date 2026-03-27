# PM Ad Analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
[![Channels](https://img.shields.io/badge/Channels-5-brightgreen?style=flat-square)](#channel-coverage)
[![Capabilities](https://img.shields.io/badge/Capabilities-11-blue?style=flat-square)](#capabilities-overview)
[![Updated](https://img.shields.io/badge/Updated-Mar%202026-green?style=flat-square)]()

[Japanese / 日本語](README.md)

> A Claude Code skill that autonomously executes 5-channel ad strategy, creative generation, data analysis, and optimization — just hand it a CSV. Built on each platform's official guidelines.

---

## Why This Skill?

| | Manual Ops | Other AI Tools (AdCreative.ai, etc.) | pm-ad-analysis |
|---|---|---|---|
| Channel Coverage | One at a time | Meta/Google-centric | **5 channels integrated** |
| Measurement Setup | Read docs yourself | Out of scope | **Platform-guideline-compliant onboarding** |
| Budget Allocation | Gut feeling | Average ROAS comparison | **Marginal ROI-based MMM** |
| Causal Validation | None | None | **Incrementality test design** |
| Reliability | Tribal knowledge | Black box | **Confidence Scoring (12pt)** |
| Learning | Implicit | None | **Self-Learning SOP** |
| Cost | $299-999+/mo | $29-499/mo | **$0 (Claude Code usage only)** |

---

## Getting Started (5 min)

### Prerequisites

- Claude Code CLI
- Python 3.11+

### Installation

```bash
# 1. Clone
git clone git@github.com:fideguch/pm_ad_analysis.git ~/pm_ad_analysis

# 2. Symlink
ln -s ~/pm_ad_analysis ~/.claude/skills/pm-ad-analysis

# 3. Python dependencies
pip install pandas scipy statsmodels numpy matplotlib seaborn
```

### First Run

```
"I want to build an ad strategy"
```

On first launch, the skill automatically:

1. **Project Context Auto-Scan** — Infers business domain from CLAUDE.md, package.json, etc.
2. **Capability 0 (Platform Onboarding)** — Guides through measurement setup, account structure, budget allocation, first campaign
3. **Capability 1 (Strategic Hearing)** — Builds 5-channel strategic context

If you already have ad accounts set up, Capability 0 is skipped and you go straight to Capability 1.

---

## Capabilities Overview

| # | Capability | Description | Trigger |
|---|-----------|-------------|---------|
| 0 | **Platform Onboarding** | Measurement, account structure, budget | Auto on new projects |
| 1 | **Strategic Hearing** | 5-channel context building | First use or no context |
| 2 | **N-gram Analysis** | Search query waste + negative KW mining | Search query CSV |
| 3 | **Creative Generation** | 15 headlines + 4 descriptions batch | "Generate headlines" |
| 4 | **Fatigue Detection** | Creative fatigue + rotation plan | CTR decline detected |
| 5 | **MMP/UTM Links** | Tracking link generation + UTM standardization | Tracking link request |
| 6 | **Apple Search Ads** | Discovery/Probing + CPP + LAT modeling | ASA questions |
| 7 | **TikTok Ads** | Spark Ads + 3-second hook analysis | TikTok questions |
| 8 | **MMM Portfolio** | Marginal ROI-based portfolio optimization | Budget allocation |
| 9 | **Incrementality** | Causal test design (geo-holdout, etc.) | Causal/incremental query |
| 10 | **Attribution** | Model selection + migration plan | Attribution questions |

### Use-Case Guide

| What you want to do | Capability | Example command |
|---|---|---|
| Start advertising for the first time | 0: Platform Onboarding | Auto-launches on new projects |
| Rebuild ad strategy | 1: Strategic Hearing | `"I want to build an ad strategy"` |
| Reduce wasted search queries | 2: N-gram Analysis | `"Run N-gram analysis"` |
| Generate ad copy in bulk | 3: Creative Generation | `"Generate headlines"` |
| Check if ads are fatigued | 4: Fatigue Detection | Auto-detected on CTR decline |
| Set up tracking links | 5: MMP/UTM Links | `"Create tracking links"` |
| Optimize Apple Search Ads | 6: Apple Search Ads | `"Design ASA campaigns"` |
| Improve TikTok ad hooks | 7: TikTok Ads | `"Analyze TikTok ad hooks"` |
| Optimize budget allocation | 8: MMM Portfolio | `"MMM budget allocation"` |
| Validate causal ad impact | 9: Incrementality | `"Incrementality test"` |
| Select attribution model | 10: Attribution | `"Choose attribution model"` |

---

## Channel Coverage

| Channel | Capabilities |
|---------|-------------|
| **Google Ads** | N-gram, negative KW, RSA creative, Brand/Non-Brand/P-MAX separation, Smart Bidding |
| **Meta Ads** | 3-3-3 testing, Advantage+, Tier 1/2/3 structure, CAPI integration |
| **Apple Search Ads** | 4-campaign foundation, CPP, LAT, AdAttributionKit |
| **TikTok Ads** | Spark Ads, 3-second hook, CBO + 3-stage funnel |
| **Amazon Ads** | SP/SB/SD, ACOS, Auto-to-Manual migration, DSP |
| **Tracking** | MMP (AppsFlyer/Adjust), UTM, SKAdNetwork, Server-Side (CAPI/Enhanced Conversions) |

---

## Architecture

```
User Input
  |
  v
Project Context Auto-Scan
  |
  v
pm-ad-analysis (Strategy Orchestrator)
  |
  |-- Capability 0-10 (routing by intent)
  |-- .claude_ad_memory/ (Knowledge Store)
  |     |-- history_log.jsonl      (Append-only audit trail)
  |     |-- creative_vault.json    (Creatives + performance)
  |     |-- channel_context.md     (Strategic context)
  |     +-- learned_sops/          (Self-learned SOPs)
  |
  +-- Delegates to:
        |-- pm-ad-operations         (CSV analysis, waste detection)
        |-- pm-data-analysis         (Deep statistics, regression)
        |-- cro-methodology          (A/B test design)
        |-- pm-acquisition-channel-advisor (Channel economics)
        +-- funnel-analysis          (Post-click funnel)
```

> Delegated skills are all installed within the same Claude Code environment. No separate repository installation is required (they are defined as Claude Code skills).

---

## Advanced Features

### Confidence Scoring

Every analysis result receives a 12-point Confidence Score across 4 axes (statistical significance, effect size, sample size, data quality) x 3 points each, with per-capability penalties applied.

- **10-12pt = High**: Recommend execution
- **7-9pt = Medium**: Consider additional data collection
- **6pt or below = Low**: Hold judgment, needs more validation

### Pre-Flight Guardrails

8 automatic checks before any analysis. BLOCK-level issues (mixed currencies, budget shift >30%) halt execution and prompt for user action. WARN-level issues continue with confidence penalties.

### Self-Learning SOP

Automatically parses new platform specs or API docs provided by the user, saves to `.claude_ad_memory/learned_sops/`, and applies them in future analyses.

### Project Context Auto-Scan

Infers business domain, platform type, and connected MCPs from project files (CLAUDE.md, package.json, .mcp.json), minimizing manual questions.

---

## Configuration

### Knowledge Store

Auto-generates `.claude_ad_memory/` at project root (recommend adding to `.gitignore`):

```
.claude_ad_memory/
|-- history_log.jsonl    <- Append-only action log
|-- creative_vault.json  <- Generated creatives + performance
|-- channel_context.md   <- Multi-channel strategic context
+-- learned_sops/        <- Auto-learned SOPs
```

### MCP Integration

See `~/.claude/rules/common/mcp-selection.md` for recommended MCP configurations by project type.

---

## PM Tool Suite

This skill is part of a 5-skill PM tool suite:

| # | Skill | Purpose | Repo |
|---|-------|---------|------|
| 1 | my_pm_tools | GitHub Projects V2 management | [fideguch/my_pm_tools](https://github.com/fideguch/my_pm_tools) |
| 2 | requirements_designer | Requirements + Figma integration | [fideguch/requirements_designer](https://github.com/fideguch/requirements_designer) |
| 3 | speckit-bridge | Requirements to spec conversion | [fideguch/speckit-bridge](https://github.com/fideguch/speckit-bridge) |
| 4 | pm-data-analysis | Production-quality data analysis | [fideguch/pm_data_analysis](https://github.com/fideguch/pm_data_analysis) |
| 5 | **pm-ad-analysis** | **Autonomous ad operations** | **this repo** |

```
requirements_designer --> speckit-bridge --> my_pm_tools
                               |
                     pm-data-analysis <-- pm-ad-analysis
```

---

## When NOT to Use

- Single-channel CSV analysis only -> use `pm-ad-operations` directly
- Non-ad data analysis -> use `pm-data-analysis`
- Landing page optimization -> use `cro-methodology`

---

## License

MIT
