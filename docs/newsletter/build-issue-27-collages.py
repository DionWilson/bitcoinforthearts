#!/usr/bin/env python3
"""Build email-safe hero + collage JPGs for Issue #27 from Midwest Summit photos.

Looks for source files in public/ (names Dion listed), converts HEIC → JPG,
writes optimized assets under public/newsletter/issue-27/.

Usage:
  python3 docs/newsletter/build-issue-27-collages.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except Exception:
    pass

ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "newsletter" / "issue-27"

# Preferred source filenames (case variants resolved at runtime)
SOURCES = {
    "booth": ["bitcoin-art-park-photo.jpg", "bitcoin-art-park-photo.JPG"],
    "short_north_mbs": ["short-north-mbs.jpg", "short-north-mbs.JPG"],
    # Board group with BFTA advisors (not the alternate bfta-advisors-mbs.jpg crop)
    "board": [
        "bfta-board-advisors-mbs.heic",
        "bfta-board-advisors-mbs.HEIC",
        "bfta-board-advisors-mbs.jpg",
    ],
    "dion_nadia_ainsley": ["dion-nadia-ainsley-mbs.JPG", "dion-nadia-ainsley-mbs.jpg"],
    "andy": ["rock-n-roll-andy-breakheart-mbs.jpg", "rock-n-roll-andy-breakheart-mbs.JPG"],
    # Short North with BFTA logo at the booth (not short-north-mbs.jpg)
    "short_north_stage": [
        "short-north-stage-bfta.heic",
        "short-north-stage-bfta.HEIC",
        "short-north-stage-bfta.jpg",
    ],
    "ainsley_band": ["ainsley-band-mbs.jpg", "ainsley-band-mbs.JPG"],
    "ainsley_nadia": ["ainsley-nadia-singing.HEIC", "ainsley-nadia-singing.heic", "ainsley-nadia-singing.jpg"],
    "sean": ["sean-live-painting-mbs.HEIC", "sean-live-painting-mbs.heic", "sean-live-painting-mbs.jpg"],
}

EMAIL_W = 1200  # 2x for retina; HTML displays ~536
GAP = 12
BG = (255, 250, 240)  # cream #FFFAF0


def resolve(names: list[str]) -> Path | None:
    for name in names:
        p = PUBLIC / name
        if p.exists():
            return p
    return None


def open_rgb(path: Path) -> Image.Image:
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "P"):
        bg = Image.new("RGB", im.size, BG)
        if im.mode == "P":
            im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1] if im.mode == "RGBA" else None)
        return bg
    return im.convert("RGB")


def cover(im: Image.Image, w: int, h: int) -> Image.Image:
    return ImageOps.fit(im, (w, h), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def save_jpg(im: Image.Image, path: Path, quality: int = 82) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"wrote {path.relative_to(ROOT)} ({path.stat().st_size // 1024} KB)")


def collage_grid(images: list[Image.Image], cols: int, cell_w: int, cell_h: int) -> Image.Image:
    rows = (len(images) + cols - 1) // cols
    out_w = cols * cell_w + (cols - 1) * GAP
    out_h = rows * cell_h + (rows - 1) * GAP
    canvas = Image.new("RGB", (out_w, out_h), BG)
    for i, im in enumerate(images):
        r, c = divmod(i, cols)
        x = c * (cell_w + GAP)
        y = r * (cell_h + GAP)
        canvas.paste(cover(im, cell_w, cell_h), (x, y))
    return canvas


def main() -> int:
    found: dict[str, Path] = {}
    missing: list[str] = []
    for key, names in SOURCES.items():
        p = resolve(names)
        if p:
            found[key] = p
            print(f"found {key}: {p.name}")
        else:
            missing.append(key)
            print(f"MISSING {key}: looked for {names[0]}")

    if "booth" not in found and missing:
        print("\nDrop Dion's Midwest photos into public/ then re-run this script.")
        if not found:
            return 1

    OUT.mkdir(parents=True, exist_ok=True)

    # 1) Hero: full booth (or best available wide shot)
    hero_src = found.get("booth") or found.get("short_north_mbs")
    if hero_src:
        hero = open_rgb(hero_src)
        # Cap width; keep aspect (booth is long/wide)
        max_w = EMAIL_W
        if hero.width > max_w:
            ratio = max_w / hero.width
            hero = hero.resize((max_w, int(hero.height * ratio)), Image.Resampling.LANCZOS)
        # Soft max height so email doesn't tower
        max_h = 720
        if hero.height > max_h:
            hero = cover(hero, hero.width, max_h)
        save_jpg(hero, OUT / "hero-booth.jpg", quality=84)

    # 2) Stage collage: Andy + Short North (BFTA logo booth) + Ainsley band
    stage_keys = [k for k in ("andy", "short_north_stage", "ainsley_band") if k in found]
    if len(stage_keys) >= 2:
        imgs = [open_rgb(found[k]) for k in stage_keys]
        cols = 3 if len(imgs) >= 3 else 2
        cell_w = 388 if cols == 3 else 588
        cell_h = 420
        save_jpg(collage_grid(imgs[:cols], cols=cols, cell_w=cell_w, cell_h=cell_h), OUT / "collage-stage.jpg")
    elif len(stage_keys) == 1:
        im = cover(open_rgb(found[stage_keys[0]]), EMAIL_W, 640)
        save_jpg(im, OUT / "collage-stage.jpg")

    # 3) Artists collage: Dion/Nadia/Ainsley + singing + Sean + Short North (mbs)
    #    No Andy here — he is on the Expo Stage collage.
    artist_keys = [
        k
        for k in ("dion_nadia_ainsley", "ainsley_nadia", "sean", "short_north_mbs")
        if k in found
    ]
    if len(artist_keys) >= 2:
        imgs = [open_rgb(found[k]) for k in artist_keys]
        cols = 2
        cell_w = 588
        cell_h = 440
        save_jpg(collage_grid(imgs, cols=cols, cell_w=cell_w, cell_h=cell_h), OUT / "collage-artists.jpg")

    # 4) Board + team moment
    if "board" in found:
        board = open_rgb(found["board"])
        if board.width > EMAIL_W:
            ratio = EMAIL_W / board.width
            board = board.resize((EMAIL_W, int(board.height * ratio)), Image.Resampling.LANCZOS)
        max_h = 700
        if board.height > max_h:
            board = cover(board, min(board.width, EMAIL_W), max_h)
        save_jpg(board, OUT / "board-advisors.jpg", quality=84)

    print(f"\nDone. Assets in {OUT.relative_to(ROOT)}/")
    if missing:
        print(f"Still missing sources: {', '.join(missing)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
