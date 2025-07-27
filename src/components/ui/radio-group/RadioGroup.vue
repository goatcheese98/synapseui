<template>
  <RadioGroupRoot
    :class="cn('grid gap-2', ($attrs.class as string | undefined))"
    v-bind="$attrs"
  >
    <slot />
  </RadioGroupRoot>
</template>

<script setup lang="ts">
import { RadioGroupRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
</script>