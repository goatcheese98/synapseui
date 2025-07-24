import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface DockPosition {
  x: number
  y: number
}

export interface DockPanel {
  id: string
  title: string
  isVisible: boolean
  isMinimized: boolean
  position?: DockPosition
  width?: number
  height?: number
}

export interface DockState {
  isVisible: boolean
  isDragging: boolean
  position: DockPosition
  panels: DockPanel[]
  activePanel?: string
}

export const useDockStore = defineStore('dock', () => {
  // State
  const isVisible = ref(true)
  const isDragging = ref(false)
  const position = ref<DockPosition>({ x: 100, y: 100 })
  const panels = ref<DockPanel[]>([])
  const activePanel = ref<string>()

  // Getters
  const visiblePanels = computed(() => 
    panels.value.filter(panel => panel.isVisible)
  )

  const minimizedPanels = computed(() => 
    panels.value.filter(panel => panel.isMinimized)
  )

  const activePanelData = computed(() => 
    panels.value.find(panel => panel.id === activePanel.value)
  )

  // Actions
  function setPosition(newPosition: DockPosition) {
    position.value = newPosition
  }

  function setDragging(dragging: boolean) {
    isDragging.value = dragging
  }

  function toggleVisibility() {
    isVisible.value = !isVisible.value
  }

  function addPanel(panel: Omit<DockPanel, 'isVisible' | 'isMinimized'>) {
    const newPanel: DockPanel = {
      ...panel,
      isVisible: true,
      isMinimized: false
    }
    panels.value.push(newPanel)
    
    // Set as active if it's the first panel
    if (panels.value.length === 1) {
      activePanel.value = panel.id
    }
  }

  function removePanel(panelId: string) {
    const index = panels.value.findIndex(panel => panel.id === panelId)
    if (index > -1) {
      panels.value.splice(index, 1)
      
      // Clear active panel if it was removed
      if (activePanel.value === panelId) {
        activePanel.value = panels.value.length > 0 ? panels.value[0].id : undefined
      }
    }
  }

  function setActivePanel(panelId: string) {
    const panel = panels.value.find(p => p.id === panelId)
    if (panel) {
      activePanel.value = panelId
      // Ensure the panel is visible when activated
      panel.isVisible = true
      panel.isMinimized = false
    }
  }

  function togglePanelVisibility(panelId: string) {
    const panel = panels.value.find(p => p.id === panelId)
    if (panel) {
      panel.isVisible = !panel.isVisible
    }
  }

  function minimizePanel(panelId: string) {
    const panel = panels.value.find(p => p.id === panelId)
    if (panel) {
      panel.isMinimized = true
    }
  }

  function restorePanel(panelId: string) {
    const panel = panels.value.find(p => p.id === panelId)
    if (panel) {
      panel.isMinimized = false
      panel.isVisible = true
    }
  }

  function updatePanelPosition(panelId: string, newPosition: DockPosition) {
    const panel = panels.value.find(p => p.id === panelId)
    if (panel) {
      panel.position = newPosition
    }
  }

  function updatePanelSize(panelId: string, width: number, height: number) {
    const panel = panels.value.find(p => p.id === panelId)
    if (panel) {
      panel.width = width
      panel.height = height
    }
  }

  function reset() {
    isVisible.value = true
    isDragging.value = false
    position.value = { x: 100, y: 100 }
    panels.value = []
    activePanel.value = undefined
  }

  return {
    // State
    isVisible,
    isDragging,
    position,
    panels,
    activePanel,
    
    // Getters
    visiblePanels,
    minimizedPanels,
    activePanelData,
    
    // Actions
    setPosition,
    setDragging,
    toggleVisibility,
    addPanel,
    removePanel,
    setActivePanel,
    togglePanelVisibility,
    minimizePanel,
    restorePanel,
    updatePanelPosition,
    updatePanelSize,
    reset
  }
})