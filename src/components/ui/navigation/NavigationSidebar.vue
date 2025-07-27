<!--
  Sidebar Component  
  Collapsible sidebar navigation with nested menu support
-->

<template>
  <aside
    :class="cn(
      'flex flex-col bg-background-secondary border-r transition-all duration-300 ease-in-out',
      'h-screen sticky top-0 z-40',
      collapsed ? 'w-16' : 'w-64',
      variant === 'overlay' && mobileOpen ? 'fixed inset-y-0 left-0 z-50' : '',
      ($attrs.class as string | undefined)
    )"
  >
    <!-- Header -->
    <div 
      :class="cn(
        'flex items-center justify-between h-16 px-4 border-b',
        collapsed ? 'px-4' : 'px-6'
      )"
    >
      <Transition
        name="logo"
        enter-active-class="transition-all duration-200 ease-out"
        leave-active-class="transition-all duration-150 ease-in"
        enter-from-class="opacity-0 scale-95"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="!collapsed"
          class="flex items-center space-x-2"
        >
          <slot name="logo">
            <div class="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span class="text-primary-text font-bold text-sm">S</span>
            </div>
            <span class="font-semibold text-lg">{{ brand }}</span>
          </slot>
        </div>
      </Transition>

      <Button
        variant="ghost"
        size="sm"
        class="w-8 h-8 p-0 shrink-0"
        @click="toggleCollapsed"
      >
        <Icon 
          :name="collapsed ? 'chevron-right' : 'chevron-left'" 
          class="w-4 h-4" 
        />
      </Button>
    </div>

    <!-- Navigation -->
    <div class="flex-1 overflow-y-auto py-4">
      <nav class="space-y-1 px-3">
        <SidebarItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          :collapsed="collapsed"
          :active-item="activeItem"
          :level="0"
          @item-click="handleItemClick"
        />
      </nav>
    </div>

    <!-- Footer -->
    <div
      v-if="!collapsed"
      class="border-t p-4"
    >
      <slot name="footer" />
    </div>

    <!-- User Section -->
    <div 
      :class="cn(
        'border-t p-4',
        collapsed ? 'px-2' : 'px-4'
      )"
    >
      <slot
        name="user"
        :collapsed="collapsed"
      />
    </div>
  </aside>

  <!-- Mobile Overlay -->
  <Transition
    name="overlay"
    enter-active-class="transition-opacity duration-300 ease-out"
    leave-active-class="transition-opacity duration-200 ease-in"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="variant === 'overlay' && mobileOpen"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
      @click="closeMobile"
    />
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button/BaseButton.vue'
import Icon from '@/components/ui/icon/BaseIcon.vue'
import SidebarItem from './SidebarItem.vue'

export interface SidebarItem {
  id: string
  label: string
  href?: string
  icon?: string
  badge?: string | number
  disabled?: boolean
  children?: SidebarItem[]
}

interface Props {
  brand?: string
  items?: SidebarItem[]
  activeItem?: string
  defaultCollapsed?: boolean
  variant?: 'default' | 'overlay'
  mobileOpen?: boolean
  class?: string
}

interface Emits {
  (e: 'item-click', item: SidebarItem): void
  (e: 'toggle-collapsed', collapsed: boolean): void
  (e: 'close-mobile'): void
}

const props = withDefaults(defineProps<Props>(), {
  brand: 'Synapse UI',
  items: () => [],
  activeItem: '',
  defaultCollapsed: false,
  variant: 'default',
  mobileOpen: false,
  class: ''
})

const emit = defineEmits<Emits>()

// State
const collapsed = ref(props.defaultCollapsed)

// Methods
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
  emit('toggle-collapsed', collapsed.value)
}

const handleItemClick = (item: SidebarItem) => {
  emit('item-click', item)
}

const closeMobile = () => {
  emit('close-mobile')
}
</script>


<style scoped>
.logo-enter-active,
.logo-leave-active,
.label-enter-active,
.label-leave-active {
  transition: all 0.2s ease;
}

.logo-enter-from,
.logo-leave-to,
.label-enter-from,
.label-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.children-enter-active,
.children-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.children-enter-from,
.children-leave-to {
  opacity: 0;
  max-height: 0;
}

.children-enter-to,
.children-leave-from {
  opacity: 1;
  max-height: 24rem;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>