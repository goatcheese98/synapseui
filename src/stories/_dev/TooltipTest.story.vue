<script setup lang="ts">
import { TooltipRoot, TooltipTrigger, TooltipContent, TooltipPortal, TooltipProvider } from 'reka-ui'
import Button from '@/components/ui/button/Button.vue'
import { cn } from '@/lib/utils'
</script>

<template>
  <Story title="Test/TooltipDirect" :layout="{ type: 'single', iframe: false }">
    <Variant title="Direct Reka UI">
      <TooltipProvider>
        <div class="flex justify-center p-8">
          <TooltipRoot>
            <TooltipTrigger as-child>
              <Button>Direct Tooltip Test</Button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent 
                :class="cn('z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md')"
                side="top"
                :side-offset="4"
              >
                This should work
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>
      </TooltipProvider>
    </Variant>
  </Story>
</template>