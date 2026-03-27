# Tracking & Analytics

## UTM Parameter Standard (Enforced)

### Naming Convention

| Parameter | Format | Example |
|-----------|--------|---------|
| utm_source | `{platform}` | google, meta, apple, tiktok |
| utm_medium | `{ad_type}` | cpc, cpm, social, video, display |
| utm_campaign | `{campaign_name}` | brand_search_q1, retargeting_cart |
| utm_content | `{creative_id}` | cr_001, video_demo_v2 |
| utm_term | `{keyword_or_audience}` | running_shoes, lal_1pct |

### Rules (strictly enforced)

- **Lowercase only** — never `Google`, always `google`
- **Underscores** — not hyphens, not spaces (`brand_search` not `brand-search`)
- **No special characters** — only `[a-z0-9_]`
- **Consistent across team** — document in channel_context.md
- **Creative vault ID in utm_content** — enables performance tracking back to vault

### URL Builder Output

```
https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=brand_search_q1&utm_content=cr_001&utm_term=running_shoes
```

## MMP (Mobile Measurement Partner) Link Generation

### AppsFlyer OneLink

```
https://app.appsflyer.com/{app_id}
  ?pid={media_source}          # google_ads, meta, tiktok, apple_search_ads
  &c={campaign_name}           # matches utm_campaign
  &af_adset={adset_name}
  &af_ad={ad_name}
  &af_sub1={custom_param}      # creative vault ID
  &af_dp={deep_link_path}      # in-app destination
  &af_web_dp={web_fallback}    # web fallback URL
```

### Adjust Tracker

```
https://app.adjust.com/{token}
  ?campaign={campaign}
  &adgroup={adgroup}
  &creative={creative}
  &deeplink={deep_link}
  &fallback={fallback_url}
```

### Deep Link vs Deferred Deep Link

| Type | User State | Behavior |
|------|-----------|---------|
| Deep link | App installed | Opens specific in-app screen |
| Deferred deep link | App NOT installed | Store → install → opens specific screen |
| Web fallback | No app available | Opens web URL |

Always configure all three for complete user journey coverage.

## SKAdNetwork / AdAttributionKit (iOS)

### The Problem

Apple's privacy framework limits deterministic attribution:
- Postback delay: 24-48 hours minimum
- Conversion value: 6-bit (0-63) coarse values
- No user-level data
- No view-through attribution

### Conversion Value Strategy

| Bits | Event | Value |
|------|-------|-------|
| 0-1 | Install quality | 0=organic-like, 1=engaged, 2=converted, 3=high-value |
| 2-3 | Revenue tier | 0=none, 1=low, 2=medium, 3=high |
| 4-5 | Engagement | 0=none, 1=session, 2=core_action, 3=retained |

### Impact on Optimization

- **Google**: UAC/P-MAX handles SKAN postbacks natively
- **Meta**: Aggregated Events Measurement (AEM) + modeled conversions
- **TikTok**: SKAN integration for app campaigns
- **ASA**: Direct API, not affected by SKAN (Apple's own platform)

## GTM (Google Tag Manager) Data Layer

### Standard Events to Track

```javascript
// Purchase event
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T12345',
    'value': 25.42,
    'currency': 'USD',
    'items': [{ 'item_id': 'SKU_123', 'item_name': 'Product', 'price': 25.42 }]
  }
});

// Lead event
dataLayer.push({
  'event': 'generate_lead',
  'value': 50.00,
  'currency': 'USD'
});
```

### Conversion API (Server-Side) — 2026 Recommended Default

サーバーサイドトラッキングは **推奨デフォルト**（Cookie 規制・ITP・Ad Blocker でブラウザのみでは精度 30-50% 劣化）。

#### Dual Tracking Architecture（2026 標準）

`Browser → Pixel (client) + Server → CAPI (server) → Platform deduplicates via event_id`

#### Meta Conversions API (CAPI)

| 項目 | 詳細 |
|------|------|
| Event Deduplication | 同一 `event_id` を Pixel と CAPI の両方に送信 → Meta 側で自動重複排除 |
| Event Match Quality (EMQ) | ハッシュ化 email / phone / zip で照合精度向上。EMQ スコア 6.0 以上を目標 |
| 必須パラメータ | `event_name`, `event_time`, `event_id`, `action_source`, `user_data` |
| 推奨ハッシュ | SHA-256（小文字・トリム済み）で `em`, `ph`, `zp`, `fn`, `ln` を送信 |

> Source: [Meta CAPI Best Practices](https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices)

#### Google Enhanced Conversions

3つの実装方法から選択:

| Method | 難易度 | 概要 |
|--------|--------|------|
| Auto-collect | 低 | Google タグが自動でフォームからハッシュデータ取得 |
| Manual (GTM) | 中 | GTM の User-Provided Data 変数で明示指定 |
| Code-based (API) | 高 | gtag.js / Measurement Protocol で直接送信 |

> Source: [Google Enhanced Conversions](https://support.google.com/google-ads/answer/11062876)

#### GTM Server Container（推奨インフラ）

- **Google Cloud Run** 上にデプロイ、First-party サブドメイン（`sgtm.example.com`）で配信
- Cookie 寿命延長 + Ad Blocker 回避。Google Ads / GA4 / Meta CAPI / TikTok Events API を統合発火

## Cross-Platform Attribution Reconciliation

### Common Discrepancies

| Source | Reason | Fix |
|--------|--------|-----|
| Google reports more conversions than Meta | Different attribution windows | Align windows (7d click) |
| MMP total < sum of platform totals | Double-counting (user saw both) | MMP is source of truth for deduplicated totals |
| GA4 < platform totals | GA4 uses last-click by default | Compare using same model |

### Reconciliation Process

1. Set MMP as single source of truth for app conversions
2. Use GA4 for web conversions (with consistent attribution model)
3. Compare: MMP/GA4 total vs sum of platform-reported conversions
4. Difference = estimated overlap/double-counting
5. Report both: "Platform-reported" and "Deduplicated (MMP/GA4)"

## Conversion Definition Guide

### Primary vs Secondary Conversion

| 区分 | 定義 | 最適化対象 |
|------|------|-----------|
| **Primary** | ビジネス成果に直結するアクション（Revenue イベント） | 入札最適化に使用（Smart Bidding / AEO） |
| **Secondary** | 間接指標（ファネル中間地点） | レポートのみ。入札には使わない |

### Macro vs Micro Conversion Framework

| レベル | 例 | 用途 |
|--------|-----|------|
| **Macro** | Purchase, Signup, Contract | KPI・ROAS 計算の基準 |
| **Micro** | Add to Cart, Page View 3+, Video 50% | ファネル分析・リマーケティングリスト |

### Business Model 別 Conversion 設定

| Model | Primary (Macro) | Secondary (Micro) |
|-------|----------------|-------------------|
| **E-commerce** | `purchase` | `add_to_cart`, `begin_checkout`, `view_item` |
| **SaaS** | `paid_conversion` | `sign_up`, `start_trial` |
| **Lead Gen** | `generate_lead` | `phone_call`, `chat_start` |
| **App** | `in_app_purchase` | `app_install`, `registration` |

> **注意**: Primary を増やしすぎると Smart Bidding の最適化シグナルが分散する。1キャンペーンにつき Primary は 1-2 個に絞ること。

## Pixel / Tag Firing Verification Procedures

### Verification Tools

| Tool | Platform | 用途 |
|------|----------|------|
| **Google Tag Assistant** | Google | gtag.js / GTM タグの発火・パラメータ確認 |
| **Meta Pixel Helper** | Meta | Pixel イベントの発火・パラメータ確認（Chrome 拡張） |
| **TikTok Pixel Helper** | TikTok | TikTok Pixel の発火確認（Chrome 拡張） |
| **GTM Preview Mode** | Google | GTM コンテナのデバッグ（Data Layer 含む） |

### Real-time Event Monitoring

- **Google Ads**: Tools → Conversions → Diagnostics / **GA4**: Admin → DebugView
- **Meta**: Events Manager → Test Events / **TikTok**: Events Manager → Test Events

### Common Debugging Patterns

| 症状 | 原因 | 対処 |
|------|------|------|
| Tag not firing | GTM トリガー条件不一致、Consent Mode でブロック | GTM Preview で trigger 確認、Consent 設定見直し |
| Duplicate events | Pixel + CAPI で `event_id` 未設定 | 同一 `event_id` を両方に送信して重複排除 |
| Missing parameters | Data Layer push のタイミングずれ | `dataLayer.push` がタグ発火より前に実行されているか確認 |
| Conversion count 0 | Attribution window 外、または tag 未発火 | Tag Assistant で発火確認 → Attribution window 設定確認 |
| EMQ score low (Meta) | ハッシュ化ユーザーデータ不足 | `em`, `ph`, `fn`, `ln` を SHA-256 で追加送信 |

## Budget Allocation Strategy

### 70/20/10 Rule

| 配分 | 割合 | 対象 | 基準 |
|------|------|------|------|
| **Proven** | 70% | 実績のあるチャネル・キャンペーン | ROAS / CPA が目標値を安定達成 |
| **Testing** | 20% | 新しいオーディエンス・クリエイティブ・入札戦略 | 仮説ベースのテスト |
| **Experimental** | 10% | 新規チャネル・新フォーマット | 学習目的、ROI 未確定 |

### Funnel-Based Allocation（TOFU / MOFU / BOFU）

| Funnel Stage | 目的 | 推奨配分（初期） | KPI |
|-------------|------|-----------------|-----|
| **TOFU** (Top) | 認知・リーチ | 20-30% | CPM, Reach, Video View Rate |
| **MOFU** (Middle) | 検討・エンゲージメント | 30-40% | CPC, CTR, Engagement Rate |
| **BOFU** (Bottom) | 獲得・コンバージョン | 30-50% | CPA, ROAS, Conversion Rate |

> 事業フェーズにより配分を調整: 新規事業は TOFU 寄り、成熟事業は BOFU 寄り。

### Initial Test Budget Approach

- **最低テスト期間**: 2 週間（Learning Phase）、**最低 CV 数**: 週 50 件以上
- **テスト予算算出**: `目標 CPA x 50 CV x 2 weeks`、**判断基準**: 95% confidence

### Cross-Platform Reallocation Criteria

| 条件 | アクション |
|------|----------|
| CPA が目標の 1.5x 超を 2 週間継続 | 予算を 30% 削減、他チャネルへ移動 |
| ROAS が目標の 0.7x 未満を 2 週間継続 | 原因分析 → クリエイティブ刷新 or 予算移動 |
| Learning Phase が 2 週間超えても完了しない | オーディエンス統合 or 予算増額で脱出 |
| 新チャネルが目標 CPA 内で安定 | 20% → 70% 枠へ昇格、予算拡大 |

> Source: [Google Ads Budget Best Practices](https://support.google.com/google-ads/answer/2375454), [Meta Budget Optimization](https://www.facebook.com/business/help/603205253092498)
