<!--
  Card Family - Elegant API for card variants
  Usage: <Card.Compact>, <Card.User>, <Card.Interactive>
-->

<script setup lang="ts">
import BaseCard from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import UserCard from '@/components/composite/UserCard.vue'
</script>

<template>
  <!-- Base Card - not used directly -->
  <BaseCard>
    <slot />
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

// Card Family Components
export const Default = defineComponent({
  name: 'CardDefault',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(BaseCard, attrs, slots)
  }
})

export const Interactive = defineComponent({
  name: 'CardInteractive',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(BaseCard, {
      ...attrs,
      class: [
        attrs.class,
        'hover:shadow-token-lg cursor-pointer transition-all duration-token-normal hover:-translate-y-1'
      ]
    }, slots)
  }
})

export const Compact = defineComponent({
  name: 'CardCompact',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(BaseCard, {
      ...attrs,
      class: [attrs.class, 'max-w-sm p-token-md']
    }, slots)
  }
})

export const Wide = defineComponent({
  name: 'CardWide',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(BaseCard, {
      ...attrs,
      class: [attrs.class, 'max-w-4xl']
    }, slots)
  }
})

export const Elevated = defineComponent({
  name: 'CardElevated',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(BaseCard, {
      ...attrs,
      class: [attrs.class, 'shadow-token-lg border-0']
    }, slots)
  }
})

export const Outlined = defineComponent({
  name: 'CardOutlined',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(BaseCard, {
      ...attrs,
      class: [attrs.class, 'border-2 border-border-default shadow-none']
    }, slots)
  }
})

// Specialized Card Variants
export const User = defineComponent({
  name: 'CardUser',
  props: {
    user: { type: Object, required: true },
    isOnline: { type: Boolean, default: false },
    variant: { type: String, default: 'default' },
    interactive: { type: Boolean, default: true }
  },
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    return () => h(UserCard, {
      ...attrs,
      ...props,
      onViewProfile: (user: any) => emit('view-profile', user),
      onSendMessage: (user: any) => emit('send-message', user),
      onEditUser: (user: any) => emit('edit-user', user)
    })
  }
})

export const Profile = defineComponent({
  name: 'CardProfile',
  props: {
    title: String,
    description: String,
    avatar: String,
    stats: Array,
    actions: Array
  },
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    return () => h(BaseCard, {
      ...attrs,
      class: [attrs.class, 'max-w-sm overflow-hidden']
    }, {
      default: () => [
        // Header with avatar/title
        h(CardHeader, { class: 'text-center pb-token-md' }, {
          default: () => [
            props.avatar && h('div', {
              class: 'w-20 h-20 rounded-full bg-primary mx-auto mb-token-md flex items-center justify-center text-primary-text text-2xl font-bold'
            }, props.avatar),
            h(CardTitle, { class: 'mb-token-xs' }, props.title),
            props.description && h(CardDescription, {}, props.description)
          ]
        }),
        
        // Content
        h(CardContent, { class: 'text-center' }, slots.default?.()),
        
        // Footer with actions
        slots.actions && h(CardFooter, {}, slots.actions?.())
      ]
    })
  }
})

export const Feature = defineComponent({
  name: 'CardFeature',
  props: {
    icon: String,
    title: String,
    description: String
  },
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    return () => h(BaseCard, {
      ...attrs,
      class: [attrs.class, 'text-center p-token-lg hover:shadow-token-md transition-shadow duration-token-normal']
    }, {
      default: () => [
        h(CardContent, { class: 'space-y-token-md' }, {
          default: () => [
            // Icon
            props.icon && h('div', {
              class: 'w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-text text-2xl'
            }, props.icon),
            
            // Title
            props.title && h('h3', {
              class: 'font-semibold text-lg text-text-primary'
            }, props.title),
            
            // Description
            props.description && h('p', {
              class: 'text-text-secondary'
            }, props.description),
            
            // Custom content
            slots.default?.()
          ]
        })
      ]
    })
  }
})

// Quick Builder Components
export const Simple = defineComponent({
  name: 'CardSimple',
  props: {
    title: String,
    description: String
  },
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    return () => h(BaseCard, attrs, {
      default: () => [
        h(CardHeader, {}, {
          default: () => [
            props.title && h(CardTitle, {}, props.title),
            props.description && h(CardDescription, {}, props.description)
          ]
        }),
        h(CardContent, {}, slots.default?.())
      ]
    })
  }
})
</script>