import assert from 'node:assert/strict'
import { mkdir,writeFile } from 'node:fs/promises'
import { chromium,firefox,webkit } from 'playwright'
const current=process.env.FOUNDATIONS_BASE_URL ?? 'http://localhost:6006'
const reference=process.env.TYPOGRAPHY_REFERENCE_URL ?? 'http://localhost:6007'
const out='test-results/typography'
await mkdir(out,{recursive:true})
const results=[]
for (const [engine,type] of Object.entries({chromium,firefox,webkit})) {
  const browser=await type.launch(engine==='chromium' && process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH}: {})
  try {
    for (const [index,title] of [[1,'Main Variants'],[4,'All Sizes']] as const) {
      const pair=[]
      for (const [name,base] of [['480a904',reference],['current',current]]) {
        const page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'reduce'})
        await page.goto(`${base}/story/src-stories-button-story-vue?variantId=src-stories-button-story-vue-${index}`,{waitUntil:'domcontentloaded'})
        const item=page.locator('.histoire-story-variant-grid-item').filter({has:page.getByRole('link',{name:title,exact:true})})
        await item.getByRole('button').first().waitFor()
        await page.evaluate(()=>document.fonts.ready)
        const computed=await item.getByRole('button').evaluateAll(nodes=>nodes.map(node=>{
          const s=getComputedStyle(node)
          return {label:node.textContent?.trim(),fontFamily:s.fontFamily,fontWeight:s.fontWeight,fontSize:s.fontSize,lineHeight:s.lineHeight,fontSynthesis:s.fontSynthesis,boxSizing:s.boxSizing,width:s.width,height:s.height}
        }))
        const faces=await page.evaluate(()=>[...document.fonts].map(face=>({family:face.family,status:face.status,weight:face.weight})))
        let glyphs:unknown=null
        if(engine==='chromium') {
          const cdp=await page.context().newCDPSession(page)
          await cdp.send('DOM.enable');await cdp.send('CSS.enable')
          const {root}=await cdp.send('DOM.getDocument')
          const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector:'.histoire-story-variant-grid-item .synapse-button .button-content'})
          glyphs=await cdp.send('CSS.getPlatformFontsForNode',{nodeId})
          await cdp.detach()
        }
        const styles=await page.evaluate(()=>[...document.styleSheets].map(sheet=>({href:sheet.href,rules: (()=>{try{return [...sheet.cssRules].filter(rule=>rule.cssText.includes('font-family')).map(rule=>rule.cssText.slice(0,1000))}catch{return ['unreadable external sheet']}})()})))
        await item.screenshot({path:`${out}/${engine}-${name}-${index}.png`,animations:'disabled'})
        pair.push({name,computed,faces,glyphs,styles})
        await page.close()
      }
      results.push({engine,title,pair})
      await writeFile(`${out}/computed.json`,JSON.stringify(results,null,2))
      assert.deepEqual(pair[1].computed,pair[0].computed,`${engine} ${title}: preserve exact retained typography and geometry`)
      if(engine==='chromium')assert.deepEqual(pair[1].glyphs,pair[0].glyphs,'Preserve actual font shaping source')
      console.log('PINNED_TYPOGRAPHY',JSON.stringify({engine,title,computed:pair[1].computed,glyphs:pair[1].glyphs}))
    }
  } finally {await browser.close()}
}
