<template>
  <TooltipRoot 
    v-model:open="open"
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :disable-hoverable-content="disableHoverableContent"
    :disabled="disabled"
  >
    <slot />
  </TooltipRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TooltipRoot } from 'reka-ui'

interface Props {
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
  disabled?: boolean
  open?: boolean
}

interface Emits {
  (e: 'update:open', open: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  delayDuration: 700,
  skipDelayDuration: 300,
  disableHoverableContent: false,
  disabled: false
})

const emit = defineEmits<Emits>()

const open = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})
</script>