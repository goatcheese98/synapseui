<!--
  HelpTooltip Component
  Contextual help tooltip with documentation, examples, and keyboard shortcuts
-->

<template>
  <Tooltip
    :delayDuration="delayDuration"
    :disabled="disabled"
    v-model:open="open"
  >
    <TooltipTrigger as-child>
      <slot name="trigger">
        <Button
          variant="ghost"
          size="sm"
          class="w-5 h-5 p-0 rounded-full hover:bg-accent"
        >
          <Icon name="help-circle" class="w-3 h-3 text-muted-foreground" />
        </Button>
      </slot>
    </TooltipTrigger>

    <TooltipContent 
      :side="side"
      :align="align"
      :sideOffset="sideOffset"
      :class="cn(
        'max-w-sm p-0 border shadow-lg bg-popover text-popover-foreground',
        ($attrs.class as string | undefined)
      )"
    >
      <div class="rounded-lg overflow-hidden">
        <!-- Header -->
        <div v-if="title" class="px-4 py-3 border-b bg-muted/30">
          <div class="flex items-center gap-2">
            <Icon name="help-circle" class="w-4 h-4 text-primary" />
            <h4 class="font-semibold text-sm">{{ title }}</h4>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-3">
          <!-- Description -->
          <div v-if="description" class="text-sm text-muted-foreground">
            {{ description }}
          </div>

          <!-- Examples -->
          <div v-if="examples?.length" class="space-y-2">
            <div class="text-xs font-medium text-foreground">Examples:</div>
            <div class="space-y-1">
              <div 
                v-for="example in examples" 
                :key="example"
                class="text-xs font-mono bg-muted/50 px-2 py-1 rounded border-l-2 border-primary/30"
              >
                {{ example }}
              </div>
            </div>
          </div>

          <!-- Keyboard Shortcuts -->
          <div v-if="shortcuts?.length" class="space-y-2">
            <div class="text-xs font-medium text-foreground">Keyboard Shortcuts:</div>
            <div class="space-y-1">
              <div 
                v-for="shortcut in shortcuts" 
                :key="shortcut.keys"
                class="flex items-center justify-between text-xs"
              >
                <span class="text-muted-foreground">{{ shortcut.description }}</span>
                <div class="flex items-center gap-1">
                  <kbd 
                    v-for="key in shortcut.keys.split('+')" 
                    :key="key"
                    class="px-1.5 py-0.5 text-xs font-mono bg-muted border rounded"
                  >
                    {{ key.trim() }}
                  </kbd>
                </div>
              </div>
            </div>
          </div>

          <!-- Links -->
          <div v-if="links?.length" class="space-y-2">
            <div class="text-xs font-medium text-foreground">Learn More:</div>
            <div class="space-y-1">
              <a 
                v-for="link in links" 
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Icon name="external-link" class="w-3 h-3" />
                {{ link.label }}
              </a>
            </div>
          </div>

          <!-- Tips -->
          <div v-if="tips?.length" class="space-y-2">
            <div class="text-xs font-medium text-foreground">💡 Tips:</div>
            <div class="space-y-1">
              <div 
                v-for="tip in tips" 
                :key="tip"
                class="text-xs text-muted-foreground bg-accent/20 px-2 py-1 rounded"
              >
                {{ tip }}
              </div>
            </div>
          </div>

          <!-- Warning -->
          <div v-if="warning" class="flex items-start gap-2 p-2 bg-warning/10 border border-warning/20 rounded text-xs">
            <Icon name="alert-triangle" class="w-3 h-3 text-warning mt-0.5 flex-shrink-0" />
            <span class="text-warning-foreground">{{ warning }}</span>
          </div>

          <!-- Custom Content -->
          <div v-if="$slots.default">
            <slot />
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

interface Shortcut {
  description: string
  keys: string
}

interface Link {
  label: string
  url: string
}

interface Props {
  title?: string
  description?: string
  examples?: string[]
  shortcuts?: Shortcut[]
  links?: Link[]
  tips?: string[]
  warning?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
  delayDuration?: number
  disabled?: boolean
  open?: boolean
}

interface Emits {
  (e: 'update:open', open: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  side: 'top',
  align: 'center',
  sideOffset: 8,
  delayDuration: 500
})

const emit = defineEmits<Emits>()

const open = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})
</script>