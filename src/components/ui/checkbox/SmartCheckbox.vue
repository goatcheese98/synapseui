<template>
  <div :class="cn('flex items-center space-x-2', wrapperClass)">
    <CheckboxRoot
      :id="fieldId"
      :class="cn(computedCheckboxClasses, checkboxClass)"
      :checked="checked"
      :disabled="disabled"
      :required="required"
      v-bind="$attrs"
      @update:checked="handleCheckedChange"
    >
      <CheckboxIndicator
        :class="cn('flex items-center justify-center text-current', indicatorClass)"
      >
        <Icon
          :icon="computedIcon"
          :class="computedIconSize"
        />
      </CheckboxIndicator>
    </CheckboxRoot>
    
    <label 
      v-if="label || $slots.label"
      :for="fieldId"
      :class="cn(computedLabelClasses, labelClass)"
    >
      <slot name="label">{{ label }}</slot>
    </label>
  </div>
  
  <!-- Error message -->
  <div
    v-if="hasError && errorMessage"
    :class="cn('mt-1 text-xs', computedErrorClasses)"
  >
    {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
import { useMultiContext } from '@/composables/useComposition'

export interface SmartCheckboxProps {
  checked?: boolean
  disabled?: boolean
  required?: boolean
  fieldId?: string
  label?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'error' | 'success' | 'warning'
  autoAdapt?: boolean
  intelligence?: 'none' | 'basic' | 'full'
  // Styling overrides
  checkboxClass?: string
  labelClass?: string
  indicatorClass?: string
  wrapperClass?: string
  // Validation
  hasError?: boolean
  errorMessage?: string
  // Icon customization
  checkedIcon?: string
  indeterminateIcon?: string
}

interface Emits {
  (e: 'update:checked', value: boolean | 'indeterminate'): void
  (e: 'change', value: boolean | 'indeterminate'): void
}

const props = withDefaults(defineProps<SmartCheckboxProps>(), {
  checked: false,
  disabled: false,
  required: false,
  fieldId: '',
  label: '',
  size: 'md',
  variant: 'default',
  autoAdapt: true,
  intelligence: 'full',
  checkboxClass: '',
  labelClass: '',
  indicatorClass: '',
  wrapperClass: '',
  hasError: false,
  errorMessage: '',
  checkedIcon: 'lucide:check',
  indeterminateIcon: 'lucide:minus'
})

const emit = defineEmits<Emits>()

// Get all available contexts
const multiContext = useMultiContext()

// Smart variant selection
const computedVariant = computed(() => {
  if (!props.autoAdapt || props.intelligence === 'none') {
    return props.variant
  }

  // Override with error state from props
  if (props.hasError) return 'error'

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

// Generate checkbox classes based on computed properties
const computedCheckboxClasses = computed(() => {
  const baseClasses = [
    'peer shrink-0 rounded-sm border ring-offset-background transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:text-primary-foreground',
    'hover:shadow-sm'
  ]

  // Size classes
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6'
  }

  // Variant classes
  const variantClasses = {
    default: 'border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:border-primary hover:border-primary/80',
    error: 'border-red-500 focus-visible:ring-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 hover:border-red-600',
    success: 'border-green-500 focus-visible:ring-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 hover:border-green-600',
    warning: 'border-amber-500 focus-visible:ring-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 hover:border-amber-600'
  }

  return cn(
    baseClasses,
    sizeClasses[computedSize.value],
    variantClasses[computedVariant.value]
  )
})

// Generate label classes
const computedLabelClasses = computed(() => {
  const baseClasses = [
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    'cursor-pointer select-none'
  ]

  // Size-based text scaling
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  // Variant-based label colors
  const variantClasses = {
    default: 'text-foreground',
    error: 'text-red-700',
    success: 'text-green-700',
    warning: 'text-amber-700'
  }

  return cn(
    baseClasses,
    sizeClasses[computedSize.value],
    variantClasses[computedVariant.value]
  )
})

// Generate error message classes
const computedErrorClasses = computed(() => {
  return 'text-red-500'
})

// Icon sizing
const computedIconSize = computed(() => {
  const sizeClasses = {
    xs: 'h-2 w-2',
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
    xl: 'h-5 w-5'
  }
  
  return sizeClasses[computedSize.value]
})

// Smart icon selection
const computedIcon = computed(() => {
  if (props.checked === 'indeterminate') {
    return props.indeterminateIcon
  }
  return props.checkedIcon
})

// Event handlers
const handleCheckedChange = (value: boolean | 'indeterminate') => {
  emit('update:checked', value)
  emit('change', value)
}

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