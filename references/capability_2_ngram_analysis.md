# Capability 2: N-gram Analysis + Negative Keyword Mining

**Trigger:** User provides search query report CSV, or asks about keyword optimization

Also load `references/google_ads_playbook.md` for channel context.

## Process

1. Ingest search query report CSV (Google Ads format)
2. Tokenize queries into unigrams, bigrams, trigrams
3. For each N-gram, compute:
   - Total spend, total conversions, CPA
   - Impression share, CTR
4. Rank by waste (high spend, zero/low conversions)

## Output Format

| N-gram | Impressions | Clicks | Spend | Conv. | CPA | Action |
|--------|------------|--------|-------|-------|-----|--------|
| [term] | [n] | [n] | [amt] | 0 | inf | Add as negative |
| [term] | [n] | [n] | [amt] | [n] | [high] | Monitor |

### Negative Keyword Candidates (sorted by wasted spend)
1. [term] — [spend] wasted, 0 conversions → Add as exact match negative
2. [term] — [spend] wasted, CPA 3x target → Add as phrase match negative

### High-Performing Themes
1. [term cluster] — CPA [amount], below target → Expand match types

## Python Reference

```python
import pandas as pd
from collections import Counter

def ngram_analysis(df, n=2, cost_col='Cost', conv_col='Conversions'):
    tokens = df['Search term'].str.lower().str.split()
    ngrams = tokens.apply(lambda x: list(zip(*[x[i:] for i in range(n)])))
    # ... aggregate by ngram, compute CPA, rank by waste
```

## Platform Limitation

- Google P-MAX campaigns do NOT expose search term data → skip this capability for P-MAX
- Google Shopping campaigns have limited query data → flag in output
