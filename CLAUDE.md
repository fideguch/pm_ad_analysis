# pm-ad-analysis

PM向け広告分析オーケストレータースキルの開発リポジトリ。

## Project Structure

```
SKILL.md          — スキル本体（目標: 400行以下、<HARD-GATE>形式維持）
references/       — Capability別リファレンス + プラットフォーム別Playbook
templates/        — 分析レポート・クリエイティブブリーフ等のテンプレート
README.md         — 日本語README
README.en.md      — 英語README
```

## Development Rules

- SKILL.md は 450行以下を維持する。超過時はリファレンスに分離
- references/ 内のファイルは広告プラットフォーム仕様変更に追従する
- CSV 分析は references/csv_operations.md を参照して内部処理
- スキル修正後は frontmatter の description・triggers を必ず確認する

## Channels

Google Ads, Meta Ads, Apple Search Ads, TikTok Ads, Tracking/Analytics
