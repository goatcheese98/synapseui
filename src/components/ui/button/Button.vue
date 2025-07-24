<template>
  <Primitive
    :as="as"
    :asChild="asChild"
    :class="buttonVariants({ variant, size, loading: loading || isLoading, fullWidth, shape, class: className })"
    :disabled="disabled || loading || isLoading"
    :aria-label="ariaLabel"
    :aria-describedby="ariaDescribedBy"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot name="icon-left" v-if="!loading && !isLoading" />
    
    <LoadingSpinner 
      v-if="loading || isLoading" 
      :size="getSpinnerSize()" 
      class="text-current" 
    />
    
    <span 
      v-if="$slots.default"
      :class="{ 'opacity-0': loading || isLoading }"
      class="transition-opacity duration-200"
    >
      <slot />
    </span>
    
    <slot name="icon-right" v-if="!loading && !isLoading" />
    
    <div
      v-if="ripple && showRipple"
      :class="rippleClasses"
      :style="rippleStyle"
      @animationend="showRipple = false"
    />
  </Primitive>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Primitive } from 'reka-ui'
import { buttonVariants } from './variants'
import LoadingSpinner from './LoadingSpinner.vue'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'outline-primary' | 'outline-success' | 'outline-error' | 'ghost' | 'ghost-primary' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl'
  shape?: 'square' | 'rounded' | 'circle'
  as?: string | object
  asChild?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  ripple?: boolean
  ariaLabel?: string
  ariaDescribedBy?: string
  class?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  shape: 'rounded',
  as: 'button',
  asChild: false,
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  ripple: true
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const className = defineModel<string>('class')

const isLoading = ref(false)
const showRipple = ref(false)
const rippleX = ref(0)
const rippleY = ref(0)

const rippleClasses = computed(() => [
  'absolute rounded-full bg-white/30 pointer-events-none',
  'animate-ping duration-500'
])

const rippleStyle = computed(() => ({
  left: `${rippleX.value}px`,
  top: `${rippleY.value}px`,
  width: '20px',
  height: '20px',
  transform: 'translate(-50%, -50%)'
}))

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

const handleClick = async (event: MouseEvent) => {
  if (props.disabled || props.loading || isLoading.value) {
    return
  }

  if (props.ripple) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    rippleX.value = event.clientX - rect.left
    rippleY.value = event.clientY - rect.top
    showRipple.value = true
  }

  emit('click', event)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleClick(event as unknown as MouseEvent)
  }
}

defineExpose({
  setLoading: (loading: boolean) => {
    isLoading.value = loading
  }
})
</script>