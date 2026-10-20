import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { observeFonts } from './font-probe.ts'

// A redirect response has no readable CDP body. Exercise that lifecycle with
// an actual browser, then prove invalid required-font evidence still rejects.
const base = process.env.FOUNDATIONS_BASE_URL ?? 'http://localhost:6006'
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
try {
  const page = await browser.newPage()
  await page.route('**/Geist-Variable.woff2', route => route.fulfill({ status: 302, headers: { location: `${base}/font-probe-redirect.woff2` } }))
  await page.route('**/font-probe-redirect.woff2', async route => route.fulfill({ status: 200, contentType: 'font/woff2', body: await readFile('src/assets/fonts/Geist-Variable.woff2') }))
  const verify = observeFonts(page)
  await page.goto(`${base}/story/src-stories-lumfoundations-story-vue?variantId=src-stories-lumfoundations-story-vue-0`, { waitUntil:'networkidle' })
  await page.locator('main[data-synapse-theme="light"]').waitFor()
  await assert.rejects(verify('main h1','main pre code'), /Required Geist response body unavailable|NetworkError/)
  await page.close()
  console.log('Font observation settles redirected required-font failure, rejects invalid evidence')
} finally { await browser.close() }
