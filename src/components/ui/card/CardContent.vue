<template>
  <div
    :class="cn(contentClasses, $attrs.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface CardContentProps {
  size?: 'sm' | 'md' | 'lg'
  noPadding?: boolean
}

const props = withDefaults(defineProps<CardContentProps>(), {
  size: 'md',
  noPadding: false
})

const contentClasses = computed(() => {
  if (props.noPadding) return ''
  
  const sizeClasses = {
    sm: 'px-3 pb-3 pt-2',
    md: 'px-6 pb-6 pt-0',
    lg: 'px-8 pb-8 pt-2'
  }

  return sizeClasses[props.size]
})
</script>