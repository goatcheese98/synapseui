import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname,join } from 'node:path'
import postcss from 'postcss'
import { lowerHistoireScope } from './histoire-css-compat.ts'

const appRequire = createRequire(createRequire(import.meta.url).resolve('histoire/package.json'))
const app = dirname(appRequire.resolve('@histoire/app/package.json'))
const source = readFileSync(join(app,'dist/style.css'),'utf8')
const result = postcss.parse(lowerHistoireScope(source))
let rules = 0
result.walkRules(rule => {
  if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return
  assert(rule.selector.includes(':where(:not(.__histoire-render-story'),rule.selector)
  rules++
})
assert(rules>100,'Exercise actual upstream stylesheet, not a hollow synthetic sample')
assert.throws(()=>lowerHistoireScope('@scope (.changed) { .a { color:red } }'),/Review changed upstream/)
console.log(`Lowered actual Histoire shell scope: ${rules} guarded rules, keyframes retained, changed upstream scope rejects`)
