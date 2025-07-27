<template>
  <AccordionHeader>
    <AccordionTrigger
      :class="cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        ($attrs.class as string | undefined) as string
      )"
      v-bind="$attrs"
    >
      <slot />
      <Icon
        icon="radix-icons:chevron-down"
        class="h-4 w-4 shrink-0 transition-transform duration-200"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>

<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
</script>