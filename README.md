# PM Ad Analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
[![Channels](https://img.shields.io/badge/Channels-5-brightgreen?style=flat-square)](#channels)
[![Capabilities](https://img.shields.io/badge/Capabilities-10-blue?style=flat-square)](#10-capabilities)
[![Updated](https://img.shields.io/badge/Updated-Mar%202026-green?style=flat-square)]()

> 広告運用の専門知識がなくても、CSVを渡すだけで5チャネルの戦略立案・クリエイティブ生成・データ分析・改善提案を自律的に実行する Claude Code スキル。

## Overview

PMのための全自動広告運用エージェント（Ad Ops Tool Box）。戦術レベルのCSV分析は `pm-ad-operations` に委譲し、本スキルは戦略レイヤー（ポートフォリオ最適化、クリエイティブ生成、因果検証）に集中するオーケストレーターパターン。

## Channels

| Channel | Capabilities |
|---------|-------------|
| Google Ads | N-gram分析、ネガティブKW、RSAクリエイティブ生成、tCPA/tROAS最適化 |
| Meta Ads | 3-3-3テスト、Advantage+、オーディエンス戦略、クリエイティブ疲弊検知 |
| Apple Search Ads | Discovery/Probing設計、CPP連携、LATモデリング |
| TikTok Ads | Spark Ads、3秒フック分析、クリエイティブ構成案 |
| Amazon Ads | Sponsored Products/Brands/Display、ACOS最適化、DSP |
| Tracking | MMP(AppsFlyer/Adjust)リンク生成、UTM標準化、SKAdNetwork |

## 10 Capabilities

1. **Strategic Hearing** — 5チャネル対応コンテキスト構築
2. **N-gram Analysis** — 検索クエリの無駄検出+ネガティブKW候補
3. **Creative Generation** — 見出し15本/説明文4本のバッチ生成+Creative Vault管理
4. **Fatigue Detection** — クリエイティブ疲弊の自動検知+ローテーション提案
5. **MMP/UTM Generation** — トラッキングリンク生成+UTM標準化
6. **Apple Search Ads** — キャンペーン設計+CPP+LATモデリング
7. **TikTok Ads** — Spark Ads+3秒フック分析+クリエイティブ構成
8. **Media Mix Modeling** — 限界ROIベースのポートフォリオ予算配分
9. **Incrementality Testing** — 因果検証テスト設計+分析（相関ではなく因果）
10. **Attribution Selection** — アトリビューションモデル選択+移行計画

## Prerequisites

- Claude Code CLI
- `pm-ad-operations` skill (CSV分析の委譲先 — `~/.claude/skills/pm-ad-operations/`)
- Python 3.11+ (統計分析・MMM に使用)

```bash
pip install pandas scipy statsmodels numpy matplotlib seaborn
```

### Optional

- `pm-data-analysis` skill (深い統計分析の委譲先)
- Google Ads / Meta Ads の MCP 接続、または CSV エクスポート

## Installation

```bash
git clone git@github.com:fideguch/pm_ad_analysis.git ~/pm_ad_analysis
ln -s ~/pm_ad_analysis ~/.claude/skills/pm-ad-analysis
```

Setup time: ~5 min

## Quick Start

```
# 基本
「広告戦略を立てたい」
「この CSV を分析して」

# チャネル別
「N-gram分析して」          → Google Ads 検索クエリ最適化
「見出し生成して」          → RSA/Meta クリエイティブ一括生成
「TikTok広告のフック分析」   → 3秒ルール分析
「ASAキャンペーン設計」     → Apple Search Ads 4タイプ構造

# 戦略
「MMM予算配分」            → チャネル横断の限界ROI配分
「インクリメンタリティテスト」→ 因果検証テスト設計
「アトリビューション選択」   → モデル選択+移行計画
```

## When to Use

- 複数チャネルの広告予算配分を最適化したい
- 広告クリエイティブ（見出し/説明文）をバッチ生成したい
- 検索クエリの無駄遣いをN-gram分析で検出したい
- クリエイティブの疲弊を検知してローテーション計画を立てたい
- 「この広告チャネルは本当に効果があるのか？」を因果的に検証したい

## When NOT to Use

- 単一チャネルのCSV分析だけが必要 → `pm-ad-operations` を直接使用
- 広告以外のデータ分析 → `pm-data-analysis` を使用
- ランディングページの最適化 → `cro-methodology` を使用

## Architecture

```
pm-ad-analysis (戦略オーケストレーター)
  |-- 10 Capabilities (本スキル)
  |-- .claude_ad_memory/ (JSONL履歴, Creative Vault, 学習SOP)
  |
  |-- Delegates to:
      |-- pm-ad-operations    → CSV分析、無駄検出、予算再配分
      |-- pm-data-analysis    → 深い統計分析、回帰、因果検証
      |-- cro-methodology     → クリエイティブA/Bテスト設計
      |-- pm-acquisition-channel-advisor → チャネル経済性
      |-- funnel-analysis     → ポストクリックファネル
```

## Knowledge Store

プロジェクトルートに `.claude_ad_memory/` を自動生成:

```
.claude_ad_memory/
|-- history_log.jsonl    <- Append-only 全アクション履歴
|-- creative_vault.json  <- 生成クリエイティブ+成果データ
|-- channel_context.md   <- 5チャネル戦略コンテキスト
+-- learned_sops/        <- 自己学習SOP
```

## PM Tool Suite

このスキルは5つのPMツールスイートの一部です:

| # | Skill | Purpose | Repo |
|---|-------|---------|------|
| 1 | my_pm_tools | GitHub Projects V2 管理 | [fideguch/my_pm_tools](https://github.com/fideguch/my_pm_tools) |
| 2 | requirements_designer | 要件定義 + Figma連携 | [fideguch/requirements_designer](https://github.com/fideguch/requirements_designer) |
| 3 | speckit-bridge | 要件→仕様変換 | [fideguch/speckit-bridge](https://github.com/fideguch/speckit-bridge) |
| 4 | pm-data-analysis | GAFA品質データ分析 | [fideguch/pm_data_analysis](https://github.com/fideguch/pm_data_analysis) |
| 5 | **pm-ad-analysis** | **全自動広告運用** | **this repo** |

```
requirements_designer → speckit-bridge → my_pm_tools
                              |
                    pm-data-analysis ← pm-ad-analysis
```

## License

MIT
