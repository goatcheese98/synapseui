<template>
  <AlertDialogDescription
    :class="cn(
      'text-sm text-muted-foreground',
      ($attrs.class as string | undefined) as string
    )"
    v-bind="$attrs"
  >
    <slot />
  </AlertDialogDescription>
</template>

<script setup lang="ts">
import { AlertDialogDescription } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>