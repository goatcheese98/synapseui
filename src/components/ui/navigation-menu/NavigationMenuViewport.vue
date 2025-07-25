<template>
  <div class="absolute left-0 top-full z-50 flex justify-center">
    <NavigationMenuViewport
      :class="cn(
        'origin-top-center relative mt-1.5 h-[var(--reka-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover/95 backdrop-blur-sm text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:w-[var(--reka-navigation-menu-viewport-width)]',
        $attrs.class
      )"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
import { NavigationMenuViewport } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>