# Self-Learning System: Advanced Layers (Future — Hooks Implementation)

These layers are designed for future implementation via Claude Code Hooks.
They are NOT currently auto-executed from SKILL.md.

## Layer 3: Creative Pattern Detection (from vault data)

When `creative_vault.json` has >= 10 creatives with performance data:

1. Group vault creatives by [tag, hook_type, usp]
2. Rank groups by average CTR and CVR
3. Extract top 3 performing patterns
4. Generate new creatives biased toward winning patterns
5. Block generation of patterns that consistently underperform (<50% of avg CTR)

## Layer 4: Outcome Feedback Loop

After any recommendation is presented:
1. Log recommendation in `history_log.jsonl` with `approval_required: true`
2. On next invocation, check for unresolved recommendations
3. If outcome provided: compare predicted vs actual impact
4. Store delta in history_log
5. If prediction accuracy < 60% over 5+ recommendations: surface warning

## Layer 5: Capability Performance Tracking

Track each capability's recommendation quality:
- Invocations count, outcomes tracked, avg accuracy
- Surface: "Capability [X] has insufficient outcome data"

## Implementation Plan (Hooks)

To make these layers reliable (95%+), implement as PostToolUse hooks:
1. Hook on analysis completion → auto-append to history_log.jsonl
2. Hook on session start → scan history for unresolved recommendations
3. Hook on creative generation → check vault for patterns

See continuous-learning-v2 for reference architecture.
