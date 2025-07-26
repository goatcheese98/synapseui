<template>
  <textarea
    :id="fieldId"
    ref="textareaRef"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="computedRows"
    :class="cn(computedTextareaClasses, $attrs.class, activeAnimation)"
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

export interface SmartTextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  rows?: number
  fieldId?: string
  hasError?: boolean
  isValid?: boolean
  touched?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'error' | 'success' | 'warning'
  autoAdapt?: boolean
  intelligence?: 'none' | 'basic' | 'full'
  // Auto-sizing options
  autoResize?: boolean
  minRows?: number
  maxRows?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<SmartTextareaProps>(), {
  rows: 3,
  hasError: false,
  isValid: false,
  touched: false,
  size: 'md',
  variant: 'default',
  autoAdapt: true,
  intelligence: 'full',
  autoResize: false,
  minRows: 2,
  maxRows: 10
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

// Smart rows calculation based on context
const computedRows = computed(() => {
  const contexts = multiContext.value
  
  // Layout density affects default textarea size
  if (contexts.layout?.density === 'compact') {
    return Math.max(props.minRows || 2, Math.min(props.rows || 3, 4))
  } else if (contexts.layout?.density === 'spacious') {
    return Math.max(props.rows || 3, 5)
  }

  return props.rows || 3
})

// Generate textarea classes based on computed properties
const computedTextareaClasses = computed(() => {
  const baseClasses = [
    'flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background',
    'transition-all duration-200 placeholder:text-muted-foreground resize-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'hover:shadow-sm hover:bg-accent/50',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ]

  // Size classes
  const sizeClasses = {
    xs: 'min-h-[60px] text-xs px-2 py-1',
    sm: 'min-h-[70px] text-sm px-2 py-1.5',
    md: 'min-h-[80px] text-sm px-3 py-2',
    lg: 'min-h-[100px] text-base px-4 py-3',
    xl: 'min-h-[120px] text-lg px-6 py-4'
  }

  // Variant classes
  const variantClasses = {
    default: 'border-input focus-visible:ring-ring focus-visible:border-ring hover:border-slate-700',
    error: 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500 hover:border-red-600',
    success: 'border-green-500 focus-visible:ring-green-500 focus-visible:border-green-500 hover:border-green-600',
    warning: 'border-amber-500 focus-visible:ring-amber-500 focus-visible:border-amber-500 hover:border-amber-600'
  }

  // Auto-resize classes
  const resizeClasses = props.autoResize ? 'resize-none overflow-hidden' : 'resize-y'

  return cn(
    baseClasses,
    sizeClasses[computedSize.value],
    variantClasses[computedVariant.value],
    resizeClasses
  )
})

const textareaRef = ref<HTMLTextAreaElement>()
const activeAnimation = ref('')

// Auto-resize functionality
const autoResizeTextarea = () => {
  if (!props.autoResize || !textareaRef.value) return
  
  const textarea = textareaRef.value
  textarea.style.height = 'auto'
  
  const minHeight = (props.minRows || 2) * 24 // Approximate line height
  const maxHeight = (props.maxRows || 10) * 24
  const scrollHeight = textarea.scrollHeight
  
  const newHeight = Math.max(minHeight, Math.min(maxHeight, scrollHeight))
  textarea.style.height = `${newHeight}px`
}

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  
  if (props.autoResize) {
    autoResizeTextarea()
  }
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('change', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
  
  if (props.autoResize) {
    autoResizeTextarea()
  }
}

// Corner detection (keeping the synapse effect)
const handleMouseEnter = (event: MouseEvent) => {
  detectCornerEntry(event)
}

const handleMouseLeave = () => {
  activeAnimation.value = ''
}

const detectCornerEntry = (event: MouseEvent) => {
  if (!textareaRef.value) return
  
  const element = textareaRef.value
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
        size: computedSize.value,
        rows: computedRows.value
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
  textareaRef,
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
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