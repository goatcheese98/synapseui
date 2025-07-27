<template>
  <Primitive
    ref="buttonRef"
    :as="as"
    :asChild="asChild"
    :class="cn(buttonVariants({ variant, size }), ($attrs.class as string | undefined), 'edge-morph-button', pulseClass)"
    :data-state="loading ? 'loading' : 'idle'"
    :disabled="disabled || loading"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <span
      v-if="loading"
      class="loading-spinner"
      :style="{ width: `${getSpinnerSize()}px`, height: `${getSpinnerSize()}px` }"
    />
    
    <span :class="cn('button-content', loading && 'button-content-loading')">
      <WarpedText 
        v-if="enableTextWarp && $slots.default" 
        :text="getSlotText()" 
        :is-pressed="isPressed"
        :warp-type="textWarpType"
        :warp-intensity="textWarpIntensity"
      />
      <slot v-else />
    </span>
  </Primitive>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue'
import { Primitive } from 'reka-ui'
import { buttonVariants } from './button-variants'
import { cn } from '@/lib/utils'
import WarpedText from '@/components/ui/text/WarpedText.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl'
  as?: string | object
  asChild?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  // Text warping props
  enableTextWarp?: boolean
  textWarpType?: 'wave' | 'compress' | 'bend' | 'ripple'
  textWarpIntensity?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
  asChild: false,
  type: 'button',
  disabled: false,
  loading: false,
  enableTextWarp: true,
  textWarpType: 'compress',
  textWarpIntensity: 0.8
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Animation state
const buttonRef = ref<HTMLElement>()
const pulseClass = ref('')
const isPressed = ref(false)
const slots = useSlots()

const getSpinnerSize = () => {
  const sizeMap = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    'icon-xs': 12,
    'icon-sm': 14,
    'icon-md': 16,
    'icon-lg': 18,
    'icon-xl': 20
  }
  return sizeMap[props.size] || 16
}

// Extract text from slot for warping
const getSlotText = () => {
  if (!slots.default) return ''
  
  try {
    const vnodes = slots.default()
    if (vnodes && vnodes[0] && typeof vnodes[0].children === 'string') {
      return vnodes[0].children
    }
    // Fallback: try to extract text content
    return vnodes?.map(vnode => {
      if (typeof vnode.children === 'string') return vnode.children
      return ''
    }).join('') || ''
  } catch {
    return ''
  }
}

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    return
  }
  
  // Trigger press animation for text warp
  if (props.enableTextWarp) {
    isPressed.value = true
    setTimeout(() => {
      isPressed.value = false
    }, 150)
  }
  
  emit('click', event)
}

const handleMouseEnter = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  detectEntryCorner(event)
}

const handleMouseMove = (event: MouseEvent) => {
  // No action needed during mouse move
}

const handleMouseLeave = () => {
  // Clear any active pulse animation
  pulseClass.value = ''
}

const detectEntryCorner = (event: MouseEvent) => {
  if (!buttonRef.value) return
  
  // Get the actual DOM element from the Primitive component
  const element = buttonRef.value.$el || buttonRef.value
  if (!element || typeof element.getBoundingClientRect !== 'function') return
  
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  
  const threshold = 15 // pixels from corner to consider as corner entry
  
  // Clear any existing animation
  pulseClass.value = ''
  
  // Determine which corner cursor entered from and apply pulse
  let cornerClass = ''
  
  // Check corners first (more specific)
  if (x <= threshold && y <= threshold) {
    cornerClass = 'pulse-top-left'
  } else if (x >= rect.width - threshold && y <= threshold) {
    cornerClass = 'pulse-top-right'
  } else if (x <= threshold && y >= rect.height - threshold) {
    cornerClass = 'pulse-bottom-left'
  } else if (x >= rect.width - threshold && y >= rect.height - threshold) {
    cornerClass = 'pulse-bottom-right'
  }
  
  if (cornerClass) {
    // Small delay for class change to register
    setTimeout(() => {
      pulseClass.value = cornerClass
      // Remove class after animation completes
      setTimeout(() => {
        pulseClass.value = ''
      }, 500)
    }, 10)
  }
}
</script>

<style scoped>
.loading-spinner {
  display: inline-block;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

.button-content {
  transition: opacity 200ms ease-out;
}

.button-content-loading {
  opacity: 0.7;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Edge Pulse Animation System */
.edge-morph-button {
  position: relative;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Base hover state - removed scaling, only corner animations */
[data-state="idle"].edge-morph-button:hover {
  /* No transform - only corner pulse animations will play */
}

[data-state="idle"].edge-morph-button:active {
  transform: scale(0.98);
  transition: transform 100ms ease-out;
  /* Paper press effect - creates depth illusion */
  box-shadow: 
    inset 0 4px 8px rgba(0, 0, 0, 0.15),
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

[data-state="idle"].edge-morph-button:active .button-content {
  transform: translateY(1px) scale(0.98);
  filter: brightness(0.95);
  transition: all 100ms ease-out;
}

/* Corner pulse animations */
.pulse-top-left {
  animation: pulseTopLeftCorner 0.5s ease-out;
}

.pulse-top-right {
  animation: pulseTopRightCorner 0.5s ease-out;
}

.pulse-bottom-left {
  animation: pulseBottomLeftCorner 0.5s ease-out;
}

.pulse-bottom-right {
  animation: pulseBottomRightCorner 0.5s ease-out;
}

/* Keyframe animations for each corner */
@keyframes pulseTopLeftCorner {
  0% { border-radius: 6px; }
  50% { border-radius: 18px 6px 6px 6px; }
  100% { border-radius: 6px; }
}

@keyframes pulseTopRightCorner {
  0% { border-radius: 6px; }
  50% { border-radius: 6px 18px 6px 6px; }
  100% { border-radius: 6px; }
}

@keyframes pulseBottomLeftCorner {
  0% { border-radius: 6px; }
  50% { border-radius: 6px 6px 6px 18px; }
  100% { border-radius: 6px; }
}

@keyframes pulseBottomRightCorner {
  0% { border-radius: 6px; }
  50% { border-radius: 6px 6px 18px 6px; }
  100% { border-radius: 6px; }
}

/* Loading state */
[data-state="loading"] {
  cursor: wait;
}
</style>