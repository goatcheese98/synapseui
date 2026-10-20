# Supported Histoire beta migration

Histoire, @histoire/plugin-vue and @histoire/controls move together to 1.0.0-beta.1; its transitive app/shared/vendors packages stay in the same beta family. Beta requires Vite ^7.3, so Vite moves to 7.3.7 and @vitejs/plugin-vue to 6.0.10 through their supported contracts. Node 24 and development Vue 3.5.44 satisfy these tool peers. The library peer remains ^3.5.18 and the fresh package-consumer test still uses exactly Vue 3.5.18. No vite-node/esbuild override or browser-image change is used.

The actual collection inventory preserves all 37 story IDs/titles and 158 variant IDs/titles, recorded in [histoire-beta-inventory.json](histoire-beta-inventory.json). Cloud units, full/scoped types, library/story builds, fresh package consumers, real font/glyph probes, touch/dock behavior and the semantic matrix pass. Alpha and beta homepages captured on the same cloud Chromium 154 at 1280×720 were byte-identical (SHA-256 `fa40506a410a9811682c2cad92aec442acfac8c9ae92ea5aa7f8e90f6d548ac1`). This is supplemental compatibility evidence, not a substitute for the unchanged five-project pinned comparison suite.

Beta retains the upstream unclosed JSDOM lifecycle, so the narrowly versioned window-close/native-decoder patch is ported to beta. The real GSAP/Histoire teardown regression remains enabled and passes on its JSDOM 27 runtime. Logo paths use supported project-relative filesystem paths, preserving the existing SVG bytes and removing false filesystem warnings. Vite 5/esbuild advisory paths disappear. The remaining braces, sprintf-js, Tailwind 3 parser and pinned Playwright installer findings stay documented and nonzero; see dependency-audit.json. No publication, merge, deployment, credentials or infrastructure changes are part of this migration.


### Pinned compatibility follow-up

Pinned Firefox 140 does not implement native CSS `@scope`. Beta's distributed
`@histoire/app/dist/style.css` contains one scope wrapping its entire shell;
Firefox therefore ignored shell layout. At df1ce741 the dock main began at
(0,1036), workspace at (32,1249.4), and handle center at (202,1339.9) in a
1280×720 viewport. The pointer hit list was empty. Explicitly scrolling in
the boundary test made physical input work; this was not a drag-math failure.

An internal Vite pre-transform now lowers only that reviewed shell scope to
zero-specificity exclusion guards at the same preview boundary. It retains
keyframes, pseudo-element positioning, CSS specificity and the custom-controls
exception, and rejects unknown upstream scope parameters. It does not process
published styles or arbitrary consumer scopes. A focused regression parses all
570 actual upstream rules; all five browser navigation tests require a flex shell.
The drag helper reveals the real handle and measures fresh coordinates before
physical events; displacement, feedback, bounds and actions remain unchanged.

Beta also changes its root font selector from html to :scope, increasing its
specificity over the consumer's original Tailwind html preflight. The Histoire-only
setup now explicitly preserves the original system stack on :root and the story
canvas. It does not install a new product fallback or override published users
or the LUM Geist scope. CI compares exact 480a904 and current source in separate
checkouts on the same three pinned desktop engines, recording font family, weight,
size, line-height, synthesis, availability, geometry, stylesheet ownership and
Chromium glyph source, with supplemental screenshots. The accepted 90 comparison
images and comparison assertions are untouched; no intended differences are accepted.

Cold cloud logs also showed Vite optimizing Vue/reka-ui/tailwind-variants and
reloading the page during story collection. The supported optimizeDeps include
list now covers the actual retained source runtime imports, before first navigation.
No sleep, retry, timeout increase or assertion removal is used.

The repaired observer identified the previous pinned unreadable resources as
Google Noto Sans Display WOFF2 paths, HTTP 200, no request cancellation or redirect
reported. Required Geist resources were intact and all hash/FontFace/glyph checks
passed at df1ce741 (quality run 39402788909). The original log cannot establish
why CDP lost those response bodies or whether its cache was involved. Immediate
owned settling handles that failure normally without treating shell font responses
as Geist evidence. A real-browser redirected-required-font negative control
continues to reject invalid evidence without an unhandled promise rejection.


### Imported component CSS coverage (follow-up to 7464c173)

The official beta `dist/bundle-main.js` imports **both** `./style.css` and
`./bundled/app.css`; dev and static build consume that entry. The latter contains
15 additional scopes with the same root/preview boundary, covering 24 component
rules and one keyframe definition. It was not covered by the first allowlist.

A cloud reproduction using the 7464c173 runtime configuration observed zero
native scopes in the served shell CSS but one in the served component CSS
(Vite merged its 15 same-boundary source blocks). A fresh static build also
retained one native component scope in the stylesheet linked by index.html.
The linked file was `assets/style-DGI41zsJ.css`, SHA256
`ff1c1c7a7f4f4df0f88dad768804974e76de5b4289046dd0706f40b8a43ba5c6`.
These were consumed rules, not unused files; pinned Firefox 140 would ignore
the remaining scope. [Raw before trace and official source hashes](histoire-scope-evidence.json).

The adapter now allowlists exactly those two distribution paths and verifies
their reviewed source counts (1 shell + 15 component blocks). It rejects changed
boundaries/counts and leaves consumer files with the same basename untouched.
The focused source regression exercises all 594 actual style rules, 21
pseudo-element selectors and the actual component animation. It also exposed
and fixes newline formatting between an inserted guard and a leading
`::before`/`::after`, which could otherwise become a descendant combinator.

The hosted browser probe runs Chromium, Firefox and WebKit against **both**
the real dev app and the freshly emitted static app. It records served stylesheet
identities, linked static CSS hashes and remaining native-scope counts; checks
actual component tree margins and split-pane dragger width/offset; verifies
ordinary preview exclusion, the custom-controls exception and a nested ordinary
preview enclosing custom controls; exercises pseudo-elements; and reads the
actual component animation's keyframes. No story, public component or golden is
added. Results are archived under `test-results/histoire-scope/served-emitted.json`.

**Compatibility limit:** this is an ordinary-selector conversion for the known
Histoire beta rules, not a general CSS `@scope` polyfill. Selector specificity
and the tested boundary/custom-controls behavior are preserved, but general
**scope-proximity cascade tie-breaking is not reproduced**. Differently nested
scopes or competing rules relying on that tie-break require separate review;
this adapter must not be applied to arbitrary consumer CSS.
