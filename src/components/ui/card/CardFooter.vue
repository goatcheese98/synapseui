<template>
  <div
    :class="cn(footerClasses, $attrs.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface CardFooterProps {
  size?: 'sm' | 'md' | 'lg'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  align?: 'start' | 'center' | 'end'
}

const props = withDefaults(defineProps<CardFooterProps>(), {
  size: 'md',
  justify: 'start',
  align: 'center'
})

const footerClasses = computed(() => {
  const baseClasses = 'flex'
  
  const sizeClasses = {
    sm: 'px-3 pt-0 pb-3',
    md: 'px-6 pt-0 pb-6',
    lg: 'px-8 pt-0 pb-8'
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  }

  return cn(
    baseClasses,
    sizeClasses[props.size],
    justifyClasses[props.justify],
    alignClasses[props.align]
  )
})
</script>