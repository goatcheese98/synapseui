<template>
  <div
    ref="dock"
    :class="[dockClasses, { 'floating-dock--dragging': isDragging }]"
    :data-dragging="isDragging"
  >
    <button
      v-if="draggable"
      type="button"
      class="dock-drag-handle"
      aria-label="Drag dock"
      :aria-pressed="isDragging"
    >
      <slot name="handle">
        Move dock
      </slot>
    </button>
    <div class="flex items-center gap-2">
      <slot name="icon" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDraggable } from '@/composables/useDraggable'
import { cn } from '@/lib/utils'

interface FloatingDockProps {
  variant?: 'default' | 'compact' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  position?: 'bottom' | 'top' | 'left' | 'right'
  draggable?: boolean
  bounds?: string | HTMLElement
  inertia?: boolean
  className?: string
}

const props = withDefaults(defineProps<FloatingDockProps>(), {
  variant: 'default',
  size: 'md',
  position: 'bottom',
  draggable: false,
  bounds: 'body',
  inertia: false,
  className: ''
})

const dock = ref<HTMLElement>()
const { isDragging, enable, disable } = useDraggable(dock, {
  handle: '.dock-drag-handle', get bounds() { return props.bounds }, get inertia() { return props.inertia },
})
watch(() => props.draggable, value => value ? enable() : disable(), { immediate: true })

const dockClasses = computed(() => cn(
  // Base styles
  'floating-dock fixed z-50 rounded-xl backdrop-blur-xl',
  'border border-white/20 dark:border-gray-800/50',
  'bg-white/80 dark:bg-gray-900/80',
  'shadow-lg hover:shadow-xl transition-shadow duration-200',
  
  // Size variants
  {
    'px-3 py-2 text-sm': props.size === 'sm',
    'px-4 py-3 text-base': props.size === 'md',
    'px-5 py-4 text-lg': props.size === 'lg',
  },
  
  // Position variants
  {
    'bottom-6 left-1/2 -translate-x-1/2': props.position === 'bottom',
    'top-6 left-1/2 -translate-x-1/2': props.position === 'top',
    'left-6 top-1/2 -translate-y-1/2 flex-col': props.position === 'left',
    'right-6 top-1/2 -translate-y-1/2 flex-col': props.position === 'right',
  },
  
  // Style variants
  {
    // Default variant
    'bg-white/80 dark:bg-gray-900/80': props.variant === 'default',
    
    // Compact variant
    'bg-gray-100/90 dark:bg-gray-800/90 rounded-full': props.variant === 'compact',
    
    // Minimal variant
    'bg-transparent backdrop-blur-none border-none shadow-none': props.variant === 'minimal',
  },
  
  props.className
))
</script>
<style scoped>
.dock-drag-handle { display: block; width: 100%; min-height: 44px; padding: 6px 12px; cursor: grab; touch-action: none; user-select: none; font: inherit; color: inherit; border-bottom: 1px solid currentColor; }
.floating-dock--dragging .dock-drag-handle { cursor: grabbing; }
.dock-drag-handle:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
.floating-dock.floating-dock--dragging { box-shadow: 0 0 0 2px currentColor; transition: none; }
</style>
