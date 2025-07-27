<template>
  <Story
    title="System/Real World Example"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Complete Dashboard Interface">
      <div class="min-h-screen bg-gray-50 p-6">
        <!-- Dashboard Layout Context -->
        <LayoutProvider pattern="dashboard">
          <!-- Header -->
          <header class="mb-8">
            <InterconnectedCard
              variant="default"
              size="md"
            >
              <CardContent class="py-4">
                <div class="flex items-center justify-between">
                  <div>
                    <CardTitle size="lg">
                      Analytics Dashboard
                    </CardTitle>
                    <CardDescription>Monitor your application performance</CardDescription>
                  </div>
                  <div class="flex gap-2">
                    <UltraSmartButton
                      variant="outline"
                      intelligence="full"
                    >
                      Export
                    </UltraSmartButton>
                    <UltraSmartButton intelligence="full">
                      Refresh Data
                    </UltraSmartButton>
                  </div>
                </div>
              </CardContent>
            </InterconnectedCard>
          </header>

          <!-- Metrics Grid -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <!-- Success Metric -->
            <InterconnectedCard
              variant="success"
              size="sm"
            >
              <CardHeader size="sm">
                <CardTitle size="sm">
                  Active Users
                </CardTitle>
                <CardDescription size="xs">
                  Last 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent size="sm">
                <div class="text-2xl font-bold text-green-600">
                  2,543
                </div>
                <p class="text-xs text-green-600 mt-1">
                  ↗ +12% from yesterday
                </p>
              </CardContent>
              <CardFooter size="sm">
                <UltraSmartButton
                  size="xs"
                  intelligence="full"
                >
                  View Details
                </UltraSmartButton>
              </CardFooter>
            </InterconnectedCard>

            <!-- Warning Metric -->
            <InterconnectedCard
              variant="warning"
              size="sm"
            >
              <CardHeader size="sm">
                <CardTitle size="sm">
                  Response Time
                </CardTitle>
                <CardDescription size="xs">
                  Average latency
                </CardDescription>
              </CardHeader>
              <CardContent size="sm">
                <div class="text-2xl font-bold text-amber-600">
                  342ms
                </div>
                <p class="text-xs text-amber-600 mt-1">
                  ↗ +5% slower
                </p>
              </CardContent>
              <CardFooter size="sm">
                <UltraSmartButton
                  size="xs"
                  intelligence="full"
                >
                  Investigate
                </UltraSmartButton>
              </CardFooter>
            </InterconnectedCard>

            <!-- Error Metric -->
            <InterconnectedCard
              variant="error"
              size="sm"
            >
              <CardHeader size="sm">
                <CardTitle size="sm">
                  Error Rate
                </CardTitle>
                <CardDescription size="xs">
                  Failed requests
                </CardDescription>
              </CardHeader>
              <CardContent size="sm">
                <div class="text-2xl font-bold text-red-600">
                  2.1%
                </div>
                <p class="text-xs text-red-600 mt-1">
                  ↗ Critical threshold
                </p>
              </CardContent>
              <CardFooter size="sm">
                <UltraSmartButton
                  size="xs"
                  intelligence="full"
                >
                  Fix Issues
                </UltraSmartButton>
              </CardFooter>
            </InterconnectedCard>

            <!-- Primary Metric -->
            <InterconnectedCard
              variant="primary"
              size="sm"
            >
              <CardHeader size="sm">
                <CardTitle size="sm">
                  Revenue
                </CardTitle>
                <CardDescription size="xs">
                  Today's earnings
                </CardDescription>
              </CardHeader>
              <CardContent size="sm">
                <div class="text-2xl font-bold text-blue-600">
                  $12,847
                </div>
                <p class="text-xs text-blue-600 mt-1">
                  ↗ +23% increase
                </p>
              </CardContent>
              <CardFooter size="sm">
                <UltraSmartButton
                  size="xs"
                  intelligence="full"
                >
                  View Report
                </UltraSmartButton>
              </CardFooter>
            </InterconnectedCard>
          </div>

          <!-- Form Section with Context -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- User Settings Form -->
            <FormProvider
              state="default"
              size="md"
            >
              <InterconnectedCard
                variant="default"
                size="md"
              >
                <CardHeader>
                  <CardTitle>User Settings</CardTitle>
                  <CardDescription>Update your preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1">Email</label>
                      <SmartInput placeholder="user@example.com" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">Name</label>
                      <SmartInput placeholder="John Doe" />
                    </div>
                    <div class="flex gap-2">
                      <UltraSmartButton intelligence="full">
                        Save Changes
                      </UltraSmartButton>
                      <UltraSmartButton
                        variant="outline"
                        intelligence="basic"
                      >
                        Cancel
                      </UltraSmartButton>
                    </div>
                  </div>
                </CardContent>
              </InterconnectedCard>
            </FormProvider>

            <!-- Error Form Demo -->
            <FormProvider
              state="error"
              size="md"
            >
              <InterconnectedCard
                variant="error"
                size="md"
              >
                <CardHeader>
                  <CardTitle>Error Form Demo</CardTitle>
                  <CardDescription>See how errors propagate through the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1">Invalid Field</label>
                      <SmartInput placeholder="This will be error-styled" />
                      <p class="text-xs text-red-600 mt-1">
                        This field is required
                      </p>
                    </div>
                    <div class="flex gap-2">
                      <UltraSmartButton intelligence="full">
                        Try Again
                      </UltraSmartButton>
                      <UltraSmartButton
                        variant="outline"
                        intelligence="basic"
                      >
                        Reset Form
                      </UltraSmartButton>
                    </div>
                  </div>
                </CardContent>
              </InterconnectedCard>
            </FormProvider>
          </div>

          <!-- Navigation Demo -->
          <div class="mt-8">
            <NavProvider
              theme="light"
              variant="horizontal"
            >
              <InterconnectedCard
                variant="outline"
                size="md"
              >
                <CardContent class="py-4">
                  <div class="flex items-center justify-between">
                    <CardTitle size="md">
                      Navigation Bar Simulation
                    </CardTitle>
                    <div class="flex gap-2">
                      <UltraSmartButton intelligence="full">
                        Home
                      </UltraSmartButton>
                      <UltraSmartButton intelligence="full">
                        Products
                      </UltraSmartButton>
                      <UltraSmartButton intelligence="full">
                        About
                      </UltraSmartButton>
                      <UltraSmartButton intelligence="full">
                        Contact
                      </UltraSmartButton>
                    </div>
                  </div>
                </CardContent>
              </InterconnectedCard>
            </NavProvider>
          </div>
        </LayoutProvider>

        <!-- Debug Panel -->
        <div class="mt-12 p-6 bg-gray-900 text-white rounded-lg">
          <h3 class="text-lg font-semibold mb-4">
            🔍 Context Debug Panel
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 class="font-medium text-blue-300 mb-2">
                Active Contexts
              </h4>
              <ul class="space-y-1 text-gray-300">
                <li>✓ Layout: Dashboard (compact density)</li>
                <li>✓ Cards: Various intents (success, warning, error, primary)</li>
                <li>✓ Forms: Default state & Error state</li>
                <li>✓ Navigation: Light theme, horizontal</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-green-300 mb-2">
                Auto-Adaptations
              </h4>
              <ul class="space-y-1 text-gray-300">
                <li>→ Button variants match card intents</li>
                <li>→ Sizes scale consistently (sm cards = sm buttons)</li>
                <li>→ Error forms = red buttons & inputs</li>
                <li>→ Dashboard layout = compact, ghost buttons</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium text-purple-300 mb-2">
                Priority Resolution
              </h4>
              <ul class="space-y-1 text-gray-300">
                <li>1. Form context (highest)</li>
                <li>2. Card context</li>
                <li>3. Navigation context</li>
                <li>4. Layout context (lowest)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import InterconnectedCard from '@/components/ui/card/InterconnectedCard.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import UltraSmartButton from '@/components/ui/button/BaseButton.vue'
import SmartButton from '@/components/ui/button/BaseButton.vue'
import SmartInput from '@/components/ui/input/SmartInput.vue'

// Context Providers (these would be real components in your actual implementation)
import { provide } from 'vue'
import { 
  createLayoutContext, 
  createFormContext, 
  createNavContext,
  LAYOUT_CONTEXT_KEY,
  FORM_CONTEXT_KEY,
  NAV_CONTEXT_KEY 
} from '@/composables/useComposition'

// Mock providers for this demo
const LayoutProvider = {
  props: ['pattern'],
  setup(props: any, { slots }: any) {
    const layoutContext = createLayoutContext(props.pattern)
    provide(LAYOUT_CONTEXT_KEY, layoutContext)
    return () => slots.default()
  }
}

const FormProvider = {
  props: ['state', 'size'],
  setup(props: any, { slots }: any) {
    const formContext = createFormContext(props.state, props.size)
    provide(FORM_CONTEXT_KEY, formContext)
    return () => slots.default()
  }
}

const NavProvider = {
  props: ['theme', 'variant'],
  setup(props: any, { slots }: any) {
    const navContext = createNavContext(props.variant, 'md', props.theme)
    provide(NAV_CONTEXT_KEY, navContext)
    return () => slots.default()
  }
}
</script>