<template>
  <NavigationMenuItem v-bind="$attrs">
    <slot />
  </NavigationMenuItem>
</template>

<script setup lang="ts">
import { NavigationMenuItem } from 'reka-ui'
</script>