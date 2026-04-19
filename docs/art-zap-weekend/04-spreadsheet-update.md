# Art + Zap Weekend — Spreadsheet Files

Each CSV in `tabs/` is a Google-Sheets-ready file you can drop into your planning spreadsheet as a new tab.

## Direct download links (one click)

If you're viewing this on GitHub, you can download any individual CSV directly:

| Tab | Download (right-click → Save Link As) |
|---|---|
| Sponsors — Tiers | [`tabs/sponsors-tiers.csv`](tabs/sponsors-tiers.csv) |
| Sponsors — Pipeline | [`tabs/sponsors-pipeline.csv`](tabs/sponsors-pipeline.csv) |
| In-Kind | [`tabs/in-kind.csv`](tabs/in-kind.csv) |
| Podcaster Hosts | [`tabs/podcaster-hosts.csv`](tabs/podcaster-hosts.csv) |
| Artists | [`tabs/artists.csv`](tabs/artists.csv) |
| Schedule — Saturday | [`tabs/schedule-saturday.csv`](tabs/schedule-saturday.csv) |
| Schedule — Sunday | [`tabs/schedule-sunday.csv`](tabs/schedule-sunday.csv) |
| Schedule — Monday Finale | [`tabs/schedule-monday-finale.csv`](tabs/schedule-monday-finale.csv) |
| Budget | [`tabs/budget.csv`](tabs/budget.csv) |
| Tasks — Owners | [`tabs/tasks-owners.csv`](tabs/tasks-owners.csv) |

## Easiest way to get all of them at once

Two options — pick whichever is easier for you:

### Option 1 — Download the whole folder as a ZIP (recommended)

1. Go to: **https://github.com/DionWilson/bitcoinforthearts** in a browser
2. Switch to the branch **`cursor/art-zap-weekend-sponsor-package-28bb`** (Branches dropdown near the top of the file list)
3. Use [DownGit](https://downgit.github.io/#/home?url=https://github.com/DionWilson/bitcoinforthearts/tree/cursor/art-zap-weekend-sponsor-package-28bb/docs/art-zap-weekend/tabs) to grab the entire `tabs/` folder as a ZIP, OR
4. Clone the repo to your computer and the CSVs are in `docs/art-zap-weekend/tabs/`

### Option 2 — Click each CSV link above

GitHub will show the CSV in raw text. Either:

- Click the **Raw** button at the top, then save the page (`Cmd+S` / `Ctrl+S`) as a `.csv` file
- Or right-click the link in this README and choose **"Save Link As"** → save as `.csv`

## Importing into your Google Sheet

For each CSV file:

1. Open your Google Sheet
2. Create a new tab (or use the existing one if it matches)
3. Click cell **A1**
4. **File → Import → Upload → select the CSV → "Replace current sheet"** *(or)*
5. Or open the CSV in any text editor, copy all, paste into A1 of the tab, then **Data → Split text to columns → Comma**

## Recommended Google Sheet workflow

1. **Don't delete your existing tabs** — duplicate them first as `archive-old-7day` so you can reference them later.
2. Import the CSVs above as new tabs.
3. Fill in the `[TBD]` and `[Add ...]` placeholder rows with your real names, dates, contact info.
4. Color-code statuses (Confirmed = green, In conversation = yellow, Declined = gray) using **Format → Conditional formatting**.
5. Pin the `Sponsors — Pipeline` tab as your daily working view between now and the event.

## Tab → file map (mirror in Google Sheets)

| Suggested Sheet tab name | Source CSV |
|---|---|
| `Sponsors — Tiers` | `tabs/sponsors-tiers.csv` |
| `Sponsors — Pipeline` | `tabs/sponsors-pipeline.csv` |
| `In-Kind` | `tabs/in-kind.csv` |
| `Podcaster Hosts` | `tabs/podcaster-hosts.csv` |
| `Artists` | `tabs/artists.csv` |
| `Schedule — Saturday` | `tabs/schedule-saturday.csv` |
| `Schedule — Sunday` | `tabs/schedule-sunday.csv` |
| `Schedule — Monday Finale` | `tabs/schedule-monday-finale.csv` |
| `Budget` | `tabs/budget.csv` |
| `Tasks — Owners` | `tabs/tasks-owners.csv` |
