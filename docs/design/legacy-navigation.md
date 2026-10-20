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
| WebKit secondary-button control delivery and Mobile Safari drag shadow | Unresolved at the recorded baseline. Event/CSS diagnostics and an independent focused browser matrix are added; Escape alone was not a proved fix. No speculative component change. |

All five projects stay independent with zero retries, unchanged 15-second tests / 5-second assertions and a 240-second suite limit. All six Button, seven drag and eight dock behavior cases remain. Three fresh-start Chromium jobs also retain all 21 cases, with a separate Firefox/WebKit/Mobile Safari dock matrix.

## Reproducible image review

Browser workflows use `mcr.microsoft.com/playwright:v1.54.1-noble@sha256:307ace13c8ba4349f790f4dfbc6eaa9fcafdeb29c218ff36129c7cacebb1e35f`, matching the frozen Playwright 1.54.1 dependency. Bundled browsers and OS fonts are not replaced with an apt install. Managed-cloud pulls of that image were denied at layer download; hosted CI is the pinned-platform execution path.

`VISUAL_CANDIDATES=1` captures review-only PNGs under `test-results/candidates`, with every functional assertion retained. This workflow is labeled capture, not baseline approval or comparison success. Candidate images and provenance are retained as ordinary workflow artifacts with read-only repository permissions. A proposed blob-upload job was rejected by automatic approval review because PR-controlled `contents:write` exceeds the narrowly required upload capability; that capability has been removed. Exact pinned-platform artifact bytes must be accessible for image inspection before any baseline additions. Ordinary legacy tests continue to fail for absent/mismatched baselines.

Cloud Chromium 154 capture verification passed the 42 navigation / visual / working cases across desktop and mobile; these are not the pinned Chromium 139 goldens. Inspection of dark, loading, focus, variants, sizes, tablet and mobile images caught and corrected the nested-scroll screenshot problem. Original Paper canvas PNGs and human design approval remain unavailable; this engineering review does not imply that approval.
