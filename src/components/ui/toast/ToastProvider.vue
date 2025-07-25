<template>
  <ToastProvider
    :duration="5000"
    :swipe-direction="'right'"
    v-bind="$attrs"
  >
    <slot />
  </ToastProvider>
</template>

<script setup lang="ts">
import { ToastProvider } from 'reka-ui'
</script>