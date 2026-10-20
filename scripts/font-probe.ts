import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import type { Page, Response } from 'playwright'

const expectedFonts = [
  { family: 'Geist', file: 'Geist-Variable.woff2', postScriptName: 'Geist-Regular', weight: '600', sample: 'Button' },
  { family: 'Geist Mono', file: 'GeistMono-Variable.woff2', postScriptName: 'GeistMono-Regular', weight: '400', sample: '<Button variant="primary">' },
].map(font => ({
  ...font,
  sha256: createHash('sha256').update(readFileSync(`src/assets/fonts/${font.file}`)).digest('hex'),
}))
type FontResource = { path: string; origin: string; status: number; bytes: number; signature: string; sha256: string }

/** CDP family labels may include a backend suffix such as "(Fontations)".
 * PostScript identity comes from the font itself and is stable across those renderers.
 */
export function isExpectedWebFont(font: { postScriptName: string; isCustomFont: boolean; glyphCount: number }, postScriptName: string) {
  return font.isCustomFont && font.glyphCount > 0 && font.postScriptName === postScriptName
}

type FontObservation = {
  faces: { family: string; status: FontFaceLoadStatus; weight: string }[]
  resources: (Omit<FontResource, 'origin'> & { selfHosted: boolean })[]
  rendered: { selector: string; fonts: { familyName: string; postScriptName: string; isCustomFont: boolean; glyphCount: number }[] }[]
}

/** Attach before navigation, so a loaded local font cannot masquerade as a webfont. */
export function observeFonts(page: Page): (sansSelector: string, monoSelector: string) => Promise<FontObservation> {
  type Download = { resource: FontResource } | { error: string; path: string; status: number; failure: string | null; redirectedFrom: string | null }
  const downloads: Promise<Download>[] = []
  const onResponse = (response: Response) => {
    const url = new URL(response.url())
    if (!url.pathname.endsWith('.woff2')) return
    // Own rejection at creation time, including responses cancelled during Histoire
    // collection/navigation. Verification happens only after FontFace readiness.
    downloads.push(response.body().then(body => ({ resource: {
      path: url.pathname, origin: url.origin, status: response.status(), bytes: body.length,
      signature: body.subarray(0, 4).toString('ascii'), sha256: createHash('sha256').update(body).digest('hex'),
    } }), error => ({ error: String(error), path: url.pathname, status: response.status(),
      failure: response.request().failure()?.errorText ?? null,
      redirectedFrom: response.request().redirectedFrom()?.url() ?? null })))
  }
  page.on('response', onResponse)
  page.once('close', () => page.off('response', onResponse))
  return async (sansSelector: string, monoSelector: string) => {
    try {
      const faces = await page.evaluate(async fonts => {
        const family = (name: string) => name.replace(/["']/g, '')
        const registered = [...document.fonts].filter(face => fonts.some(font => font.family === family(face.family)))
        if (registered.length !== fonts.length) throw new Error('Missing registered Geist FontFace entries')
        const loaded = []
        for (const font of fonts) {
          const entries = await document.fonts.load(`${font.weight} 16px "${font.family}"`, font.sample)
          if (!entries.length || entries.some(face => face.status !== 'loaded' || family(face.family) !== font.family)) {
            throw new Error(`FontFace did not load: ${font.family}`)
          }
          loaded.push(...entries.map(face => ({ family: family(face.family), status: face.status, weight: face.weight })))
        }
        await document.fonts.ready
        return loaded
      }, expectedFonts.map(({ family, weight, sample }) => ({ family, weight, sample })))
      page.off('response', onResponse)
      const settled = await Promise.all(downloads)
      const failures = settled.filter(item => 'error' in item)
      // Preserve request diagnostics; Histoire also downloads shell fonts, which are
      // not evidence for Geist. Required font body failures remain hard failures.
      const requiredFailures = failures.filter(item => /Geist(?:Mono)?-Variable(?:-[^/]*)?\.woff2$/.test(item.path))
      assert.deepEqual(requiredFailures, [], 'Required Geist response body unavailable')
      const resources = settled.flatMap(item => 'resource' in item ? [item.resource] : [])
      for (const font of expectedFonts) {
        const resource = resources.find(item => item.sha256 === font.sha256)
        assert(resource, `Missing actual font response for ${font.family}`)
        assert.equal(resource.status, 200)
        assert.equal(resource.signature, 'wOF2')
        assert.equal(resource.origin, new URL(page.url()).origin, 'Fonts must be self-hosted')
      }
      // CDP reports the actual font used to shape these glyphs, not a CSS family list.
      const session = await page.context().newCDPSession(page)
      const rendered = []
      try {
        await session.send('DOM.enable')
        await session.send('CSS.enable')
        const { root } = await session.send('DOM.getDocument')
        for (const [index, selector] of [sansSelector, monoSelector].entries()) {
          const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector })
          assert(nodeId, `Missing font sample: ${selector}`)
          const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId })
          assert(fonts.some(font => isExpectedWebFont(font, expectedFonts[index].postScriptName)),
            `Glyphs are not rendered with ${expectedFonts[index].family}: ${JSON.stringify(fonts)}`)
          rendered.push({ selector, fonts })
        }
      } finally { await session.detach() }
      return { faces, resources: resources.filter(item => expectedFonts.some(font => font.sha256 === item.sha256)).map(({ path, status, bytes, signature, sha256 }) => ({ path, status, bytes, signature, sha256, selfHosted: true })), rendered }
    } finally {
      page.off('response', onResponse)
      const failures = (await Promise.all(downloads)).filter(item => 'error' in item)
      if (failures.length) console.log('FONT_RESPONSE_FAILURES', JSON.stringify(failures))
    }
  }
}
