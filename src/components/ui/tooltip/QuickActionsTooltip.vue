<!--
  QuickActionsTooltip Component
  Tooltip with quick action buttons and keyboard shortcuts for efficiency
-->

<template>
  <Tooltip
    :delayDuration="delayDuration"
    :skipDelayDuration="0"
    :disableHoverableContent="false"
    :disabled="disabled"
    v-model:open="open"
  >
    <TooltipTrigger as-child>
      <slot name="trigger" />
    </TooltipTrigger>

    <TooltipContent 
      :side="side"
      :align="align"
      :sideOffset="sideOffset"
      :class="cn(
        'max-w-xs p-0 border shadow-lg bg-popover text-popover-foreground',
        $attrs.class
      )"
    >
      <div class="rounded-lg overflow-hidden">
        <!-- Header -->
        <div v-if="title || $slots.header" class="px-3 py-2 border-b bg-muted/30">
          <slot name="header">
            <div class="flex items-center gap-2">
              <Icon v-if="icon" :name="icon" class="w-3 h-3" />
              <h4 class="font-medium text-xs">{{ title }}</h4>
            </div>
          </slot>
        </div>

        <!-- Quick Actions Grid -->
        <div class="p-2">
          <div 
            :class="cn(
              'grid gap-1',
              gridCols[Math.min(actions?.length || 0, 4)]
            )"
          >
            <Button
              v-for="action in actions"
              :key="action.id"
              :variant="action.variant || 'ghost'"
              :size="action.size || 'sm'"
              :disabled="action.disabled"
              :class="cn(
                'h-auto p-2 flex-col gap-1 hover:bg-accent',
                action.highlight && 'ring-1 ring-primary/50 bg-primary/5'
              )"
              @click="handleAction(action)"
            >
              <div class="flex items-center justify-between w-full">
                <Icon 
                  v-if="action.icon" 
                  :name="action.icon" 
                  class="w-3 h-3"
                />
                <kbd 
                  v-if="action.shortcut"
                  class="ml-auto text-xs text-muted-foreground"
                >
                  {{ action.shortcut }}
                </kbd>
              </div>
              <span class="text-xs font-medium text-center leading-tight">
                {{ action.label }}
              </span>
            </Button>
          </div>
        </div>

        <!-- Separator for additional content -->
        <div v-if="$slots.content || description" class="border-t">
          <div class="p-3 space-y-2">
            <div v-if="description" class="text-xs text-muted-foreground">
              {{ description }}
            </div>
            <slot name="content" :close="() => open = false" />
          </div>
        </div>

        <!-- Footer with global shortcuts -->
        <div v-if="globalShortcuts?.length" class="border-t bg-muted/20 px-3 py-2">
          <div class="text-xs text-muted-foreground mb-1">Global shortcuts:</div>
          <div class="flex flex-wrap gap-2">
            <div 
              v-for="shortcut in globalShortcuts"
              :key="shortcut.label"
              class="flex items-center gap-1"
            >
              <kbd class="text-xs bg-background px-1 py-0.5 rounded border">
                {{ shortcut.key }}
              </kbd>
              <span class="text-xs text-muted-foreground">{{ shortcut.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipContent>
  </Tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import Tooltip from './Tooltip.vue'
import TooltipTrigger from './TooltipTrigger.vue'
import TooltipContent from './TooltipContent.vue'
import Button from '@/components/ui/button/Button.vue'
import Icon from '@/components/ui/icon/Icon.vue'

interface QuickAction {
  id: string
  label: string
  icon?: string
  shortcut?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  highlight?: boolean
  onClick?: () => void
}

interface GlobalShortcut {
  key: string
  label: string
}

interface Props {
  title?: string
  icon?: string
  description?: string
  actions?: QuickAction[]
  globalShortcuts?: GlobalShortcut[]
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  delayDuration?: number
  disabled?: boolean
  open?: boolean
}

interface Emits {
  (e: 'update:open', open: boolean): void
  (e: 'action', action: QuickAction): void
}

const props = withDefaults(defineProps<Props>(), {
  side: 'bottom',
  align: 'center',
  sideOffset: 8,
  delayDuration: 200,
  actions: () => []
})

const emit = defineEmits<Emits>()

const open = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2'
}

const handleAction = (action: QuickAction) => {
  action.onClick?.()
  emit('action', action)
  open.value = false
}
</script>