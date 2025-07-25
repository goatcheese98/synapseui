<template>
  <div
    :class="cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200',
      $attrs.class
    )"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>