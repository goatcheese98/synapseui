import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname,join } from 'node:path'
import postcss, {type Root} from 'postcss'
import selectorParser from 'postcss-selector-parser'
import { lowerHistoireScope,histoireStylesheets,reviewedHistoireStylesheet } from './histoire-css-compat.ts'

const appRequire = createRequire(createRequire(import.meta.url).resolve('histoire/package.json'))
const app = dirname(appRequire.resolve('@histoire/app/package.json'))
const keyframes = (root: Root) => {
  const result:string[]=[]
  root.walkAtRules(/keyframes$/,rule=>{result.push(rule.toString())})
  return result
}
const counts=[]
for(const stylesheet of Object.keys(histoireStylesheets) as (keyof typeof histoireStylesheets)[]) {
  const source=readFileSync(join(app,'dist',stylesheet),'utf8')
  const original=postcss.parse(source), result=postcss.parse(lowerHistoireScope(source,stylesheet))
  let scopes=0,rules=0,pseudoElements=0
  original.walkAtRules('scope',()=>{scopes++})
  result.walkAtRules('scope',()=>{assert.fail('No known Histoire scope may remain native')})
  assert.deepEqual(keyframes(result),keyframes(original),'Preserve actual animation names, steps and declarations')
  result.walkRules(rule => {
    if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return
    assert(rule.selector.includes(':where(:not(.__histoire-render-story'),rule.selector)
    selectorParser(selectors=>selectors.walkPseudos(pseudo=>{
      if(pseudo.value.startsWith('::')){
        assert(pseudo.prev()?.type==='pseudo' && pseudo.prev()?.value===':where','Guard must precede the pseudo-element')
        pseudoElements++
      }
    })).processSync(rule.selector)
    rules++
  })
  assert(rules>0,'Exercise actual upstream stylesheet, not an empty fixture')
  counts.push({stylesheet,scopes,rules,pseudoElements,keyframes:keyframes(result).length})
}
assert.throws(()=>lowerHistoireScope('@scope (.changed) { .a { color:red } }'),/Review changed upstream/)
assert.throws(()=>lowerHistoireScope('@scope (:root) to (.__histoire-render-story:not(.__histoire-render-custom-controls)) { .a {color:red} }','bundled/app.css'),/Expected exactly/)
assert.equal(reviewedHistoireStylesheet('/src/bundled/app.css'),undefined)
assert.equal(reviewedHistoireStylesheet('/node_modules/@histoire/app/dist/bundled/app.css?direct'),'bundled/app.css')
console.log('HISTOIRE_SCOPE_SOURCE',JSON.stringify(counts))
