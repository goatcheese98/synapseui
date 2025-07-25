<template>
  <SeparatorRoot
    :class="cn(
      'shrink-0 bg-border',
      {
        'h-px w-full': orientation === 'horizontal',
        'w-px h-full': orientation === 'vertical'
      },
      $attrs.class
    )"
    :orientation="orientation"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { Separator as SeparatorRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal'
})
</script>