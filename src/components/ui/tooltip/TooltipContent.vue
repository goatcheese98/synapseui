<template>
  <TooltipPortal>
    <TooltipContentPrimitive
      :class="cn(
        'z-50 overflow-hidden rounded-md border-2 border-slate-300 bg-white/70 backdrop-blur-sm px-3 py-1.5 text-sm text-slate-800 shadow-lg animate-fade-in',
        'data-[state=closed]:animate-fade-out',
        $attrs.class
      )"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      v-bind="$attrs"
    >
      <slot />
    </TooltipContentPrimitive>
  </TooltipPortal>
</template>

<script setup lang="ts">
import { TooltipContent as TooltipContentPrimitive, TooltipPortal } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props {
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  avoidCollisions?: boolean
}

withDefaults(defineProps<Props>(), {
  side: 'top',
  sideOffset: 4,
  align: 'center',
  alignOffset: 0,
  avoidCollisions: true
})
</script>