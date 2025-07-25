<!--
  MobileNavItem Component
  Navigation item for mobile navigation
-->

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="cn(
      'flex items-center w-full px-3 py-3 text-base font-medium rounded-md transition-all duration-200',
      'hover:bg-accent hover:text-accent-foreground',
      active 
        ? 'bg-primary text-primary-text shadow-sm' 
        : 'text-text-secondary hover:text-text-primary',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      $attrs.class
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