import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FloatingDock from './FloatingDock.vue'

describe('FloatingDock', () => {
  it('renders default dock', () => {
    const wrapper = mount(FloatingDock, {
      slots: {
        default: 'Test Content'
      }
    })
    
    expect(wrapper.text()).toContain('Test Content')
  })

  it('applies size variants correctly', () => {
    const wrapper = mount(FloatingDock, {
      props: { size: 'sm' },
      slots: { default: 'Small Dock' }
    })
    
    expect(wrapper.classes()).toContain('px-3')
    expect(wrapper.classes()).toContain('py-2')
  })

  it('applies position variants correctly', () => {
    const wrapper = mount(FloatingDock, {
      props: { position: 'top' },
      slots: { default: 'Top Dock' }
    })
    
    expect(wrapper.classes()).toContain('top-6')
  })

  it('applies style variants correctly', () => {
    const wrapper = mount(FloatingDock, {
      props: { variant: 'compact' },
      slots: { default: 'Compact Dock' }
    })
    
    expect(wrapper.classes()).toContain('rounded-full')
  })
})