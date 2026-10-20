<template>
  <ToastAction
    ref="actionRef"
    :class="cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium ring-offset-background transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1)',
      'hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      ($attrs.class as string | undefined),
      activeAnimation
    )"
    v-bind="{ ...$attrs, ...props }"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </ToastAction>
</template>

<script setup lang="ts">
import { type ComponentPublicInstance, ref } from 'vue'
import { type ToastActionProps, ToastAction } from 'reka-ui'
import { cn } from '@/lib/utils'

const actionRef = ref<HTMLElement | ComponentPublicInstance>()
const props = defineProps<ToastActionProps>()
const activeAnimation = ref('')

const handleMouseEnter = (event: MouseEvent) => {
  detectCornerEntry(event)
}

const handleMouseMove = (_event: MouseEvent) => {
  // Future enhancements
}

const handleMouseLeave = () => {
  activeAnimation.value = ''
}

const detectCornerEntry = (event: MouseEvent) => {
  if (!actionRef.value) return
  
  const element = ('$el' in actionRef.value ? actionRef.value.$el : actionRef.value)
  if (!element || typeof element.getBoundingClientRect !== 'function') return
  
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const threshold = 12 // Smaller threshold for action buttons
  
  let cornerClass = ''
  
  if (x <= threshold && y <= threshold) {
    cornerClass = 'corner-top-left'
  } else if (x >= rect.width - threshold && y <= threshold) {
    cornerClass = 'corner-top-right'
  } else if (x <= threshold && y >= rect.height - threshold) {
    cornerClass = 'corner-bottom-left'
  } else if (x >= rect.width - threshold && y >= rect.height - threshold) {
    cornerClass = 'corner-bottom-right'
  }
  
  if (cornerClass) {
    activeAnimation.value = cornerClass
    setTimeout(() => {
      if (activeAnimation.value === cornerClass) {
        activeAnimation.value = ''
      }
    }, 400)
  }
}
</script>

<style scoped>
/* Corner detection animations */
.corner-top-left {
  border-radius: 18px 6px 6px 6px;
  transform: scale(1.02);
}

.corner-top-right {
  border-radius: 6px 18px 6px 6px;
  transform: scale(1.02);
}

.corner-bottom-left {
  border-radius: 6px 6px 6px 18px;
  transform: scale(1.02);
}

.corner-bottom-right {
  border-radius: 6px 6px 18px 6px;
  transform: scale(1.02);
}
</style>