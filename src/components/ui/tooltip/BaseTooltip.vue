<template>
  <TooltipRoot 
    :delayDuration="delayDuration"
    :skipDelayDuration="skipDelayDuration"
    :disableHoverableContent="disableHoverableContent"
    :disabled="disabled"
    v-model:open="open"
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