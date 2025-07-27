<!--
  NavItem Component
  Navigation item for desktop navigation
-->

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="cn(
      'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      active 
        ? 'bg-primary text-primary-text shadow-sm' 
        : 'text-text-secondary hover:text-text-primary',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ($attrs.class as string | undefined)
    )"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  href?: string
  active?: boolean
  disabled?: boolean
  class?: string
}

interface Emits {
  (e: 'click', event: Event): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>