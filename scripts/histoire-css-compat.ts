import assert from 'node:assert/strict'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import type { Plugin } from 'vite'

export const histoireStylesheets = { 'style.css': 1, 'bundled/app.css': 15 } as const
type HistoireStylesheet = keyof typeof histoireStylesheets

const boundary = '.__histoire-render-story:not(.__histoire-render-custom-controls)'
const guard = selectorParser().astSync(`:where(:not(${boundary}, ${boundary} *))`).first!.first!

/** Convert only the reviewed Histoire beta shell/component scopes for Firefox 140.
 * Preserve the preview boundary and specificity, not general scope-proximity
 * tie-breaking. This is not a general @scope polyfill; never process consumer CSS.
 */
export function lowerHistoireScope(css: string, stylesheet: HistoireStylesheet = 'style.css') {
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
          if (pseudoElement) {
            const guarded=guard.clone()
            // Keep comma/newline formatting before the guard, never between it
            // and ::before/::after (which would create a descendant combinator).
            guarded.spaces.before=pseudoElement.spaces.before
            pseudoElement.spaces.before=''
            selector.insertBefore(pseudoElement,guarded)
          }else selector.append(guard.clone())
        })
      }).processSync(rule.selector)
    })
    assert(scope.nodes,'Scope must contain the upstream stylesheet')
    scope.replaceWith(...scope.nodes)
  })
  assert.equal(scopes,histoireStylesheets[stylesheet],`Expected exactly the reviewed Histoire scopes in ${stylesheet}`)
  return root.toString()
}

export function reviewedHistoireStylesheet(id: string): HistoireStylesheet | undefined {
  const path=id.split('?')[0].replaceAll('\\','/')
  return (Object.keys(histoireStylesheets) as HistoireStylesheet[]).find(file => path.endsWith(`/@histoire/app/dist/${file}`))
}

export function histoireCssCompatibility(): Plugin {
  return {
    name:'synapse-histoire-shell-css-compatibility',
    enforce:'pre',
    transform(code,id) {
      const stylesheet = reviewedHistoireStylesheet(id)
      if (!stylesheet) return
      return {code:lowerHistoireScope(code,stylesheet),map:null}
    },
  }
}
