# OG card fonts

`src/app/opengraph-image.tsx` renders through satori, which only reads **TTF /
OTF / WOFF** and cannot instance a variable font. The woff2 subsets in
`../` (the ones `layout.tsx` self-hosts for the site) are therefore unusable
there, so this folder holds static TTF cuts of the same faces.

| File | Source | Notes |
| --- | --- | --- |
| `fraunces-latin-900-normal.ttf` | `../fraunces-latin-wght-normal.woff2` | pinned to wght 900, composites decomposed |
| `jetbrains-mono-latin-400-normal.ttf` | `../jetbrains-mono-latin-400-normal.woff2` | container change only |
| `jetbrains-mono-latin-700-normal.ttf` | `../jetbrains-mono-latin-700-normal.woff2` | container change only |

Two gotchas are baked into the Fraunces cut, both of which render as garbage if
you skip them:

1. The variable subset's default instance is wght 900, but satori ignores
   `fvar` entirely and throws on the table. It has to be a static instance.
2. satori mis-draws TrueType **composite** glyphs, so `+` in `400+` came out as
   two detached strokes. Every composite is decomposed to contours.

## Regenerating

```sh
# woff2 -> ttf
npx --yes wawoff2 # or: node -e "..." using wawoff2.decompress()

# then, with fonttools + brotli in a venv:
python - <<'PY'
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.recordingPen import DecomposingRecordingPen

f = TTFont('fraunces-latin-wght-normal.ttf')          # decompressed woff2
instancer.instantiateVariableFont(f, {'wght': 900}, inplace=True)

glyf, gs = f['glyf'], f.getGlyphSet()
for name in list(glyf.keys()):
    if glyf[name].isComposite():
        rec = DecomposingRecordingPen(gs)
        gs[name].draw(rec)
        pen = TTGlyphPen(None)
        rec.replay(pen)
        glyf[name] = pen.glyph()

f.save('fraunces-latin-900-normal.ttf')
PY
```
