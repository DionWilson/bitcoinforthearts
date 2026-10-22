# Credit union partnership deck

A 13-slide, 16:9 Bitcoin For The Arts partnership proposal that can be pitched to any credit union. The general version uses neutral wording ("your credit union"). A short JSON config swaps in a specific credit union's name, giving program, and named artist fund.

## Files

- `deck-template.html`: the deck, with `$placeholders`. Write literal dollar amounts as `$$50,000`.
- `build.py`: fills the template and writes `BFTA-Credit-Union-Partnership-<slug>.html`.
- `configs/`: one JSON file per credit union. `citadel.json` is the example.
- `BFTA-Credit-Union-Partnership-general.pdf`: the version to send any credit union.

## Tailor it for a credit union

Copy `configs/citadel.json`, then change the fields:

| Field | Used for |
| --- | --- |
| `slug` | Output file name |
| `cu_name` | Cover title and slide footers |
| `cu_ref` | Short name used in sentences ("members and communities Citadel serves") |
| `giving_program` | Their community giving program, on the alignment slide |
| `fund_name` | The named artist grant fund in Tier 1 |
| `audience` | "Prepared for" line on the cover |
| `date` | Cover and footers |
| `cu_logo` | Optional path to their logo, relative to this folder. Leave empty to omit. |

## Build and render

```bash
cd docs/sponsor-proposals/credit-unions
python3 build.py configs/citadel.json
google-chrome --headless --no-sandbox --disable-gpu \
  --user-data-dir="$(mktemp -d)" --no-pdf-header-footer \
  --print-to-pdf=BFTA-Credit-Union-Partnership-citadel.pdf \
  "file://$PWD/BFTA-Credit-Union-Partnership-citadel.html"
```

Run `python3 build.py` with no argument for the general version.

## Before sending

- Check the 2027 dates on the activations slide against the current event calendar.
- Confirm with Kyle Shirkness how he wants his title and Bitcoin Pivot shown on the last slide.
- Keep the compliance slide. Credit union risk teams will look for it.
