# Retained semantic components and Histoire beta

The baseline for this follow-up is `480a904ac9b8782953744416c266abd54ca18dc6`. The package entry remains src/index.ts: SmartButton, UltraSmartButton and InterconnectedCard are retained source/barrel exports, not newly published package-root exports. No public export or minimum Vue peer is changed.

## Actual consumer and reproduction

The registered story is `System/Component Interconnectedness`, variant `Magic Auto-Adaptation`, at `/story/src-stories-experiments-componentinterconnectedness-story-vue?variantId=src-stories-experiments-componentinterconnectedness-story-vue-0`. Before the fix, this story misleadingly imported BaseButton under the SmartButton name; InterconnectedCard was real. The existing demo now imports the real SmartButton. Its manual examples explicitly disable adaptation, preserving their stated intent and existing content/grid. Long retained action labels wrap within their existing cards instead of clipping or overlapping another card; no new product layout/data is added.

A cloud reproduction using the real SmartButton (after correcting only the story import) and original styles found:

| State | Observed broken value | Existing intended token |
| --- | --- | --- |
| Primary-card child normal / hover background | transparent / transparent with white text | accent 500 `rgb(249 115 22)` / accent 600 `rgb(234 88 12)` |
| Primary card background / text / border | transparent / inherited `rgb(2 8 23)` / default `rgb(203 213 225)` | primary 50 `rgb(248 250 252)` / primary 900 `rgb(15 23 42)` / primary 200 `rgb(226 232 240)` |
| Focus ring | default blue `rgb(59 130 246 / 0.5)` | primary 500 `rgb(100 116 139)` |
| Disabled child | opacity 0.5 worked, but background stayed transparent with white text | retain disabled behavior and the normal semantic colors |

Interpolated `bg-[rgb(51 65 85)]` strings both split into multiple DOM class tokens and cannot be found by Tailwind source scanning. Static complete utility maps now use scanner-visible `rgb(...)` arbitrary values with underscores for spaces. The color definitions match the existing colorIntents palette; background/text/border and hover states are verified against those token values. The shared semantic focus utility now names a real static primary-500 ring rather than an undefined theme shade. No runtime utility interpolation, new palette or LUM theme change is introduced.

Card context previously captured initial prop values. createCardContext now accepts existing plain values or reactive getters; InterconnectedCard supplies getters. Live card variant/size changes now update the inherited child, while autoAdapt=false retains manual variant/size. Existing variantRelationships fallbacks are preserved, including primary buttons for success/error cards without explicit relationships; demo labels are not a new variant contract.

## Bounded browser gate and engineering comparison

`node scripts/browser-semantic-components.ts` runs against the actual registered story, then a browser-only fixture using the real components and the same CSS. The fixture mounts beneath the real Histoire story styling boundary (not the surrounding tool shell), and adds no utility classes, registered stories or public package entry. Its explicit default-border assertion also checks the existing light --border-default token instead of accidentally testing Tailwind shell preflight. It verifies 14 button variants in normal/hover/focus/disabled states (background, text, border and focus ring), 11 card variants and hover colors, interactive card motion, all 10 normal/icon sizes, loading, live inherited context, explicit manual override and retained label bounds. Cards have no disabled or focusable API; those states are checked on their actual child buttons, without inventing card behavior. Actual computed values are written to `test-results/semantic/computed-states.json`.

The hosted quality job runs this probe with a 120-second process bound inside its existing browser step and archives the computed values plus retained-story screenshot. Existing assertions, deadlines, retries and all 90 accepted comparison PNGs remain unchanged.

[Before](semantic-evidence/before-chromium154.png) and [after](semantic-evidence/after-chromium154.png) are supplemental cloud Chromium 154 engineering evidence, not Playwright 1.54.1 golden files. The implementation owner opened both actual images and explicitly compared the missing labels/fills, restored semantic colors and containment of existing action labels. An initial repaired capture exposed overflow of the existing long labels; the final capture and bounds assertion verify that correction. These new images are presented for engineering review, with no independent/human acceptance claimed. No new screenshot baseline is established or any of the reviewed 90 replaced. Paper approval remains unavailable.



### Enabled-label accessibility follow-up

The real computed probe exposed white-on-accent500 (2.803:1), warning500
(2.148:1), and success600 (3.296:1) failures at ordinary label sizes. Accent
and warning now use existing neutral900 text; success uses white on existing
success700/800. Outlined success and error use their existing 700 foreground
shades (error600 on error50 was only 4.415:1). No palette or public API changes.

The enabled normal/hover/focus matrix composites actual ancestor backgrounds,
checks all 14 variants on white and existing neutral100 surfaces, and requires
4.5:1. Disabled controls retain their tested disabled attribute, 0.5 opacity and
pointer exemption; their opacity is not misrepresented as accessible enabled text.
Cloud Chromium 154 measured accent 6.369/5.015, warning 8.313/5.604, success
5.016/7.130 (normal/hover). The lowest outlined success result is 4.578 on the
neutral100 backdrop. Pinned hosted results remain required.

Histoire beta also changed its shell font inheritance to Noto Sans Display.
The story-only stylesheet restores the retained consumer's original Tailwind
font stack, leaving the LUM Geist scope and published consumer CSS untouched.
Same-cloud-browser alpha/beta computed Button styles and actual CDP NotoSans-Regular
glyph identity, and the Main Variants supplemental PNG bytes, match after this
repair. All 90 engineering-approved goldens remain unchanged.

The font observer now owns response-body rejection immediately and detaches at
FontFace readiness (also on failure/close). It logs URL/status/cancellation/redirect
metadata for unreadable responses, fails required Geist body errors, and retains
original byte hashes, wOF2 signatures, registered loaded faces and actual rendered
PostScript glyph assertions. Exact pinned request diagnosis is pending the hosted
run; the previous log omitted the failing request URL, so its cause is not assumed.
