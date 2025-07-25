<!--
  Working Tooltip Story
  Simple working tooltip examples
-->

<template>
  <Story title="Feedback/Working Tooltips" :layout="{ type: 'single', iframe: false }">
    <Variant title="Working Tooltip Examples">
      <TooltipProvider :delayDuration="300">
        <div class="max-w-4xl mx-auto p-8 space-y-12">
          
          <!-- Header -->
          <div class="text-center space-y-4">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              💬 Working Tooltip System
            </h1>
            <p class="text-text-secondary text-lg">
              Functional tooltip examples with proper Reka UI implementation
            </p>
          </div>

          <!-- Basic Working Tooltips -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">📝 Basic Tooltips</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <!-- Default Tooltip -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Default</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button>
                      Hover me
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentReka 
                      class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                      side="top"
                      :sideOffset="4"
                    >
                      This is a working tooltip!
                    </TooltipContentReka>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Positioned Tooltips -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Positioned</h3>
                <div class="grid grid-cols-2 gap-2">
                  <TooltipRoot v-for="side in ['top', 'right', 'bottom', 'left']" :key="side">
                    <TooltipTriggerReka as-child>
                      <Button variant="outline" size="sm">
                        {{ side }}
                      </Button>
                    </TooltipTriggerReka>
                    <TooltipPortal>
                      <TooltipContentReka 
                        class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                        :side="side"
                        :sideOffset="4"
                      >
                        {{ side }} tooltip
                      </TooltipContentReka>
                    </TooltipPortal>
                  </TooltipRoot>
                </div>
              </Card>

              <!-- Fast Tooltip -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Fast</h3>
                <TooltipRoot :delayDuration="100">
                  <TooltipTriggerReka as-child>
                    <Button variant="secondary">
                      Fast (100ms)
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentReka 
                      class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                      side="top"
                      :sideOffset="4"
                    >
                      Quick to show!
                    </TooltipContentReka>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Styled Tooltip -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Custom Style</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="ghost">
                      Custom
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentReka 
                      class="z-50 overflow-hidden rounded-lg border-2 border-primary bg-primary/10 px-4 py-2 text-sm text-primary shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                      side="bottom"
                      :sideOffset="8"
                    >
                      Custom styled tooltip!
                    </TooltipContentReka>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>
            </div>
          </section>

          <!-- Interactive Elements -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">🎯 Interactive Examples</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <!-- Button with Tooltip -->
              <Card class="p-6">
                <h3 class="font-medium mb-4">Action Button</h3>
                <div class="flex justify-center">
                  <TooltipRoot>
                    <TooltipTriggerReka as-child>
                      <Button class="bg-success text-success-text">
                        <Icon name="check" class="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </TooltipTriggerReka>
                    <TooltipPortal>
                      <TooltipContentReka 
                        class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                        side="top"
                        :sideOffset="4"
                      >
                        Save your current changes (Ctrl+S)
                      </TooltipContentReka>
                    </TooltipPortal>
                  </TooltipRoot>
                </div>
              </Card>

              <!-- Icon with Tooltip -->
              <Card class="p-6">
                <h3 class="font-medium mb-4">Help Icon</h3>
                <div class="flex justify-center">
                  <TooltipRoot>
                    <TooltipTriggerReka as-child>
                      <Button variant="ghost" size="sm" class="w-8 h-8 p-0 rounded-full">
                        <Icon name="help-circle" class="w-4 h-4" />
                      </Button>
                    </TooltipTriggerReka>
                    <TooltipPortal>
                      <TooltipContentReka 
                        class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                        side="right"
                        :sideOffset="4"
                      >
                        Click for help documentation
                      </TooltipContentReka>
                    </TooltipPortal>
                  </TooltipRoot>
                </div>
              </Card>

              <!-- Badge with Tooltip -->
              <Card class="p-6">
                <h3 class="font-medium mb-4">Status Badge</h3>
                <div class="flex justify-center">
                  <TooltipRoot>
                    <TooltipTriggerReka as-child>
                      <Badge variant="secondary" class="cursor-help">
                        Online
                      </Badge>
                    </TooltipTriggerReka>
                    <TooltipPortal>
                      <TooltipContentReka 
                        class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                        side="bottom"
                        :sideOffset="4"
                      >
                        Service is currently online and operational
                      </TooltipContentReka>
                    </TooltipPortal>
                  </TooltipRoot>
                </div>
              </Card>
            </div>
          </section>

          <!-- Rich Content Tooltips -->
          <section>
            <h2 class="text-2xl font-semibold mb-6">📝 Rich Content</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Multi-line Tooltip -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Multi-line Content</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Multi-line Example
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentReka 
                      class="z-50 max-w-xs overflow-hidden rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                      side="top"
                      :sideOffset="4"
                    >
                      <div class="space-y-1">
                        <div class="font-medium">Important Information</div>
                        <div class="text-xs text-muted-foreground">
                          This tooltip contains multiple lines of content to demonstrate
                          how rich text can be displayed.
                        </div>
                      </div>
                    </TooltipContentReka>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>

              <!-- Formatted Tooltip -->
              <Card class="p-6 text-center">
                <h3 class="font-medium mb-4">Formatted Content</h3>
                <TooltipRoot>
                  <TooltipTriggerReka as-child>
                    <Button variant="outline">
                      Formatted Example
                    </Button>
                  </TooltipTriggerReka>
                  <TooltipPortal>
                    <TooltipContentReka 
                      class="z-50 max-w-sm overflow-hidden rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                      side="top"
                      :sideOffset="4"
                    >
                      <div class="space-y-2">
                        <div class="flex items-center gap-2">
                          <Icon name="info" class="w-3 h-3 text-primary" />
                          <span class="font-medium">Keyboard Shortcut</span>
                        </div>
                        <div class="text-xs">
                          Press <kbd class="px-1 py-0.5 bg-muted rounded text-xs">Ctrl</kbd> + 
                          <kbd class="px-1 py-0.5 bg-muted rounded text-xs">K</kbd> to open command palette
                        </div>
                      </div>
                    </TooltipContentReka>
                  </TooltipPortal>
                </TooltipRoot>
              </Card>
            </div>
          </section>

          <!-- Debug Info -->
          <section class="bg-muted p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">✅ Working Implementation</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 class="font-medium mb-2">Components Used</h4>
                <ul class="space-y-1 text-xs">
                  <li>• TooltipProvider (wrapper)</li>
                  <li>• TooltipRoot (individual)</li>
                  <li>• TooltipTrigger (trigger)</li>
                  <li>• TooltipContent (content)</li>
                  <li>• TooltipPortal (portal)</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium mb-2">Features</h4>
                <ul class="space-y-1 text-xs">
                  <li class="text-success">✓ Proper positioning</li>
                  <li class="text-success">✓ Smooth animations</li>
                  <li class="text-success">✓ Custom delays</li>
                  <li class="text-success">✓ Rich content</li>
                  <li class="text-success">✓ Keyboard accessible</li>
                </ul>
              </div>
              <div>
                <h4 class="font-medium mb-2">Styling</h4>
                <ul class="space-y-1 text-xs">
                  <li class="text-success">✓ Theme integration</li>
                  <li class="text-success">✓ Tailwind classes</li>
                  <li class="text-success">✓ Animation classes</li>
                  <li class="text-success">✓ Custom styles</li>
                  <li class="text-success">✓ Responsive design</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </TooltipProvider>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { 
  TooltipRoot, 
  TooltipTrigger as TooltipTriggerReka, 
  TooltipContent as TooltipContentReka, 
  TooltipPortal 
} from 'reka-ui'

import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue'
import Badge from '@/components/ui/badge/Badge.vue'
import Icon from '@/components/ui/icon/Icon.vue'
</script>