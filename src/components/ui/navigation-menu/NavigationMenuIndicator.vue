<template>
  <NavigationMenuIndicator
    :class="cn(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuIndicator>
</template>

<script setup lang="ts">
import { NavigationMenuIndicator } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>