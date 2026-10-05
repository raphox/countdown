# Local Google Fonts

Downloaded from the official [`google/fonts`](https://github.com/google/fonts) repository, pinned to the commit recorded in `manifest.json`. Original TTF files and original `METADATA.pb` are in `originals/`; each original OFL 1.1 license, including copyright attribution, is in `licenses/`. The manifest records source URLs, original filenames and SHA-256 digests.

The served WOFF2 files are pt-BR subsets made with FontTools 4.60.1 / Brotli 1.1.0. Modified font internal family names are `Contagem Local NN`, avoiding Reserved Font Names. Original copyright/license names are preserved. Files are distributed under their original OFL license; read the corresponding license before reuse.

Coverage: U+0000–017F (Portuguese accents), U+2000–206F (punctuation), euro sign and replacement character. Emoji and characters outside these ranges use system fallback. Font display is `swap`; body/controls/clock use Inter. Only the current theme heading family and Inter are defined on a theme page, so other TTF/WOFF2 files are not requested. The gallery uses Fraunces headings and Inter body.

To reproduce, keep the manifest (its commit pins the download):

```sh
node scripts/download-fonts.mjs
uv run --with fonttools==4.60.1 --with brotli==1.1.0 python scripts/subset-fonts.py
```

Downloads are a development action, never a runtime browser request. Original TTF sources are kept for provenance and future controlled regeneration. The checked-in WOFF2 files mean production builds do not need Python or network access.
