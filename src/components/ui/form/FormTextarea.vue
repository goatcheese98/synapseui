<!--
  FormTextarea Component
  Pre-configured Textarea component integrated with form validation
-->

<template>
  <FormField
    :name="name"
    :label="label"
    :description="description"
    :required="required"
    :rules="rules"
    :show-validation="showValidation"
    :show-errors="showErrors"
    :class="$attrs.class"
  >
    <template #label v-if="$slots.label">
      <slot name="label" />
    </template>

    <template #default="{ fieldId, hasError, onInput, onBlur }">
      <Textarea
        :id="fieldId"
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        :has-error="hasError"
        :is-valid="isValid"
        :touched="touched"
        @update:model-value="onInput"
        @blur="onBlur"
        @focus="handleFocus"
      />
    </template>
  </FormField>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormField from './FormField.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import { useFormField, type ValidationRule } from '@/composables/useForm'

interface Props {
  name: string
  label?: string
  description?: string
  placeholder?: string
  rows?: number
  required?: boolean
  disabled?: boolean
  rules?: ValidationRule[]
  showValidation?: boolean
  showErrors?: boolean
  modelValue?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  showValidation: true,
  showErrors: true,
  rules: () => []
})

const emit = defineEmits<Emits>()

// Form field integration
const { field, value } = useFormField(props.name, props.rules)

// Computed properties for validation states
const isValid = computed(() => field.value?.valid && field.value?.touched)
const touched = computed(() => field.value?.touched)

// Sync with v-model
const modelValue = computed({
  get: () => props.modelValue ?? value.value,
  set: (newValue) => {
    value.value = newValue
    emit('update:modelValue', newValue)
  }
})

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>