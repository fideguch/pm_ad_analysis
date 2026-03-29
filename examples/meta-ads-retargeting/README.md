# Meta Ads Retargeting Example

Meta Ads（Facebook / Instagram）のキャンペーンレポート CSV を使った分析例。

## ファイル

| ファイル       | 内容                                                |
| -------------- | --------------------------------------------------- |
| `input.csv`    | Meta Ads エクスポート（15行、6キャンペーン、2週間） |
| `ad_report.md` | 分析結果レポート（再現コード付き）                  |

## データ概要

- **期間**: 2026-03-01 ~ 2026-03-08
- **キャンペーン**: Prospecting (LAL 1%, LAL 3%, Interest), Retargeting (Website, Engagement), DPA (Catalog)
- **意図的に含めたパターン**:
  - CPA超過（Fitness Enthusiasts: CPA $228）
  - 広告疲弊（Cart Abandoners: Frequency 3.2）
  - 好調キャンペーン（Retargeting Website: CPA $12）
  - Lookalike飽和兆候（LAL 3% CPA上昇傾向）

## 使い方

```
この CSV を分析して → examples/meta-ads-retargeting/input.csv
```
