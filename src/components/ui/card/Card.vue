<template>
  <div
    :class="cn(
      cardClasses,
      ($attrs.class as string | undefined)
    )"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface CardProps {
  variant?: 'default' | 'outline' | 'filled' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  colorScheme?: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'muted'
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  size: 'md',
  colorScheme: 'default'
})

const cardClasses = computed(() => {
  const baseClasses = 'rounded-lg transition-all duration-200'
  
  const variantClasses = {
    default: 'border bg-card text-card-foreground shadow-sm',
    outline: 'border-2 bg-transparent text-foreground',
    filled: 'border-0 bg-primary text-primary-foreground shadow-md',
    ghost: 'border-0 bg-transparent text-foreground hover:bg-accent/50'
  }

  const sizeClasses = {
    sm: 'text-sm max-w-sm',
    md: 'text-base max-w-md',
    lg: 'text-lg max-w-lg'
  }

  const colorSchemeClasses = {
    default: '',
    primary: 'border-primary/20 bg-primary/5 text-primary-foreground',
    secondary: 'border-secondary/20 bg-secondary/5 text-secondary-foreground',
    accent: 'border-accent/20 bg-accent/5 text-accent-foreground',
    destructive: 'border-destructive/20 bg-destructive/5 text-destructive-foreground',
    muted: 'border-muted/20 bg-muted/5 text-muted-foreground'
  }

  return cn(
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.colorScheme !== 'default' && colorSchemeClasses[props.colorScheme]
  )
})
</script>