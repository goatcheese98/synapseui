<!--
  NavBar Component
  Responsive navigation bar with mobile support and Synapse effects
-->

<template>
  <nav 
    :class="cn(
      'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      'transition-all duration-300',
      scrolled ? 'shadow-lg border-border-muted' : 'border-transparent',
      variant === 'floating' ? 'mx-4 mt-4 rounded-lg border' : '',
      ($attrs.class as string | undefined)
    )"
  >
    <div :class="cn('flex h-16 items-center', containerClass)">
      <!-- Logo/Brand -->
      <div class="flex items-center space-x-4">
        <slot name="logo">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span class="text-primary-text font-bold text-sm">S</span>
            </div>
            <span class="font-semibold text-lg">{{ brand }}</span>
          </div>
        </slot>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex flex-1 items-center justify-between ml-8">
        <div class="flex items-center space-x-1">
          <NavItem 
            v-for="item in items" 
            :key="item.href"
            :href="item.href"
            :active="item.href === activeItem"
            :disabled="item.disabled"
            @click="handleItemClick(item)"
          >
            <Icon
              v-if="item.icon"
              :name="item.icon"
              class="w-4 h-4 mr-2"
            />
            {{ item.label }}
          </NavItem>
        </div>

        <!-- Right side content -->
        <div class="flex items-center space-x-4">
          <slot name="actions" />
          
          <!-- Theme Toggle -->
          <Button
            v-if="showThemeToggle"
            variant="ghost"
            size="sm"
            class="w-9 h-9 p-0"
            @click="toggleTheme"
          >
            <Icon
              :name="isDark ? 'sun' : 'moon'"
              class="w-4 h-4"
            />
          </Button>

          <!-- User Menu -->
          <slot name="user" />
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
      <div class="md:hidden ml-auto">
        <Button
          variant="ghost"
          size="sm"
          class="w-9 h-9 p-0"
          @click="toggleMobileMenu"
        >
          <Icon
            :name="mobileMenuOpen ? 'x' : 'menu'"
            class="w-5 h-5"
          />
        </Button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      name="mobile-menu"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden border-t bg-background/95 backdrop-blur"
      >
        <div class="px-4 py-4 space-y-2">
          <MobileNavItem
            v-for="item in items"
            :key="item.href"
            :href="item.href"
            :active="item.href === activeItem"
            :disabled="item.disabled"
            @click="handleMobileItemClick(item)"
          >
            <Icon
              v-if="item.icon"
              :name="item.icon"
              class="w-4 h-4 mr-3"
            />
            {{ item.label }}
          </MobileNavItem>

          <!-- Mobile Actions -->
          <div class="pt-4 border-t">
            <slot name="mobile-actions" />
            
            <Button
              v-if="showThemeToggle"
              variant="ghost"
              size="sm"
              class="w-full justify-start"
              @click="toggleTheme"
            >
              <Icon
                :name="isDark ? 'sun' : 'moon'"
                class="w-4 h-4 mr-3"
              />
              {{ isDark ? 'Light Mode' : 'Dark Mode' }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button/BaseButton.vue'
import Icon from '@/components/ui/icon/BaseIcon.vue'
import NavItem from './NavItem.vue'
import MobileNavItem from './MobileNavItem.vue'

interface NavItem {
  label: string
  href: string
  icon?: string
  disabled?: boolean
  badge?: string | number
}

interface Props {
  brand?: string
  items?: NavItem[]
  activeItem?: string
  variant?: 'default' | 'floating'
  containerClass?: string
  showThemeToggle?: boolean
  isDark?: boolean
  class?: string
}

interface Emits {
  (e: 'item-click', item: NavItem): void
  (e: 'theme-toggle'): void
}

const props = withDefaults(defineProps<Props>(), {
  brand: 'Synapse UI',
  items: () => [],
  activeItem: '',
  variant: 'default',
  containerClass: 'container mx-auto px-4',
  showThemeToggle: true,
  isDark: false,
  class: ''
})

const emit = defineEmits<Emits>()

// State
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

// Handle scroll for styling
const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Event handlers
const handleItemClick = (item: NavItem) => {
  if (!item.disabled) {
    emit('item-click', item)
  }
}

const handleMobileItemClick = (item: NavItem) => {
  if (!item.disabled) {
    mobileMenuOpen.value = false
    emit('item-click', item)
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleTheme = () => {
  emit('theme-toggle')
}
</script>


<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>