<template>
  <div
    :class="cn(
      'flex',
      {
        'flex-col': direction === 'vertical',
        'flex-row': direction === 'horizontal',
        'flex-col-reverse': direction === 'vertical-reverse',
        'flex-row-reverse': direction === 'horizontal-reverse'
      },
      {
        'justify-start': align === 'start',
        'justify-center': align === 'center', 
        'justify-end': align === 'end',
        'justify-between': align === 'between',
        'justify-around': align === 'around',
        'justify-evenly': align === 'evenly'
      },
      {
        'items-start': justify === 'start',
        'items-center': justify === 'center',
        'items-end': justify === 'end',
        'items-stretch': justify === 'stretch',
        'items-baseline': justify === 'baseline'
      },
      {
        'gap-1': spacing === 'xs',
        'gap-2': spacing === 'sm',
        'gap-4': spacing === 'md',
        'gap-6': spacing === 'lg',
        'gap-8': spacing === 'xl',
        'gap-12': spacing === '2xl'
      },
      {
        'flex-wrap': wrap,
        'flex-nowrap': !wrap
      },
      ($attrs.class as string | undefined)
    )"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  direction?: 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse'
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  align?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  justify?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  wrap?: boolean
}

withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  spacing: 'md',
  align: 'start',
  justify: 'stretch',
  wrap: false
})
</script>