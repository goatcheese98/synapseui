<template>
  <ToastTitle
    :class="cn(
      'text-sm font-semibold',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </ToastTitle>
</template>

<script setup lang="ts">
import { ToastTitle } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>