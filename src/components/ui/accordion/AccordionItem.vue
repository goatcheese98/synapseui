<template>
  <AccordionItem
    :class="cn('border-b', $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
  </AccordionItem>
</template>

<script setup lang="ts">
import { AccordionItem } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>