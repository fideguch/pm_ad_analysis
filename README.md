# PM Ad Analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
[![Channels](https://img.shields.io/badge/Channels-5-brightgreen?style=flat-square)](#channel-coverage)
[![Capabilities](https://img.shields.io/badge/Capabilities-11-blue?style=flat-square)](#capabilities-overview)
[![Updated](https://img.shields.io/badge/Updated-Mar%202026-green?style=flat-square)]()

[English](README.en.md)

> CSVを渡すだけで、5チャネルの広告戦略立案・クリエイティブ生成・データ分析・改善提案を自律実行する Claude Code スキル。各プラットフォームの公開ガイドラインを参考に設計。
>
> ※ 各プラットフォームの公式認定・準拠を意味するものではありません。公開されているベストプラクティスやヘルプドキュメントを参考にしています。

---

## Why This Skill?

| | 手動運用 | 他AIツール (AdCreative.ai等) | pm-ad-analysis |
|---|---|---|---|
| 対応チャネル | 1つずつ個別 | Meta/Google中心 | **5チャネル統合** |
| 計測基盤構築 | 自力でドキュメント解読 | 対象外 | **公開ガイドライン参考オンボーディング** |
| 予算配分 | 直感ベース | ROAS平均比較 | **限界ROIベースMMM** |
| 因果検証 | なし | なし | **インクリメンタリティテスト設計** |
| 信頼性 | 属人的 | ブラックボックス | **Confidence Scoring (12pt)** |
| 学習 | 暗黙知 | なし | **Self-Learning SOP** |
| コスト | 月額$299-999+ | 月額$29-499 | **$0 (Claude Code利用料のみ)** |

---

## Getting Started (5分)

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
「広告戦略を立てたい」
```

初回起動時、スキルは以下を自動実行します:

1. **Project Context Auto-Scan** — CLAUDE.md, package.json等からビジネスドメインを自動推論
2. **Capability 0 (Platform Onboarding)** — 計測基盤 → アカウント構造 → 予算配分 → 初回キャンペーンの順でガイド
3. **Capability 1 (Strategic Hearing)** — 5チャネルの戦略コンテキスト構築

広告アカウントが既にある場合は、Capability 0 をスキップして直接 Capability 1 に進みます。

---

## Capabilities Overview

| # | Capability | 概要 | 使い方 |
|---|-----------|------|--------|
| 0 | **Platform Onboarding** | 計測基盤構築、アカウント設計、予算配分 | 新規プロジェクトで自動起動 |
| 1 | **Strategic Hearing** | 5チャネル対応コンテキスト構築 | 初回 or コンテキストなし時 |
| 2 | **N-gram Analysis** | 検索クエリの無駄検出 + ネガティブKW | `「N-gram分析して」` |
| 3 | **Creative Generation** | 見出し15本 + 説明文4本バッチ生成 | `「見出し生成して」` |
| 4 | **Fatigue Detection** | クリエイティブ疲弊検知 + ローテーション | CTR低下時 |
| 5 | **MMP/UTM Links** | トラッキングリンク生成 + UTM標準化 | `「トラッキングリンク作って」` |
| 6 | **Apple Search Ads** | Discovery/Probing設計 + CPP + LAT | `「ASAキャンペーン設計」` |
| 7 | **TikTok Ads** | Spark Ads + 3秒フック分析 | `「TikTok広告のフック分析」` |
| 8 | **MMM Portfolio** | 限界ROIベースのポートフォリオ最適化 | `「MMM予算配分」` |
| 9 | **Incrementality** | 因果検証テスト設計 (Geo-holdout等) | `「インクリメンタリティテスト」` |
| 10 | **Attribution** | モデル選択 + 移行計画 | `「アトリビューション選択」` |

### ユースケース別ガイド

| やりたいこと | Capability | コマンド例 |
|---|---|---|
| 初めて広告を始める | 0: Platform Onboarding | 新規プロジェクトで自動起動 |
| 広告戦略を立て直したい | 1: Strategic Hearing | `「広告戦略を立てたい」` |
| 検索クエリの無駄を減らしたい | 2: N-gram Analysis | `「N-gram分析して」` |
| 広告文を大量に作りたい | 3: Creative Generation | `「見出し生成して」` |
| 広告が疲弊していないか確認 | 4: Fatigue Detection | CTR低下時に自動検知 |
| トラッキングリンクを整備 | 5: MMP/UTM Links | `「トラッキングリンク作って」` |
| Apple Search Ads を最適化 | 6: Apple Search Ads | `「ASAキャンペーン設計」` |
| TikTok 広告のフック改善 | 7: TikTok Ads | `「TikTok広告のフック分析」` |
| 予算配分を最適化したい | 8: MMM Portfolio | `「MMM予算配分」` |
| 広告の因果効果を検証したい | 9: Incrementality | `「インクリメンタリティテスト」` |
| アトリビューションモデル選定 | 10: Attribution | `「アトリビューション選択」` |

---

## Channel Coverage

| Channel | 対応機能 |
|---------|---------|
| **Google Ads** | N-gram、ネガティブKW、RSAクリエイティブ、Brand/Non-Brand/P-MAX分離、Smart Bidding |
| **Meta Ads** | 3-3-3テスト、Advantage+、Tier 1/2/3構造、CAPI連携 |
| **Apple Search Ads** | 4-campaign foundation、CPP、LAT、AdAttributionKit |
| **TikTok Ads** | Spark Ads、3秒フック、CBO + 3段階ファネル |
| **Amazon Ads** | SP/SB/SD、ACOS、Auto→Manual、DSP |
| **Tracking** | MMP (AppsFlyer/Adjust)、UTM、SKAdNetwork、Server-Side (CAPI/Enhanced Conversions) |

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

> 委譲先スキルは全て同一 Claude Code 環境にインストールされたスキルです。別途リポジトリのインストールは不要です（Claude Code のスキルとして定義済み）。

---

## Advanced Features

### Confidence Scoring

全分析結果に12点満点のConfidence Scoreを付与。4軸(統計的有意性、効果量、サンプルサイズ、データ品質) x 3点で算出し、Capability別ペナルティを適用。

- **10-12pt = High**: 施策実行推奨
- **7-9pt = Medium**: 追加データ収集を検討
- **6pt以下 = Low**: 判断保留、要追加検証

### Pre-Flight Guardrails

分析実行前に8項目の自動チェックを実施。BLOCKレベル(混合通貨、予算30%超シフト)は処理を停止しユーザーに確認。WARNレベルはConfidenceペナルティ付きで続行。

### Self-Learning SOP

ユーザーが提供した新しいプラットフォーム仕様やAPIドキュメントを自動解析し、`.claude_ad_memory/learned_sops/` に保存。次回以降の分析で自動適用。

### Project Context Auto-Scan

プロジェクトファイル(CLAUDE.md, package.json, .mcp.json等)からビジネスドメイン、プラットフォーム種別、接続済みMCPを自動推論。手動質問を最小化。

---

## Configuration

### Knowledge Store

プロジェクトルートに `.claude_ad_memory/` を自動生成(`.gitignore` 推奨):

```
.claude_ad_memory/
|-- history_log.jsonl    <- Append-only action log
|-- creative_vault.json  <- Generated creatives + performance
|-- channel_context.md   <- Multi-channel strategic context
+-- learned_sops/        <- Auto-learned SOPs
```

### MCP Integration

プロジェクトタイプに応じたMCP推奨構成については `~/.claude/rules/common/mcp-selection.md` を参照。

---

## PM Tool Suite

このスキルは5つのPMツールスイートの一部です:

| # | Skill | Purpose | Repo |
|---|-------|---------|------|
| 1 | my_pm_tools | GitHub Projects V2 管理 | [fideguch/my_pm_tools](https://github.com/fideguch/my_pm_tools) |
| 2 | requirements_designer | 要件定義 + Figma連携 | [fideguch/requirements_designer](https://github.com/fideguch/requirements_designer) |
| 3 | speckit-bridge | 要件 → 仕様変換 | [fideguch/speckit-bridge](https://github.com/fideguch/speckit-bridge) |
| 4 | pm-data-analysis | プロダクション品質データ分析 | [fideguch/pm_data_analysis](https://github.com/fideguch/pm_data_analysis) |
| 5 | **pm-ad-analysis** | **全自動広告運用** | **this repo** |

```
requirements_designer --> speckit-bridge --> my_pm_tools
                               |
                     pm-data-analysis <-- pm-ad-analysis
```

---

## When NOT to Use

- 単一チャネルのCSV分析だけ → `pm-ad-operations` を直接使用
- 広告以外のデータ分析 → `pm-data-analysis` を使用
- ランディングページ最適化 → `cro-methodology` を使用

---

## License

MIT
