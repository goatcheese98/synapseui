<template>
  <Primitive
    v-if="asChild"
    v-bind="$attrs"
    ref="buttonRef"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), ($attrs.class as string | undefined), 'edge-morph-button', pulseClass, fullWidth && 'w-full', loading && 'cursor-wait')"
    :data-motion="enableCornerPulse || enableTextWarp ? 'on' : 'off'"
    :data-state="loading ? 'loading' : 'idle'"
    :disabled="blocked || undefined"
    :aria-disabled="blocked || undefined"
    :aria-busy="loading || undefined"
    :aria-label="ariaLabel || ($attrs['aria-label'] as string | undefined)"
    :aria-describedby="ariaDescribedBy || ($attrs['aria-describedby'] as string | undefined)"
    :tabindex="blocked && (as !== 'button' || asChild) ? -1 : ($attrs.tabindex as number | undefined)"
    :type="type"
    @click.capture="guardBlocked"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </Primitive>
  <Primitive
    v-else
    v-bind="$attrs"
    ref="buttonRef"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), ($attrs.class as string | undefined), 'edge-morph-button', pulseClass, fullWidth && 'w-full', loading && 'cursor-wait')"
    :data-motion="enableCornerPulse || enableTextWarp ? 'on' : 'off'"
    :data-state="loading ? 'loading' : 'idle'"
    :disabled="blocked || undefined"
    :aria-disabled="blocked || undefined"
    :aria-busy="loading || undefined"
    :aria-label="ariaLabel || ($attrs['aria-label'] as string | undefined)"
    :aria-describedby="ariaDescribedBy || ($attrs['aria-describedby'] as string | undefined)"
    :tabindex="blocked && (as !== 'button' || asChild) ? -1 : ($attrs.tabindex as number | undefined)"
    :type="type"
    @click.capture="guardBlocked"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <LoadingSpinner
      v-if="loading && !asChild"
      class="button-spinner"
      :size="getSpinnerSize()"
      aria-hidden="true"
    />
    <slot
      v-if="!loading && !asChild"
      name="icon-left"
    />

    <span :class="cn('button-content', loading && 'button-content-loading')">
      <WarpedText
        v-if="enableTextWarp && motionAllowed() && $slots.default"
        :text="getSlotText()"
        :is-pressed="isPressed"
        :warp-type="textWarpType"
        :warp-intensity="textWarpIntensity"
      />
      <slot v-else />
    </span>
    <slot
      v-if="!loading && !asChild"
      name="icon-right"
    />
  </Primitive>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, onBeforeUnmount, type ComponentPublicInstance } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import { Primitive } from 'reka-ui'
import { buttonVariants, type ButtonVariants } from './button-variants'
import { cn } from '@/lib/utils'
import WarpedText from '@/components/ui/text/WarpedText.vue'

interface Props {
  variant?: ButtonVariants['variant']
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl'
  as?: string | object
  asChild?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  enableCornerPulse?: boolean
  ariaLabel?: string
  ariaDescribedBy?: string
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
  ariaLabel: '',
  ariaDescribedBy: '',
  enableTextWarp: false,
  enableCornerPulse: false,
  textWarpType: 'compress',
  textWarpIntensity: 0.8
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Animation state
defineOptions({ inheritAttrs: false })
const buttonRef = ref<ComponentPublicInstance | HTMLElement>()
const blocked = computed(() => props.disabled || props.loading)
const timers = new Set<ReturnType<typeof setTimeout>>()
const later = (callback: () => void, delay: number) => {
  const timer = setTimeout(() => { timers.delete(timer); callback() }, delay)
  timers.add(timer)
}
onBeforeUnmount(() => timers.forEach(clearTimeout))
const motionAllowed = () => typeof window !== 'undefined' && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
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

const guardBlocked = (event: MouseEvent) => {
  if (blocked.value) { event.preventDefault(); event.stopImmediatePropagation() }
}

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    event.stopImmediatePropagation()
    return
  }

  // Trigger press animation for text warp
  if (props.enableTextWarp && motionAllowed()) {
    isPressed.value = true
    later(() => {
      isPressed.value = false
    }, 150)
  }

  emit('click', event)
}

const handleMouseEnter = (event: MouseEvent) => {
  if (blocked.value || !props.enableCornerPulse || !motionAllowed()) return
  detectEntryCorner(event)
}

const handleMouseLeave = () => {
  // Clear any active pulse animation
  pulseClass.value = ''
}

const detectEntryCorner = (event: MouseEvent) => {
  if (!buttonRef.value) return

  // Get the actual DOM element from the Primitive component
  const element = ('$el' in buttonRef.value ? buttonRef.value.$el : buttonRef.value) as HTMLElement
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
    later(() => {
      pulseClass.value = cornerClass
      // Remove class after animation completes
      later(() => {
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
  padding-inline: 8px;
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

[data-state="idle"].edge-morph-button[data-motion="on"]:active {
  transform: scale(0.98);
  transition: transform 100ms ease-out;
  /* Paper press effect - creates depth illusion */
  box-shadow:
    inset 0 4px 8px rgba(0, 0, 0, 0.15),
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

[data-state="idle"].edge-morph-button[data-motion="on"]:active .button-content {
  padding-inline: 8px;
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
/* Spinner is positioned so entering loading does not shift the label. */
.edge-morph-button { position: relative; }
.button-spinner { position: absolute; left: 6px; }
@media (prefers-reduced-motion: reduce) {
  .edge-morph-button, .edge-morph-button :deep(*) { animation: none !important; transition: none !important; transform: none !important; }
}
</style>
