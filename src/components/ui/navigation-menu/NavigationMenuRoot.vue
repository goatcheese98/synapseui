<template>
  <NavigationMenuRoot
    :class="cn(
      'relative z-10 flex max-w-max flex-1 items-center justify-center',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuRoot>
</template>

<script setup lang="ts">
import { NavigationMenuRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>