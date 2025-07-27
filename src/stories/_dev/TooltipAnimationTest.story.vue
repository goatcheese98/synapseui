<!--
  Tooltip Animation Test Story
  Test the new custom animation classes
-->

<template>
  <Story
    title="Debug/Animation Test"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Custom Animation Classes">
      <TooltipProvider>
        <div class="max-w-4xl mx-auto p-8 space-y-12">
          <!-- Header -->
          <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🎬 Animation Testing
            </h1>
            <p class="text-text-secondary text-lg">
              Testing our custom animation classes
            </p>
          </div>

          <!-- Animation Test Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <!-- Fade In -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Fade In
              </h3>
              <TooltipRoot>
                <TooltipTriggerReka as-child>
                  <Button variant="outline">
                    Fade
                  </Button>
                </TooltipTriggerReka>
                <TooltipPortal>
                  <TooltipContentPrimitive 
                    class="z-50 overflow-hidden rounded-md border bg-slate-900 text-white px-3 py-1.5 text-sm shadow-lg animate-fade-in"
                    side="top"
                    :side-offset="8"
                  >
                    Fade in animation!
                  </TooltipContentPrimitive>
                </TooltipPortal>
              </TooltipRoot>
            </div>

            <!-- Zoom In -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Zoom In
              </h3>
              <TooltipRoot>
                <TooltipTriggerReka as-child>
                  <Button variant="outline">
                    Zoom
                  </Button>
                </TooltipTriggerReka>
                <TooltipPortal>
                  <TooltipContentPrimitive 
                    class="z-50 overflow-hidden rounded-md border bg-blue-600 text-white px-3 py-1.5 text-sm shadow-lg animate-zoom-in"
                    side="top"
                    :side-offset="8"
                  >
                    Zoom in animation!
                  </TooltipContentPrimitive>
                </TooltipPortal>
              </TooltipRoot>
            </div>

            <!-- Slide From Bottom -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Slide Bottom
              </h3>
              <TooltipRoot>
                <TooltipTriggerReka as-child>
                  <Button variant="outline">
                    Slide
                  </Button>
                </TooltipTriggerReka>
                <TooltipPortal>
                  <TooltipContentPrimitive 
                    class="z-50 overflow-hidden rounded-md border bg-green-600 text-white px-3 py-1.5 text-sm shadow-lg animate-slide-in-from-bottom"
                    side="top"
                    :side-offset="8"
                  >
                    Slide animation!
                  </TooltipContentPrimitive>
                </TooltipPortal>
              </TooltipRoot>
            </div>

            <!-- Scale In -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Scale
              </h3>
              <TooltipRoot>
                <TooltipTriggerReka as-child>
                  <Button variant="outline">
                    Scale
                  </Button>
                </TooltipTriggerReka>
                <TooltipPortal>
                  <TooltipContentPrimitive 
                    class="z-50 overflow-hidden rounded-md border bg-purple-600 text-white px-3 py-1.5 text-sm shadow-lg animate-scale-in"
                    side="top"
                    :side-offset="8"
                  >
                    Scale animation!
                  </TooltipContentPrimitive>
                </TooltipPortal>
              </TooltipRoot>
            </div>

            <!-- Fast Animations -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Fast Fade
              </h3>
              <TooltipRoot>
                <TooltipTriggerReka as-child>
                  <Button variant="outline">
                    Fast
                  </Button>
                </TooltipTriggerReka>
                <TooltipPortal>
                  <TooltipContentPrimitive 
                    class="z-50 overflow-hidden rounded-md border bg-red-600 text-white px-3 py-1.5 text-sm shadow-lg animate-fade-in-fast"
                    side="top"
                    :side-offset="8"
                  >
                    Fast fade!
                  </TooltipContentPrimitive>
                </TooltipPortal>
              </TooltipRoot>
            </div>

            <!-- Slide From Top -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Slide Top
              </h3>
              <TooltipRoot>
                <TooltipTriggerReka as-child>
                  <Button variant="outline">
                    Top
                  </Button>
                </TooltipTriggerReka>
                <TooltipPortal>
                  <TooltipContentPrimitive 
                    class="z-50 overflow-hidden rounded-md border bg-yellow-600 text-white px-3 py-1.5 text-sm shadow-lg animate-slide-in-from-top"
                    side="bottom"
                    :side-offset="8"
                  >
                    Slide from top!
                  </TooltipContentPrimitive>
                </TooltipPortal>
              </TooltipRoot>
            </div>

            <!-- Slide From Left -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Slide Left
              </h3>
              <TooltipRoot>
                <TooltipTriggerReka as-child>
                  <Button variant="outline">
                    Left
                  </Button>
                </TooltipTriggerReka>
                <TooltipPortal>
                  <TooltipContentPrimitive 
                    class="z-50 overflow-hidden rounded-md border bg-teal-600 text-white px-3 py-1.5 text-sm shadow-lg animate-slide-in-from-left"
                    side="right"
                    :side-offset="8"
                  >
                    From left!
                  </TooltipContentPrimitive>
                </TooltipPortal>
              </TooltipRoot>
            </div>

            <!-- Slide From Right -->
            <div class="p-6 border rounded-lg text-center">
              <h3 class="font-medium mb-4">
                Slide Right
              </h3>
              <TooltipRoot>
                <TooltipTriggerReka as-child>
                  <Button variant="outline">
                    Right
                  </Button>
                </TooltipTriggerReka>
                <TooltipPortal>
                  <TooltipContentPrimitive 
                    class="z-50 overflow-hidden rounded-md border bg-orange-600 text-white px-3 py-1.5 text-sm shadow-lg animate-slide-in-from-right"
                    side="left"
                    :side-offset="8"
                  >
                    From right!
                  </TooltipContentPrimitive>
                </TooltipPortal>
              </TooltipRoot>
            </div>
          </div>

          <!-- Animation Status -->
          <div class="bg-muted p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">
              ✅ Animation Classes Added
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 class="font-medium mb-2">
                  Available Animations
                </h4>
                <ul class="space-y-1 text-xs">
                  <li class="text-success">
                    ✓ animate-fade-in
                  </li>
                  <li class="text-success">
                    ✓ animate-fade-out
                  </li>
                  <li class="text-success">
                    ✓ animate-zoom-in
                  </li>
                  <li class="text-success">
                    ✓ animate-zoom-out
                  </li>
                  <li class="text-success">
                    ✓ animate-slide-in-from-top
                  </li>
                  <li class="text-success">
                    ✓ animate-slide-in-from-bottom
                  </li>
                  <li class="text-success">
                    ✓ animate-slide-in-from-left
                  </li>
                  <li class="text-success">
                    ✓ animate-slide-in-from-right
                  </li>
                  <li class="text-success">
                    ✓ animate-scale-in
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium mb-2">
                  Speed Variants
                </h4>
                <ul class="space-y-1 text-xs">
                  <li class="text-success">
                    ✓ animate-fade-in-fast (0.1s)
                  </li>
                  <li class="text-success">
                    ✓ animate-zoom-in-fast (0.15s)
                  </li>
                  <li class="text-success">
                    ✓ animate-slide-in-from-bottom-slow (0.3s)
                  </li>
                  <li class="text-info">
                    ℹ Default durations: 0.2s
                  </li>
                  <li class="text-info">
                    ℹ All animations use smooth easing
                  </li>
                </ul>
              </div>
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

import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import Button from '@/components/ui/button/BaseButton.vue'
</script>