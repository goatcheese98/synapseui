<!--
  InteractiveTooltip Component
  Rich tooltip with interactive elements like buttons, links, and forms
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
        'max-w-md p-0 border shadow-lg',
        'bg-popover text-popover-foreground',
        $attrs.class
      )"
    >
      <div class="rounded-lg overflow-hidden">
        <!-- Header -->
        <div v-if="title || showClose || $slots.header" class="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
          <slot name="header">
            <div class="flex items-center gap-2">
              <Icon v-if="icon" :name="icon" class="w-4 h-4" />
              <h4 class="font-semibold text-sm">{{ title }}</h4>
            </div>
          </slot>
          
          <Button
            v-if="showClose"
            variant="ghost"
            size="sm"
            @click="open = false"
            class="w-6 h-6 p-0 hover:bg-accent"
          >
            <Icon name="x" class="w-3 h-3" />
          </Button>
        </div>

        <!-- Content -->
        <div class="p-4">
          <slot :close="() => open = false" />
        </div>

        <!-- Actions -->
        <div v-if="actions?.length || $slots.actions" class="px-4 pb-4">
          <slot name="actions" :close="() => open = false">
            <div class="flex items-center gap-2 justify-end">
              <Button
                v-for="action in actions"
                :key="action.label"
                :variant="action.variant || 'default'"
                :size="action.size || 'sm'"
                :disabled="action.disabled"
                @click="handleAction(action)"
              >
                <Icon v-if="action.icon" :name="action.icon" class="w-3 h-3 mr-1" />
                {{ action.label }}
              </Button>
            </div>
          </slot>
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

interface Action {
  label: string
  icon?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  onClick?: () => void
  closeOnClick?: boolean
}

interface Props {
  title?: string
  icon?: string
  actions?: Action[]
  showClose?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  delayDuration?: number
  disabled?: boolean
  open?: boolean
}

interface Emits {
  (e: 'update:open', open: boolean): void
  (e: 'action', action: Action): void
}

const props = withDefaults(defineProps<Props>(), {
  showClose: true,
  side: 'top',
  align: 'center',
  sideOffset: 8,
  delayDuration: 100
})

const emit = defineEmits<Emits>()

const open = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

const handleAction = (action: Action) => {
  action.onClick?.()
  emit('action', action)
  
  if (action.closeOnClick !== false) {
    open.value = false
  }
}
</script>