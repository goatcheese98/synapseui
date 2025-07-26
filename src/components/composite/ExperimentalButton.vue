<template>
  <Primitive
    ref="buttonRef"
    :as="as"
    :asChild="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class, 'experimental-button', activeAnimation)"
    :data-state="loading ? 'loading' : 'idle'"
    :disabled="disabled || loading"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <div class="button-background" :class="rippleClass"></div>
    
    <span
      v-if="loading"
      class="loading-spinner"
      :style="{ width: `${getSpinnerSize()}px`, height: `${getSpinnerSize()}px` }"
    />
    
    <span :class="cn('button-content', loading && 'button-content-loading')">
      <slot />
    </span>
  </Primitive>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Primitive } from 'reka-ui'
import { buttonVariants } from './variants'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'outline' | 'outline-primary' | 'outline-success' | 'outline-error' | 'ghost' | 'ghost-primary' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl'
  as?: string | object
  asChild?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  experiment?: 'ripple' | 'glow' | 'morph' | 'breathe' | 'shimmer' | 'float' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md',
  as: 'button',
  asChild: false,
  type: 'button',
  disabled: false,
  loading: false,
  experiment: 'default'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonRef = ref<HTMLElement>()
const activeAnimation = ref('')
const rippleClass = ref('')
const isPressed = ref(false)
const hoverPosition = ref({ x: 0, y: 0 })

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

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  
  if (props.experiment === 'ripple') {
    createRippleEffect(event)
  }
  
  emit('click', event)
}

const handleMouseEnter = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  
  updateHoverPosition(event)
  
  switch (props.experiment) {
    case 'glow':
      activeAnimation.value = 'glow-active'
      break
    case 'morph':
      detectCornerEntry(event)
      break
    case 'float':
      activeAnimation.value = 'float-active'
      break
    case 'shimmer':
      activeAnimation.value = 'shimmer-active'
      break
    case 'breathe':
      activeAnimation.value = 'breathe-active'
      break
    default:
      detectCornerEntry(event)
  }
}

const handleMouseMove = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  updateHoverPosition(event)
}

const handleMouseLeave = () => {
  activeAnimation.value = ''
  rippleClass.value = ''
  isPressed.value = false
}

const handleMouseDown = () => {
  if (props.disabled || props.loading) return
  isPressed.value = true
}

const handleMouseUp = () => {
  isPressed.value = false
}

const updateHoverPosition = (event: MouseEvent) => {
  if (!buttonRef.value) return
  const element = buttonRef.value.$el || buttonRef.value
  if (!element || typeof element.getBoundingClientRect !== 'function') return
  
  const rect = element.getBoundingClientRect()
  hoverPosition.value = {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  }
}

const createRippleEffect = (event: MouseEvent) => {
  rippleClass.value = 'ripple-effect'
  updateHoverPosition(event)
  
  setTimeout(() => {
    rippleClass.value = ''
  }, 600)
}

const detectCornerEntry = (event: MouseEvent) => {
  if (!buttonRef.value) return
  
  const element = buttonRef.value.$el || buttonRef.value
  if (!element || typeof element.getBoundingClientRect !== 'function') return
  
  const rect = element.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const threshold = 15
  
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
    }, 500)
  }
}
</script>

<style scoped>
.experimental-button {
  position: relative;
  overflow: hidden;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.button-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: inherit;
}

.button-content {
  position: relative;
  z-index: 1;
  transition: all 200ms ease-out;
}

.button-content-loading {
  opacity: 0.7;
}

.loading-spinner {
  display: inline-block;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  position: relative;
  z-index: 1;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Default hover state */
[data-state="idle"].experimental-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

[data-state="idle"].experimental-button:active {
  transform: translateY(0px);
  transition: transform 100ms ease-out;
}

/* Ripple Effect */
.ripple-effect {
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
    rgba(255, 255, 255, 0.3) 0%, 
    rgba(255, 255, 255, 0.1) 50%, 
    transparent 70%);
  animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes ripple {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Glow Effect */
.glow-active {
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.5),
    0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* Morph/Corner Effects */
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

/* Breathe Effect */
.breathe-active {
  animation: breathe 2s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Shimmer Effect */
.shimmer-active .button-background {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    transparent 100%
  );
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Float Effect */
.float-active {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

/* Disabled state */
[data-state="loading"],
.experimental-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.experimental-button:disabled:hover {
  transform: none;
  box-shadow: none;
}
</style>