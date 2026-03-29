# Google Ads Search Example

Google Ads のキャンペーンレポート CSV を使った分析例。

## ファイル

| ファイル       | 内容                                                  |
| -------------- | ----------------------------------------------------- |
| `input.csv`    | Google Ads エクスポート（15行、4キャンペーン、2週間） |
| `ad_report.md` | 分析結果レポート（再現コード付き）                    |

## データ概要

- **期間**: 2026-03-01 ~ 2026-03-08
- **キャンペーン**: Brand Exact, Performance Search, Display Remarketing, Shopping Standard
- **意図的に含めたパターン**:
  - CPA超過キャンペーン（Competitor Terms: CPA $170）
  - 低CVRアドグループ（Homepage Visitors: CVR 0.77%）
  - 好調キャンペーン（Brand: CPA $4.27）
  - WoW悪化傾向（Performance Search CVR低下）

## 使い方

```
この CSV を分析して → examples/google-ads-search/input.csv
```
