import { expect, type Page } from '@playwright/test'

export const storyIds = { buttons: 'src-stories-button-story-vue', foundations: 'src-stories-lumfoundations-story-vue', dock: 'src-stories-floatingdock-story-vue' }
export async function openFoundations(page: Page, theme: 'light' | 'dark' = 'light') {
  await page.goto(`/story/${storyIds.foundations}?variantId=${storyIds.foundations}-${theme === 'dark' ? 1 : 0}`)
  const main = page.locator(`main.lum-foundations[data-synapse-theme="${theme}"]`)
  await main.waitFor({ state: 'visible' })
  await expect(main.getByRole('heading', { name: 'Button', exact: true })).toBeVisible()
  return main
}
export async function openDock(page: Page) {
  await page.goto(`/story/${storyIds.dock}?variantId=${storyIds.dock}-0`)
  const main = page.locator('main.dock-demo[data-synapse-theme="light"]')
  await main.getByRole('button', { name: 'Drag dock', exact: true }).waitFor({ state: 'visible' })
  await readyFonts(page)
  return main
}
export async function openButtonVariant(page: Page, title: 'Main Variants' | 'All Sizes') {
  const index = title === 'Main Variants' ? 1 : 4
  await page.goto(`/story/${storyIds.buttons}?variantId=${storyIds.buttons}-${index}`)
  const item = page.locator('.histoire-story-variant-grid .histoire-story-variant-grid-item').filter({ has: page.getByRole('link', { name: title, exact: true }) })
  await item.locator('.histoire-generic-render-story > [data-v-app]').waitFor({ state: 'attached' })
  return item
}
export async function navigateStory(page: Page, group: string, id: string, variant: string) {
  await page.goto('/')
  await expect(page).toHaveTitle('Synapse UI')
  await expect(page.locator('.histoire-base-split-pane').first()).toHaveCSS('display','flex')
  const mobile = await page.evaluate(() => matchMedia('(max-width: 640px)').matches)
  if (mobile) await page.getByText('Select a story...', { exact: true }).click()
  const link = page.locator(`a[href="/story/${id}"]`)
  if (!await link.isVisible()) await page.getByRole('button', { name: group, exact: true }).click()
  await expect(link).toBeVisible()
  await link.click()
  if (mobile && id !== storyIds.buttons) await page.getByText('Select a variant...', { exact: true }).click()
  await page.getByRole('link', { name: variant, exact: true }).click()
  await expect(page).toHaveURL(new RegExp(`/story/${id}\\?variantId=`))
}
export async function readyFonts(page: Page) {
  await page.evaluate(async () => {
    for (const family of ['Geist', 'Geist Mono']) {
      const faces = await document.fonts.load(`400 16px "${family}"`)
      if (!faces.length || faces.some(face => face.status !== 'loaded')) throw Error(`Missing actual font: ${family}`)
    }
    await document.fonts.ready
  })
}
