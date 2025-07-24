import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button (Reka UI)', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('bg-blue-600')
    expect(wrapper.classes()).toContain('h-10')
  })

  it('renders with different variants', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'error'
      },
      slots: {
        default: 'Delete'
      }
    })
    
    expect(wrapper.classes()).toContain('bg-red-600')
  })

  it('renders new variants', () => {
    const successWrapper = mount(Button, {
      props: { variant: 'success' },
      slots: { default: 'Success' }
    })
    expect(successWrapper.classes()).toContain('bg-green-600')

    const warningWrapper = mount(Button, {
      props: { variant: 'warning' },
      slots: { default: 'Warning' }
    })
    expect(warningWrapper.classes()).toContain('bg-orange-500')

    const infoWrapper = mount(Button, {
      props: { variant: 'info' },
      slots: { default: 'Info' }
    })
    expect(infoWrapper.classes()).toContain('bg-sky-500')
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
    
    expect(wrapper.classes()).toContain('h-12')
  })

  it('renders new sizes', () => {
    const xsWrapper = mount(Button, {
      props: { size: 'xs' },
      slots: { default: 'XS' }
    })
    expect(xsWrapper.classes()).toContain('h-6')

    const xlWrapper = mount(Button, {
      props: { size: 'xl' },
      slots: { default: 'XL' }
    })
    expect(xlWrapper.classes()).toContain('h-14')

    const iconSmWrapper = mount(Button, {
      props: { size: 'icon-sm' },
      slots: { default: '🔥' }
    })
    expect(iconSmWrapper.classes()).toContain('h-8')
    expect(iconSmWrapper.classes()).toContain('w-8')
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

  it('handles loading state', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'Loading'
      }
    })
    
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('cursor-wait')
    expect(wrapper.findComponent({ name: 'LoadingSpinner' }).exists()).toBe(true)
  })

  it('handles full width prop', () => {
    const wrapper = mount(Button, {
      props: {
        fullWidth: true
      },
      slots: {
        default: 'Full Width'
      }
    })
    
    expect(wrapper.classes()).toContain('w-full')
  })

  it('renders icon slots', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button',
        'icon-left': '<span>Left</span>',
        'icon-right': '<span>Right</span>'
      }
    })
    
    expect(wrapper.html()).toContain('<span>Left</span>')
    expect(wrapper.html()).toContain('<span>Right</span>')
  })

  it('hides icons when loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'Loading',
        'icon-left': '<span>Left</span>',
        'icon-right': '<span>Right</span>'
      }
    })
    
    expect(wrapper.html()).not.toContain('<span>Left</span>')
    expect(wrapper.html()).not.toContain('<span>Right</span>')
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

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'Loading'
      }
    })
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('handles keyboard events', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Keyboard'
      }
    })
    
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('click')).toHaveLength(1)

    await wrapper.trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('click')).toHaveLength(2)
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

  it('sets correct button type', () => {
    const submitWrapper = mount(Button, {
      props: {
        type: 'submit'
      },
      slots: {
        default: 'Submit'
      }
    })
    
    expect(submitWrapper.attributes('type')).toBe('submit')
  })

  it('sets accessibility attributes', () => {
    const wrapper = mount(Button, {
      props: {
        ariaLabel: 'Test label',
        ariaDescribedBy: 'help-text'
      },
      slots: {
        default: 'Accessible'
      }
    })
    
    expect(wrapper.attributes('aria-label')).toBe('Test label')
    expect(wrapper.attributes('aria-describedby')).toBe('help-text')
  })

  it('supports asChild prop', () => {
    const wrapper = mount(Button, {
      props: {
        asChild: true
      },
      slots: {
        default: 'Custom Element'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })

  it('supports custom element with as prop', () => {
    const wrapper = mount(Button, {
      props: {
        as: 'div'
      },
      slots: {
        default: 'Div Button'
      }
    })
    
    expect(wrapper.exists()).toBe(true)
  })

  it('exposes setLoading method', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Test'
      }
    })
    
    expect(wrapper.vm.setLoading).toBeDefined()
    expect(typeof wrapper.vm.setLoading).toBe('function')
  })

  it('shows ripple effect on click', async () => {
    const wrapper = mount(Button, {
      props: {
        ripple: true
      },
      slots: {
        default: 'Ripple'
      }
    })
    
    const button = wrapper.find('button')
    const mockGetBoundingClientRect = vi.fn(() => ({
      left: 0,
      top: 0,
      right: 100,
      bottom: 40,
      width: 100,
      height: 40
    }))
    
    Object.defineProperty(button.element, 'getBoundingClientRect', {
      value: mockGetBoundingClientRect
    })
    
    await wrapper.trigger('click', { clientX: 50, clientY: 20 })
    
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showRipple).toBe(true)
  })

  it('can disable ripple effect', async () => {
    const wrapper = mount(Button, {
      props: {
        ripple: false
      },
      slots: {
        default: 'No Ripple'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.vm.showRipple).toBe(false)
  })
})