<template>
  <AccordionItem
    :class="cn('border-b', ($attrs.class as string | undefined) as string)"
    v-bind="$attrs"
    :value="$attrs.value as string?? ''"
  >
    <slot />
  </AccordionItem>
</template>

<script setup lang="ts">
import { AccordionItem } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>