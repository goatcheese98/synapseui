<!--
  Tooltip Debug Story
  Minimal test to verify tooltip functionality
-->

<template>
  <Story
    title="Debug/Tooltip Debug"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Debug Tooltips">
      <div class="p-8 space-y-8">
        <!-- Test with TooltipProvider -->
        <div class="space-y-4">
          <h2 class="text-xl font-bold">
            With TooltipProvider
          </h2>
          <TooltipProvider :delay-duration="100">
            <TooltipRoot>
              <TooltipTrigger>
                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Test Button 1
                </button>
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent 
                  side="top"
                  class="px-3 py-1.5 text-sm bg-black text-white rounded shadow-lg z-50"
                >
                  Working tooltip!
                </TooltipContent>
              </TooltipPortal>
            </TooltipRoot>
          </TooltipProvider>
        </div>

        <!-- Test without provider -->
        <div class="space-y-4">
          <h2 class="text-xl font-bold">
            Without Provider
          </h2>
          <TooltipRoot :delay-duration="100">
            <TooltipTrigger>
              <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Test Button 2
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent 
                side="right"
                class="px-3 py-1.5 text-sm bg-black text-white rounded shadow-lg z-50"
              >
                Another tooltip!
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>

        <!-- Test our wrapper -->
        <div class="space-y-4">
          <h2 class="text-xl font-bold">
            Our Wrapper Components
          </h2>
          <TooltipProvider>
            <Tooltip :delay-duration="100">
              <TooltipTrigger as-child>
                <button class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                  Wrapper Button
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Wrapper tooltip!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <!-- Debug info -->
        <div class="mt-8 p-4 bg-gray-100 rounded">
          <h3 class="font-bold mb-2">
            Debug Info:
          </h3>
          <ul class="text-sm space-y-1">
            <li>• Hover over buttons above to test tooltips</li>
            <li>• Check browser console for errors</li>
            <li>• Verify Reka UI is properly installed</li>
            <li>• Check CSS classes are applied</li>
          </ul>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { 
  TooltipRoot, 
  TooltipTrigger as TooltipTriggerPrimitive, 
  TooltipContent as TooltipContentPrimitive, 
  TooltipPortal 
} from 'reka-ui'

import Tooltip from '@/components/ui/tooltip/BaseTooltip.vue'
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue'
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
</script>