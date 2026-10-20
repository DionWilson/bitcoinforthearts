# Bitcoin for the Arts Park Nashville 2027: sponsor and vendor sheet

Preliminary interest sheet for sponsors and vendors, July 14 to 15, 2027, at 6th and Peabody (OSD Distilling, YeeHaw Brewing), across from Music City Center.

- `BFTA-Nashville-2027-Park-Sponsor-Vendor-Sheet.pdf`: the file to send. On GitHub, open it and use **Download raw file**.
- `nashville-2027-park-sheet.html`: source. Edit this, then re-render.

Spaces are not mapped and pricing is not set. Update the sheet once the venue confirms the site map and terms.

## Render

From this folder:

```bash
google-chrome --headless --disable-gpu --no-sandbox --user-data-dir=/tmp/chrome-nash \
  --no-pdf-header-footer \
  --print-to-pdf=BFTA-Nashville-2027-Park-Sponsor-Vendor-Sheet.pdf \
  "file://$(pwd)/nashville-2027-park-sheet.html"
```

Images load from `public/` by relative path, so render from inside the repo.
