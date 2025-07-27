<!--
  FormField Component
  Wrapper component that provides form field context including validation and error handling
-->

<template>
  <div
    class="form-field space-y-2"
    :class="($attrs.class as string | undefined)"
  >
    <!-- Label -->
    <Label
      v-if="label || $slots.label"
      :for="fieldId"
      :class="[
        'text-sm font-medium transition-colors',
        hasError ? 'text-error' : 'text-text-primary',
        required ? 'after:content-[\'*\'] after:ml-1 after:text-error' : ''
      ]"
    >
      <slot name="label">{{ label }}</slot>
    </Label>

    <!-- Field Content -->
    <div class="relative">
      <slot 
        :field-id="fieldId"
        :value="value"
        :has-error="hasError"
        :error-message="errorMessage"
        :on-input="handleInput"
        :on-blur="handleBlur"
        :on-change="handleChange"
      />
      
      <!-- Field Status Icons -->
      <div 
        v-if="showValidation && (hasError || (field?.valid && field?.touched))"
        class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <Icon 
          v-if="hasError" 
          name="alert-circle" 
          class="w-4 h-4 text-error"
        />
        <Icon 
          v-else-if="field?.valid && field?.touched" 
          name="check-circle" 
          class="w-4 h-4 text-success"
        />
      </div>
    </div>

    <!-- Error Message -->
    <Transition
      name="error-message"
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-1 scale-95"
    >
      <p 
        v-if="hasError && showErrors"
        class="text-sm text-error flex items-center gap-1 font-medium"
      >
        <Icon
          name="alert-triangle"
          class="w-3 h-3 flex-shrink-0"
        />
        {{ errorMessage }}
      </p>
    </Transition>

    <!-- Help Text -->
    <p 
      v-if="description && !hasError"
      class="text-sm text-text-muted"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { useFormField, type ValidationRule } from '@/composables/useForm'
import Label from '@/components/ui/label/BaseLabel.vue'
import Icon from '@/components/ui/icon/BaseIcon.vue'

interface Props {
  name: string
  label?: string
  description?: string
  required?: boolean
  rules?: ValidationRule[]
  showValidation?: boolean
  showErrors?: boolean
  class?: string
}

interface Emits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  required: false,
  rules: () => [],
  showValidation: true,
  showErrors: true,
  class: ''
})

const emit = defineEmits<Emits>()

// Generate unique field ID
const fieldId = useId()

// Use form field composable
const { field, value, hasError, errorMessage, blur, validate } = useFormField(
  props.name, 
  props.rules
)

// Event handlers
const handleInput = (newValue: any) => {
  value.value = newValue
  emit('update:modelValue', newValue)
}

const handleChange = (newValue: any) => {
  value.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const handleBlur = (event: FocusEvent) => {
  blur()
  emit('blur', event)
}


// Expose field methods
defineExpose({
  field,
  value,
  hasError,
  errorMessage,
  validate
})
</script>

<style scoped>
.form-field {
  --field-border-color: var(--border-default);
  --field-focus-color: var(--primary-bg);
  --field-error-color: var(--error-bg);
}

.error-message-enter-active,
.error-message-leave-active {
  transition: all 0.2s ease;
}

.error-message-enter-from,
.error-message-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>