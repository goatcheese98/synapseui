import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const baseURL = process.env.FOUNDATIONS_BASE_URL ?? 'http://localhost:6006'
const out = process.env.BROWSER_ARTIFACT_DIR ?? 'test-results/foundations'
await mkdir(out, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const results: unknown[] = []
try {
  for (const width of [320, 768, 1440]) {
    for (const [index, theme] of ['light', 'dark'].entries()) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
      const errors: string[] = []
      page.on('pageerror', error => errors.push(error.message))
      await page.goto(`${baseURL}/story/src-stories-floatingdock-story-vue?variantId=src-stories-floatingdock-story-vue-${index}`)
      const main = page.locator(`main.dock-demo[data-synapse-theme='${theme}']`)
      await main.getByRole('button', { name: 'Drag dock', exact: true }).waitFor({ state: 'visible' })
      await page.evaluate(() => document.fonts.ready)
      assert(await main.evaluate(el => el.scrollWidth <= el.clientWidth), 'Dock demo overflows')
      await main.screenshot({ path: `${out}/dock-${width}-${theme}.png` })
      assert.deepEqual(errors, [], 'Dock story has a browser error')
      results.push({ width, theme, overflow: false, errors })
      await page.close()
    }
  }
  const context = await browser.newContext({ viewport: { width: 390, height: 1000 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto(`${baseURL}/story/src-stories-floatingdock-story-vue?variantId=src-stories-floatingdock-story-vue-0`)
  const main = page.locator('main.dock-demo[data-synapse-theme="light"]')
  const dock = main.locator('.floating-dock')
  const handle = main.getByRole('button', { name: 'Drag dock', exact: true })
  await handle.waitFor({ state: 'visible' })
  const initial = (await dock.boundingBox())!
  const h = (await handle.boundingBox())!
  const x = h.x + h.width / 2, y = h.y + h.height / 2
  const cdp = await context.newCDPSession(page)
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] })
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + 20, y: y + 25, id: 1 }] })
  const moved = (await dock.boundingBox())!
  assert(moved.x - initial.x > 10 && moved.y - initial.y > 10, 'Real touch drag did not move the dock')
  assert.equal(await dock.getAttribute('data-dragging'), 'true')
  // Add a second contact: it must not steal the primary pointer's drag state.
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x + 20, y: y + 25, id: 1 }, { x: x + 40, y: y + 35, id: 2 }] })
  assert.equal(await dock.getAttribute('data-dragging'), 'true')
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + 20, y: y + 25, id: 1 }, { x: x + 60, y: y + 45, id: 2 }] })
  const afterSecond = (await dock.boundingBox())!
  assert(Math.abs(afterSecond.x - moved.x) < 1 && Math.abs(afterSecond.y - moved.y) < 1, `Second contact changed primary geometry: ${JSON.stringify({ moved, afterSecond })}`)
  await main.screenshot({ path: `${out}/dock-touch-active.png` })
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] })
  assert.equal(await dock.getAttribute('data-dragging'), 'false')
  await main.getByRole('button', { name: 'Run action' }).tap()
  assert.equal(await main.getByText('Actions: 1', { exact: true }).count(), 1)
  results.push({ realTouch: true, additionalContactIgnored: true, cancellation: true, controlAfterCancel: true, displacement: { x: moved.x - initial.x, y: moved.y - initial.y } })
  await context.close()
  await writeFile(`${out}/dock-results.json`, JSON.stringify(results, null, 2))
  console.log('Dock responsive screenshots, real touch movement, second contact, cancellation and controls verified')
} finally { await browser.close() }
