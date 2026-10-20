import { chromium } from 'playwright'
import { observeFonts } from './font-probe.ts'
import assert from 'node:assert/strict'
import { mkdirSync,writeFileSync } from 'node:fs'
const baseURL=process.env.FOUNDATIONS_BASE_URL || 'http://localhost:6006'
const screenshots=process.env.BROWSER_ARTIFACT_DIR || 'test-results/foundations';mkdirSync(screenshots,{recursive:true})
const browser=await chromium.launch({...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}),args:['--no-sandbox']})
const results: unknown[]=[]
try {
for (const width of [320,768,1440]) for (const theme of ['light','dark']) {
 const page=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'})
 page.setDefaultTimeout(15000);const errors: string[]=[];page.on('pageerror',e=>errors.push(e.message))
 const verifyFonts=observeFonts(page)
 const id=`src-stories-lumfoundations-story-vue-${theme==='light'?0:1}`
 await page.goto(`${baseURL}/story/src-stories-lumfoundations-story-vue?variantId=${id}`,{waitUntil:'networkidle'})
 const main=page.locator(`main[data-synapse-theme="${theme}"]`);await main.waitFor()
 const typography=await verifyFonts(`main[data-synapse-theme="${theme}"] h1`, `main[data-synapse-theme="${theme}"] pre code`)
 const license=await page.request.get(await main.getByRole('link',{name:'Font license (SIL OFL 1.1)'}).getAttribute('href') || '')
 assert(license.ok());assert((await license.text()).includes('SIL OPEN FONT LICENSE Version 1.1'))
 const keyboard=main.getByRole('button',{name:'Try Enter or Space'})
 await keyboard.focus();assert(await keyboard.evaluate(e=>e===document.activeElement))
 await page.keyboard.press('Enter');await page.keyboard.press('Space')
 await main.getByText('Activations: 2',{exact:true}).waitFor()
 assert.equal(await keyboard.evaluate(e=>getComputedStyle(e).outlineWidth),'2px')
 const disabled=main.getByRole('button',{name:'Save changes',exact:true}).last();assert(await disabled.isDisabled())
 const loading=main.getByRole('button',{name:'Saving…',exact:true});assert(await loading.isDisabled());assert.equal(await loading.getAttribute('aria-busy'),'true')
 const start=main.getByRole('button',{name:'Start loading',exact:true});const before=await start.boundingBox();assert(before);await start.click();assert(await start.isDisabled());const after=await start.boundingBox();assert(after);assert.equal(before.width,after.width);assert.equal(before.height,after.height);await main.getByRole('button',{name:'Reset loading'}).click()
 const field=main.getByRole('textbox',{name:'Component name'});await field.fill('Button');await main.getByText('Entered: Button',{exact:true}).waitFor()
 assert.equal(await main.getByRole('textbox',{name:'Invalid example'}).getAttribute('aria-invalid'),'true')
 assert(await main.getByRole('textbox',{name:'Disabled example'}).isDisabled())
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}}))
 await main.getByRole('button',{name:'Copy example'}).click();await main.getByText('Copy unavailable. Select the code below and copy it manually.',{exact:true}).waitFor()
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.resolve()}}))
 await main.getByRole('button',{name:'Copy example'}).click();await main.getByText('Copied example.',{exact:true}).waitFor()
 const contrast=await main.evaluate(e=>{
   const rgb=(s: string)=>(s.match(/[\d.]+/g) || []).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});
   const lum=(s: string)=>{const [r,g,b]=rgb(s);return .2126*r+.7152*g+.0722*b};
   const bg=getComputedStyle(e).backgroundColor;
   return [...e.querySelectorAll('.synapse-primary:not([aria-disabled]),.synapse-outline:not([aria-disabled]),.synapse-ghost,p')].map(x=>{
     const s=getComputedStyle(x);const foreground=lum(s.color);const background=lum(s.backgroundColor==='rgba(0, 0, 0, 0)'?bg:s.backgroundColor);
     return (Math.max(foreground,background)+.05)/(Math.min(foreground,background)+.05)
   })
 });assert(contrast.every(x=>x>=4.5),JSON.stringify(contrast));
 const overflow=await main.evaluate(e=>({client:e.clientWidth,scroll:e.scrollWidth,page:document.documentElement.scrollWidth,viewport:innerWidth}))
 assert(overflow.client<=width,JSON.stringify(overflow));assert(overflow.scroll<=overflow.client+1,JSON.stringify(overflow));assert(overflow.page<=width+1,JSON.stringify(overflow))
 assert.equal(await loading.locator('svg').evaluate(e=>getComputedStyle(e).animationName),'none')
 assert.equal(errors.length,0,errors.join('\n'))
 await keyboard.focus();
 await main.evaluate(e=>{let p: Element | null=e;while(p){p.scrollTop=0;p=p.parentElement}});
 await page.screenshot({path:`${screenshots}/foundations-${width}-${theme}.png`,fullPage:true})
 if ((width===320 && theme==='light') || (width===1440 && theme==='dark')) {
  await main.getByRole('textbox',{name:'Disabled example'}).scrollIntoViewIfNeeded();
  await page.screenshot({path:`${screenshots}/inputs-${width}-${theme}.png`,fullPage:true})
 }
 results.push({width,theme,keyboard:'Enter + Space exactly once',input:'passed',clipboard:'reject + resolve passed',overflow,minimumContrast:Math.min(...contrast),typography,motion:'none',errors})
 await page.close()
}
for (const colorScheme of ['light','dark'] as const) {
 const page=await browser.newPage({colorScheme});
 await page.goto(`${baseURL}/story/src-stories-lumfoundations-story-vue?variantId=src-stories-lumfoundations-story-vue-2`,{waitUntil:'networkidle'});
 const main=page.locator('main[data-synapse-theme="system"]');await main.waitFor();
 assert.equal(await main.evaluate(e=>getComputedStyle(e).getPropertyValue('--acc').trim()),colorScheme==='dark'?'#d6a828':'#18181b');
 results.push({systemTheme:colorScheme,passed:true});await page.close();
}
} finally {await browser.close();writeFileSync(`${screenshots}/browser-results.json`,JSON.stringify(results,null,2))}
console.log(JSON.stringify(results,null,2))
