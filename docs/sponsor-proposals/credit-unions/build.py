"""Build the credit union partnership deck.

    python3 build.py                      # general version, any credit union
    python3 build.py configs/citadel.json # version tailored to one credit union

Writes an HTML file next to this script. Render it to PDF with Chrome (see README.md).
"""

import json
import sys
from pathlib import Path
from string import Template

HERE = Path(__file__).parent

DEFAULTS = {
    "slug": "general",
    "cu_name": "Your Credit Union",
    "cu_ref": "your credit union",
    "giving_program": "your community giving program",
    "fund_name": "A Sovereign Artist Fund in your name",
    "audience": "Prepared for credit union leadership and community giving teams",
    "date": "October 2026",
    "cu_logo": "",
}


def main() -> None:
    config = dict(DEFAULTS)
    if len(sys.argv) > 1:
        config.update(json.loads(Path(sys.argv[1]).read_text()))

    logo = config.pop("cu_logo")
    config["cu_logo_html"] = (
        f'<img class="cu" src="{logo}" alt="{config["cu_name"]}" />' if logo else ""
    )

    template = Template((HERE / "deck-template.html").read_text())
    out = HERE / f"BFTA-Credit-Union-Partnership-{config['slug']}.html"
    out.write_text(template.substitute(config))
    print(out)


if __name__ == "__main__":
    main()
