<!--
  Basic Tooltip Test Story
  Simple tooltip test to verify functionality
-->

<template>
  <Story
    title="Feedback/Basic Tooltip Test"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Working Tooltip Test">
      <TooltipProvider>
        <div class="max-w-2xl mx-auto p-8 space-y-8">
          <!-- Header -->
          <div class="text-center space-y-4">
            <h1 class="text-3xl font-bold">
              🔧 Tooltip Debugging
            </h1>
            <p class="text-text-secondary">
              Testing basic tooltip functionality
            </p>
          </div>

          <!-- Simple Test Cases -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Test 1: Basic Tooltip -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Basic Tooltip
              </h3>
              <TooltipRoot>
                <TooltipTriggerReka as-child>
                  <Button class="bg-primary text-primary-text">
                    Hover for tooltip
                  </Button>
                </TooltipTriggerReka>
                <TooltipPortal>
                  <TooltipContentPrimitive 
                    side="top" 
                    class="bg-slate-900 text-white px-2 py-1 text-xs rounded shadow-lg"
                  >
                    This is a working tooltip!
                  </TooltipContentPrimitive>
                </TooltipPortal>
              </TooltipRoot>
            </div>

            <!-- Test 2: Using our wrapper -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Wrapper Component
              </h3>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="secondary">
                    Test wrapper
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Wrapper tooltip works!
                </TooltipContent>
              </Tooltip>
            </div>

            <!-- Test 3: Different positions -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Positioned Tooltips
              </h3>
              <div class="grid grid-cols-2 gap-2">
                <Tooltip
                  v-for="side in ['top', 'right', 'bottom', 'left']"
                  :key="side"
                >
                  <TooltipTrigger as-child>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      {{ side }}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent :side="side">
                    {{ side }} tooltip
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <!-- Test 4: Custom delay -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Custom Timing
              </h3>
              <Tooltip :delay-duration="100">
                <TooltipTrigger as-child>
                  <Button variant="ghost">
                    Fast tooltip (100ms)
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Quick to show!
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <!-- Debug Info -->
          <div class="bg-muted p-4 rounded-lg">
            <h4 class="font-medium mb-2">
              Debug Information
            </h4>
            <div class="text-sm space-y-1">
              <div>Reka UI components imported: ✓</div>
              <div>TooltipProvider wrapper: ✓</div>
              <div>CSS classes applied: ✓</div>
              <div>Hover to test tooltips above</div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
// Direct Reka UI imports for testing
import { 
  TooltipRoot, 
  TooltipTrigger as TooltipTriggerReka, 
  TooltipContent as TooltipContentPrimitive, 
  TooltipPortal 
} from 'reka-ui'

// Our wrapper components
import Tooltip from '@/components/ui/tooltip/BaseTooltip.vue'
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue'
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import Button from '@/components/ui/button/BaseButton.vue'
</script>