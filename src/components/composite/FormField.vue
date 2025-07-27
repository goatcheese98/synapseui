<!--
  FormField Composite Component
  Combines Label + Input + Error Message with consistent spacing and validation states
-->

<template>
  <VStack
    :spacing="spacing"
    class="form-field"
  >
    <!-- Label with required indicator -->
    <Label 
      v-if="label"
      :for="inputId"
      :class="labelClasses"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-error ml-1"
        aria-label="required"
      >*</span>
    </Label>

    <!-- Help text -->
    <p 
      v-if="helpText && !error"
      :id="helpTextId"
      class="text-token-sm text-text-secondary"
    >
      {{ helpText }}
    </p>

    <!-- Input field -->
    <Input
      :id="inputId"
      v-model="internalValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      :aria-describedby="ariaDescribedBy"
      :aria-invalid="!!error"
      v-bind="$attrs"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- Error message -->
    <p 
      v-if="error"
      :id="errorId"
      class="text-token-sm text-error flex items-center gap-token-xs"
      role="alert"
      aria-live="polite"
    >
      <Icon
        name="alert-circle"
        size="16"
      />
      {{ error }}
    </p>

    <!-- Success message -->
    <p 
      v-if="success && !error"
      :id="successId"
      class="text-token-sm text-success flex items-center gap-token-xs"
    >
      <Icon
        name="check-circle"
        size="16"
      />
      {{ success }}
    </p>
  </VStack>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
// Simple ID generator without external deps
const generateId = () => `form-field-${Math.random().toString(36).substr(2, 9)}`
import Label from '@/components/ui/label/BaseLabel.vue'
import Input from '@/components/ui/input/BaseInput.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import Icon from '@/components/ui/icon/BaseIcon.vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  helpText?: string
  error?: string
  success?: string
  required?: boolean
  disabled?: boolean
  spacing?: 'xs' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  helpText: '',
  error: '',
  success: '',
  required: false,
  disabled: false,
  spacing: 'xs'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

// Reactive internal value
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Generate unique IDs for accessibility
const inputId = generateId()
const helpTextId = `help-${inputId}`
const errorId = `error-${inputId}`
const successId = `success-${inputId}`

// Dynamic classes based on validation state
const labelClasses = computed(() => [
  'transition-colors duration-token-normal',
  {
    'text-error': props.error,
    'text-success': props.success && !props.error,
    'text-text-secondary': props.disabled,
    'text-text-primary': !props.error && !props.success && !props.disabled
  }
])

const inputClasses = computed(() => [
  'transition-all duration-token-normal',
  {
    'border-error focus:ring-error': props.error,
    'border-success focus:ring-success': props.success && !props.error,
    'opacity-60 cursor-not-allowed': props.disabled
  }
])

// Aria describedby for accessibility
const ariaDescribedBy = computed(() => {
  const ids = []
  if (props.helpText && !props.error) ids.push(helpTextId)
  if (props.error) ids.push(errorId)
  if (props.success && !props.error) ids.push(successId)
  return ids.length > 0 ? ids.join(' ') : undefined
})

// Event handlers
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// Inherit attributes on input, not root
defineOptions({
  inheritAttrs: false
})
</script>

<style scoped>
.form-field {
  min-width: 0; /* Prevent flex item overflow */
}

/* Focus-within state for the entire form field */
.form-field:focus-within .label {
  color: var(--primary-bg);
}

/* Animation for error states */
.form-field p[role="alert"] {
  animation: slideInDown 0.2s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>