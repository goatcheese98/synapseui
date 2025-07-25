<script setup lang="ts">
import Tooltip from '@/components/ui/tooltip/Tooltip.vue'
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue'
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import Button from '@/components/ui/button/Button.vue'
import HStack from '@/components/ui/stack/HStack.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <Story title="Feedback/Tooltip" :layout="{ type: 'single', iframe: false }">
    <Variant title="Basic Tooltip">
      <TooltipProvider>
        <div class="space-y-6">
          <div class="flex justify-center">
            <Tooltip>
              <TooltipTrigger>
                <Button>Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                This is a basic tooltip
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </Variant>

    <Variant title="Different Positions">
      <TooltipProvider>
        <div class="space-y-8">
          <div class="grid grid-cols-2 gap-8 place-items-center">
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Tooltip on top
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Tooltip on bottom
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Tooltip on left
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Tooltip on right
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </Variant>

    <Variant title="With Icons">
      <TooltipProvider>
        <div class="space-y-6">
          <HStack justify="center" spacing="lg">
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon">
                  <Icon icon="lucide:heart" class="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Add to favorites
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon">
                  <Icon icon="lucide:share" class="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Share this item
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon">
                  <Icon icon="lucide:bookmark" class="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Bookmark for later
              </TooltipContent>
            </Tooltip>
          </HStack>
        </div>
      </TooltipProvider>
    </Variant>
  </Story>
</template>