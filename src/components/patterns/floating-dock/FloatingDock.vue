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
import { ref, onMounted, computed } from 'vue'
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
  initialPosition: () => ({ x: 100, y: 100 }),
  width: 320,
  height: 240
})

const dockElement = ref<HTMLElement>()
const dockStore = useDockStore()
const isHovered = ref(false)

// Initialize draggable behavior
const { isDragging, position } = useDraggable(dockElement, {
  bounds: 'body',
  inertia: true,
  onDragStart: () => {
    dockStore.setDragging(true)
  },
  onDragEnd: () => {
    dockStore.setDragging(false)
    dockStore.setPosition(position.value)
  }
})

// Computed classes with living interface animations
const floatingDockClasses = computed(() => cn(
  // Base styles
  'floating-dock',
  'fixed z-50 bg-card border border-border rounded-lg shadow-xl',
  'backdrop-blur-md bg-opacity-95',
  'select-none overflow-hidden',
  
  // Size styles
  'min-w-64 min-h-48',
  
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
}

function handleMouseLeave() {
  isHovered.value = false
}

function handleHeaderMouseDown(event: MouseEvent) {
  // Prevent text selection during drag
  event.preventDefault()
}

onMounted(() => {
  // Set initial position
  if (dockElement.value) {
    dockStore.setPosition(props.initialPosition)
  }
})
</script>

<style scoped>
.floating-dock {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.floating-dock:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.dock--dragging {
  cursor: grabbing;
  user-select: none;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
}

.dock--hovered {
  transform: scale(1.01);
}

.dock-header {
  @apply flex items-center justify-between p-3 border-b border-border;
  @apply bg-gradient-to-r from-background to-muted/50;
  cursor: grab;
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
  @apply rounded hover:bg-accent hover:text-accent-foreground;
  @apply transition-colors duration-200;
  @apply text-muted-foreground hover:text-foreground;
}

.dock-content {
  @apply flex-1 p-4 overflow-auto;
  min-height: 120px;
}

.active-panel-content {
  @apply h-full;
}

.default-content {
  @apply flex items-center justify-center h-full;
}

.dock-tabs {
  @apply flex border-t border-border bg-muted/30;
}

.dock-tab {
  @apply flex-1 px-3 py-2 text-xs font-medium;
  @apply text-muted-foreground hover:text-foreground;
  @apply border-r border-border last:border-r-0;
  @apply transition-all duration-200;
  @apply hover:bg-accent/50;
}

.dock-tab--active {
  @apply text-primary bg-primary/10;
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