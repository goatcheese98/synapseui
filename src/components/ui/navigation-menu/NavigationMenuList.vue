<template>
  <NavigationMenuList
    :class="cn(
      'group relative flex flex-1 list-none items-center justify-center space-x-1',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuList>
</template>

<script setup lang="ts">
import { NavigationMenuList } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>