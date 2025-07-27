<template>
  <RadioGroupItem
    :class="cn(
      'aspect-square h-4 w-4 rounded-full border border-primary ring-offset-background transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:border-primary',
      'hover:border-primary/80 hover:shadow-sm',
      ($attrs.class as string | undefined)
    )"
    v-bind="$attrs"
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <div class="h-2 w-2 rounded-full bg-primary" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>

<script setup lang="ts">
import { RadioGroupItem, RadioGroupIndicator } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>