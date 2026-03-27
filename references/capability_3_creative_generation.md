# Capability 3: Creative Generation (Headlines + Descriptions)

**Trigger:** User requests ad copy, or creative vault needs refresh

Also load `references/creative_testing.md` for testing framework.

## Generation Process

1. Load business context + past creative performance from vault
2. Check vault for duplicate prevention (same USP + CTA combination)
3. Generate batch:
   - **Headlines**: 15 variants, max 30 characters each
   - **Descriptions**: 4 variants, max 90 characters each
4. Tag each creative: [cta, benefit, urgency, social_proof, feature, emotional]
5. Store in `creative_vault.json`

## Output Format

### Headlines (30 char max)
| # | Text | Chars | Tag | USP | Vault Duplicate? |
|---|------|-------|-----|-----|-----------------|
| 1 | [headline] | [n] | benefit | [usp] | No |

### Descriptions (90 char max)
| # | Text | Chars | Tag | CTA |
|---|------|-------|-----|-----|
| 1 | [description] | [n] | cta | [cta type] |

### Recommended Combinations
Pin headline [X] in position 1 (strongest hook), pair with description [Y].

## Sub-Agent Pattern

For large-scale generation (>3 ad groups):
- Dispatch headline generation and description generation as parallel sub-agents
- Each sub-agent receives: business context, USPs, character limits, existing vault (for dedup)
- Merge results, check duplicates, store in vault
