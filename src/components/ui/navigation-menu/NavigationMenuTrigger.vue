<template>
  <NavigationMenuTrigger
    :class="cn(
      'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1)',
      'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
      ($attrs.class as string | undefined)
    )"
    v-bind="$attrs"
  >
    <slot />
    <Icon 
      icon="lucide:chevron-down" 
      class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" 
      aria-hidden="true" 
    />
  </NavigationMenuTrigger>
</template>

<script setup lang="ts">
import { NavigationMenuTrigger } from 'reka-ui'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
</script>