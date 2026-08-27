"""Prepare the exploded-burger layers.

Run it from anywhere:  python3 scripts/build-burger-layers.py export
Preview the result:    python3 scripts/build-burger-layers.py steps
Needs Pillow and numpy (pip install pillow numpy).

The seven PNGs the owner supplied are each a cutout centred on its own
1254px square, at whatever size filled the frame — so a pickle slice and a
bun arrive the same width. They are not registered to each other and cannot
just be stacked.

This puts them all on ONE shared canvas, each scaled and placed where it sits
in the assembled burger. Every layer then ships as a full-canvas transparent
image, so in the browser all eight are simply pinned to the same box with
inset:0, and the animation is nothing but a translate per layer. No per-layer
sizing or positioning in CSS, and no chance of them drifting out of register.

The cheese arrived as one image holding two separate slices. They are two
disconnected shapes, so they come apart cleanly and become two layers.
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

# w      width as a fraction of the canvas
# cy     centre of the layer, as a fraction of canvas height
# squash vertical scale. The sauce and the pickles were shot from further
#        above than the buns, so seen straight on they read as a blob and a
#        pile rather than as layers. Compressing them settles them into the
#        stack at the same eye level as everything else.
LAYERS = [
    # name         w      cy      squash
    ('topbun',     0.80,  0.255,  1.00),
    ('sauce',      0.42,  0.420,  0.62),
    ('lettuce',    0.90,  0.470,  0.66),
    ('pickles',    0.55,  0.512,  0.55),
    ('cheesetop',  0.84,  0.548,  1.00),
    ('patties',    0.86,  0.620,  0.86),
    ('cheesebot',  0.79,  0.716,  1.00),
    ('bottombun',  0.80,  0.790,  1.00),
]


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


def sources():
    """The eight cutouts, trimmed, keyed by layer name."""
    out = {}
    for name in NAMES:
        im = Image.open(os.path.join(SRC, name + '.webp')).convert('RGBA')
        if name != 'cheese':
            out[name] = trimmed(im)
            continue
        a = np.array(im.split()[3])
        lab, n = components(a > 20)
        blobs = []
        for cid in range(1, n + 1):
            ys, xs = np.where(lab == cid)
            if len(ys) < 2000:
                continue
            layer = np.array(im)
            layer[..., 3] = np.where(lab == cid, layer[..., 3], 0)
            blobs.append((ys.mean(), trimmed(Image.fromarray(layer, 'RGBA'))))
        blobs.sort(key=lambda b: b[0])          # topmost slice first
        out['cheesetop'], out['cheesebot'] = blobs[0][1], blobs[1][1]
    return out


def compose(src):
    """Each layer on its own full-size canvas, in its assembled position."""
    placed = {}
    for name, wf, cyf, squash in LAYERS:
        im = src[name]
        tw = round(W * wf)
        th = max(1, round(tw * im.height / im.width * squash))
        im = im.resize((tw, th), Image.LANCZOS)
        canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        canvas.alpha_composite(im, ((W - tw) // 2, round(H * cyf) - th // 2))
        placed[name] = canvas
    return placed


# How each layer moves when the burger comes apart, as a fraction of the
# canvas. dy is the whole effect; dx and rot are small on purpose — the brief
# is one burger opening up, not parts drifting off on their own.
#
# The bottom bun barely moves. It anchors the composition, and everything
# else climbs away from it, which reads as the burger being lifted apart
# rather than scattered.
#            name          dy      dx     rot   scale
EXPLODE = {
    'topbun':    (-0.375,  0.010, -2.2,  1.04),
    'sauce':     (-0.250, -0.014,  1.6,  1.00),
    'lettuce':   (-0.170,  0.016, -1.4,  1.01),
    'pickles':   (-0.090, -0.018,  2.4,  1.00),
    'cheesetop': (-0.040,  0.012, -1.0,  1.00),
    'patties':   ( 0.010, -0.008,  0.8,  1.02),
    'cheesebot': ( 0.120,  0.014, -1.6,  1.00),
    'bottombun': ( 0.185,  0.000,  0.6,  1.03),
}


def preview(placed, path, t=0.0, pad=0.0):
    """The stack at t=0 (assembled) through t=1 (fully apart)."""
    ph = round(H * (1 + pad * 2))
    off = round(H * pad)
    flat = Image.new('RGBA', (W, ph), (16, 16, 18, 255))
    for name, *_ in LAYERS[::-1]:            # bottom of the burger painted first
        dy, dx, rot, sc = EXPLODE[name]
        im = placed[name]
        if t:
            s = 1 + (sc - 1) * t
            im = im.resize((round(W * s), round(H * s)), Image.LANCZOS)
            if rot:
                im = im.rotate(-rot * t, resample=Image.BICUBIC, expand=False)
        x = round((W - im.width) / 2 + dx * W * t)
        y = round((H - im.height) / 2 + dy * H * t) + off
        flat.alpha_composite(im, (x, y))
    flat.convert('RGB').save(path)


WIDTHS = (440, 720, 1080)


def export(placed):
    """Every layer at three widths as WebP, plus one PNG each as a fallback.

    Each file is the full canvas with one ingredient on it, so the rest is
    transparent — which costs almost nothing to store and buys exact
    registration between the eight layers at every size.
    """
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
    placed = compose(sources())
    if len(sys.argv) > 1 and sys.argv[1] == 'export':
        rep = export(placed)
        for n, b in rep:
            print(f'  {n:10s} {b/1024:7.1f} KB (3 webp + png)')
        print(f'  {"TOTAL":10s} {sum(b for _, b in rep)/1024:7.1f} KB')
    elif len(sys.argv) > 1 and sys.argv[1] == 'steps':
        for t in (0.0, 0.35, 0.7, 1.0):
            preview(placed, f'ex-{int(t*100):03d}.png', t, pad=0.45)
    else:
        preview(placed, sys.argv[1] if len(sys.argv) > 1 else 'preview.png')
    print(json.dumps({'canvas': [W, H]}))
