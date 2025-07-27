<!--
  Form Component
  Provides form validation context and handles form submission
-->

<template>
  <form 
    class="space-y-6"
    :class="($attrs.class as string | undefined)"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <slot 
      :is-valid="isValid"
      :is-submitting="isSubmitting" 
      :errors="errors"
      :reset="reset"
    />
  </form>
</template>

<script setup lang="ts">
import { useFormProvider } from '@/composables/useForm'

interface Props {
  class?: string
}

interface Emits {
  (e: 'submit', values: Record<string, any>): void
  (e: 'error', error: Error): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

// Create form context
const { isValid, isSubmitting, errors, reset, submit } = useFormProvider()

// Handle form submission
const handleSubmit = async () => {
  try {
    await submit(async (values) => {
      emit('submit', values)
    })
  } catch (error) {
    emit('error', error as Error)
  }
}

// Expose methods to parent
defineExpose({
  isValid,
  isSubmitting,
  errors,
  reset,
  submit: handleSubmit
})
</script>