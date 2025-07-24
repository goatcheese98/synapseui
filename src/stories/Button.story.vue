<script setup lang="ts">
import { ref } from 'vue'
import { Button, ToolbarButton } from '@/components/ui/button'
import { ToolbarRoot, ToolbarSeparator } from 'reka-ui'

const isLoading = ref(false)

const simulateLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <Story title="Components/Button (DaisyUI Style)" :layout="{ type: 'grid', width: '320px' }">
    <Variant title="Default">
      <Button>DaisyUI Style Button</Button>
    </Variant>

    <Variant title="Main Variants">
      <template #default>
        <div class="flex flex-col gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
          <Button variant="info">Info</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Outline Variants">
      <template #default>
        <div class="flex flex-col gap-3">
          <Button variant="outline">Neutral Outline</Button>
          <Button variant="outline-primary">Primary Outline</Button>
          <Button variant="outline-success">Success Outline</Button>
          <Button variant="outline-error">Error Outline</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Ghost Variants">
      <template #default>
        <div class="flex flex-col gap-3">
          <Button variant="ghost">Ghost</Button>
          <Button variant="ghost-primary">Ghost Primary</Button>
          <Button variant="link">Link</Button>
        </div>
      </template>
    </Variant>

    <Variant title="All Sizes">
      <template #default>
        <div class="flex flex-col gap-3 items-start">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Icon Buttons">
      <template #default>
        <div class="flex gap-3 items-center">
          <Button size="icon-xs">🔥</Button>
          <Button size="icon-sm">🔥</Button>
          <Button size="icon-md">🔥</Button>
          <Button size="icon-lg">🔥</Button>
          <Button size="icon-xl">🔥</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Button Shapes">
      <template #default>
        <div class="flex gap-3 items-center">
          <Button shape="square">Square</Button>
          <Button shape="rounded">Rounded</Button>
          <Button shape="circle" size="icon-md">⚡</Button>
        </div>
      </template>
    </Variant>

    <Variant title="With Icons">
      <template #default>
        <div class="flex flex-col gap-3">
          <Button>
            <template #icon-left>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12l-4-4h8l-4 4z"/>
              </svg>
            </template>
            Left Icon
          </Button>
          <Button>
            Right Icon
            <template #icon-right>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 8l4 4H6l4-4z"/>
              </svg>
            </template>
          </Button>
          <Button>
            <template #icon-left>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12l-4-4h8l-4 4z"/>
              </svg>
            </template>
            Both Icons
            <template #icon-right>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 8l4 4H6l4-4z"/>
              </svg>
            </template>
          </Button>
        </div>
      </template>
    </Variant>

    <Variant title="Loading States">
      <template #default>
        <div class="flex flex-col gap-3">
          <Button loading>Loading Button</Button>
          <Button :loading="isLoading" @click="simulateLoading">
            {{ isLoading ? 'Loading...' : 'Click to Load' }}
          </Button>
          <Button loading variant="outline-primary">Loading Outline</Button>
          <Button loading variant="success" size="sm">Small Loading</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Button States">
      <template #default>
        <div class="flex flex-col gap-3">
          <Button variant="primary">Normal</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Semantic Colors">
      <template #default>
        <div class="flex flex-wrap gap-3">
          <Button variant="success">✓ Save</Button>
          <Button variant="warning">⚠ Warning</Button>
          <Button variant="error">✗ Delete</Button>
          <Button variant="info">ℹ Info</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Full Width">
      <template #default>
        <div class="flex flex-col gap-3 w-full">
          <Button full-width>Full Width Button</Button>
          <Button full-width variant="outline">Full Width Outline</Button>
        </div>
      </template>
    </Variant>

    <Variant title="Button Types">
      <template #default>
        <form @submit.prevent="console.log('Form submitted')" class="flex flex-col gap-3">
          <Button type="button" variant="secondary">Button Type</Button>
          <Button type="submit" variant="success">Submit Form</Button>
          <Button type="reset" variant="error">Reset Form</Button>
        </form>
      </template>
    </Variant>

    <Variant title="Reka UI Primitives">
      <template #default>
        <div class="flex flex-col gap-4">
          <div>
            <h4 class="text-sm font-semibold mb-2">Standard Button (using Primitive)</h4>
            <Button>Standard Button</Button>
          </div>
          
          <div>
            <h4 class="text-sm font-semibold mb-2">As Child Pattern</h4>
            <Button asChild>
              <a href="#" class="no-underline">Link Button</a>
            </Button>
          </div>
          
          <div>
            <h4 class="text-sm font-semibold mb-2">Custom Element</h4>
            <Button as="div">Div Button</Button>
          </div>
        </div>
      </template>
    </Variant>

    <Variant title="DaisyUI Style Toolbar">
      <template #default>
        <div class="flex flex-col gap-4">
          <h4 class="text-sm font-semibold">DaisyUI Style Toolbar</h4>
          <div class="flex gap-2 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Button variant="ghost" size="sm">
              <template #icon-left>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </template>
              Layout
            </Button>
            
            <div class="w-px bg-gray-300" />
            
            <Button variant="ghost" size="sm">Bold</Button>
            <Button variant="ghost" size="sm">Italic</Button>
            
            <div class="w-px bg-gray-300" />
            
            <Button variant="ghost-primary" size="sm" loading>
              Save
            </Button>
          </div>
          
          <h4 class="text-sm font-semibold">Reka UI ToolbarButton (Original)</h4>
          <ToolbarRoot class="flex gap-1 p-2 bg-gray-50 border rounded-md">
            <ToolbarButton size="sm">File</ToolbarButton>
            <ToolbarButton size="sm">Edit</ToolbarButton>
            <ToolbarButton size="sm">View</ToolbarButton>
          </ToolbarRoot>
        </div>
      </template>
    </Variant>

    <Variant title="Accessibility">
      <template #default>
        <div class="flex flex-col gap-3">
          <Button aria-label="Save document">💾</Button>
          <Button aria-describedby="help-text">
            Help Button
          </Button>
          <div id="help-text" class="text-xs text-gray-500">
            This button provides help information
          </div>
        </div>
      </template>
    </Variant>

    <Variant title="Interactive Demo" 
      :controls="{ 
        variant: 'primary', 
        size: 'md', 
        shape: 'rounded',
        disabled: false, 
        loading: false,
        fullWidth: false,
        ripple: true,
        asChild: false
      }"
    >
      <template #default="{ state }">
        <Button 
          :variant="state.variant" 
          :size="state.size" 
          :shape="state.shape"
          :disabled="state.disabled"
          :loading="state.loading"
          :full-width="state.fullWidth"
          :ripple="state.ripple"
          :asChild="state.asChild"
          @click="() => console.log('Interactive DaisyUI button clicked!')"
        >
          {{ state.size?.includes('icon') ? '🎨' : 'DaisyUI Button' }}
        </Button>
      </template>
    </Variant>
  </Story>
</template>