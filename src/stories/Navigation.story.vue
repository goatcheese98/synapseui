<!--
  Navigation Story
  Demonstrates comprehensive navigation components
-->

<template>
  <Story
    title="Navigation/Navigation System"
    :layout="{ type: 'fullscreen', iframe: false }"
  >
    <Variant title="Navigation Components">
      <div class="min-h-screen bg-background">
        <!-- Navigation Bar -->
        <NavBar
          :items="navItems"
          :active-item="activeNavItem"
          :is-dark="isDark"
          @item-click="handleNavClick"
          @theme-toggle="toggleTheme"
        >
          <template #actions>
            <Button
              variant="ghost"
              size="sm"
            >
              <Icon
                name="search"
                class="w-4 h-4 mr-2"
              />
              Search
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              Sign In
            </Button>
          </template>

          <template #user>
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span class="text-primary-text text-sm font-medium">JD</span>
              </div>
            </div>
          </template>

          <template #mobile-actions>
            <Button
              variant="ghost"
              size="sm"
              class="w-full justify-start"
            >
              <Icon
                name="search"
                class="w-4 h-4 mr-3"
              />
              Search
            </Button>
            <Button
              variant="ghost"
              size="sm"
              class="w-full justify-start"
            >
              <Icon
                name="user"
                class="w-4 h-4 mr-3"
              />
              Profile
            </Button>
          </template>
        </NavBar>

        <div class="flex">
          <!-- Sidebar -->
          <Sidebar
            :items="sidebarItems"
            :active-item="activeSidebarItem"
            @item-click="handleSidebarClick"
            @toggle-collapsed="handleSidebarToggle"
          >
            <template #footer>
              <div class="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  class="w-full"
                >
                  <Icon
                    name="help-circle"
                    class="w-4 h-4 mr-2"
                  />
                  Help & Support
                </Button>
              </div>
            </template>

            <template #user="{ collapsed }">
              <div 
                :class="cn(
                  'flex items-center space-x-3',
                  collapsed ? 'justify-center' : ''
                )"
              >
                <div class="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <span class="text-success-text text-sm font-medium">A</span>
                </div>
                <div
                  v-if="!collapsed"
                  class="flex-1 min-w-0"
                >
                  <p class="text-sm font-medium truncate">
                    John Doe
                  </p>
                  <p class="text-xs text-text-muted truncate">
                    john@example.com
                  </p>
                </div>
              </div>
            </template>
          </Sidebar>

          <!-- Main Content -->
          <main class="flex-1 p-8">
            <div class="max-w-4xl mx-auto space-y-8">
              <!-- Header -->
              <div class="text-center space-y-4">
                <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  🧭 Navigation Laboratory
                </h1>
                <p class="text-text-secondary text-lg">
                  Comprehensive navigation components with Synapse UI integration
                </p>
                <div class="flex items-center justify-center gap-4 text-sm text-text-muted">
                  <span>Active Nav: {{ activeNavItem || 'None' }}</span>
                  <span>•</span>
                  <span>Active Sidebar: {{ activeSidebarItem || 'None' }}</span>
                  <span>•</span>
                  <span>Theme: {{ isDark ? 'Dark' : 'Light' }}</span>
                </div>
              </div>

              <!-- Feature Showcase -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Responsive Design -->
                <Card class="p-6">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-2">
                      <Icon
                        name="smartphone"
                        class="w-5 h-5 text-primary"
                      />
                      <h3 class="font-semibold">
                        Responsive Design
                      </h3>
                    </div>
                    <p class="text-sm text-text-secondary">
                      Navigation adapts seamlessly across all device sizes with mobile-first approach.
                    </p>
                    <div class="flex items-center space-x-2 text-xs text-success">
                      <Icon
                        name="check"
                        class="w-3 h-3"
                      />
                      <span>Mobile menu</span>
                    </div>
                    <div class="flex items-center space-x-2 text-xs text-success">
                      <Icon
                        name="check"
                        class="w-3 h-3"
                      />
                      <span>Touch-friendly</span>
                    </div>
                    <div class="flex items-center space-x-2 text-xs text-success">
                      <Icon
                        name="check"
                        class="w-3 h-3"
                      />
                      <span>Collapsible sidebar</span>
                    </div>
                  </div>
                </Card>

                <!-- Active States -->
                <Card class="p-6">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-2">
                      <Icon
                        name="target"
                        class="w-5 h-5 text-primary"
                      />
                      <h3 class="font-semibold">
                        Active States
                      </h3>
                    </div>
                    <p class="text-sm text-text-secondary">
                      Clear visual feedback for active navigation items with smooth transitions.
                    </p>
                    <div class="space-y-2">
                      <Button 
                        v-for="item in navItems" 
                        :key="item.href"
                        :variant="activeNavItem === item.href ? 'default' : 'ghost'"
                        size="sm"
                        class="w-full justify-start"
                        @click="activeNavItem = item.href"
                      >
                        <Icon
                          v-if="item.icon"
                          :name="item.icon"
                          class="w-4 h-4 mr-2"
                        />
                        {{ item.label }}
                      </Button>
                    </div>
                  </div>
                </Card>

                <!-- Nested Navigation -->
                <Card class="p-6">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-2">
                      <Icon
                        name="folder-tree"
                        class="w-5 h-5 text-primary"
                      />
                      <h3 class="font-semibold">
                        Nested Menus
                      </h3>
                    </div>
                    <p class="text-sm text-text-secondary">
                      Multi-level navigation with expandable sections and proper indentation.
                    </p>
                    <div class="text-xs text-text-muted space-y-1">
                      <div>• Expandable sections</div>
                      <div>• Visual hierarchy</div>
                      <div>• Badge support</div>
                      <div>• Smooth animations</div>
                    </div>
                  </div>
                </Card>

                <!-- Theme Integration -->
                <Card class="p-6">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-2">
                      <Icon
                        name="palette"
                        class="w-5 h-5 text-primary"
                      />
                      <h3 class="font-semibold">
                        Theme System
                      </h3>
                    </div>
                    <p class="text-sm text-text-secondary">
                      Seamless integration with the Synapse UI theme system.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      class="w-full"
                      @click="toggleTheme"
                    >
                      <Icon
                        :name="isDark ? 'sun' : 'moon'"
                        class="w-4 h-4 mr-2"
                      />
                      Toggle {{ isDark ? 'Light' : 'Dark' }} Mode
                    </Button>
                  </div>
                </Card>

                <!-- Accessibility -->
                <Card class="p-6">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-2">
                      <Icon
                        name="accessibility"
                        class="w-5 h-5 text-primary"
                      />
                      <h3 class="font-semibold">
                        Accessibility
                      </h3>
                    </div>
                    <p class="text-sm text-text-secondary">
                      Full keyboard navigation and screen reader support.
                    </p>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                      <div class="flex items-center space-x-1 text-success">
                        <Icon
                          name="check"
                          class="w-3 h-3"
                        />
                        <span>ARIA labels</span>
                      </div>
                      <div class="flex items-center space-x-1 text-success">
                        <Icon
                          name="check"
                          class="w-3 h-3"
                        />
                        <span>Keyboard nav</span>
                      </div>
                      <div class="flex items-center space-x-1 text-success">
                        <Icon
                          name="check"
                          class="w-3 h-3"
                        />
                        <span>Focus states</span>
                      </div>
                      <div class="flex items-center space-x-1 text-success">
                        <Icon
                          name="check"
                          class="w-3 h-3"
                        />
                        <span>Color contrast</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <!-- Performance -->
                <Card class="p-6">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-2">
                      <Icon
                        name="zap"
                        class="w-5 h-5 text-primary"
                      />
                      <h3 class="font-semibold">
                        Performance
                      </h3>
                    </div>
                    <p class="text-sm text-text-secondary">
                      Optimized animations and efficient state management.
                    </p>
                    <div class="space-y-2 text-xs text-text-muted">
                      <div class="flex justify-between">
                        <span>Bundle Size:</span>
                        <span class="text-success">~8KB gzipped</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Animation Frame Rate:</span>
                        <span class="text-success">60fps</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Memory Usage:</span>
                        <span class="text-success">Minimal</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <!-- Live Demo Controls -->
              <Card class="p-6">
                <h3 class="text-xl font-semibold mb-6 text-center">
                  🎮 Interactive Demo Controls
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- NavBar Controls -->
                  <div class="space-y-4">
                    <h4 class="font-medium">
                      Navigation Bar
                    </h4>
                    <div class="space-y-2">
                      <Button
                        v-for="item in navItems"
                        :key="item.href"
                        :variant="activeNavItem === item.href ? 'default' : 'outline'"
                        size="sm"
                        class="w-full justify-start"
                        @click="activeNavItem = item.href"
                      >
                        <Icon
                          v-if="item.icon"
                          :name="item.icon"
                          class="w-4 h-4 mr-2"
                        />
                        Set {{ item.label }} Active
                      </Button>
                    </div>
                  </div>

                  <!-- Sidebar Controls -->
                  <div class="space-y-4">
                    <h4 class="font-medium">
                      Sidebar
                    </h4>
                    <div class="space-y-2">
                      <Button
                        v-for="item in flatSidebarItems"
                        :key="item.id"
                        :variant="activeSidebarItem === item.id ? 'default' : 'outline'"
                        size="sm"
                        class="w-full justify-start"
                        @click="activeSidebarItem = item.id"
                      >
                        <Icon
                          v-if="item.icon"
                          :name="item.icon"
                          class="w-4 h-4 mr-2"
                        />
                        Set {{ item.label }} Active
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import NavBar from '@/components/ui/navigation/NavBar.vue'
import Sidebar, { type SidebarItem } from '@/components/ui/navigation/NavigationSidebar.vue'
import Button from '@/components/ui/button/BaseButton.vue'
import Card from '@/components/ui/card/BaseCard.vue'
import Icon from '@/components/ui/icon/BaseIcon.vue'

// State
const isDark = ref(false)
const activeNavItem = ref('/dashboard')
const activeSidebarItem = ref('dashboard')

// Navigation items
const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: 'layout-dashboard' },
  { label: 'Projects', href: '/projects', icon: 'folder' },
  { label: 'Team', href: '/team', icon: 'users' },
  { label: 'Analytics', href: '/analytics', icon: 'bar-chart' }
]

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'layout-dashboard'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'folder',
    badge: '12',
    children: [
      {
        id: 'active-projects',
        label: 'Active Projects',
        href: '/projects/active',
        icon: 'play-circle',
        badge: '8'
      },
      {
        id: 'archived-projects',
        label: 'Archived',
        href: '/projects/archived',
        icon: 'archive',
        badge: '4'
      },
      {
        id: 'templates',
        label: 'Templates',
        href: '/projects/templates',
        icon: 'layout-template'
      }
    ]
  },
  {
    id: 'team',
    label: 'Team',
    icon: 'users',
    children: [
      {
        id: 'members',
        label: 'Members',
        href: '/team/members',
        icon: 'user',
        badge: '24'
      },
      {
        id: 'roles',
        label: 'Roles & Permissions',
        href: '/team/roles',
        icon: 'shield'
      },
      {
        id: 'invitations',
        label: 'Invitations',
        href: '/team/invitations',
        icon: 'mail',
        badge: '3'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: 'bar-chart'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    children: [
      {
        id: 'general',
        label: 'General',
        href: '/settings/general',
        icon: 'sliders'
      },
      {
        id: 'security',
        label: 'Security',
        href: '/settings/security',
        icon: 'lock'
      },
      {
        id: 'billing',
        label: 'Billing',
        href: '/settings/billing',
        icon: 'credit-card'
      },
      {
        id: 'integrations',
        label: 'Integrations',
        href: '/settings/integrations',
        icon: 'plug'
      }
    ]
  }
]

// Flatten sidebar items for demo controls
const flatSidebarItems = computed(() => {
  const flatten = (items: SidebarItem[]): SidebarItem[] => {
    return items.reduce((acc, item) => {
      acc.push(item)
      if (item.children) {
        acc.push(...flatten(item.children))
      }
      return acc
    }, [] as SidebarItem[])
  }
  return flatten(sidebarItems)
})

// Event handlers
const handleNavClick = (item: any) => {
  activeNavItem.value = item.href
  console.log('Navigation clicked:', item)
}

const handleSidebarClick = (item: SidebarItem) => {
  activeSidebarItem.value = item.id
  console.log('Sidebar clicked:', item)
}

const handleSidebarToggle = (collapsed: boolean) => {
  console.log('Sidebar collapsed:', collapsed)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  console.log('Theme toggled:', isDark.value ? 'dark' : 'light')
}
</script>