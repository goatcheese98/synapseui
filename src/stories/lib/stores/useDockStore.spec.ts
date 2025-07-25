import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useDockStore } from './useDockStore'

describe('useDockStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const store = useDockStore()
      
      expect(store.isVisible).toBe(true)
      expect(store.isDragging).toBe(false)
      expect(store.position).toEqual({ x: 100, y: 100 })
      expect(store.panels).toEqual([])
      expect(store.activePanel).toBeUndefined()
    })
  })

  describe('position management', () => {
    it('should update position correctly', () => {
      const store = useDockStore()
      const newPosition = { x: 200, y: 150 }
      
      store.setPosition(newPosition)
      
      expect(store.position).toEqual(newPosition)
    })

    it('should set dragging state', () => {
      const store = useDockStore()
      
      store.setDragging(true)
      expect(store.isDragging).toBe(true)
      
      store.setDragging(false)
      expect(store.isDragging).toBe(false)
    })
  })

  describe('visibility management', () => {
    it('should toggle visibility', () => {
      const store = useDockStore()
      
      expect(store.isVisible).toBe(true)
      
      store.toggleVisibility()
      expect(store.isVisible).toBe(false)
      
      store.toggleVisibility()
      expect(store.isVisible).toBe(true)
    })
  })

  describe('panel management', () => {
    it('should add panel correctly', () => {
      const store = useDockStore()
      const panel = { id: 'test-panel', title: 'Test Panel' }
      
      store.addPanel(panel)
      
      expect(store.panels).toHaveLength(1)
      expect(store.panels[0]).toMatchObject({
        ...panel,
        isVisible: true,
        isMinimized: false
      })
      expect(store.activePanel).toBe(panel.id)
    })

    it('should add multiple panels and maintain first as active', () => {
      const store = useDockStore()
      const panel1 = { id: 'panel-1', title: 'Panel 1' }
      const panel2 = { id: 'panel-2', title: 'Panel 2' }
      
      store.addPanel(panel1)
      store.addPanel(panel2)
      
      expect(store.panels).toHaveLength(2)
      expect(store.activePanel).toBe(panel1.id)
    })

    it('should remove panel correctly', () => {
      const store = useDockStore()
      const panel1 = { id: 'panel-1', title: 'Panel 1' }
      const panel2 = { id: 'panel-2', title: 'Panel 2' }
      
      store.addPanel(panel1)
      store.addPanel(panel2)
      
      store.removePanel(panel1.id)
      
      expect(store.panels).toHaveLength(1)
      expect(store.panels[0].id).toBe(panel2.id)
      expect(store.activePanel).toBe(panel2.id)
    })

    it('should clear active panel when removing the last panel', () => {
      const store = useDockStore()
      const panel = { id: 'test-panel', title: 'Test Panel' }
      
      store.addPanel(panel)
      store.removePanel(panel.id)
      
      expect(store.panels).toHaveLength(0)
      expect(store.activePanel).toBeUndefined()
    })

    it('should set active panel', () => {
      const store = useDockStore()
      const panel1 = { id: 'panel-1', title: 'Panel 1' }
      const panel2 = { id: 'panel-2', title: 'Panel 2' }
      
      store.addPanel(panel1)
      store.addPanel(panel2)
      
      store.setActivePanel(panel2.id)
      
      expect(store.activePanel).toBe(panel2.id)
      expect(store.panels[1].isVisible).toBe(true)
      expect(store.panels[1].isMinimized).toBe(false)
    })

    it('should not set active panel for non-existent panel', () => {
      const store = useDockStore()
      const panel = { id: 'panel-1', title: 'Panel 1' }
      
      store.addPanel(panel)
      store.setActivePanel('non-existent')
      
      expect(store.activePanel).toBe(panel.id)
    })
  })

  describe('panel visibility', () => {
    it('should toggle panel visibility', () => {
      const store = useDockStore()
      const panel = { id: 'test-panel', title: 'Test Panel' }
      
      store.addPanel(panel)
      
      expect(store.panels[0].isVisible).toBe(true)
      
      store.togglePanelVisibility(panel.id)
      expect(store.panels[0].isVisible).toBe(false)
      
      store.togglePanelVisibility(panel.id)
      expect(store.panels[0].isVisible).toBe(true)
    })

    it('should minimize panel', () => {
      const store = useDockStore()
      const panel = { id: 'test-panel', title: 'Test Panel' }
      
      store.addPanel(panel)
      store.minimizePanel(panel.id)
      
      expect(store.panels[0].isMinimized).toBe(true)
    })

    it('should restore panel', () => {
      const store = useDockStore()
      const panel = { id: 'test-panel', title: 'Test Panel' }
      
      store.addPanel(panel)
      store.minimizePanel(panel.id)
      store.restorePanel(panel.id)
      
      expect(store.panels[0].isMinimized).toBe(false)
      expect(store.panels[0].isVisible).toBe(true)
    })
  })

  describe('panel position and size', () => {
    it('should update panel position', () => {
      const store = useDockStore()
      const panel = { id: 'test-panel', title: 'Test Panel' }
      const position = { x: 50, y: 75 }
      
      store.addPanel(panel)
      store.updatePanelPosition(panel.id, position)
      
      expect(store.panels[0].position).toEqual(position)
    })

    it('should update panel size', () => {
      const store = useDockStore()
      const panel = { id: 'test-panel', title: 'Test Panel' }
      
      store.addPanel(panel)
      store.updatePanelSize(panel.id, 300, 200)
      
      expect(store.panels[0].width).toBe(300)
      expect(store.panels[0].height).toBe(200)
    })
  })

  describe('computed getters', () => {
    it('should return visible panels', () => {
      const store = useDockStore()
      const panel1 = { id: 'panel-1', title: 'Panel 1' }
      const panel2 = { id: 'panel-2', title: 'Panel 2' }
      
      store.addPanel(panel1)
      store.addPanel(panel2)
      store.togglePanelVisibility(panel2.id)
      
      expect(store.visiblePanels).toHaveLength(1)
      expect(store.visiblePanels[0].id).toBe(panel1.id)
    })

    it('should return minimized panels', () => {
      const store = useDockStore()
      const panel1 = { id: 'panel-1', title: 'Panel 1' }
      const panel2 = { id: 'panel-2', title: 'Panel 2' }
      
      store.addPanel(panel1)
      store.addPanel(panel2)
      store.minimizePanel(panel1.id)
      
      expect(store.minimizedPanels).toHaveLength(1)
      expect(store.minimizedPanels[0].id).toBe(panel1.id)
    })

    it('should return active panel data', () => {
      const store = useDockStore()
      const panel = { id: 'test-panel', title: 'Test Panel' }
      
      store.addPanel(panel)
      
      expect(store.activePanelData).toMatchObject({
        id: panel.id,
        title: panel.title,
        isVisible: true,
        isMinimized: false
      })
    })

    it('should return undefined for active panel data when no active panel', () => {
      const store = useDockStore()
      
      expect(store.activePanelData).toBeUndefined()
    })
  })

  describe('reset functionality', () => {
    it('should reset store to initial state', () => {
      const store = useDockStore()
      const panel = { id: 'test-panel', title: 'Test Panel' }
      
      // Modify state
      store.addPanel(panel)
      store.setPosition({ x: 300, y: 400 })
      store.setDragging(true)
      store.toggleVisibility()
      
      // Reset
      store.reset()
      
      // Check initial state is restored
      expect(store.isVisible).toBe(true)
      expect(store.isDragging).toBe(false)
      expect(store.position).toEqual({ x: 100, y: 100 })
      expect(store.panels).toEqual([])
      expect(store.activePanel).toBeUndefined()
    })
  })
})