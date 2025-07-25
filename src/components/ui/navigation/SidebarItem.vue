<!--
  SidebarItem Component
  Individual sidebar navigation item with nesting support
-->

<template>
  <div>
    <component
      :is="item.href ? 'a' : 'button'"
      :href="item.href"
      :class="cn(
        'flex items-center w-full text-left rounded-md transition-all duration-200',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        collapsed ? 'px-2 py-2 justify-center' : `px-3 py-2 pl-${3 + level * 4}`,
        isActive 
          ? 'bg-primary text-primary-text shadow-sm' 
          : 'text-text-secondary hover:text-text-primary',
        item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      )"
      :disabled="item.disabled"
      @click="handleClick"
    >
      <!-- Icon -->
      <Icon 
        v-if="item.icon" 
        :name="item.icon" 
        :class="cn('w-4 h-4 shrink-0', !collapsed && 'mr-3')" 
      />

      <!-- Label and Badge (hidden when collapsed) -->
      <Transition
        name="label"
        enter-active-class="transition-all duration-200 ease-out"
        leave-active-class="transition-all duration-150 ease-in"
        enter-from-class="opacity-0 scale-95"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="!collapsed" class="flex items-center justify-between flex-1 min-w-0">
          <span class="truncate">{{ item.label }}</span>
          
          <!-- Badge -->
          <Badge v-if="item.badge" variant="secondary" class="ml-2 shrink-0">
            {{ item.badge }}
          </Badge>
          
          <!-- Expand/Collapse for children -->
          <Icon 
            v-if="hasChildren && !collapsed"
            :name="expanded ? 'chevron-down' : 'chevron-right'" 
            class="w-4 h-4 ml-2 shrink-0"
          />
        </div>
      </Transition>
    </component>

    <!-- Children (nested items) -->
    <Transition
      name="children"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 max-h-0"
      leave-to-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-from-class="opacity-100 max-h-96"
    >
      <div v-if="hasChildren && expanded && !collapsed" class="mt-1 space-y-1">
        <SidebarItem
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :collapsed="collapsed"
          :active-item="activeItem"
          :level="level + 1"
          @item-click="$emit('item-click', $event)"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/badge/Badge.vue'
import Icon from '@/components/ui/icon/Icon.vue'

interface SidebarItem {
  id: string
  label: string
  href?: string
  icon?: string
  badge?: string | number
  disabled?: boolean
  children?: SidebarItem[]
}

interface Props {
  item: SidebarItem
  collapsed: boolean
  activeItem?: string
  level?: number
}

interface Emits {
  (e: 'item-click', item: SidebarItem): void
}

const props = withDefaults(defineProps<Props>(), {
  level: 0
})

const emit = defineEmits<Emits>()

const expanded = ref(false)

const hasChildren = computed(() => 
  props.item.children && props.item.children.length > 0
)

const isActive = computed(() => 
  props.activeItem === props.item.id || 
  (hasChildren.value && props.item.children?.some(child => 
    isChildActive(child, props.activeItem)
  ))
)

const isChildActive = (item: SidebarItem, activeId?: string): boolean => {
  if (item.id === activeId) return true
  return item.children?.some(child => isChildActive(child, activeId)) || false
}

const handleClick = () => {
  if (props.item.disabled) return
  
  if (hasChildren.value && !props.collapsed) {
    expanded.value = !expanded.value
  } else {
    emit('item-click', props.item)
  }
}
</script>

<style scoped>
.label-enter-active,
.label-leave-active {
  transition: all 0.2s ease;
}

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
</style>