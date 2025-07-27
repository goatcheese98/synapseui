<template>
  <component
    :is="as"
    :class="cn(descriptionClasses, ($attrs.class as string | undefined))"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface CardDescriptionProps {
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'md'
  colorScheme?: 'default' | 'muted' | 'secondary'
}

const props = withDefaults(defineProps<CardDescriptionProps>(), {
  as: 'p',
  size: 'sm',
  colorScheme: 'default'
})

const descriptionClasses = computed(() => {
  const baseClasses = 'leading-relaxed'
  
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base'
  }

  const colorSchemeClasses = {
    default: 'text-muted-foreground',
    muted: 'text-muted-foreground/80',
    secondary: 'text-secondary-foreground'
  }

  return cn(
    baseClasses,
    sizeClasses[props.size],
    colorSchemeClasses[props.colorScheme]
  )
})
</script>