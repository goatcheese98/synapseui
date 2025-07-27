<template>
  <svg
    :class="cn('animate-spin', className)"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-dasharray="31.416"
      stroke-dashoffset="31.416"
      opacity="0.3"
    />
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-dasharray="31.416"
      stroke-dashoffset="23.562"
      class="animate-spin"
    />
  </svg>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: number
  class?: string
}

withDefaults(defineProps<LoadingSpinnerProps>(), {
  size: 16,
  class: ''
})

const className = defineModel<string>('class')
</script>