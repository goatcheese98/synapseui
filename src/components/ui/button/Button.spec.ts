import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('h-10')
  })

  it('renders with different variants', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'destructive'
      },
      slots: {
        default: 'Delete'
      }
    })
    
    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('renders with different sizes', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'lg'
      },
      slots: {
        default: 'Large Button'
      }
    })
    
    expect(wrapper.classes()).toContain('h-11')
  })

  it('handles disabled state', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled'
      }
    })
    
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('disabled:pointer-events-none')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled'
      }
    })
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies custom class', () => {
    const wrapper = mount(Button, {
      props: {
        class: 'custom-class'
      },
      slots: {
        default: 'Custom'
      }
    })
    
    expect(wrapper.classes()).toContain('custom-class')
  })
})