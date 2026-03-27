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

### Conversion API (Server-Side)

For privacy-resilient tracking:
- **Meta CAPI**: Server-side event matching (email hash, phone hash)
- **Google Enhanced Conversions**: First-party data matching
- Implement BOTH browser-side AND server-side for deduplication

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
