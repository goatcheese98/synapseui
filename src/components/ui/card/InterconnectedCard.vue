<template>
  <div
    :class="cn(
      cardClasses,
      $attrs.class
    )"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { cn } from '@/lib/utils'
import { cardVariants, createCardContext, CARD_CONTEXT_KEY, type CardVariants } from './unified-card'

export interface InterconnectedCardProps {
  variant?: CardVariants['variant']
  size?: CardVariants['size'] 
  interactive?: boolean
}

const props = withDefaults(defineProps<InterconnectedCardProps>(), {
  variant: 'default',
  size: 'md',
  interactive: false
})

// Create the card classes
const cardClasses = computed(() => {
  return cardVariants({
    variant: props.variant,
    size: props.size,
    interactive: props.interactive
  })
})

// Provide context for child components
const cardContext = createCardContext(props.variant, props.size)
provide(CARD_CONTEXT_KEY, cardContext)
</script>