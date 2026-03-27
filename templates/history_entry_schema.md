# History Log Entry Schema

## File: `.claude_ad_memory/history_log.jsonl`

Each line is a single JSON object (append-only, never edit or delete):

```json
{
  "ts": "2026-03-27T10:00:00Z",
  "capability": "ngram|creative|fatigue|mmp|asa|tiktok|mmm|incrementality|attribution|hearing|delegation",
  "channel": "google|meta|asa|tiktok|cross|all",
  "input_hash": "sha256_first8chars",
  "summary": "1-line finding or action taken",
  "confidence": "High|Medium|Low|N/A",
  "kpi_impact": "CPA -12% estimated|ROAS +0.3x expected|null",
  "artifacts": ["ads/history/2026-03-27_ngram.md"],
  "delegated_to": "pm-ad-operations|pm-data-analysis|null",
  "creatives_generated": 0,
  "approval_required": false,
  "approved": null
}
```

## Field Definitions

| Field | Type | Required | Description |
|-------|------|---------|-------------|
| ts | ISO 8601 string | Yes | Timestamp of the action |
| capability | enum string | Yes | Which capability was invoked |
| channel | enum string | Yes | Which channel(s) involved |
| input_hash | string | No | Hash of input data for dedup detection |
| summary | string | Yes | 1-line human-readable finding |
| confidence | enum string | Yes | Confidence level of finding |
| kpi_impact | string | No | Estimated impact on business KPIs |
| artifacts | string[] | No | Paths to generated reports/files |
| delegated_to | string | No | If work was delegated to another skill |
| creatives_generated | number | No | Count of creatives generated (Capability 3) |
| approval_required | boolean | No | Whether PM approval was needed |
| approved | boolean | No | Whether PM approved (null = pending) |

## Usage Rules

1. **Append-only**: Never modify or delete existing entries
2. **Every invocation**: Log even if no findings (for audit trail)
3. **Load on startup**: Read last 10 entries for context restoration
4. **Search**: Use `summary` and `capability` fields for natural language search
