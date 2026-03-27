# TikTok Ads Playbook

## Account Structure (Three-Tier)

| Tier | Element | Best Practice |
|------|---------|-------------|
| 1 | Campaigns | Organized by objective (awareness, consideration, conversion) |
| 2 | Ad Groups | 3-5 per campaign, highly diversified targeting |
| 3 | Ads | 3-5 creatives per ad group, big format differences |

### Budget Distribution

- **CBO (Campaign Budget Optimization)**: Enabled by default
- Algorithm distributes budget to highest-performing ad groups
- Minimum ad group budget: 20x target CPA per day

## Spark Ads vs Standard Ads

### Decision Matrix

| Factor | Choose Spark Ads | Choose Standard Ads |
|--------|-----------------|-------------------|
| Objective | Awareness, trust, engagement | Direct response, app installs |
| Content source | Creator/UGC content available | Brand-produced only |
| Engagement goal | Aggregate to creator's profile | Keep in ad account |
| Trust signal | High (native feel) | Lower |
| Control | Less (creator's post) | Full control |
| Landing page | Profile or website | Website or app store |

### Spark Ads Setup

1. Creator publishes organic post
2. Creator generates authorization code (30/60/365 day)
3. Advertiser imports post as Spark Ad
4. Engagement (likes, comments, shares) goes to creator's post

## 3-Second Rule Analysis

### Why 3 Seconds Matter

- 70%+ of video performance determined by first 3 seconds
- TikTok charges on impressions (CPM), not views
- Users scroll at ~300ms per item — hook must stop the scroll

### Hook Taxonomy

| Hook Type | Example | Best For | Avg 3s Rate |
|-----------|---------|---------|------------|
| Question | "Did you know 80% of...?" | Education, curiosity | 55-65% |
| Shock/stat | "We lost $50K before..." | Urgency, attention | 60-70% |
| Demonstration | [Product in action, first frame] | E-commerce, SaaS | 50-60% |
| Transformation | Before → After (instant) | Beauty, fitness, home | 65-75% |
| Listicle | "3 things I wish I knew..." | Broad appeal | 50-60% |
| POV | "POV: you just discovered..." | Gen Z, relatability | 55-65% |

### 3-Second Analysis Process

From ad performance data:
1. Export video-level metrics (2s views, 6s views, completion rate)
2. Calculate: `3s_rate = 2s_video_views / impressions` (approximation)
3. Benchmark: 3s rate > 50% = good, > 65% = excellent, < 40% = replace hook
4. Cross-reference hook type with 3s rate to identify winning patterns

## Creative Guidelines

### Format Requirements

| Spec | Value |
|------|-------|
| Aspect ratio | 9:16 (vertical, mandatory) |
| Resolution | 1080x1920 minimum |
| Duration | 15-30 seconds optimal (60s max) |
| Sound | ON by default (unlike Meta) |
| Captions | Recommended (40% watch without sound despite default) |
| File size | <500MB |

### Creative Principles

1. **Native feel > polished production** — ads that look like organic content perform 2-3x better
2. **Sound is essential** — music, voiceover, ASMR (unlike Meta where sound-off is common)
3. **Fast pacing** — scene changes every 2-3 seconds
4. **Text overlays** — reinforce key message (many users skim text)
5. **CTA in last 3 seconds** — clear action after building interest

### Creative Testing Cadence

- Test 20+ variations to find top performers
- Expect 3-5 winners from every 20 tested
- Creative lifespan: 7-14 days typical
- Refresh when: 3s rate drops >20% or CPA increases >30%

## Key Metrics

| Metric | Good | Excellent | Action if Below |
|--------|------|----------|----------------|
| 3s video view rate | >50% | >65% | Change hook |
| 6s video view rate | >30% | >45% | Improve first 6s pacing |
| Video completion rate | >8% | >15% | Shorten video or improve content |
| CTR | >0.8% | >1.5% | Stronger CTA |
| CVR | >1.0% | >2.5% | Improve landing page or offer |
| CPM | $3-8 | <$3 | Varies by market |

## TikTok-Specific Optimization

### Audience Signals (not strict targeting)

TikTok's algorithm works best with broad targeting + interest signals:
- **Broad**: Let algorithm find users (works well with 50+ conversions)
- **Interest-based**: Layer 2-3 interest categories
- **Lookalike**: Upload customer list for seed audience
- Avoid: Hyper-narrow targeting (limits algorithm learning)

### Hashtag Challenge Integration

For brand awareness campaigns:
1. Create branded hashtag
2. Pair with Spark Ads from participating creators
3. Track: hashtag views, UGC submissions, follower growth
4. NOT for direct response (no CPA optimization)
