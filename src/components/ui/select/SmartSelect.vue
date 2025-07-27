<template>
  <SelectRoot 
    v-model="model"
    :disabled="disabled"
    :required="required"
    v-bind="$attrs"
  >
    <SelectTrigger 
      :class="cn(computedTriggerClasses, triggerClass)"
      :data-state="isError ? 'error' : isSuccess ? 'success' : 'default'"
    >
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    
    <SelectContent :class="computedContentClasses">
      <slot />
    </SelectContent>
  </SelectRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useMultiContext } from '@/composables/useComposition'
import SelectRoot from './BaseSelect.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'
import SelectContent from './SelectContent.vue'

export interface SmartSelectProps {
  modelValue?: string | string[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'error' | 'success' | 'warning'
  triggerClass?: string
  contentClass?: string
  autoAdapt?: boolean
  intelligence?: 'none' | 'basic' | 'full'
  // Validation states
  isError?: boolean
  isSuccess?: boolean
  errorMessage?: string
}

interface Emits {
  (e: 'update:modelValue', value: string | string[]): void
}

const props = withDefaults(defineProps<SmartSelectProps>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  required: false,
  size: 'md',
  variant: 'default',
  triggerClass: '',
  contentClass: '',
  autoAdapt: true,
  intelligence: 'full',
  isError: false,
  isSuccess: false,
  errorMessage: '',
  fieldId: ''
})

const emit = defineEmits<Emits>()

// Get all available contexts
const multiContext = useMultiContext()

// Two-way binding
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Smart variant selection
const computedVariant = computed(() => {
  if (!props.autoAdapt || props.intelligence === 'none') {
    return props.variant
  }

  // Override with error/success states from props
  if (props.isError) return 'error'
  if (props.isSuccess) return 'success'

  if (props.intelligence === 'full') {
    const contexts = multiContext.value
    
    // Form context takes priority
    if (contexts.form?.state === 'error') return 'error'
    if (contexts.form?.state === 'success') return 'success'
    if (contexts.form?.state === 'warning') return 'warning'
    
    // Card context for subtle theming
    if (contexts.card?.variant === 'error') return 'error'
    if (contexts.card?.variant === 'success') return 'success'
    if (contexts.card?.variant === 'warning') return 'warning'
  }

  return props.variant
})

// Smart size selection
const computedSize = computed(() => {
  if (!props.autoAdapt) return props.size

  const contexts = multiContext.value
  
  // Form context size
  if (contexts.form?.size) {
    return contexts.form.size
  }
  
  // Card context size
  if (contexts.card?.size) {
    return contexts.card.size
  }

  // Layout context density
  if (contexts.layout?.density) {
    const densityToSize = {
      compact: 'sm',
      comfortable: 'md',
      spacious: 'lg'
    } as const
    return densityToSize[contexts.layout.density]
  }

  return props.size
})

// Generate trigger classes based on computed properties
const computedTriggerClasses = computed(() => {
  const baseClasses = [
    'flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background',
    'placeholder:text-muted-foreground transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'hover:shadow-sm hover:bg-accent/50',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=open]:ring-2 data-[state=open]:ring-offset-2'
  ]

  // Size classes
  const sizeClasses = {
    xs: 'h-7 text-xs px-2',
    sm: 'h-8 text-sm px-2', 
    md: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4',
    xl: 'h-14 text-lg px-6'
  }

  // Variant classes
  const variantClasses = {
    default: 'border-input focus:ring-ring focus:border-ring hover:border-slate-700 data-[state=open]:border-ring data-[state=open]:ring-ring',
    error: 'border-red-500 focus:ring-red-500 focus:border-red-500 hover:border-red-600 data-[state=open]:border-red-500 data-[state=open]:ring-red-500',
    success: 'border-green-500 focus:ring-green-500 focus:border-green-500 hover:border-green-600 data-[state=open]:border-green-500 data-[state=open]:ring-green-500',
    warning: 'border-amber-500 focus:ring-amber-500 focus:border-amber-500 hover:border-amber-600 data-[state=open]:border-amber-500 data-[state=open]:ring-amber-500'
  }

  return cn(
    baseClasses,
    sizeClasses[computedSize.value],
    variantClasses[computedVariant.value]
  )
})

// Smart content positioning and styling
const computedContentClasses = computed(() => {
  const contexts = multiContext.value
  
  // Base content classes
  const baseClasses = [
    'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
  ]

  // Density-based spacing
  let densityClasses = 'p-1' // default
  if (contexts.layout?.density === 'compact') {
    densityClasses = 'p-0.5'
  } else if (contexts.layout?.density === 'spacious') {
    densityClasses = 'p-2'
  }

  return cn(baseClasses, densityClasses)
})

// Debug info for development
const debugInfo = computed(() => {
  if (import.meta.env.DEV) {
    return {
      contexts: multiContext.value,
      computed: {
        variant: computedVariant.value,
        size: computedSize.value
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

// Expose for parent access
defineExpose({
  debugInfo
})
</script>