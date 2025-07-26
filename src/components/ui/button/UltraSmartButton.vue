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
import { ref, computed } from 'vue'
import { Primitive } from 'reka-ui'
import { buttonVariants, type ButtonVariants } from './unified-variants'
import { cn } from '@/lib/utils'
import { useMultiContext } from '@/composables/useComposition'

export interface UltraSmartButtonProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  context?: ButtonVariants['context']
  as?: string | object
  asChild?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  autoAdapt?: boolean
  // NEW: Level of intelligence
  intelligence?: 'none' | 'basic' | 'full'
}

const props = withDefaults(defineProps<UltraSmartButtonProps>(), {
  variant: 'neutral',
  size: 'md',
  as: 'button',
  asChild: false,
  type: 'button',
  disabled: false,
  loading: false,
  autoAdapt: true,
  intelligence: 'full'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Get all available contexts
const multiContext = useMultiContext()

// Ultra-smart variant selection
const computedVariant = computed(() => {
  if (!props.autoAdapt || props.intelligence === 'none') {
    return props.variant
  }

  if (props.intelligence === 'full') {
    // Use the multi-context smart selection
    return multiContext.value.getSmartVariant('button') as ButtonVariants['variant']
  }

  // Basic intelligence - just use explicit variant
  return props.variant
})

// Smart size selection
const computedSize = computed(() => {
  if (!props.autoAdapt) return props.size

  const contexts = multiContext.value
  
  // Form context can influence size
  if (contexts.form?.size) {
    return contexts.form.size as ButtonVariants['size']
  }
  
  // Card context influences size
  if (contexts.card?.size) {
    return contexts.card.size as ButtonVariants['size']
  }

  // Layout context for general sizing
  if (contexts.layout?.density) {
    const densityToSize = {
      compact: 'sm',
      comfortable: 'md', 
      spacious: 'lg'
    } as const
    return densityToSize[contexts.layout.density] as ButtonVariants['size']
  }

  return props.size
})

// Smart context detection
const computedContext = computed(() => {
  if (props.context) return props.context

  const contexts = multiContext.value
  const primaryContext = contexts.getPrimaryContext()

  // Map context types to button contexts
  const contextMap = {
    form: 'in-form',
    card: 'in-card',
    nav: 'in-nav',
    layout: contexts.layout?.pattern === 'hero' ? 'in-hero' : undefined
  } as const

  return contextMap[primaryContext as keyof typeof contextMap] as ButtonVariants['context']
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

// Debug info (can be useful during development)
const debugInfo = computed(() => {
  if (import.meta.env.DEV) {
    return {
      contexts: multiContext.value,
      computed: {
        variant: computedVariant.value,
        size: computedSize.value,
        context: computedContext.value
      },
      props: {
        variant: props.variant,
        size: props.size,
        intelligence: props.intelligence
      }
    }
  }
  return null
})

// Expose debug info for development
defineExpose({
  debugInfo
})
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
}
</style>