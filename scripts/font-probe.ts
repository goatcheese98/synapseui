import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import type { Page } from 'playwright'

const expectedFonts = [
  { family: 'Geist', file: 'Geist-Variable.woff2', weight: '600', sample: 'Button' },
  { family: 'Geist Mono', file: 'GeistMono-Variable.woff2', weight: '400', sample: '<Button variant="primary">' },
].map(font => ({
  ...font,
  sha256: createHash('sha256').update(readFileSync(`src/assets/fonts/${font.file}`)).digest('hex'),
}))
type FontResource = { path: string; origin: string; status: number; bytes: number; signature: string; sha256: string }

/** Attach before navigation, so a loaded local font cannot masquerade as a webfont. */
export function observeFonts(page: Page) {
  const downloads: Promise<FontResource>[] = []
  page.on('response', response => {
    if (!new URL(response.url()).pathname.endsWith('.woff2')) return
    downloads.push((async () => {
      const body = await response.body()
      const url = new URL(response.url())
      return { path: url.pathname, origin: url.origin, status: response.status(), bytes: body.length,
        signature: body.subarray(0, 4).toString('ascii'), sha256: createHash('sha256').update(body).digest('hex') }
    })())
  })
  return async (sansSelector: string, monoSelector: string) => {
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
    const resources = await Promise.all(downloads)
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
        const expected = expectedFonts[index].family.replace(/\s/g, '')
        assert(fonts.some(font => font.isCustomFont && font.glyphCount > 0 && font.familyName.replace(/\s/g, '') === expected),
          `Glyphs are not rendered with ${expectedFonts[index].family}: ${JSON.stringify(fonts)}`)
        rendered.push({ selector, fonts })
      }
    } finally { await session.detach() }
    return { faces, resources: resources.filter(item => expectedFonts.some(font => font.sha256 === item.sha256)).map(({ path, status, bytes, signature, sha256 }) => ({ path, status, bytes, signature, sha256, selfHosted: true })), rendered }
  }
}
