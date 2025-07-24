<template>
  <div
    v-if="dockStore.isVisible"
    ref="dockElement"
    :class="floatingDockClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Dock Header -->
    <div class="dock-header" @mousedown="handleHeaderMouseDown">
      <div class="dock-title">
        <slot name="title">Floating Dock</slot>
      </div>
      <div class="dock-controls">
        <button
          class="dock-control-btn"
          @click="dockStore.toggleVisibility"
          aria-label="Minimize dock"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Dock Content -->
    <div class="dock-content">
      <!-- Active Panel Content -->
      <div v-if="dockStore.activePanelData" class="active-panel-content">
        <slot 
          name="panel" 
          :panel="dockStore.activePanelData"
          :isActive="true"
        />
      </div>

      <!-- Default Content -->
      <div v-else class="default-content">
        <slot name="default">
          <p class="text-muted-foreground text-sm">No active panels</p>
        </slot>
      </div>
    </div>

    <!-- Panel Tabs -->
    <div v-if="dockStore.visiblePanels.length > 0" class="dock-tabs">
      <button
        v-for="panel in dockStore.visiblePanels"
        :key="panel.id"
        :class="[
          'dock-tab',
          { 'dock-tab--active': panel.id === dockStore.activePanel }
        ]"
        @click="dockStore.setActivePanel(panel.id)"
      >
        {{ panel.title }}
      </button>
    </div>

    <!-- Resize Handle -->
    <div class="dock-resize-handle" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { gsap } from 'gsap'
import { useDockStore } from '@/lib/stores/useDockStore'
import { useDraggable } from '@/composables/useDraggable'
import { cn } from '@/lib/utils'

interface FloatingDockProps {
  initialPosition?: { x: number; y: number }
  width?: number
  height?: number
  className?: string
}

const props = withDefaults(defineProps<FloatingDockProps>(), {
  initialPosition: () => ({ x: 50, y: 50 }),
  width: 260,
  height: 180
})

const dockElement = ref<HTMLElement>()
const dockStore = useDockStore()
const isHovered = ref(false)

// Initialize draggable behavior with living interface effects
const { isDragging, position, velocity } = useDraggable(dockElement, {
  bounds: 'body',
  inertia: true,
  onDragStart: () => {
    dockStore.setDragging(true)
    // Add drag start effects
    if (dockElement.value) {
      gsap.to(dockElement.value, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out"
      })
    }
  },
  onDrag: (pos) => {
    // Velocity-based wake effects during drag
    if (dockElement.value) {
      const speed = Math.abs(velocity.value.x) + Math.abs(velocity.value.y)
      const intensity = Math.min(1, speed / 500) // Normalize speed to 0-1
      
      // Dynamic shadow based on velocity
      const shadowBlur = 25 + intensity * 25
      const shadowOpacity = 0.15 + intensity * 0.2
      
      gsap.set(dockElement.value, {
        boxShadow: `0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0, 0, 0, ${shadowOpacity})`,
        filter: `blur(${intensity * 0.5}px)`
      })
    }
  },
  onDragEnd: () => {
    dockStore.setDragging(false)
    dockStore.setPosition(position.value)
    
    // Reset drag effects
    if (dockElement.value) {
      gsap.to(dockElement.value, {
        scale: 1,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      })
    }
  }
})

// Computed classes with living interface animations
const floatingDockClasses = computed(() => cn(
  // Base styles
  'floating-dock',
  'fixed z-50 rounded-2xl shadow-xl',
  'backdrop-blur-xl bg-white/20 dark:bg-black/20',
  'border border-white/30 dark:border-white/10',
  'select-none overflow-hidden',
  
  // Size styles
  'w-70 h-50',
  
  // Animation states
  {
    'dock--dragging': isDragging.value,
    'dock--hovered': isHovered.value,
    'dock--active': dockStore.visiblePanels.length > 0
  },
  
  // Custom classes
  props.className
))

function handleMouseEnter() {
  isHovered.value = true
  
  // Pillar I: Edge morphing on cursor proximity
  if (dockElement.value && !isDragging.value) {
    gsap.to(dockElement.value, {
      scale: 1.01,
      rotationX: 2,
      rotationY: 1,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out"
    })
    
    // Subtle glow effect
    gsap.to(dockElement.value, {
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 20px rgba(59, 130, 246, 0.1)",
      duration: 0.3
    })
  }
}

function handleMouseLeave() {
  isHovered.value = false
  
  // Reset edge morphing
  if (dockElement.value && !isDragging.value) {
    gsap.to(dockElement.value, {
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      duration: 0.4,
      ease: "power2.out"
    })
  }
}

function handleHeaderMouseDown(event: MouseEvent) {
  // Prevent text selection during drag
  event.preventDefault()
}

// Pillar II: Environment aliveness - subtle breathing effect
onMounted(() => {
  // Set initial position
  if (dockElement.value) {
    dockStore.setPosition(props.initialPosition)
    
    // Initial position with GSAP
    gsap.set(dockElement.value, {
      x: props.initialPosition.x,
      y: props.initialPosition.y
    })
    
    // Subtle breathing animation when idle
    const breathingTl = gsap.timeline({ repeat: -1, yoyo: true })
    breathingTl.to(dockElement.value, {
      scale: 1.005,
      duration: 3,
      ease: "sine.inOut"
    })
  }
})
</script>

<style scoped>
.floating-dock {
  will-change: transform;
  transform-style: preserve-3d;
  border-radius: 1rem;
}

.dock--dragging {
  cursor: grabbing;
  user-select: none;
}

.dock-header {
  @apply flex items-center justify-between p-3;
  @apply border-b border-white/20 dark:border-white/10;
  @apply bg-white/10 dark:bg-white/5;
  @apply rounded-t-2xl;
  cursor: grab;
  backdrop-filter: blur(8px);
}

.dock-header:active {
  cursor: grabbing;
}

.dock-title {
  @apply text-sm font-medium text-foreground;
}

.dock-controls {
  @apply flex items-center gap-1;
}

.dock-control-btn {
  @apply w-6 h-6 flex items-center justify-center;
  @apply rounded hover:bg-white/20 dark:hover:bg-white/10;
  @apply transition-colors duration-200;
  @apply text-foreground/60 hover:text-foreground;
}

.dock-content {
  @apply flex-1 p-4 overflow-auto;
  min-height: 120px;
  background: transparent;
}

.active-panel-content {
  @apply h-full;
}

.default-content {
  @apply flex items-center justify-center h-full;
}

.dock-tabs {
  @apply flex rounded-b-2xl;
  @apply border-t border-white/20 dark:border-white/10;
  @apply bg-white/5 dark:bg-white/3;
  backdrop-filter: blur(8px);
}

.dock-tab {
  @apply flex-1 px-3 py-2 text-xs font-medium;
  @apply text-foreground/80 hover:text-foreground;
  @apply border-r border-white/10 dark:border-white/5 last:border-r-0;
  @apply transition-all duration-200;
  @apply hover:bg-white/10 dark:hover:bg-white/5;
}

.dock-tab--active {
  @apply text-primary bg-white/20 dark:bg-white/10;
  @apply border-t-2 border-t-primary;
}

.dock-resize-handle {
  @apply absolute bottom-0 right-0 w-3 h-3;
  @apply cursor-se-resize opacity-0 hover:opacity-100;
  @apply transition-opacity duration-200;
  background: conic-gradient(from 45deg, transparent, currentColor, transparent);
  clip-path: polygon(100% 0%, 0% 100%, 100% 100%);
}

.dock-resize-handle:hover {
  @apply text-primary;
}
</style>