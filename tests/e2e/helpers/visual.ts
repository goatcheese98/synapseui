import { expect, type Locator, type Page, type TestInfo } from '@playwright/test'
import { appendFile, mkdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { readyFonts } from './histoire'

/** Capture mode writes review candidates only. Default mode always compares approved baselines. */
export async function visual(target: Locator | Page, name: string, info: TestInfo, requireFonts = true) {
  const page = 'page' in target ? target.page() : target
  if (requireFonts) await readyFonts(page)
  else await page.evaluate(() => document.fonts.ready.then(() => undefined))
  const options = { animations: 'disabled' as const, caret: 'hide' as const, scale: 'css' as const }
  if (process.env.VISUAL_CANDIDATES === '1') {
    const directory = join('test-results', 'candidates', info.project.name)
    await mkdir(directory, { recursive: true })
    const file = join(directory, name)
    await target.screenshot({ ...options, path: file })
    await appendFile(join(directory, 'manifest.jsonl'), JSON.stringify({ name, file, baseline: relative(process.cwd(), info.snapshotPath(name)), project: info.project.name, title: info.title, platform: process.platform }) + '\n')
    return
  }
  await expect.soft(target).toHaveScreenshot(name, options)
}
