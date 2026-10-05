"""Subset official OFL fonts for pt-BR; preserve originals and license attribution."""
import json
import hashlib
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
root = Path('public/fonts')
manifest = json.loads((root / 'manifest.json').read_text())
for entry in manifest['families']:
    font = TTFont(root / entry['original'], recalcTimestamp=False)
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    options.name_IDs = ['*']
    options.name_languages = ['*']
    options.name_legacy = True
    # Portuguese accents and readable typographic punctuation; emoji uses system fallback.
    unicodes = list(range(0x100)) + list(range(0x100,0x180)) + list(range(0x2000,0x2070)) + [0x20AC,0xFFFD]
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=unicodes)
    sub.subset(font)
    family = f"Contagem Local {manifest['families'].index(entry) + 1:02}"
    # Rename modified fonts so Reserved Font Names in original OFL files are respected.
    replacements = {1:family, 2:'Regular', 3:family.replace(' ','')+'-Subset', 4:family, 6:family.replace(' ',''), 16:family, 17:'Regular'}
    for record in list(font['name'].names):
        if record.nameID in replacements:
            font['name'].setName(replacements[record.nameID], record.nameID, record.platformID, record.platEncID, record.langID)
    entry['internalFamily'] = family
    font.flavor = 'woff2'
    required = 'áàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ'
    assert all(ord(char) in font.getBestCmap() for char in required), entry['family']
    font.save(root / entry['font'])
    entry['servedSha256'] = hashlib.sha256((root / entry['font']).read_bytes()).hexdigest()
    entry['servedBytes'] = (root / entry['font']).stat().st_size
    print(entry['family'], entry['servedBytes'])
manifest['subset'] = {'format':'woff2','unicodes':'U+0000-017F,U+2000-206F,U+20AC,U+FFFD','tool':'fonttools==4.60.1; brotli==1.1.0','notes':'OFL copyright/license attribution retained; modified font family names changed to Contagem Local NN; pt-BR subset.'}
(root / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')
