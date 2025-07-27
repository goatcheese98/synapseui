<script setup lang="ts">
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

const state = reactive({
  openDelay: 700,
  closeDelay: 300
})
</script>

<template>
  <Story
    title="Components/Hover Card"
    :layout="{ type: 'single', iframe: false }"
  >
    <template #controls>
      <HstNumber
        v-model="state.openDelay"
        title="Open Delay (ms)"
      />
      <HstNumber
        v-model="state.closeDelay"
        title="Close Delay (ms)"
      />
    </template>

    <Variant title="Basic Usage">
      <div class="flex items-center justify-center p-8">
        <HoverCard 
          :open-delay="state.openDelay"
          :close-delay="state.closeDelay"
        >
          <HoverCardTrigger>
            <span class="text-blue-600 hover:text-blue-800">@rekaui</span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div class="flex space-x-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Icon
                  icon="lucide:user"
                  class="h-6 w-6 text-blue-600"
                />
              </div>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">
                  @rekaui
                </h4>
                <p class="text-sm text-muted-foreground">
                  Unstyled, accessible components for Vue.
                </p>
                <div class="flex items-center pt-2">
                  <Icon
                    icon="lucide:calendar-days"
                    class="mr-2 h-4 w-4 opacity-70"
                  />
                  <span class="text-xs text-muted-foreground">
                    Joined December 2023
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </Variant>

    <Variant title="Profile Card">
      <div class="flex items-center justify-center p-8">
        <div class="max-w-md space-y-4">
          <p class="text-sm text-gray-600">
            Follow 
            <HoverCard
              :open-delay="300"
              :close-delay="200"
            >
              <HoverCardTrigger>
                <span class="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                  @johndoe
                </span>
              </HoverCardTrigger>
              <HoverCardContent side="top">
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-400 text-white font-semibold">
                      JD
                    </div>
                    <div>
                      <div class="font-medium">
                        John Doe
                      </div>
                      <div class="text-sm text-muted-foreground">
                        @johndoe
                      </div>
                    </div>
                  </div>
                  <p class="text-sm">
                    Senior Frontend Developer passionate about building accessible web experiences.
                  </p>
                  <div class="flex space-x-4 text-sm">
                    <div class="flex items-center">
                      <Icon
                        icon="lucide:users"
                        class="mr-1 h-3 w-3"
                      />
                      <span class="font-medium">1.2k</span>
                      <span class="text-muted-foreground ml-1">followers</span>
                    </div>
                    <div class="flex items-center">
                      <Icon
                        icon="lucide:user-plus"
                        class="mr-1 h-3 w-3"
                      />
                      <span class="font-medium">324</span>
                      <span class="text-muted-foreground ml-1">following</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            for the latest updates on Vue development.
          </p>
        </div>
      </div>
    </Variant>

    <Variant title="Product Info">
      <div class="flex items-center justify-center p-8">
        <div class="max-w-lg space-y-4">
          <p class="text-sm">
            Our design system is built with 
            <HoverCard>
              <HoverCardTrigger>
                <span class="font-medium text-green-600 hover:text-green-800 cursor-pointer border-b border-green-200 hover:border-green-400">
                  Synapse UI
                </span>
              </HoverCardTrigger>
              <HoverCardContent class="w-80">
                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-blue-500">
                      <Icon
                        icon="lucide:layers"
                        class="h-6 w-6 text-white"
                      />
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold">
                        Synapse UI
                      </h4>
                      <p class="text-sm text-muted-foreground">
                        A comprehensive component library for Vue 3 applications
                      </p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-muted-foreground">Components</span>
                      <span class="font-medium">50+</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-muted-foreground">Bundle size</span>
                      <span class="font-medium">~12kb gzipped</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-muted-foreground">TypeScript</span>
                      <Icon
                        icon="lucide:check"
                        class="h-4 w-4 text-green-500"
                      />
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            components that provide a consistent and accessible user experience.
          </p>
        </div>
      </div>
    </Variant>

    <Variant title="Interactive Elements">
      <div class="flex items-center justify-center p-8">
        <div class="space-y-6">
          <div class="flex space-x-4">
            <HoverCard>
              <HoverCardTrigger>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Hover for Info
                </button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div class="space-y-2">
                  <h4 class="font-medium">
                    Action Button
                  </h4>
                  <p class="text-sm text-muted-foreground">
                    This button triggers a primary action in the interface.
                  </p>
                  <div class="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon
                      icon="lucide:info"
                      class="h-3 w-3"
                    />
                    <span>Click to proceed</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <div class="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                  <Icon
                    icon="lucide:tag"
                    class="h-3 w-3"
                  />
                  <span>Vue.js</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div class="space-y-2">
                  <h4 class="font-medium">
                    Vue.js Framework
                  </h4>
                  <p class="text-sm text-muted-foreground">
                    The Progressive JavaScript Framework for building user interfaces.
                  </p>
                  <div class="flex items-center space-x-4 text-xs">
                    <div class="flex items-center space-x-1">
                      <div class="w-2 h-2 bg-green-500 rounded-full" />
                      <span>v3.4.0</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <Icon
                        icon="lucide:star"
                        class="h-3 w-3"
                      />
                      <span>200k+ stars</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}
</style>