<template>
  <Primitive
    :as="as"
    :asChild="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class)"
    :data-state="loading ? 'loading' : 'idle'"
    :disabled="disabled || loading"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="loading-spinner"
      :style="{ width: `${getSpinnerSize()}px`, height: `${getSpinnerSize()}px` }"
    />
    
    <span :class="cn('button-content', loading && 'button-content-loading')">
      <slot />
    </span>
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { buttonVariants } from './variants'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'outline' | 'outline-primary' | 'outline-success' | 'outline-error' | 'ghost' | 'ghost-primary' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl'
  as?: string | object
  asChild?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md',
  as: 'button',
  asChild: false,
  type: 'button',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const getSpinnerSize = () => {
  const sizeMap = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    'icon-xs': 12,
    'icon-sm': 14,
    'icon-md': 16,
    'icon-lg': 18,
    'icon-xl': 20
  }
  return sizeMap[props.size] || 16
}

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    return
  }
  emit('click', event)
}
</script>

<style scoped>
.loading-spinner {
  display: inline-block;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

.button-content {
  transition: opacity 200ms ease-out;
}

.button-content-loading {
  opacity: 0.7;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Rekha UI data-state animations */
[data-state="loading"] {
  cursor: wait;
}

[data-state="idle"]:hover {
  transform: translateY(-1px);
  transition: transform 150ms ease-out;
}

[data-state="idle"]:active {
  transform: translateY(0px);
  transition: transform 100ms ease-in;
}
</style>