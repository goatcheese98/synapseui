<script setup lang="ts">
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const state = reactive({
  text: 'Label Text',
  required: false,
  disabled: false
})
</script>

<template>
  <Story
    title="Components/Label"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <template #controls>
      <HstText
        v-model="state.text"
        title="Label Text"
      />
      <HstCheckbox
        v-model="state.required"
        title="Required"
      />
      <HstCheckbox
        v-model="state.disabled"
        title="Disabled"
      />
    </template>

    <Variant title="Basic Usage">
      <div class="space-y-4 p-4">
        <div class="space-y-2">
          <Label for="basic-input">
            {{ state.text }}
            <span v-if="state.required" class="text-red-500">*</span>
          </Label>
          <Input
            id="basic-input"
            placeholder="Enter some text..."
            :disabled="state.disabled"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Form Labels">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label for="name">
            Full Name
            <span class="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
          />
        </div>

        <div class="space-y-2">
          <Label for="country">Country</Label>
          <Select>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Variant>

    <Variant title="Label Styles">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label>Default Label</Label>
          <Input placeholder="Default styling..." />
        </div>

        <div class="space-y-2">
          <Label class="text-lg font-semibold">Large Label</Label>
          <Input placeholder="With larger text..." />
        </div>

        <div class="space-y-2">
          <Label class="text-xs uppercase tracking-wide text-gray-500">
            Small Caps Label
          </Label>
          <Input placeholder="With small caps styling..." />
        </div>

        <div class="space-y-2">
          <Label class="font-bold text-slate-700">Bold Label</Label>
          <Input placeholder="With bold font weight..." />
        </div>
      </div>
    </Variant>

    <Variant title="With Icons">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label class="flex items-center gap-2">
            <Icon icon="lucide:user" class="h-4 w-4" />
            Username
          </Label>
          <Input placeholder="Enter username..." />
        </div>

        <div class="space-y-2">
          <Label class="flex items-center gap-2">
            <Icon icon="lucide:mail" class="h-4 w-4" />
            Email Address
            <span class="text-red-500">*</span>
          </Label>
          <Input type="email" placeholder="your@email.com" />
        </div>

        <div class="space-y-2">
          <Label class="flex items-center gap-2">
            <Icon icon="lucide:lock" class="h-4 w-4" />
            Password
            <Icon icon="lucide:info" class="h-3 w-3 text-gray-400 ml-auto" />
          </Label>
          <Input type="password" placeholder="••••••••" />
        </div>
      </div>
    </Variant>

    <Variant title="Help Text & Descriptions">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label for="username">
            Username
            <span class="text-red-500">*</span>
          </Label>
          <Input
            id="username"
            placeholder="johndoe"
          />
          <p class="text-xs text-gray-500">
            Must be unique and contain only letters, numbers, and underscores.
          </p>
        </div>

        <div class="space-y-2">
          <Label for="bio">
            Bio
            <span class="text-sm font-normal text-gray-500 ml-2">(Optional)</span>
          </Label>
          <Input
            id="bio"
            placeholder="Tell us about yourself..."
          />
          <p class="text-xs text-gray-500">
            A brief description that will appear on your profile.
          </p>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <Label for="password-new">New Password</Label>
            <span class="text-xs text-gray-500">8-20 characters</span>
          </div>
          <Input
            id="password-new"
            type="password"
            placeholder="••••••••"
          />
        </div>
      </div>
    </Variant>

    <Variant title="Error States">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label for="error-email" class="text-red-600">
            Email Address
            <span class="text-red-500">*</span>
          </Label>
          <Input
            id="error-email"
            type="email"
            value="invalid-email"
            class="border-red-500 focus:ring-red-500"
          />
          <p class="text-xs text-red-600">
            Please enter a valid email address.
          </p>
        </div>

        <div class="space-y-2">
          <Label for="success-email" class="text-green-600">
            Email Address
            <span class="text-red-500">*</span>
          </Label>
          <Input
            id="success-email"
            type="email"
            value="john@example.com"
            class="border-green-500 focus:ring-green-500"
          />
          <p class="text-xs text-green-600">
            ✓ Email format is valid.
          </p>
        </div>

        <div class="space-y-2">
          <Label for="disabled-input" class="text-gray-400">
            Disabled Field
          </Label>
          <Input
            id="disabled-input"
            disabled
            value="This field is disabled"
          />
          <p class="text-xs text-gray-400">
            This field cannot be edited.
          </p>
        </div>
      </div>
    </Variant>

    <Variant title="Accessibility Features">
      <div class="space-y-6 p-4">
        <div class="space-y-2">
          <Label for="accessible-input">
            Screen Reader Friendly Label
          </Label>
          <Input
            id="accessible-input"
            placeholder="Properly associated with label"
            aria-describedby="help-text"
          />
          <p id="help-text" class="text-xs text-gray-500">
            This help text is properly associated with the input for screen readers.
          </p>
        </div>

        <div class="space-y-2">
          <Label for="required-field">
            Required Field
            <span class="text-red-500" aria-label="required">*</span>
          </Label>
          <Input
            id="required-field"
            required
            aria-required="true"
            placeholder="This field is required"
          />
        </div>

        <fieldset class="space-y-4 border border-gray-200 p-4 rounded-md">
          <legend class="text-sm font-medium px-2">Contact Information</legend>
          
          <div class="space-y-2">
            <Label for="contact-name">Name</Label>
            <Input id="contact-name" placeholder="Your name" />
          </div>
          
          <div class="space-y-2">
            <Label for="contact-email">Email</Label>
            <Input id="contact-email" type="email" placeholder="your@email.com" />
          </div>
        </fieldset>
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