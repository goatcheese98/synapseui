import { strict as assert } from 'node:assert'
import { mkdirSync } from 'node:fs'
import { chromium, webkit } from 'playwright'

const engine = process.env.DOCK_FONT_PROBE_ENGINE ?? 'webkit'
assert(['webkit', 'chromium'].includes(engine), 'Supported geometry probe engine')
const browser = await (engine === 'webkit' ? webkit : chromium).launch(engine === 'chromium' && process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
let releaseFonts = () => {}
const fontGate = new Promise<void>(resolve => { releaseFonts = resolve })
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  page.setDefaultTimeout(5000)
  await page.route('**/*.woff2', async route => { await fontGate; await route.continue() })
  await page.goto(`${process.env.FOUNDATIONS_BASE_URL ?? 'http://localhost:6006'}/story/src-stories-floatingdock-story-vue?variantId=src-stories-floatingdock-story-vue-0`, { waitUntil: 'domcontentloaded', timeout: 15000 })
  const dock = page.locator('main.dock-demo .floating-dock')
  await dock.getByRole('button', { name: 'Drag dock', exact: true }).waitFor({ state: 'visible' })
  await page.waitForFunction(() => [...document.fonts].some(face => face.status === 'loading'))
  const measure = () => dock.evaluate(el => ({ width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height,
    faces: [...document.fonts].map(face => ({ family: face.family, status: face.status })) }))
  const beforeFonts = await measure()
  releaseFonts()
  await page.evaluate(async () => {
    for (const family of ['Geist', 'Geist Mono']) {
      const faces = await document.fonts.load(`400 16px "${family}"`)
      if (!faces.length || faces.some(face => face.status !== 'loaded')) throw Error(`Missing actual font: ${family}`)
    }
    await document.fonts.ready
  })
  const afterFonts = await measure()
  const normalShadow = await dock.evaluate(el => getComputedStyle(el).boxShadow)
  await dock.hover()
  await page.waitForFunction(normal => getComputedStyle(document.querySelector('main.dock-demo .floating-dock')!).boxShadow !== normal, normalShadow)
  const afterHover = await measure()
  assert(Math.abs(afterHover.width - afterFonts.width) < 0.5, 'Hover preserves settled width')
  assert(Math.abs(afterHover.height - afterFonts.height) < 0.5, 'Hover preserves settled height')
  const out = process.env.BROWSER_ARTIFACT_DIR ?? 'test-results/foundations'
  mkdirSync(out, { recursive: true })
  await page.screenshot({ path: `${out}/dock-font-ready-${engine}.png` })
  console.log('DOCK_FONT_GEOMETRY', JSON.stringify({ engine, beforeFonts, afterFonts, afterHover }))
} finally {
  releaseFonts()
  await browser.close()
}
