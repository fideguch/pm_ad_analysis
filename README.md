# PM Ad Analysis

PMのための全自動広告運用エージェント（Ad Ops Tool Box）。

## 概要

広告運用の専門知識がなくても、CSVやMCPからデータを渡すだけで戦略立案→クリエイティブ生成→データ分析→改善提案まで自律的に実行する Claude Code スキル。

## 対応チャネル

| Channel | Capabilities |
|---------|-------------|
| Google Ads | N-gram分析、ネガティブKW、RSAクリエイティブ生成、tCPA/tROAS最適化 |
| Meta Ads | 3-3-3テスト、Advantage+、オーディエンス戦略、クリエイティブ疲弊検知 |
| Apple Search Ads | Discovery/Probing設計、CPP連携、LATモデリング |
| TikTok Ads | Spark Ads、3秒フック分析、クリエイティブ構成案 |
| Tracking | MMP(AppsFlyer/Adjust)リンク生成、UTM標準化、SKAdNetwork |

## 10 Capabilities

1. **Strategic Hearing** — 5チャネル対応コンテキスト構築
2. **N-gram Analysis** — 検索クエリの無駄検出+ネガティブKW候補
3. **Creative Generation** — 見出し/説明文のバッチ生成+Creative Vault管理
4. **Fatigue Detection** — クリエイティブ疲弊の自動検知+ローテーション提案
5. **MMP/UTM Generation** — トラッキングリンク生成+UTM標準化
6. **Apple Search Ads** — キャンペーン設計+CPP+LATモデリング
7. **TikTok Ads** — Spark Ads+3秒フック分析+クリエイティブ構成
8. **Media Mix Modeling** — 限界ROIベースのポートフォリオ予算配分
9. **Incrementality Testing** — 因果検証テスト設計+分析
10. **Attribution Selection** — アトリビューションモデル選択+移行計画

## アーキテクチャ

**オーケストレーターパターン**: 戦術レベルのCSV分析は `pm-ad-operations` に委譲し、本スキルは戦略レイヤーに集中。

## インストール

```bash
# Symlink to skills directory
ln -s ~/pm_ad_analysis ~/.claude/skills/pm-ad-analysis
```

## 使い方

```
# トリガーワード例
「広告戦略を立てたい」
「N-gram分析して」
「見出し生成して」
「TikTok広告のフック分析」
「MMM予算配分」
「インクリメンタリティテスト設計」
```

## Knowledge Store

プロジェクトルートに `.claude_ad_memory/` を自動生成:
- `history_log.jsonl` — Append-only全アクション履歴
- `creative_vault.json` — 生成クリエイティブ+成果データ
- `learned_sops/` — 自己学習SOP

## License

MIT
