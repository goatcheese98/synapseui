<template>
  <NavigationMenuContent
    :class="cn(
      'absolute left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:w-auto',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <slot />
  </NavigationMenuContent>
</template>

<script setup lang="ts">
import { NavigationMenuContent } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>