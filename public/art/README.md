# Raster artwork for Contagem

Nineteen original occasion compositions generated using OpenAI's built-in `image_gen` tool. Each has a dedicated landscape and portrait composition, not a recolor or a portrait crop. Original PNGs are preserved in `originals/` at their generated native dimensions (approximately 1672×941 / 941×1672). They were not generated at 1920×1080 natively; the export pipeline resizes them to the delivery dimensions.

Artwork is inclusive across genders, with no people, gender-role accessories or embedded text. Image prompts and original file provenance are recorded in `*-generation.json` and consolidated in `manifest.json`. Titles, dates, messages, countdown digits and typography are browser HTML. OG PNGs also contain no embedded captions; theme identity is communicated through art and HTML metadata.

`npm run generate:art` uses pinned installed Sharp to deterministically derive:

- Desktop: 1920×1080 PNG.
- Full portrait: 1080×1920 PNG, preserved for high-resolution delivery/provenance.
- Served mobile: 540×960 PNG, below 600000 bytes. The full portrait is not loaded automatically.
- Gallery: 640×360 PNG.
- OG: 1200×630 PNG, below 500000 bytes; the complete landscape is contained without cropping its perimeter.

Exports use PNG palette quality100 and dithering0.75. OG exports may use quality80/dithering0.3 when needed to meet the 500 KB budget; the selected quality is recorded per new OG in the manifest. Composition and dimensions are preserved. Large originals/full exports are not requested by the product interface. The manifest records actual dimensions, byte sizes and hashes. Source artwork's use is subject to applicable OpenAI terms and operator obligations; no third-party artist license is invented. Font licenses are separate in `public/fonts/`.

Obsolete generated SVG exports were removed, and old vector-derived OG PNGs were replaced with raster-derived OGs. Future export runs remove only obsolete `public/art/*.svg`, preserving original PNGs and provenance.

To regenerate selected themes only, pass their slugs: `npm run generate:art -- evento-politico zoeira encontro-amigos jantar`. The political artwork uses a light ivory backdrop and large generic flags, as requested; earlier formal/dark variants are not kept in this project.
