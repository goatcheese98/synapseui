<!--
  Form Family - Elegant API for form components
  Usage: <Form.Field>, <Form.Section>, <Form.Actions>
-->

<script setup lang="ts">
import FormField from '@/components/composite/FormField.vue'
import LoginForm from '@/components/composite/LoginForm.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import HStack from '@/components/ui/stack/HStack.vue'
import Button from '@/components/ui/button/Button.vue'
</script>

<template>
  <!-- Base Form wrapper -->
  <form @submit.prevent="$emit('submit', $event)">
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

// Form Family Components
export const Field = defineComponent({
  name: 'FormField',
  inheritAttrs: false,
  setup(_, { attrs, emit }) {
    return () => h(FormField, {
      ...attrs,
      'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
      onBlur: (e: FocusEvent) => emit('blur', e),
      onFocus: (e: FocusEvent) => emit('focus', e)
    })
  }
})

export const Section = defineComponent({
  name: 'FormSection',
  props: {
    title: String,
    description: String,
    spacing: { type: String, default: 'lg' }
  },
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    return () => h(VStack, {
      ...attrs,
      spacing: props.spacing,
      class: [attrs.class, 'form-section']
    }, {
      default: () => [
        // Section Header
        (props.title || props.description) && h('div', {
          class: 'border-b border-border-muted pb-token-md mb-token-lg'
        }, [
          props.title && h('h3', {
            class: 'text-lg font-semibold text-text-primary mb-token-xs'
          }, props.title),
          props.description && h('p', {
            class: 'text-token-sm text-text-secondary'
          }, props.description)
        ]),
        
        // Section Content
        h(VStack, { spacing: 'md' }, slots.default?.())
      ]
    })
  }
})

export const Actions = defineComponent({
  name: 'FormActions',
  props: {
    align: { type: String, default: 'end' }, // start, center, end, between
    spacing: { type: String, default: 'md' }
  },
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const alignmentClasses = {
      start: 'justify-start',
      center: 'justify-center', 
      end: 'justify-end',
      between: 'justify-between'
    }

    return () => h('div', {
      ...attrs,
      class: [
        attrs.class,
        'flex items-center',
        `gap-token-${props.spacing}`,
        alignmentClasses[props.align as keyof typeof alignmentClasses]
      ]
    }, slots.default?.())
  }
})

export const Login = defineComponent({
  name: 'FormLogin',
  inheritAttrs: false,
  setup(_, { attrs, emit }) {
    return () => h(LoginForm, {
      ...attrs,
      onSubmit: (credentials: any) => emit('submit', credentials),
      onForgotPassword: () => emit('forgot-password'),
      onSignUp: () => emit('sign-up')
    })
  }
})

// Form Builders
export const Contact = defineComponent({
  name: 'FormContact',
  props: {
    loading: { type: Boolean, default: false },
    submitText: { type: String, default: 'Send Message' }
  },
  emits: ['submit'],
  setup(props, { emit, attrs }) {
    return () => h('form', {
      ...attrs,
      onSubmit: (e: Event) => {
        e.preventDefault()
        emit('submit', e)
      }
    }, [
      h(VStack, { spacing: 'lg' }, [
        // Name and Email Row
        h(HStack, { spacing: 'md', class: 'grid grid-cols-1 md:grid-cols-2 gap-token-md' }, [
          h(Field, {
            label: 'Name',
            placeholder: 'Your full name',
            required: true
          }),
          h(Field, {
            label: 'Email',
            type: 'email',
            placeholder: 'your@email.com',
            required: true
          })
        ]),
        
        // Subject
        h(Field, {
          label: 'Subject',
          placeholder: 'What is this about?',
          required: true
        }),
        
        // Message
        h(Field, {
          label: 'Message',
          as: 'textarea',
          placeholder: 'Your message...',
          rows: 5,
          required: true
        }),
        
        // Submit
        h(Actions, {}, [
          h(Button, {
            type: 'submit',
            variant: 'primary',
            loading: props.loading,
            disabled: props.loading
          }, props.submitText)
        ])
      ])
    ])
  }
})

export const Profile = defineComponent({
  name: 'FormProfile',
  props: {
    loading: { type: Boolean, default: false },
    user: Object
  },
  emits: ['submit'],
  setup(props, { emit, attrs }) {
    return () => h('form', {
      ...attrs,
      onSubmit: (e: Event) => {
        e.preventDefault()
        emit('submit', e)
      }
    }, [
      h(VStack, { spacing: 'xl' }, [
        h(Section, {
          title: 'Personal Information',
          description: 'Update your personal details and contact information'
        }, [
          h(HStack, { spacing: 'md', class: 'grid grid-cols-1 md:grid-cols-2 gap-token-md' }, [
            h(Field, {
              label: 'First Name',
              placeholder: 'John',
              modelValue: props.user?.firstName,
              required: true
            }),
            h(Field, {
              label: 'Last Name', 
              placeholder: 'Doe',
              modelValue: props.user?.lastName,
              required: true
            })
          ]),
          h(Field, {
            label: 'Email',
            type: 'email',
            placeholder: 'john@example.com',
            modelValue: props.user?.email,
            required: true
          }),
          h(Field, {
            label: 'Bio',
            as: 'textarea',
            placeholder: 'Tell us about yourself...',
            modelValue: props.user?.bio,
            rows: 3
          })
        ]),
        
        h(Section, {
          title: 'Account Settings',
          description: 'Manage your account preferences and security'
        }, [
          h(Field, {
            label: 'Current Password',
            type: 'password',
            placeholder: 'Enter current password'
          }),
          h(HStack, { spacing: 'md', class: 'grid grid-cols-1 md:grid-cols-2 gap-token-md' }, [
            h(Field, {
              label: 'New Password',
              type: 'password',
              placeholder: 'New password'
            }),
            h(Field, {
              label: 'Confirm Password',
              type: 'password', 
              placeholder: 'Confirm new password'
            })
          ])
        ]),
        
        h(Actions, { align: 'between' }, [
          h(Button, { variant: 'outline' }, 'Cancel'),
          h(Button, {
            type: 'submit',
            variant: 'primary',
            loading: props.loading,
            disabled: props.loading
          }, 'Save Changes')
        ])
      ])
    ])
  }
})
</script>

<style scoped>
.form-section {
  /* Add any form section specific styles */
}
</style>