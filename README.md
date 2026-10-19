# Synapse UI

Vue 3 / TypeScript component library with Histoire stories. No package publication is performed by this branch.

Use Node 24 and the pinned `pnpm@10.13.1` through Corepack:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm run test:unit
corepack pnpm run typecheck
corepack pnpm run lint
corepack pnpm run build
node scripts/verify-package.ts
corepack pnpm run story:build
```

`build` emits ESM, CommonJS, CSS and public declarations into `dist/`. `story:build` independently emits static documentation into `.histoire/dist/`; story success does not establish package correctness. `verify-package.ts` packs without publishing, installs into a new temporary consumer, checks declarations/import/require/styles and builds a Vite consumer. It needs dependency network access unless `PACKAGE_OFFLINE=1` and the writable pnpm cache is populated. CommonJS tool configurations retain their content under `.cjs` names to coexist with ESM package output.

```ts
import { Button, Input } from 'synapseui'
import 'synapseui/style.css'
import 'synapseui/lum.css'
```

Apply `data-synapse-theme="light"`, `"dark"` or `"system"` on a host element to opt in to LUM styling. Theme persistence and font delivery remain host responsibilities. See [design adoption](docs/design/lum-foundations.md).

Start `corepack pnpm dev` in one cloud terminal. Run the focused real browser checks from another:

```sh
# Use an installed cloud Chromium, or omit CHROMIUM_PATH for Playwright's browser.
CHROMIUM_PATH=/usr/bin/chromium node scripts/browser-foundations.ts
```

The browser harness uses `http://localhost:6006` (Histoire can bind IPv6), checks real keyboard/input/clipboard/loading behavior, contrast and overflow, and writes screenshots/results to ignored `test-results/foundations/`. `CHROMIUM_PATH` selects only a cloud executable. No local browser/Paper is needed. The legacy E2E suites remain available with `test:e2e`; they are not accidentally collected by Vitest.

`typecheck` covers the complete public library graph, new foundations story and tooling under strict TypeScript. `typecheck:all` retains the repository-wide check with pre-existing experimental/story errors. `lint` is read-only and scoped to the modified primitives/story. See [verification](docs/design/verification.md) for exact baseline results and limits. No claim of full-repository migration or full legacy E2E success is made.

Generated dependencies, bundles, logs, reports and recordings are ignored. The lockfile and all handwritten source remain versioned. See [credential follow-up](docs/SECURITY.md) for required owner action concerning a removed embedded value. No deployment, release, secret provisioning or history rewrite is performed.

The hosted legacy Playwright job is an explicitly failing diagnostic until its old fixtures/baselines are repaired: no retries, 15-second tests, three-failure cutoff and four-minute CI global timeout. All 210 cases across five projects remain registered; stopped cases are reported as not run. The foundations workflow separately runs the focused real Chromium behavior harness and uploads its evidence. See [hosted-check audit](docs/design/hosted-check-audit.md).
