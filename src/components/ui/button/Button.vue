<template>
  <button
    :class="buttonVariants({ variant, size, class: className })"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { buttonVariants } from './variants'

interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  class?: string
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
  disabled: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const className = defineModel<string>('class')
</script>