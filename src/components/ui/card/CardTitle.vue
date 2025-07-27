<template>
  <component
    :is="as"
    :class="cn(titleClasses, ($attrs.class as string | undefined))"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface CardTitleProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  colorScheme?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted'
}

const props = withDefaults(defineProps<CardTitleProps>(), {
  as: 'h3',
  size: 'md',
  colorScheme: 'default'
})

const titleClasses = computed(() => {
  const baseClasses = 'font-semibold leading-tight tracking-tight'
  
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  const colorSchemeClasses = {
    default: '',
    primary: 'text-primary',
    secondary: 'text-secondary-foreground',
    accent: 'text-accent-foreground',
    muted: 'text-muted-foreground'
  }

  return cn(
    baseClasses,
    sizeClasses[props.size],
    colorSchemeClasses[props.colorScheme]
  )
})
</script>