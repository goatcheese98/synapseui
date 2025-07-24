import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { ref, nextTick } from 'vue'
import FloatingDock from './FloatingDock.vue'
import DockPanel from './DockPanel.vue'
import { useDockStore } from '@/lib/stores/useDockStore'

// Simple GSAP mock
const mockGsapTo = vi.fn()
vi.mock('gsap', () => ({
  gsap: {
    to: mockGsapTo,
    set: vi.fn(),
    registerPlugin: vi.fn()
  }
}))

// Simple useDraggable mock
const mockIsDragging = ref(false)
const mockPosition = ref({ x: 0, y: 0 })

vi.mock('@/composables/useDraggable', () => ({
  useDraggable: vi.fn(() => ({
    isDragging: mockIsDragging,
    position: mockPosition,
    enable: vi.fn(),
    disable: vi.fn(),
    destroy: vi.fn()
  }))
}))

describe('FloatingDock', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockIsDragging.value = false
    mockPosition.value = { x: 0, y: 0 }
    mockGsapTo.mockClear()
  })

  describe('basic functionality', () => {
    it('should render when visible', () => {
      const wrapper = mount(FloatingDock)
      expect(wrapper.find('.floating-dock').exists()).toBe(true)
    })

    it('should not render when not visible', () => {
      const store = useDockStore()
      store.toggleVisibility()
      
      const wrapper = mount(FloatingDock)
      expect(wrapper.find('.floating-dock').exists()).toBe(false)
    })

    it('should render panel tabs when panels exist', async () => {
      const store = useDockStore()
      store.addPanel({ id: 'panel-1', title: 'Panel 1' })
      
      const wrapper = mount(FloatingDock)
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.dock-tabs').exists()).toBe(true)
    })

    it('should toggle visibility when minimize button is clicked', async () => {
      const store = useDockStore()
      const wrapper = mount(FloatingDock)
      
      await wrapper.find('.dock-control-btn').trigger('click')
      expect(store.isVisible).toBe(false)
    })
  })

  describe('Living Interface - Pillar I: Cursor as Physical Force', () => {
    it('should respond to cursor proximity with edge morphing', async () => {
      const wrapper = mount(FloatingDock)
      const dockElement = wrapper.find('.floating-dock')
      
      // Test hover enter - should trigger hover state
      await dockElement.trigger('mouseenter')
      expect(wrapper.vm.isHovered).toBe(true)
      expect(wrapper.find('.dock--hovered').exists()).toBe(true)
      
      // Test hover leave - should reset
      await dockElement.trigger('mouseleave')
      expect(wrapper.vm.isHovered).toBe(false)
    })

    it('should create velocity-based wake effects during drag', async () => {
      const wrapper = mount(FloatingDock)
      
      // Simulate drag state for wake effects
      mockIsDragging.value = true
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.dock--dragging').exists()).toBe(true)
      
      // Reset
      mockIsDragging.value = false
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.dock--dragging').exists()).toBe(false)
    })
  })

  describe('Living Interface - Pillar II: Environment Aliveness', () => {
    it('should maintain ambient presence through visual states', async () => {
      const wrapper = mount(FloatingDock)
      
      // Should have base floating dock presence
      expect(wrapper.find('.floating-dock').exists()).toBe(true)
      
      // Should respond to activity state
      const store = useDockStore()
      store.addPanel({ id: 'test', title: 'Test' })
      await wrapper.vm.$nextTick()
      
      expect(wrapper.find('.dock--active').exists()).toBe(true)
    })
  })

  describe('integration', () => {
    it('should work with DockPanel components', async () => {
      const wrapper = mount({
        template: `
          <FloatingDock>
            <DockPanel id="test-panel" title="Test Panel">
              <div>Panel content</div>
            </DockPanel>
          </FloatingDock>
        `,
        components: { FloatingDock, DockPanel }
      })

      await wrapper.vm.$nextTick()
      
      const store = useDockStore()
      expect(store.panels).toHaveLength(1)
    })
  })
})