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
  <Story title="Components/Button" :layout="{ type: 'grid', width: '320px' }">
    <Variant title="Default">
      <Button>Button</Button>
    </Variant>

    <Variant title="Main Variants">
      <template #default>
        <div class="flex flex-col gap-3">
          <Button variant="neutral">Neutral</Button>
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
          <Button size="icon-xs" variant="neutral" title="Extra Small (6x6)">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3L12 8h5l-4 3 1 5-4-3-4 3 1-5-4-3h5l2-5z"/>
            </svg>
          </Button>
          <Button size="icon-sm" variant="accent" title="Small (8x8)">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
            </svg>
          </Button>
          <Button size="icon-md" variant="success" title="Medium (10x10)">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </Button>
          <Button size="icon-lg" variant="warning" title="Large (12x12)">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </Button>
          <Button size="icon-xl" variant="error" title="Extra Large (16x16)">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </Button>
        </div>
        <div class="text-xs text-gray-500 mt-2">
          Icon sizes: XS(6×6) SM(8×8) MD(10×10) LG(12×12) XL(16×16)
        </div>
      </template>
    </Variant>

    <Variant title="Button Shapes">
      <template #default>
        <div class="flex gap-3 items-center">
          <Button class="rounded-none">Square</Button>
          <Button class="rounded-lg">Rounded</Button>
          <Button size="icon-md" class="rounded-full">⚡</Button>
        </div>
      </template>
    </Variant>

    <Variant title="With Icons">
      <template #default>
        <div class="space-y-3">
          <button class="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
            </svg>
            Left Icon
          </button>
          
          <button class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Right Icon
            <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          
          <button class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
            </svg>
            Both Icons
            <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
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

    <Variant title="Enhanced Visual Effects Showcase">
      <template #default>
        <div class="p-6 bg-gray-50 rounded-lg max-w-2xl">
          <h4 class="text-sm font-semibold mb-6 text-gray-700">Enhanced Buttons with Clean Animations & Hover Effects</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <div class="space-y-4">
              <Button variant="primary" size="lg">Enhanced Primary</Button>
              <Button variant="accent" size="lg">Purple Accent</Button>
              <Button variant="success" size="lg">Success Button</Button>
            </div>
            <div class="space-y-4">
              <Button variant="outline-primary" size="lg">Primary Outline</Button>
              <Button variant="warning" size="lg">Warning Button</Button>
              <Button variant="error" size="lg">Error Button</Button>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-6 leading-relaxed">
            Features: Clean hover animations, proper focus states, accessible colors, and Rekha UI conventions
          </p>
        </div>
      </template>
    </Variant>

    <Variant title="Full Width">
      <template #default>
        <div class="flex flex-col gap-3 w-full">
          <Button class="w-full">Full Width Button</Button>
          <Button variant="outline" class="w-full">Full Width Outline</Button>
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

    <Variant title="Toolbar Example">
      <template #default>
        <div class="flex flex-col gap-4">
          <h4 class="text-sm font-semibold">Button Toolbar</h4>
          <div class="flex gap-2 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Button variant="ghost" size="sm">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
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
        variant: 'neutral', 
        size: 'md',
        disabled: false, 
        loading: false,
        asChild: false
      }"
    >
      <template #default="{ state }">
        <Button 
          :variant="state.variant" 
          :size="state.size"
          :disabled="state.disabled"
          :loading="state.loading"
          :asChild="state.asChild"
          @click="() => console.log('Interactive button clicked!')"
        >
          {{ state.size?.includes('icon') ? '🎨' : 'Interactive Button' }}
        </Button>
      </template>
    </Variant>
  </Story>
</template>