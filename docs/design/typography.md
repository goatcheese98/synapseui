# Self-hosted LUM typography

The earlier typography implementation only named Geist/Geist Mono with fallbacks; it did not load the actual fonts. This follow-up supplies the fonts and supersedes that earlier limitation. The refreshed browser screenshots use the actual webfonts.

## Assets and license

The two unmodified variable WOFF2 files come from the official `geist@1.4.2` package, distributed by Vercel in collaboration with basement.studio. The downloaded package was checked against its published SHA-512 archive integrity. [Provenance and hashes](../../src/assets/fonts/provenance.json) record the pinned version, public source, file sizes and SHA-256 values. [SIL Open Font License 1.1](../../src/assets/fonts/OFL.txt), including the copyright notice, accompanies both the repository assets and installed package. The demo includes a same-origin license link, and its static build emits that license resource. The font license remains separate from the library's ISC license. Retain the font license when redistributing the assets.

| Font | File | Bytes | SHA-256 |
| --- | --- | --- | --- |
| Geist | Geist-Variable.woff2 | 58,512 | 46525b05bbf4527d263f8624ca7024c7d0dce3c64430267d30c31c6dd3821e4d |
| Geist Mono | GeistMono-Variable.woff2 | 58,092 | 3ef2c50dc1042ebfa89ca66bb6901e9dde5737970547c21b4de7a44dfb2ab948 |

Both faces cover normal weights 100–900. Only the two WOFF2 assets are vendored, about 114 KiB total; no font-service request or new package dependency is introduced. The CSS uses URL sources rather than local-font lookup, so verification does not depend on machine-installed fonts. `font-display: swap` preserves readable fallback text during loading/failure.

## Optional library consumption

```ts
import 'synapseui/style.css'
import 'synapseui/lum.css'
import 'synapseui/fonts.css' // optional registration of the bundled font faces
```

The library's core entry and styles do not import the font sheet. The package exports a standalone `fonts.css`, with relative font URLs and accompanying `dist/fonts/OFL.txt` and provenance. The sheet contains only two font-face declarations and comments; no body, root, element or theme rules override a consumer's typography. A consumer can omit it and supply its own fonts. Applying `data-synapse-theme="light|dark|system"` opts a host into the existing LUM font aliases; the host can also select the registered faces explicitly. Histoire imports the font sheet for the demo. Heading/body/button text uses Geist, and the code leaf explicitly selects Geist Mono rather than inheriting a generic monospace rule.

## Verification

The browser probe attaches before navigation and checks three independent layers:

1. Two actual registered FontFace entries, and nonempty results from loading Geist at weight 600 and Geist Mono at weight 400, both in the loaded state. It does not rely on `document.fonts.check`, which can succeed for an unregistered family via fallback.
2. Successful same-origin WOFF2 response bodies with `wOF2` signatures and SHA-256 hashes matching the vendored binaries.
3. Chromium's `CSS.getPlatformFontsForNode` on the heading and code leaf: Geist and Geist Mono respectively, `isCustomFont: true` and positive glyph counts. This proves the webfonts shape rendered text rather than merely appearing in a computed family list.

Cloud Chromium passes the existing interaction/contrast/overflow/reduced-motion harness plus these checks at 320, 768 and 1440px, in light and dark themes, against both Histoire dev and the built static Histoire site. Both system-theme scenarios also pass. The static license resource returns the actual OFL text. [Browser results](browser-results.json) contain the loaded faces, resource bytes/hashes and rendered-glyph evidence; [screenshots](screens/) were refreshed from the static build and visually inspected.

The separately installed package consumer is built twice. Without the optional import it emits no WOFF2 assets. With the import it emits exactly the original two font binaries; the fonts and license match the packaged files. Its real browser check proves loaded faces/resources/rendered glyphs too. A negative browser sample with named but unregistered Geist families is rejected by the probe. [Installed-package font evidence](packaged-fonts.json) records this rejection and the successful actual-font result. The package test also rejects element-style rules in the opt-in font sheet, protecting consumer style ownership.

All scoped commands exit 0: frozen lockfile install; strict library/story/tool typecheck; 78 unit tests; read-only primitive/story/tooling lint; library/declaration build; package import/require/type/style checks and both Vite consumer builds; installed-package browser font verification; Histoire static build; dev and static browser harnesses. The hosted foundations gate now also runs the installed-package browser font probe and uploads its evidence alongside demo screenshots. Browser verification uses Chromium; it does not certify every script, glyph or weight on every browser.

The legacy missing-Patterns diagnostic remains explicitly failing as described in the [hosted-check audit](hosted-check-audit.md). No legacy story recreation, Linux snapshot acceptance, generated-file deletion changes, credential changes, publication, merge or deployment is included in this font follow-up.
