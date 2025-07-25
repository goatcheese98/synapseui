<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastViewport,
} from '@/components/ui/toast'

const state = reactive({
  variant: 'default',
  duration: 5000,
  withAction: true,
  withTitle: true,
  withDescription: true,
  position: 'bottom-right'
})

const toastCount = ref(0)
const showToast = ref(false)
const showMultiple = ref(0)

const showSingleToast = () => {
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 100)
}

const showMultipleToasts = () => {
  showMultiple.value++
}

const getVariantIcon = (variant: string) => {
  switch (variant) {
    case 'success': return 'lucide:check-circle'
    case 'destructive': return 'lucide:alert-circle'
    case 'warning': return 'lucide:alert-triangle'
    case 'info': return 'lucide:info'
    default: return 'lucide:bell'
  }
}

const getVariantTitle = (variant: string) => {
  switch (variant) {
    case 'success': return 'Success!'
    case 'destructive': return 'Error occurred'
    case 'warning': return 'Warning'
    case 'info': return 'Information'
    default: return 'Notification'
  }
}

const getVariantDescription = (variant: string) => {
  switch (variant) {
    case 'success': return 'Your changes have been saved successfully.'
    case 'destructive': return 'There was a problem with your request.'
    case 'warning': return 'Please review your input before continuing.'
    case 'info': return 'Here is some additional information for you.'
    default: return 'This is a toast notification with corner detection animations.'
  }
}
</script>

<template>
  <Story
    title="Components/Toast"
    :layout="{ type: 'single', iframe: false }"
  >
    <template #controls>
      <HstSelect
        v-model="state.variant"
        title="Variant"
        :options="[
          { value: 'default', label: 'Default' },
          { value: 'destructive', label: 'Destructive' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'info', label: 'Info' }
        ]"
      />
      <HstNumber
        v-model="state.duration"
        title="Duration (ms)"
        :min="1000"
        :max="10000"
        :step="500"
      />
      <HstCheckbox
        v-model="state.withTitle"
        title="With Title"
      />
      <HstCheckbox
        v-model="state.withDescription"
        title="With Description"
      />
      <HstCheckbox
        v-model="state.withAction"
        title="With Action"
      />
    </template>

    <Variant
      title="Interactive Toast Demo"
      auto-props-disabled
    >
      <ToastProvider>
        <div class="space-y-4 p-8">
          <div class="flex flex-wrap gap-4">
            <button
              @click="showSingleToast"
              class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Show Toast
            </button>
            <button
              @click="showMultipleToasts"
              class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Add Multiple Toast
            </button>
          </div>

          <div class="text-sm text-muted-foreground">
            <p>• Toast notifications appear in the bottom-right corner</p>
            <p>• Hover near corners to see corner detection animations</p>
            <p>• Swipe right to dismiss toasts</p>
            <p>• Each toast has automatic dismissal after {{ state.duration }}ms</p>
          </div>

          <!-- Single controlled toast -->
          <ToastRoot
            v-if="showToast"
            :variant="state.variant"
            :duration="state.duration"
            type="foreground"
          >
            <div class="grid gap-1">
              <ToastTitle v-if="state.withTitle" class="flex items-center gap-2">
                <Icon :icon="getVariantIcon(state.variant)" class="h-4 w-4" />
                {{ getVariantTitle(state.variant) }}
              </ToastTitle>
              <ToastDescription v-if="state.withDescription">
                {{ getVariantDescription(state.variant) }}
              </ToastDescription>
            </div>
            <ToastAction v-if="state.withAction" alt-text="Retry action">
              Retry
            </ToastAction>
            <ToastClose />
          </ToastRoot>

          <!-- Multiple toasts -->
          <ToastRoot
            v-for="index in showMultiple"
            :key="index"
            :variant="state.variant"
            :duration="state.duration + (index * 500)"
          >
            <div class="grid gap-1">
              <ToastTitle class="flex items-center gap-2">
                <Icon :icon="getVariantIcon(state.variant)" class="h-4 w-4" />
                {{ getVariantTitle(state.variant) }} #{{ index }}
              </ToastTitle>
              <ToastDescription>
                Toast notification number {{ index }}
              </ToastDescription>
            </div>
            <ToastAction alt-text="View details">
              View
            </ToastAction>
            <ToastClose />
          </ToastRoot>
        </div>

        <ToastViewport />
      </ToastProvider>
    </Variant>

    <Variant
      title="All Variants"
      auto-props-disabled
    >
      <ToastProvider>
        <div class="space-y-4 p-8">
          <div class="grid gap-4 md:grid-cols-2">
            <button
              @click="toastCount++"
              class="inline-flex items-center justify-center rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Show Default Toast
            </button>
            <button
              @click="toastCount++"
              class="inline-flex items-center justify-center rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Show Success Toast
            </button>
            <button
              @click="toastCount++"
              class="inline-flex items-center justify-center rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Show Error Toast
            </button>
            <button
              @click="toastCount++"
              class="inline-flex items-center justify-center rounded-md bg-yellow-700 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Show Warning Toast
            </button>
          </div>

          <!-- Default toast -->
          <ToastRoot
            v-for="index in toastCount"
            :key="`default-${index}`"
            variant="default"
            :duration="4000"
          >
            <div class="grid gap-1">
              <ToastTitle class="flex items-center gap-2">
                <Icon icon="lucide:bell" class="h-4 w-4" />
                Notification
              </ToastTitle>
              <ToastDescription>
                Your message has been sent.
              </ToastDescription>
            </div>
            <ToastAction alt-text="Mark as read">
              Mark as read
            </ToastAction>
            <ToastClose />
          </ToastRoot>
        </div>

        <ToastViewport />
      </ToastProvider>
    </Variant>

    <Variant
      title="Corner Detection Demo"
      auto-props-disabled
    >
      <ToastProvider>
        <div class="space-y-4 p-8">
          <div class="text-center space-y-2">
            <h3 class="text-lg font-medium text-foreground">Corner Detection Features</h3>
            <div class="text-sm text-muted-foreground space-y-1">
              <p>• Toast containers have 15px corner detection threshold</p>
              <p>• Toast actions have 12px threshold (smaller buttons)</p>
              <p>• Close buttons have 10px threshold (smallest)</p>
              <p>• All elements morph border radius from 6px → 18px with scale effect</p>
              <p>• Swipe-to-dismiss animations included</p>
            </div>
          </div>
          
          <div class="flex justify-center">
            <button
              @click="toastCount++"
              class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Test Corner Detection
            </button>
          </div>

          <!-- Demo toasts with various content -->
          <ToastRoot
            v-for="index in Math.min(toastCount, 3)"
            :key="`demo-${index}`"
            :variant="['success', 'warning', 'info'][index - 1]"
            :duration="6000"
          >
            <div class="grid gap-1">
              <ToastTitle class="flex items-center gap-2">
                <Icon :icon="[getVariantIcon('success'), getVariantIcon('warning'), getVariantIcon('info')][index - 1]" class="h-4 w-4" />
                Corner Detection Test {{ index }}
              </ToastTitle>
              <ToastDescription>
                Hover near the corners of this toast to see the animation effect in action.
              </ToastDescription>
            </div>
            <ToastAction :alt-text="`Test action ${index}`">
              Test Action
            </ToastAction>
            <ToastClose />
          </ToastRoot>
        </div>

        <ToastViewport />
      </ToastProvider>
    </Variant>

    <Variant
      title="Accessibility Features"
      auto-props-disabled
    >
      <ToastProvider>
        <div class="space-y-4 p-8">
          <div class="text-sm text-muted-foreground space-y-2">
            <p><strong>Keyboard Navigation:</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li><kbd class="px-1 py-0.5 bg-muted rounded text-xs">F8</kbd> - Focus toast viewport</li>
              <li><kbd class="px-1 py-0.5 bg-muted rounded text-xs">Tab</kbd> - Navigate between toast elements</li>
              <li><kbd class="px-1 py-0.5 bg-muted rounded text-xs">Space/Enter</kbd> - Activate actions or close</li>
              <li><kbd class="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd> - Close focused toast</li>
            </ul>
            <p><strong>Screen Reader:</strong> Toasts use proper ARIA labels and alt text for actions</p>
            <p><strong>Motion:</strong> Respects user motion preferences</p>
          </div>
          
          <button
            @click="toastCount++"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Test Accessibility
          </button>

          <ToastRoot
            v-for="index in toastCount"
            :key="`a11y-${index}`"
            variant="info"
            type="foreground"
            :duration="8000"
          >
            <div class="grid gap-1">
              <ToastTitle>
                Accessibility Test
              </ToastTitle>
              <ToastDescription>
                This toast demonstrates proper accessibility features including keyboard navigation and screen reader support.
              </ToastDescription>
            </div>
            <ToastAction alt-text="Learn more about accessibility features">
              Learn More
            </ToastAction>
            <ToastClose aria-label="Close accessibility test notification" />
          </ToastRoot>
        </div>

        <ToastViewport />
      </ToastProvider>
    </Variant>
  </Story>
</template>