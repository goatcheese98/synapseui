/**
 * Form Composable
 * Provides form validation and state management throughout form components
 */

import { reactive, ref, computed, provide, inject, type InjectionKey, type Ref } from 'vue'

// Validation rule type
export type ValidationRule = (value: any) => string | boolean

// Field state interface
export interface FieldState {
  value: any
  error: string | null
  touched: boolean
  dirty: boolean
  valid: boolean
  rules: ValidationRule[]
}

// Form context interface
export interface FormContext {
  fields: Record<string, FieldState>
  isValid: Ref<boolean>
  isSubmitting: Ref<boolean>
  errors: Ref<Record<string, string>>
  
  // Methods
  registerField: (name: string, rules?: ValidationRule[]) => void
  unregisterField: (name: string) => void
  setValue: (name: string, value: any) => void
  setError: (name: string, error: string | null) => void
  validateField: (name: string) => boolean
  validateAll: () => boolean
  reset: () => void
  submit: (onSubmit: (values: Record<string, any>) => Promise<void> | void) => Promise<void>
}

// Built-in validation rules
export const rules = {
  required: (message = 'This field is required'): ValidationRule => 
    (value) => {
      if (value === null || value === undefined || value === '') {
        return message
      }
      return true
    },

  email: (message = 'Please enter a valid email'): ValidationRule =>
    (value) => {
      if (!value) return true // Let required handle empty values
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value) || message
    },

  minLength: (min: number, message?: string): ValidationRule =>
    (value) => {
      if (!value) return true
      const actualMessage = message || `Must be at least ${min} characters`
      return value.length >= min || actualMessage
    },

  maxLength: (max: number, message?: string): ValidationRule =>
    (value) => {
      if (!value) return true
      const actualMessage = message || `Must be at most ${max} characters`
      return value.length <= max || actualMessage
    },

  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule =>
    (value) => {
      if (!value) return true
      return regex.test(value) || message
    },

  custom: (validator: (value: any) => boolean | string, message = 'Invalid value'): ValidationRule =>
    (value) => {
      const result = validator(value)
      if (typeof result === 'string') return result
      return result || message
    }
}

// Injection key
export const FORM_INJECTION_KEY: InjectionKey<FormContext> = Symbol('form')

/**
 * Form Provider Composable
 * Use this to create a form context
 */
export function useFormProvider() {
  const fields = reactive<Record<string, FieldState>>({})
  const isSubmitting = ref(false)

  // Computed values
  const isValid = computed(() => {
    return Object.values(fields).every(field => field.valid)
  })

  const errors = computed(() => {
    const result: Record<string, string> = {}
    Object.entries(fields).forEach(([name, field]) => {
      if (field.error) {
        result[name] = field.error
      }
    })
    return result
  })

  // Methods
  const registerField = (name: string, fieldRules: ValidationRule[] = []) => {
    fields[name] = {
      value: null,
      error: null,
      touched: false,
      dirty: false,
      valid: true,
      rules: fieldRules
    }
  }

  const unregisterField = (name: string) => {
    delete fields[name]
  }

  const setValue = (name: string, value: any) => {
    if (fields[name]) {
      fields[name].value = value
      fields[name].dirty = true
      
      // Auto-validate on change if field was previously touched
      if (fields[name].touched) {
        validateField(name)
      }
    }
  }

  const setError = (name: string, error: string | null) => {
    if (fields[name]) {
      fields[name].error = error
      fields[name].valid = !error
    }
  }

  const validateField = (name: string): boolean => {
    const field = fields[name]
    if (!field) return true

    // Run validation rules
    for (const rule of field.rules) {
      const result = rule(field.value)
      if (result !== true) {
        field.error = typeof result === 'string' ? result : 'Invalid value'
        field.valid = false
        return false
      }
    }

    field.error = null
    field.valid = true
    return true
  }

  const validateAll = (): boolean => {
    let allValid = true
    
    Object.keys(fields).forEach(name => {
      fields[name].touched = true
      if (!validateField(name)) {
        allValid = false
      }
    })

    return allValid
  }

  const reset = () => {
    Object.values(fields).forEach(field => {
      field.value = null
      field.error = null
      field.touched = false
      field.dirty = false
      field.valid = true
    })
    isSubmitting.value = false
  }

  const submit = async (onSubmit: (values: Record<string, any>) => Promise<void> | void) => {
    if (isSubmitting.value) return

    // Validate all fields
    if (!validateAll()) {
      return
    }

    isSubmitting.value = true

    try {
      // Collect form values
      const values: Record<string, any> = {}
      Object.entries(fields).forEach(([name, field]) => {
        values[name] = field.value
      })

      await onSubmit(values)
    } catch (error) {
      console.error('Form submission error:', error)
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  const formContext: FormContext = {
    fields,
    isValid,
    isSubmitting,
    errors,
    registerField,
    unregisterField,
    setValue,
    setError,
    validateField,
    validateAll,
    reset,
    submit
  }

  provide(FORM_INJECTION_KEY, formContext)

  return formContext
}

/**
 * Form Consumer Composable
 * Use this in form components to access form context
 */
export function useForm() {
  const formContext = inject(FORM_INJECTION_KEY)
  
  if (!formContext) {
    throw new Error('useForm must be used within a form provider')
  }
  
  return formContext
}

/**
 * Field Composable
 * Use this in field components to register with form context
 */
export function useFormField(name: string, fieldRules: ValidationRule[] = []) {
  const form = useForm()
  
  // Register field on mount
  form.registerField(name, fieldRules)
  
  // Field-specific computed values
  const field = computed(() => form.fields[name])
  const value = computed({
    get: () => field.value?.value,
    set: (newValue) => form.setValue(name, newValue)
  })

  const hasError = computed(() => field.value?.touched && !!field.value?.error)
  const errorMessage = computed(() => field.value?.error || '')

  // Field methods
  const touch = () => {
    if (field.value) {
      field.value.touched = true
    }
  }

  const validate = () => form.validateField(name)
  
  const blur = () => {
    touch()
    validate()
  }

  return {
    field,
    value,
    hasError,
    errorMessage,
    touch,
    validate,
    blur,
    // Expose form context for advanced usage
    form
  }
}