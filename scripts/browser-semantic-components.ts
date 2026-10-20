import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium, type Locator } from 'playwright'
import { expect } from '@playwright/test'

const base = process.env.FOUNDATIONS_BASE_URL ?? 'http://localhost:6006'
const out = 'test-results/semantic'
const route = '/story/src-stories-experiments-componentinterconnectedness-story-vue?variantId=src-stories-experiments-componentinterconnectedness-story-vue-0'
const moduleURL = '/src/test-fixtures/semantic-probe.ts'
await mkdir(out, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, reducedMotion: 'reduce' })
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  await page.goto(base + route)
  await page.locator('.histoire-generic-render-story > [data-v-app]').waitFor({state:'attached'})
  await expect(page.locator('.histoire-base-split-pane').first()).toHaveCSS('display','flex')
  const heading = page.getByRole('heading', { name: 'Primary Card', exact: true })
  await expect(heading).toBeVisible()
  const storyCard = heading.locator('xpath=ancestor::div[contains(@class,"max-w-md")]')
  const storyButton = storyCard.getByRole('button', { name: 'Auto-Adapted Button', exact: true })
  await expect(storyCard).toHaveCSS('background-color', 'rgb(248, 250, 252)')
  await expect(storyCard).toHaveCSS('color', 'rgb(15, 23, 42)')
  await expect(storyCard).toHaveCSS('border-top-color', 'rgb(226, 232, 240)')
  await expect(storyButton).toHaveCSS('background-color', 'rgb(249, 115, 22)')
  await storyButton.hover()
  await expect(storyButton).toHaveCSS('background-color', 'rgb(234, 88, 12)')
  await page.mouse.move(0, 0)
  await page.keyboard.press('Tab')
  await storyButton.focus()
  await expect(storyButton).toHaveCSS('--tw-ring-color', 'rgb(100 116 139 / 1)')
  await page.locator('body').click({ position: { x: 220, y: 5 } })
  await expect(storyButton).toHaveCSS('background-color', 'rgb(249, 115, 22)')
  const storyOverflow = await page.locator('.histoire-generic-render-story button').evaluateAll(buttons => buttons.some(button => {
    const owner = button.closest('[class*="max-w-"]')
    if (!owner) return false
    const b = button.getBoundingClientRect(), c = owner.getBoundingClientRect()
    return b.left < c.left - 1 || b.right > c.right + 1 || button.scrollHeight > button.clientHeight + 1
  }))
  assert.equal(storyOverflow, false, 'Retained labels and actions fit their cards')
  await page.screenshot({ path: `${out}/retained-story.png` })

  // Exercise supported states using real components and the same scanned source CSS.
  // No fixture utility classes, product layout, story, or screenshot golden is added.
  const tokens = await page.evaluate(async url => {
    const api = await import(url)
    api.mount()
    return api.tokens as Record<string, Record<number, string>>
  }, moduleURL)
  const isolation = await page.evaluate(() => {
    const probe=document.createElement('div');probe.className='htw-flex'
    document.body.append(probe);const shell=getComputedStyle(probe).display
    document.querySelector('#semantic-probe')!.append(probe);const story=getComputedStyle(probe).display
    probe.remove();return {shell,story}
  })
  assert.deepEqual(isolation,{shell:'flex',story:'block'},'Shell utilities must work without crossing the preview scope boundary')
  const update = (patch: Record<string, unknown>) => page.evaluate(async ({ url, patch }) => {
    await (await import(url)).setState(patch)
  }, { url: moduleURL, patch })
  const rgb = (intent: string, shade: number) => tokens[intent][shade].replace(/\s+/g, ', ')
  const white = 'rgb(255, 255, 255)', transparent = 'rgba(0, 0, 0, 0)', defaultBorder = 'rgb(203, 213, 225)' // existing light --border-default #cbd5e1
  const button = page.getByTestId('direct-button'), card = page.getByTestId('context-card'), inherited = page.getByTestId('inherited-button')
  const results: unknown[] = []
  async function colors(node: Locator, background: string, color: string, border?: string) {
    await expect(node).toHaveCSS('background-color', background)
    await expect(node).toHaveCSS('color', color)
    await expect(node).toHaveCSS('border-top-color', border ?? defaultBorder)
    const observed = await node.evaluate(el => {
      const s = getComputedStyle(el)
      const parse = (value: string) => { const n = value.match(/[\d.]+/g)!.map(Number); return [n[0],n[1],n[2],n[3] ?? 1] }
      const over = (fg: number[], bg: number[]) => [...fg.slice(0,3).map((v,i) => v*fg[3]+bg[i]*(1-fg[3])),1]
      let background = [255,255,255,1]
      const ancestors: Element[] = []
      for (let parent: Element | null = el; parent; parent = parent.parentElement) ancestors.unshift(parent)
      for (const parent of ancestors) background = over(parse(getComputedStyle(parent).backgroundColor),background)
      const foreground = over(parse(s.color),background)
      const luminance = (rgb: number[]) => rgb.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0)
      const a=luminance(foreground), b=luminance(background)
      return { contrast:(Math.max(a,b)+.05)/(Math.min(a,b)+.05), compositedBackground:background.slice(0,3), background:s.backgroundColor, text:s.color, border:s.borderTopColor, borderWidth:s.borderTopWidth, opacity:s.opacity, shadow:s.boxShadow }
    })
    if (await node.evaluate(el => el instanceof HTMLButtonElement && !el.disabled)) assert(observed.contrast >= 4.5, `Enabled label contrast ${observed.contrast}: ${JSON.stringify(observed)}`)
    return observed
  }
  const solids = [['neutral','neutral',900,950],['primary','primary',700,800],['secondary','secondary',700,800],['accent','accent',500,600],['success','success',700,800],['warning','warning',500,600],['error','error',600,700]] as const
  const outlines = [['outline','neutral',500,700],['outline-primary','primary',700,700],['outline-success','success',600,700],['outline-error','error',600,700]] as const
  const cases = [
    ...solids.map(([variant,intent,normal,hover]) => ({ variant, normal:rgb(intent,normal), hover:rgb(intent,hover), text:['accent','warning'].includes(variant)?rgb('neutral',900):white, border:undefined as string|undefined })),
    ...outlines.map(([variant,intent,border,text]) => ({ variant, normal:transparent, hover:rgb(intent,50), text:rgb(intent,text), border:rgb(intent,border) })),
    {variant:'ghost',normal:transparent,hover:rgb('neutral',100),text:rgb('neutral',700),border:transparent},
    {variant:'ghost-primary',normal:transparent,hover:rgb('primary',50),text:rgb('primary',700),border:transparent},
    {variant:'link',normal:transparent,hover:transparent,text:rgb('primary',700),border:undefined},
  ]
  for (const backdrop of [white,rgb('neutral',100)]) {
  await page.locator('#semantic-probe').evaluate((el, background) => { el.style.backgroundColor=background },backdrop)
  for (const item of cases) {
    await page.mouse.move(0,0)
    await update({variant:item.variant,disabled:false,loading:false})
    const normal = await colors(button,item.normal,item.text,item.border)
    await button.hover()
    const hover = await colors(button,item.hover,item.text,item.variant==='ghost' ? rgb('neutral',100) : item.variant==='ghost-primary' ? rgb('primary',100) : item.border)
    await page.mouse.move(0,0)
    await page.keyboard.press('Tab')
    await button.focus()
    await colors(button,item.normal,item.text,item.border)
    await expect(button).toHaveCSS('--tw-ring-color','rgb(100 116 139 / 1)')
    await expect(button).toHaveCSS('box-shadow', /100, 116, 139/)
    const focus = await colors(button,item.normal,item.text,item.border)
    await update({disabled:true})
    await colors(button,item.normal,item.text,item.border)
    await expect(button).toHaveCSS('opacity','0.5')
    await expect(button).toHaveCSS('pointer-events','none')
    await expect(button).toBeDisabled()
    const disabled = await colors(button,item.normal,item.text,item.border)
    results.push({...item,backdrop,observed:{normal,hover,focus,disabled}})
  }
  }
  for (const variant of ['default','outline','filled','ghost','primary','secondary','accent','success','warning','error','muted']) {
    await page.mouse.move(0,0)
    await update({cardVariant:variant})
    const intent = variant==='muted' ? 'neutral' : variant
    const normal = variant==='default' ? white : variant==='filled' ? rgb('primary',700) : ['outline','ghost'].includes(variant) ? transparent : rgb(intent,variant==='muted'?100:50)
    const text = variant==='filled'?white:rgb(['default','outline','ghost'].includes(variant)?'neutral':intent,['success','warning','error'].includes(variant)?700:variant==='muted'?600:900)
    const border = ['primary','secondary','accent','success','warning','error','muted'].includes(variant)?rgb(intent,200):undefined
    const observedNormal = await colors(card,normal,text,border)
    await card.hover()
    const observedHover = await colors(card,variant==='ghost'?rgb('neutral',50):normal,text,border)
    results.push({card:variant,normal,text,border,observed:{normal:observedNormal,hover:observedHover}})
  }
  await page.mouse.move(0,0)
  await update({cardInteractive:true})
  await card.hover()
  await expect(card).toHaveCSS('transform','matrix(1, 0, 0, 1, 0, -4)')
  await page.mouse.move(0,0)
  await update({cardInteractive:false,cardVariant:'primary',cardSize:'lg',variant:'error',autoAdapt:true})
  await colors(inherited,rgb('accent',500),rgb('neutral',900))
  await expect(inherited).toHaveCSS('height','48px')
  await update({cardVariant:'secondary',cardSize:'sm'})
  await colors(inherited,rgb('primary',700),white)
  await expect(inherited).toHaveCSS('height','36px')
  await update({autoAdapt:false,variant:'error',size:'xs'})
  await colors(inherited,rgb('error',600),white)
  await expect(inherited).toHaveCSS('height','28px')
  for (const [size,height] of Object.entries({xs:28,sm:36,md:40,lg:48,xl:56,'icon-xs':24,'icon-sm':32,'icon-md':40,'icon-lg':48,'icon-xl':64})) {
    await update({size,disabled:false,loading:false})
    await expect(button).toHaveCSS('height',`${height}px`)
    if (size.startsWith('icon-')) await expect(button).toHaveCSS('width',`${height}px`)
  }
  await update({loading:true})
  await expect(button).toBeDisabled()
  await expect(button.locator('.loading-spinner')).toBeVisible()
  assert.deepEqual(errors,[])
  await writeFile(`${out}/computed-states.json`,JSON.stringify({route,tokens,isolation,results,sizes:10,reactiveContext:true,manualOverride:true,errors},null,2))
  console.log('SEMANTIC_COMPONENTS',JSON.stringify({buttonVariants:cases.length,cardVariants:11,sizes:10,states:['normal','hover','focus','disabled'],backdrops:2,contrast:results.filter((item): item is {variant:string;backdrop:string;observed:Record<string,{contrast:number}>} => typeof item==='object' && item!==null && 'variant' in item).map(item=>({variant:item.variant,backdrop:item.backdrop,ratios:Object.fromEntries(Object.entries(item.observed).filter(([state])=>state!=='disabled').map(([state,value])=>[state,value.contrast]))})),reactiveContext:true,errors}))
} finally { await browser.close() }
