# Creative Vault Schema

## File: `.claude_ad_memory/creative_vault.json`

```json
{
  "version": 1,
  "last_updated": "2026-03-27",
  "stats": {
    "total": 0,
    "active": 0,
    "retired": 0,
    "with_performance": 0
  },
  "creatives": []
}
```

## Creative Entry

```json
{
  "id": "cr_001",
  "type": "headline|description|primary_text|video_hook",
  "text": "Content here",
  "char_count": 30,
  "channel": "google|meta|asa|tiktok|cross",
  "campaign": "campaign_name",
  "ad_group": "ad_group_name",
  "generated_date": "2026-03-27",
  "status": "active|paused|retired|testing",
  "tags": ["cta", "benefit", "urgency", "social_proof", "feature", "emotional"],
  "usp": "Primary USP this creative addresses",
  "hook_type": "question|shock|demonstration|transformation|listicle|pov|null",
  "performance": {
    "impressions": null,
    "clicks": null,
    "ctr": null,
    "conversions": null,
    "cpa": null,
    "last_updated": null
  },
  "replaced_id": null,
  "notes": null
}
```

## Field Definitions

| Field | Type | Required | Description |
|-------|------|---------|-------------|
| id | string | Yes | Unique ID (cr_001, cr_002, ...) |
| type | enum | Yes | Creative element type |
| text | string | Yes | The actual creative text |
| char_count | number | Yes | Character count (auto-computed) |
| channel | enum | Yes | Target channel |
| campaign | string | No | Target campaign name |
| ad_group | string | No | Target ad group name |
| generated_date | date string | Yes | When it was generated |
| status | enum | Yes | Current lifecycle status |
| tags | string[] | Yes | Content taxonomy tags |
| usp | string | No | Which USP this addresses |
| hook_type | enum | No | TikTok/video hook classification |
| performance | object | Yes | Performance metrics (null until data available) |
| replaced_id | string | No | ID of creative this replaced (fatigue rotation) |
| notes | string | No | Free-form notes |

## Usage Rules

1. **Dedup check**: Before generating, search vault for same USP + tag combination
2. **Performance update**: When user provides CSV with creative-level data, match by text and update
3. **Retirement**: Set status to "retired" when creative is fatigued (keep for reference)
4. **ID format**: `cr_{3-digit sequence}` (cr_001, cr_002, ...), never reuse IDs
5. **UTM integration**: Use creative ID as `utm_content` parameter
6. **Stats auto-update**: Recalculate `stats` object after every modification
