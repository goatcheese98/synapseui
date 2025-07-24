import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import DockPanel from './DockPanel.vue'
import { useDockStore } from '@/lib/stores/useDockStore'

describe('DockPanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('basic functionality', () => {
    it('should render dock panel', () => {
      const wrapper = mount(DockPanel, {
        props: { id: 'test-panel', title: 'Test Panel' }
      })
      
      expect(wrapper.find('.dock-panel').exists()).toBe(true)
      expect(wrapper.find('.panel-title').text()).toBe('Test Panel')
    })

    it('should render header by default', () => {
      const wrapper = mount(DockPanel, {
        props: { id: 'test-panel', title: 'Test Panel' }
      })
      
      expect(wrapper.find('.panel-header').exists()).toBe(true)
    })

    it('should hide header when showHeader is false', () => {
      const wrapper = mount(DockPanel, {
        props: { id: 'test-panel', title: 'Test Panel', showHeader: false }
      })
      
      expect(wrapper.find('.panel-header').exists()).toBe(false)
    })

    it('should render action buttons', () => {
      const wrapper = mount(DockPanel, {
        props: { id: 'test-panel', title: 'Test Panel' }
      })
      
      expect(wrapper.findAll('.panel-action-btn')).toHaveLength(2)
    })

    it('should render content slot', () => {
      const wrapper = mount(DockPanel, {
        props: { id: 'test-panel', title: 'Test Panel' },
        slots: { default: '<div class="test-content">Hello</div>' }
      })
      
      expect(wrapper.find('.test-content').text()).toBe('Hello')
    })
  })

  describe('store integration', () => {
    it('should auto-register with dock store', async () => {
      const store = useDockStore()
      
      mount(DockPanel, {
        props: { id: 'auto-panel', title: 'Auto Panel' }
      })
      
      await nextTick()
      expect(store.panels).toHaveLength(1)
      expect(store.panels[0].id).toBe('auto-panel')
    })

    it('should emit events on button clicks', async () => {
      const wrapper = mount(DockPanel, {
        props: { id: 'test-panel', title: 'Test Panel' }
      })
      
      const minimizeBtn = wrapper.find('[aria-label="Minimize panel"]')
      await minimizeBtn.trigger('click')
      
      expect(wrapper.emitted('minimize')).toBeTruthy()
      expect(wrapper.emitted('minimize')?.[0]).toEqual(['test-panel'])
    })
  })
})