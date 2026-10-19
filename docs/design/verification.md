# Cloud verification — 2026-10-19

Restored source and GitHub default `main` both started at `a8d93f2211f1ff38d1827bf022ed68bcbc4f31aa`, with clean Git status. Existing onboarding source identity/copy helpers were inspected; all execution stayed in cloud, scoped to synapseui. The other repositories were untouched. New runtimes live outside the checkout under `/workspace/work/synapseui/`. Node 24.19.0, pnpm 10.13.1, Vue 3.5.18, Vite 6.3.5, Histoire 1.0.0-alpha.2; browser Chromium 154.0.8037.57 from the cloud image.

Baseline reproduced in a fresh external source copy installed with `corepack pnpm install --frozen-lockfile` (exit 0): `corepack pnpm exec vitest run --maxWorkers=2` exited 1 (obsolete Button assumptions and Playwright suites collected as unit tests); `corepack pnpm exec vue-tsc --noEmit` exited 2; `corepack pnpm run build` exited 2 during declarations; `corepack pnpm exec eslint .` exited 0. Historical E2E and full repository typing failures remain separate from the new focused checks.

Final tree was copied into a second new external directory with no dependency/build folders, installed from the populated writable cache using `corepack pnpm install --frozen-lockfile --offline` (exit 0), then checked:

| Command | Exit | Evidence |
| --- | --- | --- |
| `corepack pnpm run test:unit` | 0 | 78 tests, 5 files; original dock/store suites and existing Button tests retained, obsolete assertions corrected; new focused Button/Input cases |
| `corepack pnpm run typecheck` | 0 | strict public library graph, new foundations story, TypeScript verification tooling |
| `corepack pnpm run lint` | 0 | read-only scoped lint, zero warnings/errors |
| `corepack pnpm run build` | 0 | ESM, CommonJS, CSS, declarations; no source CSS path left in declarations |
| `PACKAGE_OFFLINE=1 node scripts/verify-package.ts` | 0 | new tarball consumer install, strict declarations, real import/require, both CSS exports, independent Vite consumer build |
| `corepack pnpm run story:build` | 0 | static `.histoire/dist`, 36 stories / 156 variants |
| `CHROMIUM_PATH=/usr/bin/chromium node scripts/browser-foundations.ts` | 0 | six viewport/theme scenarios plus light/dark system preferences; actual interaction assertions |
| `git diff --check` | 0 | no whitespace errors |

Browser assertions cover Enter/Space each activating once, actual focus ring, native disabled/busy states, stable loading width/height, input editing/error/disabled associations, clipboard rejection and success, reduced-motion spinner, no rendered content wider than its viewport and no uncaught page errors. The content widths are 240, 326 and 681px within Histoire's native panels at 320, 768 and 1440px respectively; narrow middle-width panels wrap the examples without horizontal clipping. Tested text/primary/outline/ghost contrast minimums are 5.68:1 light and 6.41:1 dark. This does not certify every legacy/status variant or browser. Unit tests cover canceled custom-link/asChild navigation and focus surviving a variant change. [Machine-readable results](browser-results.json).

Screenshots were visually inspected after behavior assertions. The top-of-story views show native Histoire chrome plus the LUM content; input views show the lower form and clipboard fallback area. These are browser evidence, not the unavailable original Paper PNG.

- [320 light](screens/foundations-320-light.png), [320 dark](screens/foundations-320-dark.png)
- [768 light](screens/foundations-768-light.png), [768 dark](screens/foundations-768-dark.png)
- [1440 light](screens/foundations-1440-light.png), [1440 dark](screens/foundations-1440-dark.png)
- [320 inputs](screens/inputs-320-light.png), [1440 dark inputs](screens/inputs-1440-dark.png)

Limits: `typecheck:all` still includes pre-existing unrelated experimental/story errors; the new command explicitly scopes its coverage. The full legacy Playwright suite was not certified. Fonts use Geist/Mono aliases with system fallbacks; actual Geist webfonts are host-supplied. Native Histoire controls/search/error handling are retained, not independently reimplemented or fully certified. No persistence service, dialog/tooltip redesign, Cloudflare deployment, provider call, package publication, release, merge or history rewrite occurred. Static docs build is verified; no claim of a deployed site is made. Credential revocation/history review remains the owner's responsibility. The Paper candidate is not user-approved and the original candidate PNG was not supplied.

Playwright browser download failed with explicit cloud-policy 403 on its CDN; recovery used the already-installed cloud Chromium. Initial network-less sandbox installation could not connect to the configured proxy; the allowed network execution path succeeded. Cloud gh authentication failed; publication uses the GitHub connector and checks complete Git tree hashes, preserving the exact tested tree. The first MCP example upload was automatically rejected for personal metadata; machine paths/profiles were removed before retrying. No rejected payload was bypassed.

Review separated generated-file removals from handwritten changes. Review covered public API compatibility, native/linked disabled behavior, attribute forwarding, timer cleanup, reduced motion, package filenames/dependency placement/declaration coverage, token scope, mobile overflow, credential sanitization and bounded CI. The workflow is added for the proven install/unit/type/lint/package/docs commands; a completed GitHub Actions run is separate from cloud verification.
