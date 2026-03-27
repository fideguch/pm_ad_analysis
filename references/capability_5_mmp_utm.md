# Capability 5: MMP Link + UTM Generation

**Trigger:** User needs tracking links or UTM standardization

Also load `references/tracking_analytics.md` for full spec.

## UTM Standard (enforced)

```
utm_source   = {platform}           # google, meta, apple, tiktok
utm_medium   = {ad_type}            # cpc, cpm, social, video
utm_campaign = {campaign_name}      # lowercase, underscores
utm_content  = {creative_id}        # cr_001 from creative vault
utm_term     = {keyword|audience}   # search: keyword, social: audience
```

Rules: lowercase only, underscores not hyphens, no spaces, no special characters.

## MMP Link Generation

**AppsFlyer OneLink:**
```
https://app.appsflyer.com/{app_id}?pid={media_source}&c={campaign}&af_adset={adset}&af_ad={ad}&af_sub1={custom}
```

**Adjust Tracker:**
```
https://app.adjust.com/{token}?campaign={campaign}&adgroup={adgroup}&creative={creative}
```

## Output Format

| Channel | Link Type | URL | Parameters |
|---------|----------|-----|-----------|
| Google | Click | [url] | utm_source=google&... |
| Meta | OneLink | [url] | pid=meta&... |
