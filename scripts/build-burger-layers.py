"""Prepare the exploded-burger layers.

Run it from anywhere:  python3 scripts/build-burger-layers.py export
Preview the result:    python3 scripts/build-burger-layers.py steps
Needs Pillow and numpy (pip install pillow numpy).

The cutouts were each supplied centred on their own 1254px square at whatever
size filled the frame, so a pickle slice and a bun arrived the same width.
They are not stackable as they are.

This puts them all on ONE shared canvas, each scaled and placed where it sits
in the assembled burger. Every layer then ships as a full-canvas transparent
image, so in the browser all nine are simply pinned to the same box with
inset:0, and the animation is nothing but a translate per layer. No per-layer
sizing or positioning in CSS, and no chance of them drifting out of register.

TWO OF THE NINE LAYERS ARE CUT OUT OF ONE PICTURE EACH.

The cheese arrived as one image holding two slices. They are two completely
disconnected shapes, so they come apart by simply labelling the blobs.

The patties arrived as one image of two patties that touch, so no such luck.
They are parted along the shadow line between them — traced column by column
as the darkest row in the band where the seam runs, then smoothed. That line
is the top patty's own lumpy underside, so both halves come away with a
believable meat edge instead of the flat sawn line a straight cut would
leave. The lower patty ends up the thinner of the two because part of it was
hidden behind the upper one in the original photograph; there is nothing to
be done about that, and with cheese between them it does not read as wrong.
"""
import json
import os
import sys
from collections import deque

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'ingredients')
OUT = os.path.join(HERE, os.pardir, 'public', 'images')

# The cutouts as they were supplied, kept in scripts/ingredients so this can
# be run again. They are WebP rather than the original PNGs only to keep the
# repository from growing by 9 MB; at quality 92 with untouched transparency
# there is nothing visible between them, and everything here is scaled down
# from 1254px anyway.
NAMES = ['topbun', 'sauce', 'lettuce', 'pickles', 'cheese', 'patties', 'bottombun']

W, H = 1200, 980

# ---------------------------------------------------------------------------
# THE STACK
#
# y     where the layer sits in the assembled burger, and where it travels to
# yex   when the burger is open. Both are in the owner's own units, measured
#       from the middle of the burger with down being positive, and both are
#       exactly as specified.
# w     width as a fraction of the canvas
# squash  vertical scale. The sauce and the pickles were shot from further
#       above than the buns, so seen straight on they read as a blob and a
#       pile rather than as layers. Compressing them settles them into the
#       stack at the same eye level as everything else.
#
# The order is the order they are stacked, top of the burger first. It is
# also reversed for painting, so each ingredient overlaps the one beneath it.
# ---------------------------------------------------------------------------
LAYERS = [
    # name          y     yex     w     squash
    ('topbun',    -150,  -320,  0.80,  1.00),
    ('pickles',   -105,  -230,  0.55,  0.55),
    ('lettuce',    -75,  -160,  0.90,  0.66),
    ('sauce',      -45,   -90,  0.42,  0.62),
    ('cheesetop',  -15,   -25,  0.84,  1.00),
    ('pattytop',    20,    50,  0.86,  1.00),
    ('cheesebot',   55,   125,  0.79,  1.00),
    ('pattybot',    90,   205,  0.86,  1.00),
    ('bottombun',  145,   320,  0.80,  1.00),
]

# One number turns the owner's units into canvas pixels. It is chosen so the
# assembled burger fills the canvas almost exactly: the span from the middle
# of the top bun to the middle of the bottom one is 295 of those units, and
# the two buns add about 400px of their own height on top of that.
K = 1.83


def trimmed(img):
    a = np.array(img.split()[3])
    ys, xs = np.where(a > 8)
    return img.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def components(mask):
    """Label 4-connected blobs. Used once, to part the two cheese slices."""
    h, w = mask.shape
    lab = np.zeros((h, w), np.int32)
    cur = 0
    for sy in range(h):
        row = mask[sy]
        for sx in range(w):
            if row[sx] and lab[sy, sx] == 0:
                cur += 1
                q = deque([(sy, sx)])
                lab[sy, sx] = cur
                while q:
                    y, x = q.popleft()
                    for ny, nx in ((y+1, x), (y-1, x), (y, x+1), (y, x-1)):
                        if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and lab[ny, nx] == 0:
                            lab[ny, nx] = cur
                            q.append((ny, nx))
    return lab, cur


def split_cheese(im):
    """Two disconnected slices -> two images. Topmost first."""
    lab, n = components(np.array(im.split()[3]) > 20)
    blobs = []
    for cid in range(1, n + 1):
        ys, xs = np.where(lab == cid)
        if len(ys) < 2000:
            continue
        layer = np.array(im)
        layer[..., 3] = np.where(lab == cid, layer[..., 3], 0)
        blobs.append((ys.mean(), trimmed(Image.fromarray(layer, 'RGBA'))))
    blobs.sort(key=lambda b: b[0])
    return blobs[0][1], blobs[1][1]


def split_patties(im, band=(560, 700), smooth=121, feather=7.0):
    """Two touching patties -> two images, parted along the shadow between.

    For every column, the darkest opaque row inside `band` is where the seam
    runs. Smoothing that trace over `smooth` columns keeps the cut a gentle
    curve rather than a jagged line chasing individual crumbs of crust, and
    `feather` softens the crossing so neither half gets a hard edge.
    """
    a = np.array(im).astype(np.int16)
    lum = a[..., :3].astype(float).mean(axis=2)
    alpha = a[..., 3]
    h, w = lum.shape

    seam = np.full(w, np.nan)
    for x in range(w):
        opaque = alpha[band[0]:band[1], x] > 40
        if opaque.sum() < 10:
            continue
        col = np.where(opaque, lum[band[0]:band[1], x], 1e6)
        seam[x] = band[0] + int(np.argmin(col))

    idx = np.arange(w)
    ok = ~np.isnan(seam)
    seam = np.interp(idx, idx[ok], seam[ok])
    pad = np.pad(seam, (smooth // 2, smooth // 2), mode='edge')
    seam = np.convolve(pad, np.ones(smooth) / smooth, mode='valid')

    below = np.arange(h)[:, None] - seam[None, :]
    keep_top = np.clip(0.5 - below / feather, 0, 1)

    out = []
    for keep in (keep_top, 1.0 - keep_top):
        b = a.copy()
        b[..., 3] = (b[..., 3] * keep).astype(np.int16)
        out.append(trimmed(Image.fromarray(b.astype(np.uint8), 'RGBA')))
    return out[0], out[1]


def sources():
    """The nine cutouts, trimmed, keyed by layer name."""
    out = {}
    for name in NAMES:
        im = Image.open(os.path.join(SRC, name + '.webp')).convert('RGBA')
        if name == 'cheese':
            out['cheesetop'], out['cheesebot'] = split_cheese(im)
        elif name == 'patties':
            out['pattytop'], out['pattybot'] = split_patties(im)
        else:
            out[name] = trimmed(im)
    return out


def compose(src):
    """Each layer on its own full-size canvas, in its assembled position."""
    placed = {}
    for name, y, _yex, wf, squash in LAYERS:
        im = src[name]
        tw = round(W * wf)
        th = max(1, round(tw * im.height / im.width * squash))
        im = im.resize((tw, th), Image.LANCZOS)
        canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        cy = H / 2 + y * K
        canvas.alpha_composite(im, ((W - tw) // 2, round(cy - th / 2)))
        placed[name] = canvas
    return placed


def travel():
    """How far each layer moves, as a percentage of the canvas height —
    which is exactly what the CSS needs, because a percentage in translate
    is a percentage of the element's own box and the box IS the canvas."""
    return {name: (yex - y) * K / H * 100 for name, y, yex, _w, _s in LAYERS}


def preview(placed, path, t=0.0, pad=0.0):
    ph = round(H * (1 + pad * 2))
    off = round(H * pad)
    flat = Image.new('RGBA', (W, ph), (16, 16, 18, 255))
    move = travel()
    for name, *_ in LAYERS[::-1]:            # bottom of the burger painted first
        im = placed[name]
        dy = move[name] / 100 * H * t
        flat.alpha_composite(im, (0, round(dy) + off))
    flat.convert('RGB').save(path)


WIDTHS = (440, 720, 1080)


def export(placed):
    report = []
    for name, *_ in LAYERS:
        im = placed[name]
        total = 0
        for w in WIDTHS:
            r = im.resize((w, round(H * w / W)), Image.LANCZOS)
            p = f'{OUT}/burger-{name}-{w}.webp'
            r.save(p, 'WEBP', quality=(78 if w >= 1080 else 82), alpha_quality=90, method=6)
            total += os.path.getsize(p)
        r = im.resize((480, round(H * 480 / W)), Image.LANCZOS)
        p = f'{OUT}/burger-{name}.png'
        r.save(p, 'PNG', optimize=True)
        total += os.path.getsize(p)
        report.append((name, total))
    return report


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'preview'
    placed = compose(sources())
    if cmd == 'export':
        rep = export(placed)
        for n, b in rep:
            print(f'  {n:10s} {b/1024:7.1f} KB (3 webp + png)')
        print(f'  {"TOTAL":10s} {sum(b for _, b in rep)/1024:7.1f} KB')
    elif cmd == 'steps':
        for t in (0.0, 0.35, 0.7, 1.0):
            preview(placed, f'ex-{int(t*100):03d}.png', t, pad=0.45)
    elif cmd == 'css':
        for name, pct in travel().items():
            print(f'.burger__layer--{name:9s} {{ --dy: {pct:6.1f}%; }}')
    else:
        preview(placed, cmd)
    print(json.dumps({'canvas': [W, H], 'K': K}))
