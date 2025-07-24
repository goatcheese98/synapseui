import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface DraggableOptions {
  bounds?: HTMLElement | string | { minX?: number; maxX?: number; minY?: number; maxY?: number }
  inertia?: boolean
  edgeResistance?: number
  onDragStart?: (event: Event) => void
  onDrag?: (event: Event) => void
  onDragEnd?: (event: Event) => void
  disabled?: boolean
}

export interface DraggableReturn {
  isDragging: Ref<boolean>
  position: Ref<{ x: number; y: number }>
  enable: () => void
  disable: () => void
  updatePosition: (x: number, y: number) => void
  destroy: () => void
}

export function useDraggable(
  target: Ref<HTMLElement | undefined>,
  options: DraggableOptions = {}
): DraggableReturn {
  const isDragging = ref(false)
  const position = ref({ x: 0, y: 0 })
  let draggableInstance: any = null
  let gsap: any = null
  let Draggable: any = null

  const {
    bounds = 'body',
    inertia = true,
    edgeResistance = 0.65,
    onDragStart,
    onDrag,
    onDragEnd,
    disabled = false
  } = options

  async function loadGSAP() {
    if (typeof window === 'undefined') return false
    
    try {
      const gsapModule = await import('gsap')
      const draggableModule = await import('gsap/Draggable')
      gsap = gsapModule.gsap
      Draggable = draggableModule.Draggable
      gsap.registerPlugin(Draggable)
      return true
    } catch (error) {
      console.warn('GSAP not available:', error)
      return false
    }
  }

  async function initDraggable() {
    if (!target.value || draggableInstance) return

    const gsapLoaded = await loadGSAP()
    if (!gsapLoaded) {
      // Fallback to basic dragging without GSAP
      initBasicDragging()
      return
    }

    draggableInstance = Draggable.create(target.value, {
      type: 'x,y',
      bounds,
      edgeResistance,
      inertia: inertia ? {
        resistance: 300,
        velocityScale: 0.8
      } : false,
      
      onDragStart() {
        isDragging.value = true
        
        // Apply cursor physics - increase scale slightly when dragging starts
        if (target.value && gsap) {
          gsap.to(target.value, {
            scale: 1.02,
            duration: 0.2,
            ease: 'power2.out'
          })
        }
        
        onDragStart?.(arguments[0])
      },
      
      onDrag() {
        // Update position reactive ref
        if (target.value && gsap) {
          const transform = gsap.getProperty(target.value, 'transform') as string
          const matrix = new DOMMatrix(transform)
          position.value = { x: matrix.m41, y: matrix.m42 }
        }
        
        onDrag?.(arguments[0])
      },
      
      onDragEnd() {
        isDragging.value = false
        
        // Apply physics-based settling animation
        if (target.value && gsap) {
          gsap.to(target.value, {
            scale: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.75)'
          })
        }
        
        // Add subtle magnetic attraction to viewport edges
        if (target.value && typeof window !== 'undefined') {
          const rect = target.value.getBoundingClientRect()
          const viewportWidth = window.innerWidth
          const viewportHeight = window.innerHeight
          const threshold = 50 // Distance from edge to trigger magnetic effect
          
          let magneticX = position.value.x
          let magneticY = position.value.y
          
          // Magnetic attraction to left/right edges
          if (rect.left < threshold) {
            magneticX = 0
          } else if (rect.right > viewportWidth - threshold) {
            magneticX = viewportWidth - rect.width
          }
          
          // Magnetic attraction to top/bottom edges
          if (rect.top < threshold) {
            magneticY = 0
          } else if (rect.bottom > viewportHeight - threshold) {
            magneticY = viewportHeight - rect.height
          }
          
          // Apply magnetic animation if position changed
          if (magneticX !== position.value.x || magneticY !== position.value.y) {
            if (gsap) {
              gsap.to(target.value, {
                x: magneticX,
                y: magneticY,
                duration: 0.5,
                ease: 'power3.out'
              })
            }
            position.value = { x: magneticX, y: magneticY }
          }
        }
        
        onDragEnd?.(arguments[0])
      }
    })

    if (disabled) {
      draggableInstance[0]?.disable()
    }
  }

  function initBasicDragging() {
    // Simple fallback dragging without GSAP
    if (!target.value) return

    let isDraggingNow = false
    let startX = 0
    let startY = 0
    let initialX = 0
    let initialY = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingNow = true
      isDragging.value = true
      startX = e.clientX
      startY = e.clientY
      const rect = target.value!.getBoundingClientRect()
      initialX = rect.left
      initialY = rect.top
      onDragStart?.(e)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingNow || !target.value) return
      
      const x = initialX + (e.clientX - startX)
      const y = initialY + (e.clientY - startY)
      
      target.value.style.transform = `translate(${x}px, ${y}px)`
      position.value = { x, y }
      onDrag?.(e)
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDraggingNow) return
      isDraggingNow = false
      isDragging.value = false
      onDragEnd?.(e)
    }

    target.value.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    draggableInstance = {
      destroy: () => {
        if (target.value) {
          target.value.removeEventListener('mousedown', handleMouseDown)
        }
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      },
      enable: () => {},
      disable: () => {}
    }
  }

  function enable() {
    if (draggableInstance?.enable) {
      draggableInstance.enable()
    } else if (draggableInstance?.[0]?.enable) {
      draggableInstance[0].enable()
    }
  }

  function disable() {
    if (draggableInstance?.disable) {
      draggableInstance.disable()
    } else if (draggableInstance?.[0]?.disable) {
      draggableInstance[0].disable()
    }
  }

  function updatePosition(x: number, y: number) {
    if (target.value) {
      if (gsap) {
        gsap.set(target.value, { x, y })
      } else {
        target.value.style.transform = `translate(${x}px, ${y}px)`
      }
      position.value = { x, y }
    }
  }

  function destroy() {
    if (draggableInstance) {
      if (draggableInstance.destroy) {
        draggableInstance.destroy()
      } else if (draggableInstance[0]?.kill) {
        draggableInstance[0].kill()
      }
      draggableInstance = null
    }
  }

  onMounted(() => {
    // Wait for next tick to ensure target.value is available
    setTimeout(initDraggable, 0)
  })

  onUnmounted(() => {
    destroy()
  })

  return {
    isDragging,
    position,
    enable,
    disable,
    updatePosition,
    destroy
  }
}