<!--
  DataTooltip Component
  Specialized tooltip for displaying data metrics, statistics, and insights
-->

<template>
  <Tooltip
    :delayDuration="delayDuration"
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
        'max-w-sm p-0 border-0 shadow-lg',
        themeClass,
        ($attrs.class as string | undefined)
      )"
    >
      <div :class="cn('rounded-lg overflow-hidden', backgroundClass)">
        <!-- Header -->
        <div v-if="title || $slots.header" :class="cn('px-4 py-3 border-b', headerClass)">
          <slot name="header">
            <div class="flex items-center justify-between">
              <h4 class="font-semibold text-sm">{{ title }}</h4>
              <div v-if="timestamp" class="text-xs opacity-75">
                {{ formatTimestamp(timestamp) }}
              </div>
            </div>
          </slot>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-3">
          <!-- Primary Metric -->
          <div v-if="primaryMetric" class="text-center">
            <div :class="cn('text-2xl font-bold', primaryMetric.color || 'text-foreground')">
              {{ formatValue(primaryMetric.value, primaryMetric.format) }}
            </div>
            <div class="text-sm opacity-75">{{ primaryMetric.label }}</div>
            <div v-if="primaryMetric.change" class="flex items-center justify-center gap-1 text-xs mt-1">
              <Icon 
                :name="primaryMetric.change > 0 ? 'trending-up' : 'trending-down'" 
                :class="cn('w-3 h-3', primaryMetric.change > 0 ? 'text-success' : 'text-error')"
              />
              <span :class="primaryMetric.change > 0 ? 'text-success' : 'text-error'">
                {{ Math.abs(primaryMetric.change) }}%
              </span>
            </div>
          </div>

          <!-- Secondary Metrics -->
          <div v-if="metrics?.length" class="space-y-2">
            <div 
              v-for="metric in metrics" 
              :key="metric.label"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <div 
                  v-if="metric.color"
                  :class="cn('w-2 h-2 rounded-full', metric.color)"
                />
                <span class="text-sm">{{ metric.label }}</span>
              </div>
              <div class="text-sm font-medium">
                {{ formatValue(metric.value, metric.format) }}
              </div>
            </div>
          </div>

          <!-- Chart Data -->
          <div v-if="chartData?.length" class="space-y-2">
            <div class="text-xs font-medium opacity-75">{{ chartTitle || 'Trend' }}</div>
            <div class="flex items-end gap-1 h-16">
              <div 
                v-for="(point, index) in chartData.slice(-12)" 
                :key="index"
                :class="cn('bg-primary rounded-sm transition-all duration-200 hover:opacity-80')"
                :style="{ 
                  width: '8px',
                  height: `${Math.max((point / Math.max(...chartData)) * 100, 5)}%` 
                }"
                :title="`${point}`"
              />
            </div>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="pt-2 border-t border-border/50">
            <slot name="footer" />
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
import Icon from '@/components/ui/icon/Icon.vue'

interface Metric {
  label: string
  value: number | string
  format?: 'number' | 'currency' | 'percentage' | 'bytes' | 'duration'
  color?: string
  change?: number
}

interface Props {
  title?: string
  primaryMetric?: Metric
  metrics?: Metric[]
  chartData?: number[]
  chartTitle?: string
  timestamp?: Date | string
  theme?: 'default' | 'dark' | 'success' | 'warning' | 'error' | 'info'
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
  theme: 'default',
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

const themeClass = computed(() => {
  const themes = {
    default: 'border-border',
    dark: 'border-slate-700',
    success: 'border-success/30',
    warning: 'border-warning/30',
    error: 'border-error/30',
    info: 'border-primary/30'
  }
  return themes[props.theme]
})

const backgroundClass = computed(() => {
  const backgrounds = {
    default: 'bg-popover text-popover-foreground',
    dark: 'bg-slate-900 text-slate-100',
    success: 'bg-success/5 text-success-foreground border border-success/20',
    warning: 'bg-warning/5 text-warning-foreground border border-warning/20',
    error: 'bg-error/5 text-error-foreground border border-error/20',
    info: 'bg-primary/5 text-primary-foreground border border-primary/20'
  }
  return backgrounds[props.theme]
})

const headerClass = computed(() => {
  const headers = {
    default: 'border-border/50',
    dark: 'border-slate-700/50',
    success: 'border-success/20',
    warning: 'border-warning/20',
    error: 'border-error/20',
    info: 'border-primary/20'
  }
  return headers[props.theme]
})

const formatValue = (value: number | string, format?: string): string => {
  if (typeof value === 'string') return value
  
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(value)
    case 'percentage':
      return `${value}%`
    case 'bytes':
      const units = ['B', 'KB', 'MB', 'GB', 'TB']
      let size = value
      let unitIndex = 0
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
      }
      return `${size.toFixed(1)} ${units[unitIndex]}`
    case 'duration':
      const hours = Math.floor(value / 3600)
      const minutes = Math.floor((value % 3600) / 60)
      const seconds = value % 60
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    case 'number':
    default:
      return new Intl.NumberFormat().format(value)
  }
}

const formatTimestamp = (timestamp: Date | string): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.floor((date.getTime() - Date.now()) / (1000 * 60)),
    'minute'
  )
}
</script>