<template>
  <CheckboxRoot
    :class="cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
      'hover:border-primary/80 hover:shadow-sm',
      $attrs.class
    )"
    v-bind="$attrs"
  >
    <CheckboxIndicator
      :class="cn('flex items-center justify-center text-current')"
    >
      <Icon icon="lucide:check" class="h-3 w-3" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<script setup lang="ts">
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
</script>