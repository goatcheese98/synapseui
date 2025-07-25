<template>
  <ToastDescription
    :class="cn(
      'text-sm opacity-90',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </ToastDescription>
</template>

<script setup lang="ts">
import { ToastDescription } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>