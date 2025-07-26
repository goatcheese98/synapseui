<template>
  <FormProvider 
    :state="computedFormState" 
    :size="size"
  >
    <form 
      :class="cn(formClasses, $attrs.class)"
      @submit="handleSubmit"
      v-bind="$attrs"
    >
      <slot 
        :isSubmitting="isSubmitting"
        :hasErrors="hasErrors"
        :errors="errors"
        :isValid="isValid"
        :formState="computedFormState"
      />
    </form>
  </FormProvider>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue'
import { cn } from '@/lib/utils'
import { 
  createFormContext, 
  FORM_CONTEXT_KEY,
  type FormContext 
} from '@/composables/useComposition'

export interface SmartFormProps {
  size?: 'sm' | 'md' | 'lg'
  layout?: 'vertical' | 'horizontal' | 'inline'
  spacing?: 'tight' | 'normal' | 'loose'
  autoValidate?: boolean
  showErrorSummary?: boolean
  submitOnEnter?: boolean
}

interface Emits {
  (e: 'submit', event: Event, formData: FormData): void
  (e: 'validate', isValid: boolean, errors: Record<string, string>): void
  (e: 'stateChange', state: FormContext['state']): void
}

const props = withDefaults(defineProps<SmartFormProps>(), {
  size: 'md',
  layout: 'vertical',
  spacing: 'normal',
  autoValidate: true,
  showErrorSummary: false,
  submitOnEnter: true
})

const emit = defineEmits<Emits>()

// Form state management
const isSubmitting = ref(false)
const errors = reactive<Record<string, string>>({})
const fields = reactive<Record<string, any>>({})

// Computed form state
const hasErrors = computed(() => Object.keys(errors).length > 0)
const isValid = computed(() => !hasErrors.value && Object.keys(fields).length > 0)

const computedFormState = computed<FormContext['state']>(() => {
  if (isSubmitting.value) return 'loading'
  if (hasErrors.value) return 'error'
  if (isValid.value) return 'success'
  return 'default'
})

// Form classes
const formClasses = computed(() => {
  const baseClasses = ['space-y-4']
  
  const layoutClasses = {
    vertical: 'flex flex-col',
    horizontal: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    inline: 'flex flex-wrap items-end gap-4'
  }

  const spacingClasses = {
    tight: 'space-y-2',
    normal: 'space-y-4', 
    loose: 'space-y-6'
  }

  return cn(
    baseClasses,
    layoutClasses[props.layout],
    spacingClasses[props.spacing]
  )
})

// Create and provide form context
const formContext = createFormContext(computedFormState.value, props.size)
provide(FORM_CONTEXT_KEY, formContext)

// Form validation and submission
const validateField = (fieldName: string, value: any, rules?: any) => {
  // Basic validation logic - can be extended
  if (rules?.required && (!value || value.trim() === '')) {
    errors[fieldName] = 'This field is required'
    return false
  }
  
  if (rules?.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors[fieldName] = 'Please enter a valid email address'
    return false
  }
  
  if (rules?.minLength && value && value.length < rules.minLength) {
    errors[fieldName] = `Must be at least ${rules.minLength} characters`
    return false
  }
  
  // Clear error if validation passes
  delete errors[fieldName]
  return true
}

const validateForm = () => {
  const isFormValid = Object.keys(fields).every(fieldName => {
    const field = fields[fieldName]
    return validateField(fieldName, field.value, field.rules)
  })
  
  emit('validate', isFormValid, { ...errors })
  return isFormValid
}

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  
  if (props.autoValidate && !validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    const formData = new FormData(event.target as HTMLFormElement)
    emit('submit', event, formData)
  } finally {
    isSubmitting.value = false
  }
}

// Field registration system
const registerField = (fieldName: string, fieldConfig: any) => {
  fields[fieldName] = fieldConfig
}

const unregisterField = (fieldName: string) => {
  delete fields[fieldName]
  delete errors[fieldName]
}

const setFieldError = (fieldName: string, error: string) => {
  errors[fieldName] = error
}

const clearFieldError = (fieldName: string) => {
  delete errors[fieldName]
}

// Form Provider component for child components
const FormProvider = {
  props: ['state', 'size'],
  setup(props: any, { slots }: any) {
    const formContext = createFormContext(props.state, props.size)
    provide(FORM_CONTEXT_KEY, formContext)
    return () => slots.default()
  }
}

// Expose form methods
defineExpose({
  validate: validateForm,
  registerField,
  unregisterField,
  setFieldError,
  clearFieldError,
  isSubmitting: computed(() => isSubmitting.value),
  hasErrors: computed(() => hasErrors.value),
  isValid: computed(() => isValid.value),
  errors: computed(() => ({ ...errors }))
})
</script>