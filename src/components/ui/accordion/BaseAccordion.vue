<template>
  <AccordionRoot
    :class="cn('w-full', $attrs.class as string)"
    v-bind="$attrs"
  >
    <slot />
  </AccordionRoot>
</template>

<script setup lang="ts">
import { AccordionRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>