<template>
  <Label
    :class="cn(
      'text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </Label>
</template>

<script setup lang="ts">
import { Label } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>