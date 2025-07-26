<template>
  <input
    :id="fieldId"
    ref="inputRef"
    :value="modelValue"
    :class="cn(computedInputClasses, $attrs.class, activeAnimation)"
    :disabled="disabled"
    :placeholder="placeholder"
    :type="type"
    @input="handleInput"
    @change="handleChange"
    @blur="handleBlur"
    @focus="handleFocus"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { useMultiContext } from '@/composables/useComposition'

export interface SmartInputProps {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  fieldId?: string
  hasError?: boolean
  isValid?: boolean
  touched?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'error' | 'success' | 'warning'
  autoAdapt?: boolean
  intelligence?: 'none' | 'basic' | 'full'
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<SmartInputProps>(), {
  type: 'text',
  hasError: false,
  isValid: false,
  touched: false,
  size: 'md',
  variant: 'default',
  autoAdapt: true,
  intelligence: 'full'
})

const emit = defineEmits<Emits>()

// Get all available contexts
const multiContext = useMultiContext()

// Smart variant selection
const computedVariant = computed(() => {
  if (!props.autoAdapt || props.intelligence === 'none') {
    return props.variant
  }

  // Override with error/success states from props
  if (props.hasError) return 'error'
  if (props.isValid && props.touched) return 'success'

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

// Generate input classes based on computed properties
const computedInputClasses = computed(() => {
  const baseClasses = [
    'flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'hover:shadow-sm hover:bg-accent/50',
    'disabled:cursor-not-allowed disabled:opacity-50'
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
    default: 'border-input focus-visible:ring-ring focus-visible:border-ring hover:border-slate-700',
    error: 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500 hover:border-red-600',
    success: 'border-green-500 focus-visible:ring-green-500 focus-visible:border-green-500 hover:border-green-600',
    warning: 'border-amber-500 focus-visible:ring-amber-500 focus-visible:border-amber-500 hover:border-amber-600'
  }

  return cn(
    baseClasses,
    sizeClasses[computedSize.value],
    variantClasses[computedVariant.value]
  )
})

const inputRef = ref<HTMLInputElement>()
const activeAnimation = ref('')

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// Corner detection (keeping the synapse effect)
const handleMouseEnter = (event: MouseEvent) => {
  detectCornerEntry(event)
}

const handleMouseLeave = () => {
  activeAnimation.value = ''
}

const detectCornerEntry = (event: MouseEvent) => {
  if (!inputRef.value) return
  
  const element = inputRef.value
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
  inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  debugInfo
})
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