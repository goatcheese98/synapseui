<template>
  <Primitive
    ref="buttonRef"
    :as="as"
    :asChild="asChild"
    :class="cn(computedButtonClasses, $attrs.class)"
    :disabled="disabled || loading"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner" />
    <span :class="cn('button-content', loading && 'button-content-loading')">
      <slot />
    </span>
  </Primitive>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { Primitive } from 'reka-ui'
import { buttonVariants, getButtonContext, type ButtonVariants } from './unified-variants'
import { cn } from '@/lib/utils'
import { CARD_CONTEXT_KEY } from '@/components/ui/card/unified-card'

export interface SmartButtonProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  context?: ButtonVariants['context']
  as?: string | object
  asChild?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  autoAdapt?: boolean // NEW: Whether to automatically adapt to parent context
}

const props = withDefaults(defineProps<SmartButtonProps>(), {
  variant: 'neutral',
  size: 'md',
  as: 'button',
  asChild: false,
  type: 'button',
  disabled: false,
  loading: false,
  autoAdapt: true
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Get card context if available
const cardContext = inject(CARD_CONTEXT_KEY, null)

// Smart variant selection
const computedVariant = computed(() => {
  if (!props.autoAdapt) return props.variant
  
  // If we're inside a card, use the card's preferred button variant
  if (cardContext?.value) {
    return cardContext.value.preferredButtonVariant as ButtonVariants['variant']
  }
  
  return props.variant
})

// Smart size selection
const computedSize = computed(() => {
  if (!props.autoAdapt) return props.size
  
  // Match card size if available
  if (cardContext?.value?.size) {
    return cardContext.value.size as ButtonVariants['size']
  }
  
  return props.size
})

// Smart context detection
const computedContext = computed(() => {
  if (props.context) return props.context
  
  // Auto-detect context based on parent
  if (cardContext?.value) {
    return 'in-card'
  }
  
  return undefined
})

// Generate final button classes
const computedButtonClasses = computed(() => {
  return buttonVariants({
    variant: computedVariant.value,
    size: computedSize.value,
    context: computedContext.value
  })
})

const buttonRef = ref<HTMLElement>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    return
  }
  emit('click', event)
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
  width: 1em;
  height: 1em;
}

.button-content {
  transition: opacity 200ms ease-out;
}

.button-content-loading {
  opacity: 0.7;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}</style>