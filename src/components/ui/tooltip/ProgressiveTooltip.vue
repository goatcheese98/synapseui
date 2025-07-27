<!--
  Progressive Tooltip Component
  Two-stage tooltip system: immediate basic info, then expanded detailed info after delay
-->

<template>
  <TooltipRoot 
    :open="isOpen"
    :delay-duration="delayDuration"
    @update:open="handleOpenChange"
  >
    <TooltipTrigger as-child>
      <slot name="trigger" />
    </TooltipTrigger>
    
    <TooltipPortal>
      <TooltipContentPrimitive
        :class="cn(
          'z-50 overflow-hidden rounded-lg transition-all duration-300 ease-out',
          // Material design base
          materialClass,
          // Size transitions
          isExpanded ? 'min-w-[280px] max-w-[320px]' : 'min-w-[120px] max-w-[200px]',
          // Animation classes
          isExpanded ? 'animate-expand-width' : 'animate-fade-in',
          ($attrs.class as string | undefined)
        )"
        :side="side"
        :side-offset="sideOffset"
        :align="align"
        :avoid-collisions="avoidCollisions"
      >
        <!-- Basic Tooltip Content -->
        <div class="px-3 py-2">
          <div class="text-sm font-medium">
            {{ title }}
          </div>
          
          <!-- Brief description -->
          <div
            v-if="description"
            class="text-xs text-current/80 mt-1"
          >
            {{ description }}
          </div>
        </div>

        <!-- Expanded Content (appears after delay) -->
        <Transition
          name="expand"
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-32"
          leave-from-class="opacity-100 max-h-32"
          leave-to-class="opacity-0 max-h-0"
        >
          <div
            v-if="isExpanded"
            class="border-t border-current/20 mt-2 pt-2 px-3 pb-2"
          >
            <!-- Loading state for detailed info -->
            <div
              v-if="isLoadingDetails"
              class="flex items-center space-x-2 py-2"
            >
              <div class="w-3 h-3 border border-current/30 border-t-current rounded-full animate-spin" />
              <span class="text-xs text-current/70">Loading details...</span>
            </div>
            
            <!-- Detailed content -->
            <div
              v-else-if="detailedContent"
              class="space-y-2"
            >
              <slot
                name="detailed"
                :data="detailedContent"
              >
                <!-- Default detailed content structure -->
                <div
                  v-if="detailedContent.stats"
                  class="grid grid-cols-2 gap-2 text-xs"
                >
                  <div
                    v-for="(value, key) in detailedContent.stats"
                    :key="key" 
                    class="flex justify-between"
                  >
                    <span class="text-current/70 capitalize">{{ key }}:</span>
                    <span class="font-medium">{{ value }}</span>
                  </div>
                </div>
                
                <div
                  v-if="detailedContent.description"
                  class="text-xs text-current/80 pt-1"
                >
                  {{ detailedContent.description }}
                </div>
                
                <div
                  v-if="detailedContent.actions"
                  class="flex space-x-2 pt-2"
                >
                  <button 
                    v-for="action in detailedContent.actions" 
                    :key="action.label"
                    class="px-2 py-1 text-xs bg-current/10 hover:bg-current/20 rounded transition-colors"
                    @click="action.handler"
                  >
                    {{ action.label }}
                  </button>
                </div>
              </slot>
            </div>
          </div>
        </Transition>
      </TooltipContentPrimitive>
    </TooltipPortal>
  </TooltipRoot>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import { TooltipRoot, TooltipTrigger, TooltipContent as TooltipContentPrimitive, TooltipPortal } from 'reka-ui'
import { cn } from '@/lib/utils'

interface DetailedContent {
  stats?: Record<string, string | number>
  description?: string
  actions?: Array<{
    label: string
    handler: () => void
  }>
}

interface Props {
  title: string
  description?: string
  detailsLoader?: () => Promise<DetailedContent>
  expandDelay?: number
  delayDuration?: number
  material?: 'glass' | 'paper' | 'textured' | 'elevated' | 'frosted'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  avoidCollisions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  detailsLoader: undefined,
  expandDelay: 2500,
  delayDuration: 500,
  material: 'glass',
  side: 'top',
  sideOffset: 8,
  align: 'center',
  avoidCollisions: true
})

const isOpen = ref(false)
const isExpanded = ref(false)
const isLoadingDetails = ref(false)
const detailedContent = ref<DetailedContent | null>(null)
let expandTimer: NodeJS.Timeout | null = null
let loadingTimer: NodeJS.Timeout | null = null

// Material design classes
const materialClass = computed(() => {
  const materials = {
    glass: 'bg-white/70 backdrop-blur-md border-2 border-white/30 shadow-lg text-slate-800',
    paper: 'bg-white border border-gray-200 shadow-material-2 text-gray-900',
    textured: 'bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-300 shadow-material-3 text-gray-800',
    elevated: 'bg-white border-0 shadow-material-4 text-gray-900',
    frosted: 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-material-1 text-slate-700'
  }
  return materials[props.material]
})

const handleOpenChange = (open: boolean) => {
  isOpen.value = open
  
  if (open) {
    // Start expansion timer
    expandTimer = setTimeout(() => {
      isExpanded.value = true
      
      // Load detailed content if loader is provided
      if (props.detailsLoader && !detailedContent.value) {
        isLoadingDetails.value = true
        
        // Simulate API delay for realism
        loadingTimer = setTimeout(async () => {
          try {
            detailedContent.value = await props.detailsLoader!()
          } catch (error) {
            console.error('Failed to load detailed content:', error)
            detailedContent.value = {
              description: 'Failed to load additional details'
            }
          } finally {
            isLoadingDetails.value = false
          }
        }, 800) // Simulate network delay
      }
    }, props.expandDelay)
  } else {
    // Reset state when closed
    if (expandTimer) {
      clearTimeout(expandTimer)
      expandTimer = null
    }
    if (loadingTimer) {
      clearTimeout(loadingTimer)
      loadingTimer = null
    }
    
    isExpanded.value = false
    isLoadingDetails.value = false
    // Keep detailed content cached for subsequent opens
  }
}

onUnmounted(() => {
  if (expandTimer) clearTimeout(expandTimer)
  if (loadingTimer) clearTimeout(loadingTimer)
})
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>