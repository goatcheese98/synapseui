import assert from 'node:assert/strict'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import type { Plugin } from 'vite'

const boundary = '.__histoire-render-story:not(.__histoire-render-custom-controls)'
const guard = selectorParser().astSync(`:where(:not(${boundary}, ${boundary} *))`).first!.first!

/** Lower only Histoire beta's single shell scope for pinned Firefox 140.
 * Keep its preview boundary and selector specificity; never touch consumer CSS.
 */
export function lowerHistoireScope(css: string) {
  const root = postcss.parse(css)
  let scopes = 0
  root.walkAtRules('scope', scope => {
    assert.equal(scope.params, `(:root) to (${boundary})`, 'Review changed upstream Histoire scope before lowering')
    scopes++
    scope.walkRules(rule => {
      if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return
      rule.selector = selectorParser(selectors => {
        selectors.walkPseudos(pseudo => {
          if (pseudo.value === ':scope') pseudo.value = ':root'
        })
        selectors.each(selector => {
          // Match guards belong to the element, before any pseudo-element.
          const pseudoElement = selector.nodes.find(node => node.type === 'pseudo' && (node.value.startsWith('::') || [':before',':after',':first-line',':first-letter'].includes(node.value)))
          if (pseudoElement) selector.insertBefore(pseudoElement,guard.clone())
          else selector.append(guard.clone())
        })
      }).processSync(rule.selector)
    })
    assert(scope.nodes,'Scope must contain the upstream stylesheet')
    scope.replaceWith(...scope.nodes)
  })
  assert.equal(scopes,1,'Expected exactly the reviewed Histoire shell scope')
  return root.toString()
}

export function histoireCssCompatibility(): Plugin {
  return {
    name:'synapse-histoire-shell-css-compatibility',
    enforce:'pre',
    transform(code,id) {
      if (!id.split('?')[0].replaceAll('\\','/').endsWith('/@histoire/app/dist/style.css')) return
      return {code:lowerHistoireScope(code),map:null}
    },
  }
}
