# Legacy navigation and visual baseline repair

The complete diagnostic at `90e2b3459f9369a758b0d9085c010627ca8067ea` ran all 210 cases without skips. Chromium and Firefox passed 27/42; Mobile Chrome and WebKit passed 26/42; Mobile Safari passed 24/42. [Every result and failure reason](hosted-navigation-baseline.json) is retained independently of later fixes. The hosted run is https://github.com/goatcheese98/synapseui/actions/runs/39383501910.

| Debt | Repair / disposition |
| --- | --- |
| Ambiguous `getByText('Components')` also matches Composite Components | Native navigation uses an exact folder button and the registered story URL; component visual cases open real named variants directly and wait for the Vue mount. |
| Absent Simple Demo and conditional no-op interaction | Exercise the registered LUM foundations story, real input feedback, action count and loading/reset behavior. No replacement placeholder story. |
| Mobile expects an unavailable sidebar | Open Histoire's actual story and variant selection overlays at its 640px breakpoint, select real stories, assert the overlays close and controls work without overflow. |
| Fake dark body styling / conditional loading and focus | Use actual scoped dark tokens and gold, enabled/disabled plus aria-busy loading states, and actual keyboard focus rings. All functional assertions run independently of visual comparison failures. |
| Missing Linux goldens | Explicit `updateSnapshots: 'none'`; no automatic golden creation. Capture candidates separately, inspect exact bytes and component states, then add reviewed images only. |
| Mobile locator screenshot extends outside a nested scroll viewport | Capture the real mobile viewport, after checking content visibility and overflow, instead of a mostly blank full-height locator image. |
| WebKit secondary-button control delivery and Mobile Safari drag shadow | Pinned-image event logs at `fd97976b` show native contextmenu followed by no pointer-up or action click. The fixture suppresses that one browser menu while preserving real secondary input and control assertions. Mobile Safari feedback passed focused runs but failed intermittently in the full matrix; the matching-rule diagnostic below identifies the stalled active transition. Exact follow-up results remain required. |

All five projects stay independent with zero retries, unchanged 15-second tests / 5-second assertions and a 240-second suite limit. All six Button, seven drag and eight dock behavior cases remain. Three fresh-start Chromium jobs also retain all 21 cases, with a separate Firefox/WebKit/Mobile Safari dock matrix.

## Reproducible image review

Browser workflows use `mcr.microsoft.com/playwright:v1.54.1-noble@sha256:307ace13c8ba4349f790f4dfbc6eaa9fcafdeb29c218ff36129c7cacebb1e35f`, matching the frozen Playwright 1.54.1 dependency. Bundled browsers and OS fonts are not replaced with an apt install. Managed-cloud pulls of that image were denied at layer download; hosted CI is the pinned-platform execution path.

`VISUAL_CANDIDATES=1` captures review-only PNGs under `test-results/candidates`, with every functional assertion retained. This workflow is labeled capture, not baseline approval or comparison success. Candidate images and provenance are retained as ordinary workflow artifacts with read-only repository permissions. A proposed blob-upload job was rejected by automatic approval review because PR-controlled `contents:write` exceeds the narrowly required upload capability; that capability has been removed. Exact pinned-platform artifact bytes must be accessible for image inspection before any baseline additions. Ordinary legacy tests continue to fail for absent/mismatched baselines.

Cloud Chromium 154 capture verification passed the 42 navigation / visual / working cases across desktop and mobile; these are not the pinned Chromium 139 goldens. Inspection of dark, loading, focus, variants, sizes, tablet and mobile images caught and corrected the nested-scroll screenshot problem. Original Paper canvas PNGs and human design approval remain unavailable; this engineering review does not imply that approval.

## Pinned-container recovery

At `fd97976b`, Firefox could not launch because the runner assigned `/github/home` to a user different from the container process. All Firefox failures were launch failures, not application regressions. The workflows now match only that ephemeral directory's ownership to the running UID/GID; they do not repurpose HOME, disable browser checks, reinstall system fonts or change deadlines.

WebKit and Mobile Safari each passed 14/15 focused dock cases. The failed secondary-button case recorded only `pointerdown` (button 2) and `contextmenu`; no pointer-up or later action click reached the DOM, so Escape was ineffective. A one-event fixture listener prevents only the native context menu before the real right-click. Application handlers and assertions are unchanged.

Pinned candidate artifacts at `fd97976b` passed all 19 capture/functional cases in Chromium, Mobile Chrome, WebKit and Mobile Safari. Firefox capture was blocked by the ownership launch error described above. The connector can export the ZIP, but the managed-cloud proxy rejects its File Service download host with `Tunnel connection failed: 403 Forbidden`. No pinned image bytes have been inspected or accepted. This read-access limitation, together with unavailable original Paper PNGs / human design approval, must remain explicit; artifact capture success is not visual comparison success.

The same source passed 89 unit tests, scoped type/lint/build/package checks, 37-story / 158-variant build, the real loaded-font/glyph/resource probe, responsive foundations and real touch/second-contact/cancel dock probes in cloud. Three additional fresh cloud Histoire processes each passed all 21 Button/drag/dock cases. Desktop plus mobile full functional candidate mode passed 84/84; normal visual comparison remains red for missing goldens.

## Captured-pointer feedback recovery

The full five-project run at `9f7ab1db14cb2e7771d1245f5684ac1424c55d06` completed all 210 cases without skips. Chromium / Firefox / WebKit / Mobile Chrome each passed 29 and failed 13 only for absent Linux images. Mobile Safari passed 28 and failed those same 13 plus the drag-feedback case, despite its independent 15/15 focused pass. [Full diagnostic](https://github.com/goatcheese98/synapseui/actions/runs/39387015895) retains every result.

Mobile Safari's failed case recorded `data-dragging=true`, the active class, a matching scoped dragging rule with the intended 2px shadow, but the old shadow after five seconds and an active `box-shadow 0.2s` transition. This establishes a captured-press transition problem rather than missing style registration or an inactive fixture. The component now disables interpolation only while actively dragging, so its state feedback is immediate; normal hover transitions resume on release. No assertion, browser, retry or deadline is removed. The exact follow-up head must pass the full matrix before this is called resolved.

The focused workflow also runs the complete fifteen-case Mobile Safari dock group in three independent fresh Histoire processes, alongside Firefox and desktop WebKit, to expose the intermittent captured-press behavior without retries. Each feedback case attaches a real active-state viewport screenshot after the shadow assertion and before release; capture neither changes animation settings nor creates a baseline.

## Geometry readiness investigation

At `8ffe7dbc`, the full WebKit run exposed a 276px-to-273px height change in the hover case; its focused run had passed. All other functional cases passed across the five full projects, including Safari drag feedback. The dock fixture waited for a visible handle but did not wait for the actual font faces before recording geometry. Geometry cases now share the existing strict loaded-face readiness helper, retaining the original width/height equality assertions. A controlled font-delivery probe holds WOFF2 responses, records fallback and loaded-face dimensions, then verifies hover preserves the loaded geometry. It runs in hosted WebKit, with a Chromium mode for cloud verification; a Chromium probe alone showed no font-height change and does not establish WebKit's cause. The exact hosted probe output is required before attributing the WebKit delta to font swap.
