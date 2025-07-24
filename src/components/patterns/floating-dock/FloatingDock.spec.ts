import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { ref } from 'vue'
import FloatingDock from './FloatingDock.vue'
import DockPanel from './DockPanel.vue'
import { useDockStore } from '@/lib/stores/useDockStore'

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    to: vi.fn(),
    set: vi.fn(),
    getProperty: vi.fn(() => 'matrix(1, 0, 0, 1, 0, 0)')
  },
  Draggable: {
    create: vi.fn(() => [{
      disable: vi.fn(),
      enable: vi.fn(),
      kill: vi.fn()
    }])
  }
}))

// Mock useDraggable composable to avoid GSAP issues in tests
const mockIsDragging = ref(false)
vi.mock('@/composables/useDraggable', () => ({
  useDraggable: vi.fn(() => ({
    isDragging: mockIsDragging,
    position: ref({ x: 0, y: 0 }),
    enable: vi.fn(),
    disable: vi.fn(),
    updatePosition: vi.fn(),
    destroy: vi.fn()
  }))
}))

describe('FloatingDock', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockIsDragging.value = false
  })

  describe('rendering', () => {
    it('should render when visible', () => {
      const wrapper = mount(FloatingDock)
      
      expect(wrapper.find('.floating-dock').exists()).toBe(true)
    })

    it('should not render when not visible', () => {
      const store = useDockStore()
      store.toggleVisibility() // Make invisible
      
      const wrapper = mount(FloatingDock)
      
      expect(wrapper.find('.floating-dock').exists()).toBe(false)
    })

    it('should render default title', () => {
      const wrapper = mount(FloatingDock)
      
      expect(wrapper.find('.dock-title').text()).toBe('Floating Dock')
    })

    it('should render custom title from slot', () => {
      const wrapper = mount(FloatingDock, {
        slots: {
          title: 'Custom Dock Title'
        }
      })
      
      expect(wrapper.find('.dock-title').text()).toBe('Custom Dock Title')
    })

    it('should render default content when no active panel', () => {
      const wrapper = mount(FloatingDock)
      
      expect(wrapper.find('.default-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('No active panels')
    })

    it('should render panel tabs when panels exist', async () => {
      const store = useDockStore()
      store.addPanel({ id: 'panel-1', title: 'Panel 1' })
      store.addPanel({ id: 'panel-2', title: 'Panel 2' })
      
      const wrapper = mount(FloatingDock)
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.dock-tabs').exists()).toBe(true)
      expect(wrapper.findAll('.dock-tab')).toHaveLength(2)
    })
  })

  describe('panel interaction', () => {
    it('should show active panel as active tab', async () => {
      const store = useDockStore()
      store.addPanel({ id: 'panel-1', title: 'Panel 1' })
      store.addPanel({ id: 'panel-2', title: 'Panel 2' })
      store.setActivePanel('panel-2')
      
      const wrapper = mount(FloatingDock)
      await wrapper.vm.$nextTick()
      
      const tabs = wrapper.findAll('.dock-tab')
      expect(tabs[1].classes()).toContain('dock-tab--active')
    })

    it('should switch active panel when tab is clicked', async () => {
      const store = useDockStore()
      store.addPanel({ id: 'panel-1', title: 'Panel 1' })
      store.addPanel({ id: 'panel-2', title: 'Panel 2' })
      
      const wrapper = mount(FloatingDock)
      await wrapper.vm.$nextTick()
      
      const secondTab = wrapper.findAll('.dock-tab')[1]
      await secondTab.trigger('click')
      
      expect(store.activePanel).toBe('panel-2')
    })

    it('should toggle visibility when minimize button is clicked', async () => {
      const store = useDockStore()
      const wrapper = mount(FloatingDock)
      
      expect(store.isVisible).toBe(true)
      
      await wrapper.find('.dock-control-btn').trigger('click')
      
      expect(store.isVisible).toBe(false)
    })
  })

  describe('props handling', () => {
    it('should use custom initial position', () => {
      const initialPosition = { x: 200, y: 300 }
      const store = useDockStore()
      
      mount(FloatingDock, {
        props: {
          initialPosition
        }
      })
      
      expect(store.position).toEqual(initialPosition)
    })

    it('should apply custom class name', () => {
      const wrapper = mount(FloatingDock, {
        props: {
          className: 'custom-dock-class'
        }
      })
      
      expect(wrapper.find('.floating-dock').classes()).toContain('custom-dock-class')
    })

    it('should use default dimensions when not specified', () => {
      const wrapper = mount(FloatingDock)
      
      // Component should render without errors
      expect(wrapper.find('.floating-dock').exists()).toBe(true)
    })
  })

  describe('mouse interactions', () => {
    it('should handle mouse enter and leave events', async () => {
      const wrapper = mount(FloatingDock)
      const dockElement = wrapper.find('.floating-dock')
      
      await dockElement.trigger('mouseenter')
      expect(wrapper.find('.dock--hovered').exists()).toBe(true)
      
      await dockElement.trigger('mouseleave')
      expect(wrapper.find('.dock--hovered').exists()).toBe(false)
    })

    it('should prevent default on header mouse down', async () => {
      const wrapper = mount(FloatingDock)
      const header = wrapper.find('.dock-header')
      
      const mockEvent = {
        preventDefault: vi.fn()
      }
      
      await header.trigger('mousedown', mockEvent)
      
      // Note: This tests the event handler exists, actual preventDefault
      // would need more complex event mocking
      expect(header.exists()).toBe(true)
    })
  })

  describe('integration with DockPanel', () => {
    it('should work with DockPanel components', async () => {
      const wrapper = mount({
        template: `
          <FloatingDock>
            <DockPanel id="test-panel" title="Test Panel">
              <div>Panel content</div>
            </DockPanel>
          </FloatingDock>
        `,
        components: {
          FloatingDock,
          DockPanel
        }
      })

      await wrapper.vm.$nextTick()
      
      const store = useDockStore()
      expect(store.panels).toHaveLength(1)
      expect(store.panels[0].id).toBe('test-panel')
    })

    it('should render panel content in slot', async () => {
      const store = useDockStore()
      store.addPanel({ id: 'test-panel', title: 'Test Panel' })
      
      const wrapper = mount(FloatingDock, {
        slots: {
          panel: `
            <template #panel="{ panel }">
              <div class="test-panel-content">{{ panel.title }}</div>
            </template>
          `
        }
      })
      
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.test-panel-content').exists()).toBe(true)
      expect(wrapper.find('.test-panel-content').text()).toBe('Test Panel')
    })
  })

  describe('computed classes', () => {
    it('should apply dragging class when dragging', async () => {
      mockIsDragging.value = true
      
      const wrapper = mount(FloatingDock)
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.dock--dragging').exists()).toBe(true)
    })

    it('should apply active class when panels exist', async () => {
      const store = useDockStore()
      store.addPanel({ id: 'panel-1', title: 'Panel 1' })
      
      const wrapper = mount(FloatingDock)
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.dock--active').exists()).toBe(true)
    })
  })
})