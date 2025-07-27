<!--
  LoginForm Composite Component
  Complete login form using FormField + Card + Button components
-->

<template>
  <Card class="login-form w-full max-w-md mx-auto">
    <CardHeader class="text-center">
      <CardTitle class="text-token-2xl">
        Welcome back
      </CardTitle>
      <CardDescription>Sign in to your account to continue</CardDescription>
    </CardHeader>

    <CardContent>
      <form
        class="space-y-token-lg"
        @submit.prevent="handleSubmit"
      >
        <!-- Email Field -->
        <FormField
          v-model="formData.email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          :error="errors.email"
          :disabled="isLoading"
          required
          autocomplete="email"
        />

        <!-- Password Field -->
        <FormField
          v-model="formData.password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password"
          :error="errors.password"
          :disabled="isLoading"
          required
          autocomplete="current-password"
        >
          <template #suffix>
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              :disabled="isLoading"
              class="absolute right-2 top-1/2 -translate-y-1/2"
              @click="showPassword = !showPassword"
            >
              <Icon
                :name="showPassword ? 'eye-off' : 'eye'"
                size="16"
              />
            </Button>
          </template>
        </FormField>

        <!-- Remember Me & Forgot Password -->
        <HStack
          align="between"
          spacing="md"
        >
          <label class="flex items-center gap-token-xs cursor-pointer">
            <Checkbox 
              v-model="formData.rememberMe"
              :disabled="isLoading" 
            />
            <span class="text-token-sm text-text-secondary">Remember me</span>
          </label>
          
          <Button
            variant="link"
            size="sm"
            type="button"
            :disabled="isLoading"
            @click="$emit('forgot-password')"
          >
            Forgot password?
          </Button>
        </HStack>

        <!-- Global Error -->
        <div
          v-if="globalError"
          class="text-token-sm text-error text-center bg-error/10 p-token-md rounded-token-md"
        >
          {{ globalError }}
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          variant="primary"
          size="lg"
          class="w-full"
          :loading="isLoading"
          :disabled="isLoading || !isFormValid"
        >
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </Button>
      </form>
    </CardContent>

    <CardFooter class="text-center">
      <p class="text-token-sm text-text-secondary">
        Don't have an account?
        <Button
          variant="link"
          size="sm"
          :disabled="isLoading"
          @click="$emit('sign-up')"
        >
          Sign up
        </Button>
      </p>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import Card from '@/components/ui/card/BaseCard.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import FormField from '@/components/composite/FormField.vue'
import Button from "@/components/ui/button/BaseButton.vue"
import Checkbox from '@/components/ui/checkbox/BaseCheckbox.vue'
import HStack from '@/components/ui/stack/HStack.vue'
import Icon from '@/components/ui/icon/BaseIcon.vue'

interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

interface Props {
  isLoading?: boolean
  globalError?: string
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  globalError: ''
})

const emit = defineEmits<{
  submit: [credentials: LoginCredentials]
  'forgot-password': []
  'sign-up': []
}>()

// Form state
const showPassword = ref(false)
const formData = reactive<LoginCredentials>({
  email: '',
  password: '',
  rememberMe: false
})

// Form validation
const errors = reactive({
  email: '',
  password: ''
})

// Form validation computed
const isFormValid = computed(() => {
  return formData.email.length > 0 && 
         formData.password.length > 0 && 
         !errors.email && 
         !errors.password
})

// Validation functions
const validateEmail = (email: string): string => {
  if (!email) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address'
  }
  return ''
}

const validatePassword = (password: string): string => {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters'
  return ''
}

// Real-time validation
const validateForm = () => {
  errors.email = validateEmail(formData.email)
  errors.password = validatePassword(formData.password)
}

// Form submission
const handleSubmit = () => {
  validateForm()
  
  if (isFormValid.value) {
    emit('submit', { ...formData })
  }
}

// Watch for form changes to clear errors
watch(() => formData.email, () => {
  if (errors.email) {
    errors.email = validateEmail(formData.email)
  }
})

watch(() => formData.password, () => {
  if (errors.password) {
    errors.password = validatePassword(formData.password)
  }
})
</script>

<style scoped>
.login-form {
  box-shadow: var(--shadow-lg);
}

/* Focus-within enhancement */
.login-form:focus-within {
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
  transition: all var(--duration-normal) var(--easing-ease);
}

/* Loading state */
.login-form[data-loading="true"] {
  pointer-events: none;
  opacity: 0.8;
}
</style>