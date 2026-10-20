import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import {readFile,mkdir,writeFile,readdir} from 'node:fs/promises'
import {resolve,sep,extname,join} from 'node:path'
import {createHash} from 'node:crypto'
import {chromium,firefox,webkit} from 'playwright'
import postcss from 'postcss'
import {lowerHistoireScope} from './histoire-css-compat.ts'

const out='test-results/histoire-scope'
await mkdir(out,{recursive:true})
const root=resolve('.histoire/dist')
const emitted=[]
for(const file of await readdir(join(root,'assets'))) {
  if(!file.endsWith('.css'))continue
  const bytes=await readFile(join(root,'assets',file)),css=bytes.toString()
  const nativeScopes:string[]=[]
  postcss.parse(css).walkAtRules('scope',rule=>{nativeScopes.push(rule.params)})
  emitted.push({file,sha256:createHash('sha256').update(bytes).digest('hex'),nativeScopes,shell:css.includes('.htw-flex'),components:css.includes('.bind-tree-margin')})
}
assert(emitted.some(file=>file.components),'Static build must actually include component CSS')
assert(emitted.every(file=>file.nativeScopes.every(params=>params!=='(:root) to (.__histoire-render-story:not(.__histoire-render-custom-controls))')),'Emitted known Histoire scopes must not remain native on Firefox 140')
const server=createServer(async(req,res)=>{
  const path=resolve(root,'.'+decodeURIComponent(new URL(req.url??'/','http://localhost').pathname))
  if(path!==root && !path.startsWith(root+sep)){res.writeHead(404).end();return}
  try {
    const file=extname(path)?path:join(root,'index.html')
    const bytes=await readFile(file)
    const mime:Record<string,string>={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'}
    res.writeHead(200,{'content-type':mime[extname(file)]??'application/octet-stream'}).end(bytes)
  }catch{res.writeHead(404).end()}
})
await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve))
const address=server.address();assert(address && typeof address!=='string')
const modes={dev:process.env.FOUNDATIONS_BASE_URL??'http://localhost:6006',static:`http://127.0.0.1:${address.port}`}
const results=[]
const pseudoCSS=lowerHistoireScope('@scope (:root) to (.__histoire-render-story:not(.__histoire-render-custom-controls)) { .synapse-scope-probe::before { content:"scope-marker";color:rgb(1,2,3) } }')
try {
  for(const [engine,type] of Object.entries({chromium,firefox,webkit})) {
    const browser=await type.launch(engine==='chromium' && process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})
    try {
      for(const [mode,base] of Object.entries(modes)) {
        const page=await browser.newPage({viewport:{width:1280,height:720},reducedMotion:'no-preference'})
        await page.goto(`${base}/story/src-stories-button-story-vue?variantId=src-stories-button-story-vue-1`,{waitUntil:'domcontentloaded'})
        await page.locator('.synapse-button').first().waitFor()
        const styles=await page.locator('style[data-vite-dev-id]').evaluateAll(nodes=>nodes.filter(node=>node.getAttribute('data-vite-dev-id')?.includes('/@histoire/app/')).map(node=>({id:node.getAttribute('data-vite-dev-id')!,scopes:(node.textContent?.match(/@scope\s*\(/g)??[]).length})))
        if(mode==='dev')for(const file of ['style.css','bundled/app.css']) {
          const style=styles.find(style=>style.id.endsWith(`/@histoire/app/dist/${file}`))
          assert(style,`Actually served ${file} must be observed`)
          assert.equal(style.scopes,0,`No native scopes in served ${file}`)
        }
        await page.addStyleTag({content:pseudoCSS})
        const checks=await page.evaluate(()=>{
          const fixture=document.createElement('div');fixture.style.cssText='position:fixed;visibility:hidden;width:200px;left:0;top:0'
          document.body.append(fixture)
          const results=[]
          for(const context of ['shell','preview','custom-controls','nested-preview']) {
            const host=document.createElement('div');host.style.width='200px'
            if(context!=='shell')host.className='__histoire-render-story'
            if(context==='custom-controls')host.classList.add('__histoire-render-custom-controls')
            if(context==='nested-preview'){
              const outer=document.createElement('div');outer.className='__histoire-render-story';fixture.append(outer);outer.append(host)
              host.classList.add('__histoire-render-custom-controls')
            }else fixture.append(host)
            const margin=document.createElement('div');margin.className='bind-tree-margin synapse-scope-probe';margin.setAttribute('data-v-64c2458f','');margin.style.setProperty('--v2562213a','13px');host.append(margin)
            const landscape=document.createElement('div');landscape.className='landscape';const inner=document.createElement('div');const dragger=document.createElement('div');dragger.className='dragger dragger-offset-center';dragger.setAttribute('data-v-4f40a1bb','');inner.append(dragger);landscape.append(inner);host.append(landscape)
            const animated=document.createElement('div');animated.className='htw-base-empty';animated.setAttribute('data-v-c5ecfead','');host.append(animated)
            const animation=animated.getAnimations().find(animation=>animation instanceof CSSAnimation && animation.animationName==='htw-base-empty-c5ecfead')
            results.push({context,margin:getComputedStyle(margin).marginLeft,width:getComputedStyle(dragger).width,right:getComputedStyle(dragger).right,pseudo:getComputedStyle(margin,'::before').content,pseudoColor:getComputedStyle(margin,'::before').color,animation:getComputedStyle(animated).animationName,keyframes:animation?.effect instanceof KeyframeEffect?animation.effect.getKeyframes().map(frame=>frame.opacity):[]})
          }
          fixture.remove();return results
        })
        const links=await page.locator('link[rel="stylesheet"]').evaluateAll(nodes=>nodes.map(node=>(node as HTMLLinkElement).href))
        results.push({engine,mode,styles,links,checks})
        await writeFile(`${out}/served-emitted.json`,JSON.stringify({emitted,results},null,2))
        if(mode==='static') for(const file of emitted.filter(file=>file.components)) {
          assert(links.some(href=>new URL(href).pathname===`/assets/${file.file}`),'Browser must actually consume the emitted component stylesheet')
        }
        for(const item of checks) {
          const included=['shell','custom-controls'].includes(item.context)
          assert.equal(item.margin,included?'13px':'0px',`${engine}/${mode}/${item.context}: actual component boundary`)
          assert.equal(item.width,included?'10px':'200px')
          assert.equal(item.right,included?'-5px':'auto')
          assert.equal(item.pseudo,included?'"scope-marker"':'none')
          if(included)assert.equal(item.pseudoColor,'rgb(1, 2, 3)')
          assert.equal(item.animation,included?'htw-base-empty-c5ecfead':'none')
          assert.deepEqual(item.keyframes,included?['0','1']:[],'Actual component animation keyframes must remain usable')
        }
        console.log('HISTOIRE_SCOPE_BROWSER',JSON.stringify({engine,mode,checks}))
        await page.close()
      }
    }finally{await browser.close()}
  }
}finally{await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()))}
