<!--
  Icon Component
  Simple wrapper for Iconify icons with consistent sizing
-->

<template>
  <Icon 
    :icon="iconName"
    :width="size"
    :height="size"
    :class="iconClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  name: string
  size?: string | number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 20
})

// Map simple names to Iconify icon names
const iconMap: Record<string, string> = {
  'alert-circle': 'lucide:alert-circle',
  'check-circle': 'lucide:check-circle-2',
  'x': 'lucide:x',
  'search': 'lucide:search',
  'user': 'lucide:user',
  'mail': 'lucide:mail',
  'lock': 'lucide:lock',
  'eye': 'lucide:eye',
  'eye-off': 'lucide:eye-off',
  'chevron-down': 'lucide:chevron-down',
  'chevron-up': 'lucide:chevron-up',
  'plus': 'lucide:plus',
  'minus': 'lucide:minus',
  'edit': 'lucide:edit-3',
  'trash': 'lucide:trash-2',
  'settings': 'lucide:settings',
  'home': 'lucide:home',
  'star': 'lucide:star',
  'heart': 'lucide:heart',
  'bookmark': 'lucide:bookmark',
  'download': 'lucide:download',
  'upload': 'lucide:upload',
  'external-link': 'lucide:external-link',
  'copy': 'lucide:copy',
  'check': 'lucide:check',
  'info': 'lucide:info',
  'warning': 'lucide:triangle-alert',
  'error': 'lucide:circle-x',
  'success': 'lucide:circle-check',
}

const iconName = computed(() => {
  return iconMap[props.name] || props.name
})

const iconClasses = computed(() => [
  'inline-block flex-shrink-0',
  props.class
])
</script>