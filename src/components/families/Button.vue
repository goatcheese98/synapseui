<!--
  Button Family - Elegant API for button variants
  Usage: <Button.Primary>, <Button.Ghost>, <Button.Icon>
-->

<script setup lang="ts">
import BaseButton from '@/components/ui/button/Button.vue'
import Icon from '@/components/ui/icon/Icon.vue'
import { computed } from 'vue'

interface Props {
  // Common button props
  loading?: boolean
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  as?: string | object
  asChild?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  size: 'md',
  as: 'button',
  asChild: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <!-- This is the base Button component - not meant to be used directly -->
  <BaseButton
    v-bind="props"
    variant="primary"
    @click="emit('click', $event)"
  >
    <slot />
  </BaseButton>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

// Button Family Components
export const Primary = defineComponent({
  name: 'ButtonPrimary',
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      variant: 'primary',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})

export const Secondary = defineComponent({
  name: 'ButtonSecondary', 
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      variant: 'secondary',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})

export const Success = defineComponent({
  name: 'ButtonSuccess',
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      variant: 'success',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})

export const Warning = defineComponent({
  name: 'ButtonWarning',
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      variant: 'warning',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})

export const Error = defineComponent({
  name: 'ButtonError',
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      variant: 'error',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})

export const Outline = defineComponent({
  name: 'ButtonOutline',
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      variant: 'outline',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})

export const Ghost = defineComponent({
  name: 'ButtonGhost',
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      variant: 'ghost',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})

export const Link = defineComponent({
  name: 'ButtonLink',
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      variant: 'link',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})

// Icon Button Variants
export const Icon = defineComponent({
  name: 'ButtonIcon',
  props: {
    icon: { type: String, required: true },
    variant: { type: String, default: 'ghost' },
    size: { type: String, default: 'md' }
  },
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    const iconSizeMap = {
      xs: '12',
      sm: '14', 
      md: '16',
      lg: '18',
      xl: '20'
    }
    
    const buttonSizeMap = {
      xs: 'icon-xs',
      sm: 'icon-sm',
      md: 'icon-md', 
      lg: 'icon-lg',
      xl: 'icon-xl'
    }

    return () => h(BaseButton, {
      ...attrs,
      variant: props.variant,
      size: buttonSizeMap[props.size as keyof typeof buttonSizeMap],
      onClick: (e: MouseEvent) => emit('click', e)
    }, {
      default: () => h(Icon, {
        name: props.icon,
        size: iconSizeMap[props.size as keyof typeof iconSizeMap]
      })
    })
  }
})

// Size Variants
export const Small = defineComponent({
  name: 'ButtonSmall',
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      size: 'sm',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})

export const Large = defineComponent({
  name: 'ButtonLarge',
  inheritAttrs: false,
  setup(_, { attrs, slots, emit }) {
    return () => h(BaseButton, {
      ...attrs,
      size: 'lg',
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots)
  }
})
</script>