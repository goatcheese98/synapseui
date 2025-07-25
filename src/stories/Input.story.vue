<script setup lang="ts">
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const state = reactive({
  value: '',
  placeholder: 'Enter some text...',
  disabled: false,
  type: 'text'
})

const formData = reactive({
  name: '',
  email: '',
  password: '',
  search: '',
  number: '',
  url: '',
  tel: ''
})
</script>

<template>
  <Story
    title="Components/Input"
    :layout="{ type: 'grid', width: '350px' }"
  >
    <template #controls>
      <HstText
        v-model="state.value"
        title="Value"
      />
      <HstText
        v-model="state.placeholder"
        title="Placeholder"
      />
      <HstSelect
        v-model="state.type"
        title="Type"
        :options="[
          { value: 'text', label: 'Text' },
          { value: 'email', label: 'Email' },
          { value: 'password', label: 'Password' },
          { value: 'number', label: 'Number' },
          { value: 'url', label: 'URL' },
          { value: 'tel', label: 'Telephone' },
          { value: 'search', label: 'Search' }
        ]"
      />
      <HstCheckbox
        v-model="state.disabled"
        title="Disabled"
      />
    </template>

    <Variant title="Basic Usage">
      <div class="space-y-4 p-4">
        <div class="space-y-2">
          <Label for="basic-input">Basic Input</Label>
          <Input
            id="basic-input"
            v-model="state.value"
            :type="state.type"
            :placeholder="state.placeholder"
            :disabled="state.disabled"
          />
        </div>
        <p class="text-sm text-gray-600">Value: {{ state.value || 'Empty' }}</p>
      </div>
    </Variant>

    <Variant title="Corner Detection Demo">
      <div class="space-y-4 p-4">
        <div class="space-y-2">
          <Label>Hover near corners to see animation</Label>
          <Input placeholder="Try hovering near the corners..." />
        </div>
        <div class="text-xs text-gray-500 space-y-1">
          <p>• Hover near corners to see border radius morph</p>
          <p>• Uses 700-series color scheme on focus/hover</p>
          <p>• Cubic-bezier timing for smooth transitions</p>
          <p>• Slight scale transform on corner detection</p>
        </div>
      </div>
    </Variant>

    <Variant title="Form Example">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label for="name">Full Name</Label>
          <Input
            id="name"
            v-model="formData.name"
            placeholder="John Doe"
          />
        </div>

        <div class="space-y-2">
          <Label for="email">Email Address</Label>
          <Input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="john@example.com"
          />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <div class="space-y-2">
          <Label for="phone">Phone Number</Label>
          <Input
            id="phone"
            v-model="formData.tel"
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div class="pt-2">
          <button 
            type="submit" 
            class="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            Submit Form
          </button>
        </div>
      </div>
    </Variant>

    <Variant title="Input Types">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label for="search">Search</Label>
          <Input
            id="search"
            v-model="formData.search"
            type="search"
            placeholder="Search..."
          />
        </div>

        <div class="space-y-2">
          <Label for="number">Number</Label>
          <Input
            id="number"
            v-model="formData.number"
            type="number"
            placeholder="42"
            min="0"
            max="100"
          />
        </div>

        <div class="space-y-2">
          <Label for="url">Website URL</Label>
          <Input
            id="url"
            v-model="formData.url"
            type="url"
            placeholder="https://example.com"
          />
        </div>

        <div class="space-y-2">
          <Label>Disabled Input</Label>
          <Input
            disabled
            value="This input is disabled"
            placeholder="Disabled input"
          />
        </div>
      </div>
    </Variant>

    <Variant title="With Icons">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label>Search with Icon</Label>
          <div class="relative">
            <Input
              placeholder="Search products..."
              class="pl-10"
            />
            <Icon 
              icon="lucide:search" 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
            />
          </div>
        </div>

        <div class="space-y-2">
          <Label>Email with Icon</Label>
          <div class="relative">
            <Input
              type="email"
              placeholder="your@email.com"
              class="pl-10"
            />
            <Icon 
              icon="lucide:mail" 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
            />
          </div>
        </div>

        <div class="space-y-2">
          <Label>Password with Toggle</Label>
          <div class="relative">
            <Input
              type="password"
              placeholder="••••••••"
              class="pr-10"
            />
            <button 
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Icon icon="lucide:eye" class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <Label>Amount with Currency</Label>
          <div class="relative">
            <Input
              type="number"
              placeholder="0.00"
              class="pl-8"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Validation States">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label>Valid Input</Label>
          <Input
            value="john@example.com"
            class="border-green-500 focus:ring-green-500"
          />
          <p class="text-xs text-green-600">✓ Email format is valid</p>
        </div>

        <div class="space-y-2">
          <Label>Invalid Input</Label>
          <Input
            value="invalid-email"
            class="border-red-500 focus:ring-red-500"
          />
          <p class="text-xs text-red-600">✗ Please enter a valid email address</p>
        </div>

        <div class="space-y-2">
          <Label>Warning Input</Label>
          <Input
            value="test@gmail.com"
            class="border-amber-500 focus:ring-amber-500"
          />
          <p class="text-xs text-amber-600">⚠ Consider using a business email</p>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}
</style>