<template>
  <div
    :class="cn(headerClasses, $attrs.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface CardHeaderProps {
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center' | 'right'
  spacing?: 'tight' | 'normal' | 'loose'
}

const props = withDefaults(defineProps<CardHeaderProps>(), {
  size: 'md',
  align: 'left',
  spacing: 'normal'
})

const headerClasses = computed(() => {
  const baseClasses = 'flex flex-col'
  
  const sizeClasses = {
    sm: 'p-3 pb-2',
    md: 'p-6 pb-0',
    lg: 'p-8 pb-2'
  }

  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  }

  const spacingClasses = {
    tight: 'space-y-1',
    normal: 'space-y-1.5',
    loose: 'space-y-3'
  }

  return cn(
    baseClasses,
    sizeClasses[props.size],
    alignClasses[props.align],
    spacingClasses[props.spacing]
  )
})
</script>