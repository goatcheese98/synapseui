<!--
  StatusTooltip Component
  System status, health, and monitoring tooltip with real-time indicators
-->

<template>
  <Tooltip
    :delayDuration="delayDuration"
    :disabled="disabled"
    v-model:open="open"
  >
    <TooltipTrigger as-child>
      <slot name="trigger">
        <div 
          :class="cn(
            'inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-all',
            statusClasses[status]
          )"
        >
          <div 
            :class="cn(
              'w-2 h-2 rounded-full',
              pulseAnimation && 'animate-pulse',
              statusDotClasses[status]
            )"
          />
          <span v-if="showLabel">{{ statusLabels[status] }}</span>
        </div>
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
        <div :class="cn('px-4 py-3 border-b', headerClasses[status])">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div 
                :class="cn(
                  'w-3 h-3 rounded-full',
                  pulseAnimation && 'animate-pulse',
                  statusDotClasses[status]
                )"
              />
              <h4 class="font-semibold text-sm">{{ title || statusLabels[status] }}</h4>
            </div>
            <div v-if="lastUpdated" class="text-xs opacity-75">
              {{ formatLastUpdated(lastUpdated) }}
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-3">
          <!-- Status Description -->
          <div v-if="description" class="text-sm text-muted-foreground">
            {{ description }}
          </div>

          <!-- Metrics -->
          <div v-if="metrics?.length" class="space-y-2">
            <div 
              v-for="metric in metrics" 
              :key="metric.label"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <div 
                  v-if="metric.status"
                  :class="cn('w-2 h-2 rounded-full', statusDotClasses[metric.status])"
                />
                <span class="text-sm">{{ metric.label }}</span>
              </div>
              <div class="text-sm font-medium">
                {{ metric.value }}
                <span v-if="metric.unit" class="text-xs text-muted-foreground ml-1">
                  {{ metric.unit }}
                </span>
              </div>
            </div>
          </div>

          <!-- Health Checks -->
          <div v-if="healthChecks?.length" class="space-y-2">
            <div class="text-xs font-medium text-foreground">Health Checks:</div>
            <div class="space-y-1">
              <div 
                v-for="check in healthChecks" 
                :key="check.name"
                class="flex items-center justify-between text-sm"
              >
                <div class="flex items-center gap-2">
                  <div :class="cn('w-2 h-2 rounded-full', statusDotClasses[check.status])" />
                  <span>{{ check.name }}</span>
                </div>
                <div class="text-xs text-muted-foreground">
                  {{ check.responseTime }}ms
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Events -->
          <div v-if="events?.length" class="space-y-2">
            <div class="text-xs font-medium text-foreground">Recent Events:</div>
            <div class="space-y-1 max-h-24 overflow-y-auto">
              <div 
                v-for="event in events.slice(0, 5)" 
                :key="event.id"
                class="flex items-start gap-2 text-xs"
              >
                <div :class="cn('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0', statusDotClasses[event.level])" />
                <div class="flex-1 min-w-0">
                  <div class="font-medium truncate">{{ event.message }}</div>
                  <div class="text-muted-foreground">{{ formatEventTime(event.timestamp) }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div v-if="actions?.length" class="pt-2 border-t border-border/50">
            <div class="flex items-center gap-2">
              <Button
                v-for="action in actions"
                :key="action.label"
                :variant="action.variant || 'outline'"
                size="sm"
                :disabled="action.disabled"
                @click="handleAction(action)"
              >
                <Icon v-if="action.icon" :name="action.icon" class="w-3 h-3 mr-1" />
                {{ action.label }}
              </Button>
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

type StatusType = 'healthy' | 'warning' | 'error' | 'offline' | 'loading'

interface Metric {
  label: string
  value: string | number
  unit?: string
  status?: StatusType
}

interface HealthCheck {
  name: string
  status: StatusType
  responseTime: number
}

interface Event {
  id: string
  message: string
  level: StatusType
  timestamp: Date
}

interface Action {
  label: string
  icon?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  disabled?: boolean
  onClick?: () => void
}

interface Props {
  status: StatusType
  title?: string
  description?: string
  metrics?: Metric[]
  healthChecks?: HealthCheck[]
  events?: Event[]
  actions?: Action[]
  lastUpdated?: Date
  showLabel?: boolean
  pulseAnimation?: boolean
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
  showLabel: true,
  pulseAnimation: false,
  side: 'top',
  align: 'center',
  sideOffset: 8,
  delayDuration: 300
})

const emit = defineEmits<Emits>()

const open = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

const statusLabels = {
  healthy: 'Healthy',
  warning: 'Warning',
  error: 'Error',
  offline: 'Offline',
  loading: 'Loading'
}

const statusClasses = {
  healthy: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning border border-warning/20',
  error: 'bg-error/10 text-error border border-error/20',
  offline: 'bg-muted text-muted-foreground border border-border',
  loading: 'bg-primary/10 text-primary border border-primary/20'
}

const statusDotClasses = {
  healthy: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  offline: 'bg-muted-foreground',
  loading: 'bg-primary'
}

const headerClasses = {
  healthy: 'bg-success/5 border-success/20',
  warning: 'bg-warning/5 border-warning/20',
  error: 'bg-error/5 border-error/20',
  offline: 'bg-muted/20 border-border',
  loading: 'bg-primary/5 border-primary/20'
}

const formatLastUpdated = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const formatEventTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

const handleAction = (action: Action) => {
  action.onClick?.()
  emit('action', action)
}
</script>