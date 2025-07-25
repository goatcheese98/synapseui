import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface DockItem {
  id: string
  icon: string
  label: string
  action?: () => void
}

export const useDockStore = defineStore('dock', () => {
  const items = ref<DockItem[]>([])
  const activeItem = ref<string | null>(null)
  const isVisible = ref(true)
  const position = ref({ x: 50, y: 50 })

  const addItem = (item: DockItem) => {
    items.value.push(item)
  }

  const removeItem = (id: string) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const setActiveItem = (id: string | null) => {
    activeItem.value = id
  }

  const setPosition = (x: number, y: number) => {
    position.value = { x, y }
  }

  const toggleVisibility = () => {
    isVisible.value = !isVisible.value
  }

  const itemCount = computed(() => items.value.length)

  return {
    items,
    activeItem,
    isVisible,
    position,
    addItem,
    removeItem,
    setActiveItem,
    setPosition,
    toggleVisibility,
    itemCount
  }
})