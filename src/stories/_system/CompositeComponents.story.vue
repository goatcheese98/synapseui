<script setup lang="ts">
import { ref } from 'vue'
import FormField from '@/components/composite/FormField.vue'
import UserCard from '@/components/composite/UserCard.vue'
import LoginForm from '@/components/composite/LoginForm.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import HStack from '@/components/ui/stack/HStack.vue'

// Form field demo data
const email = ref('')
const password = ref('')
const emailError = ref('')
const successMessage = ref('')

const validateEmail = (value: string) => {
  if (!value) {
    emailError.value = 'Email is required'
    successMessage.value = ''
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    emailError.value = 'Please enter a valid email address'
    successMessage.value = ''
  } else {
    emailError.value = ''
    successMessage.value = 'Email looks good!'
  }
}

// User card demo data
const sampleUsers = [
  {
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    status: 'active' as const,
    bio: 'Senior Product Designer passionate about creating beautiful, accessible user experiences.',
    skills: ['UI/UX Design', 'Figma', 'React', 'Design Systems'],
    stats: { posts: 42, followers: 1284, following: 156 }
  },
  {
    name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    status: 'pending' as const,
    bio: 'Full-stack developer building the next generation of web applications.',
    skills: ['TypeScript', 'Vue.js', 'Node.js', 'PostgreSQL'],
    stats: { posts: 28, followers: 892, following: 234 }
  },
  {
    name: 'Elena Rodriguez', 
    email: 'elena.r@example.com',
    status: 'inactive' as const,
    bio: 'Data scientist turning complex problems into elegant solutions.',
    skills: ['Python', 'Machine Learning', 'Data Viz', 'SQL'],
    stats: { posts: 15, followers: 445, following: 89 }
  }
]

// Login form demo
const isLoginLoading = ref(false)
const loginError = ref('')

const handleLogin = async (credentials: any) => {
  isLoginLoading.value = true
  loginError.value = ''
  
  // Simulate API call
  setTimeout(() => {
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      alert('Login successful!')
      loginError.value = ''
    } else {
      loginError.value = 'Invalid email or password. Try demo@example.com / password'
    }
    isLoginLoading.value = false
  }, 2000)
}
</script>

<template>
  <Story title="Composite Components" :layout="{ type: 'single', iframe: false }">
    <Variant title="FormField Component">
      <div class="max-w-md space-y-8 p-8">
        <h3 class="text-xl font-semibold mb-4">Interactive Form Fields</h3>
        
        <!-- Basic Form Field -->
        <FormField
          v-model="email"
          label="Email Address"
          placeholder="Enter your email"
          help-text="We'll never share your email with anyone else"
          :error="emailError"
          :success="successMessage"
          required
          @blur="validateEmail(email)"
        />

        <!-- Password Field with Error -->
        <FormField
          v-model="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          error="Password must be at least 8 characters long"
          required
        />

        <!-- Disabled Field -->
        <FormField
          model-value="john.doe@company.com"
          label="Company Email"
          help-text="This field is managed by your administrator"
          disabled
        />

        <!-- Success State -->
        <FormField
          model-value="✓ Verified"
          label="Account Status"
          success="Your account has been successfully verified"
          disabled
        />
      </div>
    </Variant>

    <Variant title="UserCard Component">
      <div class="space-y-8 p-8">
        <h3 class="text-xl font-semibold mb-4">User Profile Cards</h3>
        
        <!-- Grid of User Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UserCard
            v-for="(user, index) in sampleUsers"
            :key="user.email"
            :user="user"
            :is-online="index === 0"
            :interactive="true"
          />
        </div>

        <!-- Compact Variant -->
        <div class="mt-8">
          <h4 class="text-lg font-medium mb-4">Compact Variant</h4>
          <HStack spacing="md" class="flex-wrap">
            <UserCard
              v-for="user in sampleUsers.slice(0, 2)"
              :key="`compact-${user.email}`"
              :user="user"
              variant="compact"
            />
          </HStack>
        </div>
      </div>
    </Variant>

    <Variant title="LoginForm Component">
      <div class="min-h-screen bg-background-secondary flex items-center justify-center p-4">
        <div class="w-full max-w-md">
          <h3 class="text-xl font-semibold mb-8 text-center">Interactive Login Form</h3>
          
          <LoginForm
            :is-loading="isLoginLoading"
            :global-error="loginError"
            @submit="handleLogin"
            @forgot-password="() => alert('Forgot password clicked')"
            @sign-up="() => alert('Sign up clicked')"
          />
          
          <div class="mt-6 p-4 bg-background-muted rounded-lg text-sm text-text-secondary">
            <strong>Demo credentials:</strong><br>
            Email: demo@example.com<br>
            Password: password
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Design Token Demo">
      <div class="p-8">
        <h2 class="text-2xl font-bold mb-4">Design Token Integration</h2>
        <p class="text-lg text-text-secondary mb-8">All components use consistent design tokens</p>
        
        <VStack spacing="md">
          <div class="p-4 bg-primary text-primary-text rounded-token-md">
            <h3 class="font-semibold">Primary Theme</h3>
            <p class="text-sm opacity-90">Using bg-primary and text-primary-text tokens</p>
          </div>
          
          <HStack spacing="sm">
            <div class="w-16 h-16 bg-success rounded-token-lg flex items-center justify-center">
              <span class="text-success-text font-bold">✓</span>
            </div>
            <div class="w-16 h-16 bg-warning rounded-token-lg flex items-center justify-center">
              <span class="text-warning-text font-bold">!</span>
            </div>
            <div class="w-16 h-16 bg-error rounded-token-lg flex items-center justify-center">
              <span class="text-error-text font-bold">×</span>
            </div>
          </HStack>
        </VStack>
      </div>
    </Variant>
  </Story>
</template>