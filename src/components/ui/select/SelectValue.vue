<template>
  <SelectValue v-bind="$attrs">
    <slot />
  </SelectValue>
</template>

<script setup lang="ts">
import { SelectValue } from 'reka-ui'
</script>