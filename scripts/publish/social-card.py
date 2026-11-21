#!/usr/bin/env python3
"""Generate a 1200x630 social card for blog posts / guides and set `image:` in their frontmatter.

Usage (from the repo root):
  python3 scripts/publish/social-card.py blog/2026-12-01-my-post.md        # one file (skips if card exists)
  python3 scripts/publish/social-card.py --all [--force]                   # every blog post and guide
  python3 scripts/publish/social-card.py --force docs/series/guide.md      # regenerate

Needs Pillow + pngquant and macOS Helvetica Neue (run locally; CI never generates cards).
"""
import glob, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
FONT = "/System/Library/Fonts/HelveticaNeue.ttc"


def font(size, idx):
    return ImageFont.truetype(FONT, size, index=idx)


def clean(text):
    return re.sub(r'[^\x00-⿿]', '', text).replace('  ', ' ').strip(' -–—:')


def wrap(draw, text, f, max_width):
    lines, cur = [], ''
    for word in text.split():
        trial = (cur + ' ' + word).strip()
        if draw.textlength(trial, font=f) <= max_width:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    lines.append(cur)
    return lines


def render(title, kind, out):
    logo = Image.open("static/img/logo1.png").convert("RGBA").resize((96, 96))
    img = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=(int(49 + 20 * t), int(46 + 10 * t), int(129 + 30 * t)))
    d.text((80, 70), kind.upper(), font=font(28, 1), fill="#a5b4fc")
    for size in (72, 64, 56, 48):
        f = font(size, 1)
        lines = wrap(d, title, f, W - 160)
        if len(lines) <= 4:
            break
    y = 130
    for line in lines[:4]:
        d.text((80, y), line, font=f, fill="white")
        y += int(size * 1.2)
    img.paste(logo, (80, H - 140), logo)
    d.text((196, H - 122), "AI Social Journal", font=font(34, 1), fill="white")
    d.text((196, H - 80), "aisocialjournal.com", font=font(26, 0), fill="#c7d2fe")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out, optimize=True)
    subprocess.run(["pngquant", "--quality", "70-90", "--ext", ".png", "--force", out], check=True)


def process(path, force):
    text = open(path).read()
    m = re.match(r'---\n(.*?)\n---\n', text, re.S)
    if not m:
        print(f"skip (no frontmatter): {path}")
        return
    fm = m.group(1)
    tm = re.search(r'^title:\s*(.+)$', fm, re.M)
    if not tm:
        print(f"skip (no title): {path}")
        return
    title = clean(tm.group(1).strip().strip('"\''))
    sm = re.search(r'^slug:\s*(\S+)', fm, re.M)
    name = sm.group(1).strip('"\'/').split('/')[-1] if sm else re.sub(r'^\d{4}-\d{2}-\d{2}-', '', os.path.basename(path)[:-3])
    out = f"static/img/social/{name}.png"
    kind = "Blog" if path.startswith("blog/") else "Guide"
    if os.path.exists(out) and not force:
        print(f"exists: {out}")
    else:
        render(title, kind, out)
        print(f"card: {out}")
    line = f"image: /img/social/{name}.png"
    if re.search(r'^image:.*$', fm, re.M):
        fm2 = re.sub(r'^image:.*$', line, fm, flags=re.M)
    else:
        fm2 = re.sub(r'^(title:.*)$', lambda mm: mm.group(1) + "\n" + line, fm, count=1, flags=re.M)
    if fm2 != fm:
        open(path, 'w').write(text.replace(fm, fm2, 1))


if __name__ == "__main__":
    args = sys.argv[1:]
    force = "--force" in args
    files = [a for a in args if not a.startswith("--")]
    if "--all" in args:
        files = sorted(glob.glob("blog/*.md") + glob.glob("docs/*/*.md"))
    if not files:
        sys.exit(__doc__)
    for f in files:
        process(f, force)
