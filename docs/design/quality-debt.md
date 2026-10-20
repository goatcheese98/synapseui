# Full-source and locked-dependency follow-up

This slice follows the engineering-reviewed Linux baselines at `31555226e245dd816cd390cab9f8436ee7b24c32` on draft PR #1. No Paper canvas or design approval is implied. The unchanged full five-project suite passed there (42 tests per project). The 90 reviewed PNG paths, exact Git blob hashes, capture head, project/case mapping and archive checksums are in [reviewed-linux-baselines.json](reviewed-linux-baselines.json). They remain the comparison inputs for this slice.

## Inventory and compatible dependency changes

The complete baseline audit at `042749a2d9699b740439d07fe3598e1166c78938` found 97 advisories: 4 critical, 53 high, 35 moderate and 5 low. Production classification contained 16; development contained 96 (these overlap). The new lock has 8: 3 high and 5 moderate; production has 2, development 8. Audit exit status remains nonzero and is not called a passing security gate. [dependency-audit.json](dependency-audit.json) records exact advisory IDs, paths, vulnerable and fixed ranges, before/after counts, every override's source advisory, and the lock SHA-256.

Vue moves from 3.5.18 to 3.5.44, Vite from 6.3.5 to 6.4.4, and internal Vitest from 3.2.4 to 4.1.12. The public Vue peer remains `^3.5.18`; exports and native Vue behavior remain intact. Vitest's development-only major upgrade removes the vulnerable runner/mocker/tinypool path on the existing Node 24 platform; all existing 89 units still run. Transitive fixes stay on their existing major lines (and 0.16 for @humanfs/node), with explicit selectors for vulnerable versions. There is no forced Vite 6 injection into Histoire's Vite 5 dependency, framework migration, audit ignore or automatic audit fix.

All 685 locked name/version entries (612 names), including 90 optional snapshots and 87 platform-constrained versions, were independently submitted to npm's bulk advisory endpoint and matched against its returned semver ranges. This returned the same eight findings. Other-platform binaries were scanned by version but not executed. This covers the lock rather than assuming the Linux installed tree or pnpm's zero dev/optional metadata represents every platform. A database scan is not a source security audit.

Remaining actionable upstream paths:

| Dependency / advisory | Retained path and disposition |
| --- | --- |
| braces 3.0.3 / GHSA-vfj7-8cjw-p6xm (high) | Histoire's globby/micromatch and production tailwind-variants → Tailwind 3 scanner/chokidar. No patched version is reported. Track upstream replacement; do not feed untrusted patterns to this parser. |
| postcss-selector-parser 6.1.5 / GHSA-rj75-hqrm-r3gf (moderate) | Production Tailwind 3 and development eslint-plugin-vue. Fix requires 7.1.6+, a different major; do not force that parser contract into both parents. |
| Vite 5.4.21 / GHSA-fx2h-pf6j-xcff (high), GHSA-4w7w-66w2-5vf9 and GHSA-v6wh-96g9-6wx3 (moderate) | Histoire → vite-node → Vite 5. Upstream needs a compatible vite-node/Vite upgrade; supported top-level Vite 6 is fixed. |
| esbuild 0.21.5 / GHSA-67mh-4wv8-2f99 (moderate) | Same Histoire Vite 5 path. Fixed in 0.25+, a potentially incompatible 0.x minor. Development servers stay on ephemeral test infrastructure; no production release is part of this work. |
| sprintf-js 1.0.3 / GHSA-hp3w-g68c-fv3c (moderate) | Histoire → gray-matter → js-yaml 3 → argparse. No patched sprintf-js version is reported; parent replacement is needed. |
| Playwright 1.54.1 / GHSA-7mvr-c777-76hp (high) | Browser installer for Chrome/Edge on macOS. Retain the reviewed 1.54.1 Linux image and pin both test packages exactly; CI uses bundled Linux browsers, with no macOS installer invocation. A future browser/platform upgrade needs its own inspected visual review. |

Reproduce with the packageManager-pinned `corepack pnpm install --frozen-lockfile`, followed by `corepack pnpm audit --json`, `--prod --json`, and `--dev --json`. Do not treat their expected nonzero advisory exit status as a test failure to suppress.

## Histoire collection lifecycle

Histoire 1.0.0-alpha.2's `createDomEnv().destroy()` deleted window globals without closing its real JSDOM window. GSAP retained the bound requestAnimationFrame callback; its later ticker.sleep called the now-removed cancelAnimationFrame. A cloud negative control retaining that unclosed lifecycle reproduced the exact JSDOM 25.0.1 / GSAP 3.13.0 stack from the Firefox server log. This was separate from the missing-snapshot failures.

The versioned pnpm patch closes the real window before restoring globals, cancelling its actual animation frame and timer queues. It also preserves existing native Node atob/btoa: JSDOM delegates decoding to those functions, so installing its wrappers over them creates recursive decoding after the compatible Vite update. There is no product GSAP stub, no stderr interception, and no animation disabled in the browser. `node scripts/test-collection-animation.ts` exercises the actual patched Histoire environment and real GSAP: native decoding works, animation advances before destroy, queued frames and ticker progression stop after destroy, and native globals survive. It runs in hosted quality before the story build.

## Full source coverage

`typecheck:all` originally reported 177 errors in 53 files; it now passes without exclusions, suppression comments or disabled strict/unused settings. The existing package/foundations/tools typecheck also remains. Node configuration checking now includes histoire.config.ts, and the font probe has a portable explicit result type rather than exposing an internal Playwright protocol path through declaration inference.

Repairs follow retained component contracts: required SelectItem value and ToastAction altText props are explicitly declared/forwarded; component refs support real Vue instances and DOM elements; icon VNode inspection guards its union; missing tooltip icon/button imports point to existing components; controlled tooltip setters retain optional uncontrolled getters but emit booleans; legacy action aliases map to supported button variants/sizes; typed story controls preserve their supported values and native alert handlers. Card context injection no longer uses `any`, variant types exclude the optional function argument's undefined, existing semantic palette references receive their missing canonical shades, and the existing XS card comparison has real XS layouts. Unused imports/arguments and unused demo bookkeeping are removed without removing rendered examples. The inertia unit assertion still checks both release boundaries using the actual last GSAP call.

`lint:all` checks every source/script/e2e file using the repository's existing Vue recommended rules and TypeScript parser. It reports zero errors and 15 existing single-word story-name warnings; those identifiers remain stable. The required-prop/default inconsistency on WarpedText is corrected by making its defaulted text input optional. TypeScript files are parsed, but the configuration does not enable a full type-aware TypeScript ESLint ruleset; do not call this comprehensive semantic lint coverage. The strict compiler performs the type checks. No warnings are filtered or rules weakened.

The hosted quality job now runs both full-source commands as well as the scoped/package gates, 89 units, real collection regression, builds, actual font resource/FontFace/rendered-glyph probes, packaged-consumer checks and touch/dock browser probes. The independent five-project full comparisons, focused dock/drag tests and repeated cold starts remain unchanged: pinned platform, updateSnapshots none, zero retries/skips, original bounds and behavior assertions.

Remaining coverage limits: full-source compilation does not imply every retained experimental demo is behaviorally verified. Existing experimental validators include simplified no-op examples; dynamic legacy token-based Tailwind class generation needs dedicated rendered-style coverage beyond the published LUM foundations. This change does not claim to modernize every legacy experiment or establish Paper approval. Apparent credential removal/owner rotation and original canvas approval remain separate human tasks; no credential was transferred or provisioned here.
