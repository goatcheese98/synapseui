<template>
  <AlertDialogTitle
    :class="cn(
      'text-lg font-semibold',
      ($attrs.class as string | undefined) as string
    )"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogTitle>
</template>

<script setup lang="ts">
import { AlertDialogTitle } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>