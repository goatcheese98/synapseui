<template>
  <SelectItem
    :value="value"
    :disabled="disabled"
    :class="cn(computedItemClasses, $attrs.class)"
    v-bind="$attrs"
  >
    <slot />
  </SelectItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useMultiContext } from '@/composables/useComposition'
import SelectItem from './SelectItem.vue'

export interface SmartSelectItemProps {
  value: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  autoAdapt?: boolean
}

const props = withDefaults(defineProps<SmartSelectItemProps>(), {
  disabled: false,
  size: 'md',
  autoAdapt: true
})

// Get contexts for smart sizing
const multiContext = useMultiContext()

// Smart size selection
const computedSize = computed(() => {
  if (!props.autoAdapt) return props.size

  const contexts = multiContext.value
  
  // Form context size
  if (contexts.form?.size) {
    return contexts.form.size
  }
  
  // Card context size
  if (contexts.card?.size) {
    return contexts.card.size
  }

  // Layout context density
  if (contexts.layout?.density) {
    const densityToSize = {
      compact: 'sm',
      comfortable: 'md',
      spacious: 'lg'
    } as const
    return densityToSize[contexts.layout.density]
  }

  return props.size
})

// Generate item classes
const computedItemClasses = computed(() => {
  const baseClasses = [
    'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
    'focus:bg-accent focus:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
  ]

  // Size-based padding and text size
  const sizeClasses = {
    xs: 'py-1 pl-6 pr-1 text-xs',
    sm: 'py-1 pl-7 pr-1.5 text-xs',
    md: 'py-1.5 pl-8 pr-2 text-sm',
    lg: 'py-2 pl-10 pr-3 text-base',
    xl: 'py-3 pl-12 pr-4 text-lg'
  }

  return cn(baseClasses, sizeClasses[computedSize.value])
})
</script>