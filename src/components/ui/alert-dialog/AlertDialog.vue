<template>
  <AlertDialogRoot
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import { AlertDialogRoot } from 'reka-ui'
</script>