<template>
  <div :class="dockClasses">
    <div class="flex items-center gap-2">
      <slot name="icon" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface FloatingDockProps {
  variant?: 'default' | 'compact' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  position?: 'bottom' | 'top' | 'left' | 'right'
  className?: string
}

const props = withDefaults(defineProps<FloatingDockProps>(), {
  variant: 'default',
  size: 'md',
  position: 'bottom',
})

const dockClasses = computed(() => cn(
  // Base styles
  'fixed z-50 rounded-xl backdrop-blur-xl',
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