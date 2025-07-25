<template>
  <TooltipProviderPrimitive
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :disable-hoverable-content="disableHoverableContent"
  >
    <slot />
  </TooltipProviderPrimitive>
</template>

<script setup lang="ts">
import { TooltipProvider as TooltipProviderPrimitive } from 'reka-ui'

interface Props {
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
}

withDefaults(defineProps<Props>(), {
  delayDuration: 700,
  skipDelayDuration: 300,
  disableHoverableContent: false
})
</script>