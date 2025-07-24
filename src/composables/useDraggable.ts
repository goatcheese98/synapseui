import { ref, reactive, onMounted, onUnmounted, type Ref } from 'vue'
import { gsap } from 'gsap'

export interface DraggableOptions {
  bounds?: string | HTMLElement
  inertia?: boolean
  onDragStart?: () => void
  onDrag?: (position: { x: number; y: number }) => void
  onDragEnd?: () => void
}

export interface DraggableState {
  isDragging: Ref<boolean>
  position: Ref<{ x: number; y: number }>
  velocity: Ref<{ x: number; y: number }>
  enable: () => void
  disable: () => void
  destroy: () => void
}

export function useDraggable(
  element: Ref<HTMLElement | undefined>,
  options: DraggableOptions = {}
): DraggableState {
  const isDragging = ref(false)
  const position = ref({ x: 0, y: 0 })
  const velocity = ref({ x: 0, y: 0 })
  
  let dragState = {
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    isEnabled: true
  }

  const updateVelocity = (newX: number, newY: number) => {
    const now = Date.now()
    const dt = Math.max(1, now - dragState.lastTime)
    
    velocity.value = {
      x: (newX - dragState.lastX) / dt * 1000,
      y: (newY - dragState.lastY) / dt * 1000
    }
    
    dragState.lastX = newX
    dragState.lastY = newY
    dragState.lastTime = now
  }

  const handleMouseDown = (e: MouseEvent) => {
    if (!dragState.isEnabled || !element.value) return
    
    e.preventDefault()
    isDragging.value = true
    
    const rect = element.value.getBoundingClientRect()
    dragState.startX = e.clientX - rect.left
    dragState.startY = e.clientY - rect.top
    dragState.lastX = e.clientX
    dragState.lastY = e.clientY
    dragState.lastTime = Date.now()
    
    options.onDragStart?.()
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || !element.value) return
    
    const newX = e.clientX - dragState.startX
    const newY = e.clientY - dragState.startY
    
    // Apply bounds if specified
    let constrainedX = newX
    let constrainedY = newY
    
    if (options.bounds === 'body') {
      const rect = element.value.getBoundingClientRect()
      constrainedX = Math.max(0, Math.min(window.innerWidth - rect.width, newX))
      constrainedY = Math.max(0, Math.min(window.innerHeight - rect.height, newY))
    }
    
    position.value = { x: constrainedX, y: constrainedY }
    updateVelocity(e.clientX, e.clientY)
    
    // Apply position using GSAP for smooth rendering
    gsap.set(element.value, {
      x: constrainedX,
      y: constrainedY
    })
    
    options.onDrag?.(position.value)
  }

  const handleMouseUp = () => {
    if (!isDragging.value) return
    
    isDragging.value = false
    
    // Apply inertia if enabled
    if (options.inertia && element.value) {
      const speed = Math.sqrt(velocity.value.x ** 2 + velocity.value.y ** 2)
      if (speed > 100) { // Only apply inertia if moving fast enough
        const duration = Math.min(2, speed / 1000) // Max 2 seconds
        const finalX = position.value.x + velocity.value.x * duration * 0.3
        const finalY = position.value.y + velocity.value.y * duration * 0.3
        
        gsap.to(element.value, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            if (element.value) {
              const transform = gsap.getProperty(element.value, "transform") as string
              const matrix = new DOMMatrix(transform)
              position.value = { x: matrix.e, y: matrix.f }
            }
          }
        })
      }
    }
    
    // Reset velocity
    velocity.value = { x: 0, y: 0 }
    
    options.onDragEnd?.()
    
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const enable = () => {
    dragState.isEnabled = true
  }

  const disable = () => {
    dragState.isEnabled = false
    if (isDragging.value) {
      handleMouseUp()
    }
  }

  const destroy = () => {
    disable()
    if (element.value) {
      element.value.removeEventListener('mousedown', handleMouseDown)
    }
  }

  onMounted(() => {
    if (element.value) {
      element.value.addEventListener('mousedown', handleMouseDown)
    }
  })

  onUnmounted(() => {
    destroy()
  })

  return {
    isDragging,
    position,
    velocity,
    enable,
    disable,
    destroy
  }
}