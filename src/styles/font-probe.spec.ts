import { describe, expect, it } from 'vitest'
import { isExpectedWebFont } from '../../scripts/font-probe'

describe('rendered webfont identity', () => {
  it.each([
    { familyName: 'Geist (Fontations)', postScriptName: 'Geist-Regular', isCustomFont: true, glyphCount: 6 },
    { familyName: 'Geist Mono (Fontations)', postScriptName: 'GeistMono-Regular', isCustomFont: true, glyphCount: 47 },
  ])('accepts hosted renderer metadata for $postScriptName', font => {
    expect(isExpectedWebFont(font, font.postScriptName)).toBe(true)
  })
  it('rejects a platform font even when its PostScript name matches', () => {
    expect(isExpectedWebFont({ postScriptName: 'Geist-Regular', isCustomFont: false, glyphCount: 6 }, 'Geist-Regular')).toBe(false)
  })
  it('rejects a different font identity', () => {
    expect(isExpectedWebFont({ postScriptName: 'ArialMT', isCustomFont: true, glyphCount: 6 }, 'Geist-Regular')).toBe(false)
  })
  it('rejects a loaded font that rendered no glyphs', () => {
    expect(isExpectedWebFont({ postScriptName: 'Geist-Regular', isCustomFont: true, glyphCount: 0 }, 'Geist-Regular')).toBe(false)
  })
})
