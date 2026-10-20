import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { gsap } from 'gsap'

export interface DraggableOptions {
  bounds?: string | HTMLElement
  handle?: string
  inertia?: boolean
  onDragStart?: () => void
  onDrag?: (position: { x: number; y: number }) => void
  onDragEnd?: () => void
}

export interface DraggableState {
  isDragging: Ref<boolean>
  /** Translation relative to the element's original layout position, in pixels. */
  position: Ref<{ x: number; y: number }>
  velocity: Ref<{ x: number; y: number }>
  enable: () => void
  disable: () => void
  destroy: () => void
}

export function useDraggable(element: Ref<HTMLElement | undefined>, options: DraggableOptions = {}): DraggableState {
  const isDragging = ref(false)
  const position = ref({ x: 0, y: 0 })
  const velocity = ref({ x: 0, y: 0 })
  let enabled = true
  let mountedElement: HTMLElement | undefined
  let pointerId: number | undefined
  let start = { x: 0, y: 0, tx: 0, ty: 0 }
  let previous = { x: 0, y: 0, time: 0 }
  let limits = { minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity }
  let momentum: gsap.core.Tween | undefined

  function constrain(x: number, y: number) {
    return { x: Math.max(limits.minX, Math.min(limits.maxX, x)), y: Math.max(limits.minY, Math.min(limits.maxY, y)) }
  }
  function render() {
    if (!element.value) return
    gsap.set(element.value, { ...position.value })
    options.onDrag?.({ ...position.value })
  }
  function origin(target: HTMLElement) {
    const rect = target.getBoundingClientRect()
    const tx = Number(gsap.getProperty(target, 'x')) || 0
    const ty = Number(gsap.getProperty(target, 'y')) || 0
    position.value = { x: tx, y: ty }
    const bound = options.bounds === 'body' ? { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }
      : (typeof options.bounds === 'string' ? target.closest(options.bounds) ?? document.querySelector(options.bounds) : options.bounds)?.getBoundingClientRect()
    limits = bound ? {
      minX: tx + bound.left - rect.left, maxX: tx + Math.max(bound.left, bound.right - rect.width) - rect.left,
      minY: ty + bound.top - rect.top, maxY: ty + Math.max(bound.top, bound.bottom - rect.height) - rect.top,
    } : { minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity }
    return { tx, ty }
  }
  function keydown(event: KeyboardEvent) {
    if (!enabled || pointerId !== undefined || !element.value || !options.handle || !(event.target instanceof Element) || !event.target.closest(options.handle)) return
    const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }
    const direction = directions[event.key]
    if (!direction) return
    event.preventDefault()
    momentum?.kill()
    const { tx, ty } = origin(element.value)
    const step = event.shiftKey ? 50 : 10
    position.value = constrain(tx + direction[0] * step, ty + direction[1] * step)
    options.onDragStart?.()
    render()
    options.onDragEnd?.()
  }
  function down(event: PointerEvent) {
    const target = element.value
    if (!enabled || !target || pointerId !== undefined || !event.isPrimary || event.button !== 0) return
    if (options.handle && (!(event.target instanceof Element) || !event.target.closest(options.handle))) return
    if (!options.handle && event.target instanceof Element && event.target.closest('button,input,select,textarea,a,[contenteditable]')) return
    event.preventDefault()
    momentum?.kill()
    const { tx, ty } = origin(target)
    start = { x: event.clientX, y: event.clientY, tx, ty }
    previous = { x: event.clientX, y: event.clientY, time: performance.now() }
    velocity.value = { x: 0, y: 0 }
    pointerId = event.pointerId
    target.setPointerCapture(event.pointerId)
    isDragging.value = true
    options.onDragStart?.()
  }
  function move(event: PointerEvent) {
    if (event.pointerId !== pointerId || !isDragging.value) return
    const now = performance.now()
    const dt = Math.max(1, now - previous.time)
    velocity.value = { x: (event.clientX - previous.x) / dt * 1000, y: (event.clientY - previous.y) / dt * 1000 }
    previous = { x: event.clientX, y: event.clientY, time: now }
    position.value = constrain(start.tx + event.clientX - start.x, start.ty + event.clientY - start.y)
    render()
  }
  function finish(cancelled = false) {
    if (pointerId === undefined) return
    const id = pointerId
    pointerId = undefined
    isDragging.value = false
    if (element.value?.hasPointerCapture(id)) element.value.releasePointerCapture(id)
    const speed = Math.hypot(velocity.value.x, velocity.value.y)
    if (!cancelled && options.inertia && element.value && speed > 100 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const duration = Math.min(2, speed / 1000)
      const destination = constrain(position.value.x + velocity.value.x * duration * 0.3, position.value.y + velocity.value.y * duration * 0.3)
      const motion = { ...position.value }
      momentum = gsap.to(motion, { ...destination, duration, ease: 'power2.out', onUpdate: () => { position.value = { x: motion.x, y: motion.y }; render() } })
    }
    velocity.value = { x: 0, y: 0 }
    options.onDragEnd?.()
  }
  function up(event: PointerEvent) { if (event.pointerId === pointerId) finish() }
  function cancel(event: PointerEvent) { if (event.pointerId === pointerId) finish(true) }
  const enable = () => { enabled = true }
  const disable = () => { enabled = false; finish(true); momentum?.kill() }
  const destroy = () => {
    disable()
    mountedElement?.removeEventListener('keydown', keydown)
    mountedElement?.removeEventListener('pointerdown', down)
    mountedElement?.removeEventListener('pointermove', move)
    mountedElement?.removeEventListener('pointerup', up)
    mountedElement?.removeEventListener('pointercancel', cancel)
    mountedElement?.removeEventListener('lostpointercapture', cancel)
  }
  onMounted(() => {
    mountedElement = element.value
    mountedElement?.addEventListener('keydown', keydown)
    mountedElement?.addEventListener('pointerdown', down)
    mountedElement?.addEventListener('pointermove', move)
    mountedElement?.addEventListener('pointerup', up)
    mountedElement?.addEventListener('pointercancel', cancel)
    mountedElement?.addEventListener('lostpointercapture', cancel)
  })
  onUnmounted(destroy)
  return { isDragging, position, velocity, enable, disable, destroy }
}
