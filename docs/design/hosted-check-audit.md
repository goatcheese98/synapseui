# Hosted Playwright audit

Audited original PR head `0959f17aa5387946fdf7a573a07c032256a6c08c` after the coordinator reported [run 39336101744 / job 118345861963](https://github.com/goatcheese98/synapseui/actions/runs/39336101744/job/118345861963) still executing Playwright. GitHub step summaries confirm install/browser install/unit tests succeeded and the E2E step remained in progress. Downloading unfinished job logs returned GitHub `404 BlobNotFound`; no hosted failure lines were available. The separate foundations quality run 39336101754 completed successfully. This audit does not claim that the legacy hosted job passed or that it was inert rather than progressing through repeated failures.

The old configuration ran 210 cases across five browser/device projects, one CI worker, two retries per failure, and a 60-minute job budget. Repeated missing-fixture waits can consume that budget. Histoire's actual dev task and localhost:6006 were already correct; a wrong port was not the reproduced cause.

Cloud Chromium reproduction at the original head, bounded to three representative cases, exited 1:

| Test | Concrete failure |
| --- | --- |
| Button Component / should display all button variants | Broad first-match selector found the hidden `histoire-generic-mount-story`, not the visible preview; later assertions also named nonexistent Default/Destructive examples |
| Visual Regression Tests / Button Component Visuals / should match button variants visual snapshot | `getByText('Components')` matched both Components and Composite Components, causing a strict-mode error |
| Synapse UI E2E Tests / should load Histoire successfully | Expected `/Histoire/i` title after the intentional Synapse UI branding change |

Baseline checks used the retained original source copy at `a8d93f2211f1ff38d1827bf022ed68bcbc4f31aa` on a separate cloud Histoire port. Its selected test-file hashes match Git's baseline objects. The hidden-mount and ambiguous Components failures reproduce there too. Baseline `should take visual snapshots for regression testing` also fails because `histoire-homepage-chromium-linux.png` does not exist, then waits for a nonexistent Simple Demo story. The repository's checked-in homepage snapshots are Darwin-only. No Linux baselines were accepted, copied into this branch or updated. Baseline `should allow dragging the floating dock` likewise times out on absent Patterns navigation. No product features were invented to satisfy those stale fixtures.

Changes are isolated in a follow-up test/config commit; generated-file deletions and credential sanitization are untouched:

- The same six Button cases now open an actual public story explicitly, target visible native buttons and existing names, compare real sizes, and assert loading, keyboard activation counts, focus and touch behavior. Their prior arbitrary-first-button fallbacks are gone. The homepage case checks Synapse branding, desktop or native mobile story navigation, and a real foundations route.
- CI legacy diagnostics have no retries, 15-second per-test / 5-second assertion timeouts, a three-failure cutoff and 240-second global timeout. All five projects and all 210 cases remain registered. The job budget is 10 minutes, HTML reports never open an interactive server, results/attachments are uploaded on failure, and no continue-on-error or test skips were added. Tests stopped by the cutoff remain not run, not passed.
- Both workflows use Node 24, Corepack and the pinned frozen pnpm installation. The web-server command explicitly runs Histoire on port 6006. Optional CHROMIUM_PATH selects only Chromium/mobile Chromium for cloud system-browser verification.
- The meaningful foundations gate now runs the existing real Chromium behavior harness after its package/type/build checks, with bounded readiness and a 180-second harness deadline, and uploads screenshots/results. The exact shell block was exercised in cloud with installed system Chromium and exited 0; it covers 320/768/1440 light/dark, system preferences, native interaction, contrast, overflow and reduced motion.

Validation: scoped strict typecheck (now including Playwright config and both edited E2E files), 78 unit tests, read-only primitive/story lint, read-only E2E/config lint and YAML parsing exit 0. The corrected six Button cases plus homepage case pass on desktop Chromium and mobile Chromium: **14 passed, 0 skipped**, exit 0. The existing full five-project test listing remains **210 tests in six files**, exit 0. A complete legacy success is not claimed; Firefox/WebKit runtime checks were not performed in the cloud image.

The full Chromium diagnostic intentionally remains exit 1. After six passing Button cases it reaches these unchanged legacy failures, all timing out in beforeEach while waiting for `getByText('Patterns')`:

1. Drag and Drop Functionality / should allow dragging the floating dock
2. Drag and Drop Functionality / should show visual feedback during drag
3. Drag and Drop Functionality / should handle drag boundaries and constraints

The bounded run reports **6 passed, 3 failed, 33 not run**. It stops before the other unchanged visual/Simple Demo/dock suites; they are not certified. A second diagnostic uses the final CI bounds and actual webServer command, selecting Chromium and disabling only video recording because this cloud image uses system Chromium rather than downloaded Playwright media binaries. The assertion logic, test/global deadlines, retries and failure limit are unchanged. The final run exits 1 in 72.92 seconds with the same six passes / three failures / 33 not run. Playwright also emits its failure-cutoff scheduler error; its JSON `skipped` counter includes those not-run cases, not newly added test.skip calls. See [machine-readable audit summary](hosted-check-audit.json) for exact outcomes. Diagnostic records remain in the task cloud workspace; hosted follow-up runs upload their own diagnostics.

Remaining work is a separate legacy fixture/platform-baseline refresh, with reviewed Linux screenshots and real dock stories if those workflows are still intended. This PR keeps their failures visible and bounded. No merge, deployment, release, blanket skip, snapshot acceptance or changes to the generated-file/credential commits occurred. An already-running old workflow does not inherit new timeout/concurrency settings retroactively.
