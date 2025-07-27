<template>
  <HoverCardTrigger
    :class="cn(
      'inline-block cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      ($attrs.class as string | undefined)
    )"
    v-bind="$attrs"
  >
    <slot />
  </HoverCardTrigger>
</template>

<script setup lang="ts">
import { HoverCardTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>