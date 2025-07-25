<template>
  <AlertDialogCancel
:class="cn(
      'btn',
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      'btn-md h-10 px-4 py-2',
      'mt-2 sm:mt-0',
      variant === 'neutral' && 'btn-neutral bg-secondary text-secondary-foreground hover:bg-secondary/80',
      variant === 'primary' && 'btn-primary bg-primary text-primary-foreground hover:bg-primary/90',
      variant === 'secondary' && 'btn-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80',
      variant === 'accent' && 'btn-accent bg-accent text-accent-foreground hover:bg-accent/90',
      variant === 'info' && 'btn-info bg-info text-info-foreground hover:bg-info/90',
      variant === 'success' && 'btn-success bg-success text-success-foreground hover:bg-success/90',
      variant === 'warning' && 'btn-warning bg-warning text-warning-foreground hover:bg-warning/90',
      variant === 'error' && 'btn-error bg-destructive text-destructive-foreground hover:bg-destructive/90',
      style === 'outline' && 'btn-outline border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      style === 'ghost' && 'btn-ghost hover:bg-accent hover:text-accent-foreground',
      style === 'link' && 'btn-link text-primary underline-offset-4 hover:underline',
      !variant && !style && 'btn-outline border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogCancel>
</template>

<script setup lang="ts">
import { AlertDialogCancel } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  style?: 'outline' | 'dash' | 'soft' | 'ghost' | 'link'
}

withDefaults(defineProps<Props>(), {
  style: 'outline'
})
</script>