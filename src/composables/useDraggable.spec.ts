import { describe, it, expect, vi, afterEach } from 'vitest'
import { defineComponent, ref, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { gsap } from 'gsap'
import { useDraggable, type DraggableState } from './useDraggable'

function pointer(target: Element, type: string, x: number, y: number, extra: Record<string, unknown> = {}) {
  const event = new MouseEvent(type, { bubbles: true, clientX: x, clientY: y, button: 0 })
  Object.defineProperties(event, { pointerId: { value: 1, configurable: true }, isPrimary: { value: true, configurable: true } })
  for (const [key, value] of Object.entries(extra)) Object.defineProperty(event, key, { value, configurable: true })
  target.dispatchEvent(event)
}
function fixture(inertia = false, bounds: string | HTMLElement = 'body') {
  let state: DraggableState
  const wrapper = mount(defineComponent({ setup() {
    const element = ref<HTMLElement>()
    state = useDraggable(element, { bounds, handle: '.handle', inertia })
    return () => h('div', { ref: element }, [h('button', { class: 'handle' }, 'Move'), h('button', 'Action')])
  } }))
  const el = wrapper.element as HTMLElement
  el.setPointerCapture = vi.fn()
  el.hasPointerCapture = vi.fn(() => true)
  el.releasePointerCapture = vi.fn()
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({ x: 100, y: 80, left: 100, top: 80, right: 300, bottom: 180, width: 200, height: 100, toJSON: () => ({}) })
  return { wrapper, el, handle: wrapper.find('.handle').element, state: state! }
}
afterEach(() => { vi.restoreAllMocks(); gsap.globalTimeline.clear() })

describe('useDraggable pointer lifecycle', () => {
  it('uses pointer deltas instead of adding viewport offsets, and clamps every edge', () => {
    const f = fixture()
    pointer(f.handle, 'pointerdown', 120, 90)
    pointer(f.el, 'pointermove', 150, 110)
    expect(f.state.position.value).toEqual({ x: 30, y: 20 })
    pointer(f.el, 'pointermove', -100, -100)
    expect(f.state.position.value).toEqual({ x: -100, y: -80 })
    pointer(f.el, 'pointermove', 10000, 10000)
    expect(f.state.position.value).toEqual({ x: window.innerWidth - 300, y: window.innerHeight - 180 })
    f.wrapper.unmount()
  })
  it('respects HTMLElement bounds and keyboard movement', () => {
    const bounds = document.createElement('section')
    vi.spyOn(bounds, 'getBoundingClientRect').mockReturnValue({ left: 50, top: 40, right: 400, bottom: 300 } as DOMRect)
    const f = fixture(false, bounds)
    f.handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    expect(f.state.position.value).toEqual({ x: 10, y: 0 })
    pointer(f.handle, 'pointerdown', 120, 90)
    pointer(f.el, 'pointermove', 10000, 10000)
    expect(f.state.position.value.x).toBeLessThanOrEqual(110)
    expect(f.state.position.value.y).toBe(120)
    f.wrapper.unmount()
  })
  it('clamps the inertia destination rather than letting release escape bounds', () => {
    const f = fixture(true)
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    const tween = vi.spyOn(gsap, 'to')
    pointer(f.handle, 'pointerdown', 120, 90)
    pointer(f.el, 'pointermove', 5000, 5000)
    pointer(f.el, 'pointerup', 5000, 5000)
    expect(tween).toHaveBeenLastCalledWith(expect.anything(), expect.objectContaining({
      x: window.innerWidth - 300,
      y: window.innerHeight - 180,
    }))
    f.wrapper.unmount()
    vi.unstubAllGlobals()
  })
  it('leaves content controls and nonprimary contacts alone', () => {
    const f = fixture()
    pointer(f.wrapper.findAll('button')[1].element, 'pointerdown', 120, 90)
    expect(f.state.isDragging.value).toBe(false)
    pointer(f.handle, 'pointerdown', 120, 90, { isPrimary: false })
    expect(f.state.isDragging.value).toBe(false)
    f.wrapper.unmount()
  })
  it('cancels captured movement and removes listeners on destruction', async () => {
    const f = fixture()
    pointer(f.handle, 'pointerdown', 120, 90)
    await nextTick()
    expect(f.state.isDragging.value).toBe(true)
    pointer(f.el, 'pointercancel', 120, 90)
    expect(f.state.isDragging.value).toBe(false)
    f.state.destroy()
    pointer(f.handle, 'pointerdown', 120, 90)
    expect(f.state.isDragging.value).toBe(false)
    expect(f.el.releasePointerCapture).toHaveBeenCalledWith(1)
    f.wrapper.unmount()
  })
  it('does not launch inertia after disable or reduced motion', () => {
    const f = fixture(true)
    const tween = vi.spyOn(gsap, 'to')
    vi.stubGlobal('matchMedia', () => ({ matches: true }))
    pointer(f.handle, 'pointerdown', 120, 90)
    pointer(f.el, 'pointermove', 180, 110)
    pointer(f.el, 'pointerup', 180, 110)
    expect(tween).not.toHaveBeenCalled()
    pointer(f.handle, 'pointerdown', 120, 90)
    f.state.disable()
    expect(tween).not.toHaveBeenCalled()
    f.wrapper.unmount()
    vi.unstubAllGlobals()
  })
})
