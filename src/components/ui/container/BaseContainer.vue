<template>
  <div
    :class="cn(
      'mx-auto w-full',
      {
        'max-w-screen-sm': size === 'sm',
        'max-w-screen-md': size === 'md', 
        'max-w-screen-lg': size === 'lg',
        'max-w-screen-xl': size === 'xl',
        'max-w-screen-2xl': size === '2xl',
        'max-w-none': size === 'full'
      },
      {
        'px-4': padding && size !== 'full',
        'px-6': padding && (size === 'lg' || size === 'xl' || size === '2xl'),
        'px-8': padding && size === '2xl'
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
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'lg',
  padding: true
})
</script>