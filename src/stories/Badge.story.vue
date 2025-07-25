<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue'
import Button from '@/components/ui/button/Button.vue'
import HStack from '@/components/ui/stack/HStack.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <Story title="Feedback/Badge" :layout="{ type: 'single', iframe: false }">
    <Variant title="Basic Variants">
      <div class="space-y-6">
        <HStack spacing="md" wrap>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="muted">Muted</Badge>
        </HStack>
      </div>
    </Variant>

    <Variant title="Different Sizes">
      <div class="space-y-6">
        <VStack spacing="md">
          <HStack spacing="md" align="center">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <Badge variant="secondary" size="sm">Small Secondary</Badge>
            <Badge variant="secondary" size="md">Medium Secondary</Badge>
            <Badge variant="secondary" size="lg">Large Secondary</Badge>
          </HStack>
        </VStack>
      </div>
    </Variant>

    <Variant title="With Icons">
      <div class="space-y-6">
        <HStack spacing="md" wrap>
          <Badge>
            <Icon icon="lucide:star" class="w-3 h-3 mr-1" />
            Featured
          </Badge>
          
          <Badge variant="success">
            <Icon icon="lucide:check" class="w-3 h-3 mr-1" />
            Verified
          </Badge>
          
          <Badge variant="warning">
            <Icon icon="lucide:alert-triangle" class="w-3 h-3 mr-1" />
            Warning
          </Badge>
          
          <Badge variant="destructive">
            <Icon icon="lucide:x" class="w-3 h-3 mr-1" />
            Error
          </Badge>
          
          <Badge variant="outline">
            <Icon icon="lucide:info" class="w-3 h-3 mr-1" />
            Info
          </Badge>
        </HStack>
      </div>
    </Variant>

    <Variant title="Status Indicators">
      <div class="space-y-6">
        <VStack spacing="md">
          <HStack spacing="md" align="center">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <Badge variant="success" size="sm">Online</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <Badge variant="warning" size="sm">Away</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
            <Badge variant="destructive" size="sm">Offline</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <div class="w-2 h-2 bg-gray-500 rounded-full"></div>
            <Badge variant="muted" size="sm">Unknown</Badge>
          </HStack>
        </VStack>
      </div>
    </Variant>

    <Variant title="Notification Badges">
      <div class="space-y-6">
        <HStack spacing="lg" justify="center">
          <div class="relative">
            <Button variant="ghost" size="icon">
              <Icon icon="lucide:bell" class="h-4 w-4" />
            </Button>
            <Badge class="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5">
              3
            </Badge>
          </div>
          
          <div class="relative">
            <Button variant="ghost" size="icon">
              <Icon icon="lucide:mail" class="h-4 w-4" />
            </Button>
            <Badge variant="destructive" class="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5">
              12
            </Badge>
          </div>
          
          <div class="relative">
            <Button variant="ghost" size="icon">
              <Icon icon="lucide:shopping-cart" class="h-4 w-4" />
            </Button>
            <Badge variant="success" class="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5">
              99+
            </Badge>
          </div>
        </HStack>
      </div>
    </Variant>

    <Variant title="Category Tags">
      <div class="space-y-6">
        <VStack spacing="md">
          <div>
            <h3 class="text-sm font-medium mb-2">Technologies</h3>
            <HStack spacing="sm" wrap>
              <Badge variant="outline">Vue.js</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="outline">Vite</Badge>
              <Badge variant="outline">Pinia</Badge>
            </HStack>
          </div>
          
          <div>
            <h3 class="text-sm font-medium mb-2">Skills</h3>
            <HStack spacing="sm" wrap>
              <Badge>Frontend</Badge>
              <Badge>UI/UX</Badge>
              <Badge>Responsive Design</Badge>
              <Badge>Component Library</Badge>
            </HStack>
          </div>
        </VStack>
      </div>
    </Variant>

    <Variant title="Priority Levels">
      <div class="space-y-6">
        <VStack spacing="md">
          <HStack spacing="md" align="center">
            <span class="text-sm w-20">Critical:</span>
            <Badge variant="destructive">High Priority</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <span class="text-sm w-20">Important:</span>
            <Badge variant="warning">Medium Priority</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <span class="text-sm w-20">Normal:</span>
            <Badge variant="secondary">Low Priority</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <span class="text-sm w-20">Info:</span>
            <Badge variant="muted">No Priority</Badge>
          </HStack>
        </VStack>
      </div>
    </Variant>

    <Variant title="Interactive Example">
      <div class="space-y-6">
        <div class="border rounded-lg p-4 bg-card max-w-md">
          <VStack spacing="md">
            <HStack align="between">
              <h3 class="font-semibold">Project Dashboard</h3>
              <Badge variant="success">Active</Badge>
            </HStack>
            
            <div class="space-y-2 text-sm">
              <HStack align="between">
                <span>Tasks completed</span>
                <Badge size="sm">24/30</Badge>
              </HStack>
              
              <HStack align="between">
                <span>Team members</span>
                <Badge variant="secondary" size="sm">8</Badge>
              </HStack>
              
              <HStack align="between">
                <span>Deadline</span>
                <Badge variant="warning" size="sm">3 days</Badge>
              </HStack>
            </div>
            
            <HStack spacing="sm">
              <Badge variant="outline" size="sm">Design</Badge>
              <Badge variant="outline" size="sm">Development</Badge>
              <Badge variant="outline" size="sm">Testing</Badge>
            </HStack>
          </VStack>
        </div>
      </div>
    </Variant>

    <Variant title="User Roles">
      <div class="space-y-6">
        <VStack spacing="md">
          <HStack spacing="md" align="center">
            <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium">
              JD
            </div>
            <span class="text-sm">John Doe</span>
            <Badge variant="destructive" size="sm">Admin</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <div class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center text-xs font-medium">
              SM
            </div>
            <span class="text-sm">Sarah Miller</span>
            <Badge size="sm">Editor</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <div class="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-xs font-medium">
              MB
            </div>
            <span class="text-sm">Mike Brown</span>
            <Badge variant="secondary" size="sm">Viewer</Badge>
          </HStack>
          
          <HStack spacing="md" align="center">
            <div class="w-8 h-8 bg-muted/20 rounded-full flex items-center justify-center text-xs font-medium">
              AL
            </div>
            <span class="text-sm">Alice Lee</span>
            <Badge variant="muted" size="sm">Guest</Badge>
          </HStack>
        </VStack>
      </div>
    </Variant>
  </Story>
</template>