<template>
  <div
    :class="cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      ($attrs.class as string | undefined) as string
    )"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>