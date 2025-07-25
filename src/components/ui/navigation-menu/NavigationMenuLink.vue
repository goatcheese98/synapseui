<template>
  <NavigationMenuLink
    :class="cn(
      'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1)',
      'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuLink>
</template>

<script setup lang="ts">
import { NavigationMenuLink } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>