# Platform CSV Format Reference

## Google Ads

### Export Path

Google Ads > Reports > Predefined Reports > [select report] > Download CSV

### Common Column Names

| Column             | Type    | Notes                                          |
| ------------------ | ------- | ---------------------------------------------- |
| Campaign           | string  | Campaign name                                  |
| Ad group           | string  | Ad group name                                  |
| Keyword            | string  | Search keyword (Search only)                   |
| Match type         | string  | Broad, Phrase, Exact                           |
| Day                | date    | YYYY-MM-DD                                     |
| Impressions        | integer |                                                |
| Clicks             | integer |                                                |
| Cost               | float   | In account currency                            |
| Conversions        | float   | Can be fractional with data-driven attribution |
| Conv. value        | float   | Revenue attributed                             |
| CTR                | string  | "X.XX%" — needs parsing                        |
| Avg. CPC           | float   |                                                |
| Search impr. share | string  | "X.XX%" or "< 10%"                             |
| Quality Score      | integer | 1-10 (Search only)                             |

### Parsing Notes

- CTR and impression share columns are strings with "%" — strip and convert
- Cost includes all currency as float (no currency symbol in data)
- "Conversions" may be fractional (e.g., 2.3) with data-driven attribution
- Header row count varies (sometimes metadata rows above headers)
- Check for "--" values (indicates insufficient data)

### Python Parsing

```python
import pandas as pd

df = pd.read_csv("google_ads.csv", skiprows=2)  # Skip metadata rows if present
# Clean percentage columns
for col in ["CTR", "Search impr. share"]:
    if col in df.columns:
        df[col] = df[col].str.replace("%", "").str.replace("< ", "")
        df[col] = pd.to_numeric(df[col], errors="coerce")
```

---

## Meta Ads

### Export Path

Meta Ads Manager > Select campaigns > Reports > Export Table Data > CSV

### Common Column Names

| Column                           | Type    | Notes                           |
| -------------------------------- | ------- | ------------------------------- |
| Campaign name                    | string  |                                 |
| Ad set name                      | string  |                                 |
| Ad name                          | string  |                                 |
| Reporting starts                 | date    | Format varies by account locale |
| Reporting ends                   | date    |                                 |
| Reach                            | integer | Unique people                   |
| Impressions                      | integer |                                 |
| Frequency                        | float   | Impressions / Reach             |
| Link clicks                      | integer | Clicks to destination           |
| CTR (link click-through rate)    | float   | Already as percentage           |
| Amount spent                     | float   | In account currency             |
| Results                          | integer | Primary conversion event        |
| Cost per result                  | float   |                                 |
| CPM (cost per 1,000 impressions) | float   |                                 |

### Parsing Notes

- Date format depends on account locale (US: MM/DD/YYYY, ISO: YYYY-MM-DD)
- "Link clicks" vs "Clicks (all)" — use "Link clicks" for CTR/CVR calculations
- "Results" depends on campaign objective (purchases, leads, app installs, etc.)
- Amount spent may include currency symbol in some exports
- Blank cells mean 0 (not null)

### Python Parsing

```python
import pandas as pd

df = pd.read_csv("meta_ads.csv")
# Normalize date format
df["Reporting starts"] = pd.to_datetime(df["Reporting starts"], infer_datetime_format=True)
# Clean currency if present
if df["Amount spent"].dtype == object:
    df["Amount spent"] = df["Amount spent"].str.replace(r"[^\d.]", "", regex=True).astype(float)
```

---

## Cross-Platform Unified Schema

When combining Google Ads and Meta Ads data:

```python
unified_columns = {
    # Google Ads -> Unified
    "Campaign": "campaign",
    "Cost": "spend",
    "Clicks": "clicks",
    "Impressions": "impressions",
    "Conversions": "conversions",
    "Conv. value": "revenue",

    # Meta Ads -> Unified
    "Campaign name": "campaign",
    "Amount spent": "spend",
    "Link clicks": "clicks",
    "Impressions": "impressions",
    "Results": "conversions",
    # Revenue not directly available in Meta standard export
}
```

Add a `platform` column ("google" or "meta") before concatenating.
