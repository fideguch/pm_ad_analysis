# Capability 1: Strategic Hearing + Multi-Channel Context

**Trigger:** `.claude_ad_memory/channel_context.md` missing or first use

## Required (must answer before analysis)

1. **Active channels**: Google Ads / Meta Ads / Apple Search Ads / TikTok Ads / Other
2. **Business goal**: CPA target, ROAS target, or monthly budget per channel
3. **Product type**: App / Web / Both (affects tracking strategy)

## Optional (accumulates over time)

4. Monthly budget split by channel
5. Attribution model per channel (last-click, data-driven, etc.)
6. MMP in use (AppsFlyer / Adjust / Branch / none)
7. iOS/Android user split (for LAT/SKAdNetwork modeling)
8. Creative strategy (formats, rotation cadence, brand guidelines)
9. Seasonality patterns
10. Competitive landscape

## Context Integration

If `ads/context.md` exists (from pm-ad-operations), import and extend with multi-channel fields. Do not duplicate.

## Output

Generate `.claude_ad_memory/channel_context.md` using `templates/ad_analysis_context.md` as base.
