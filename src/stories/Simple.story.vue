<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useDockStore } from '@/lib/stores/useDockStore'
import { ref } from 'vue'

const clickCount = ref(0)
const store = useDockStore()

function handleClick() {
  clickCount.value++
}
</script>

<template>
  <Story title="Components/Simple Demo">
    <Variant title="Button Demo">
      <div class="p-8 space-y-4">
        <h2 class="text-xl font-bold">Synapse UI Components</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold mb-2">Button Variants</h3>
            <div class="flex gap-2 flex-wrap">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">Button Sizes</h3>
            <div class="flex gap-2 items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔥</Button>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">Interactive Demo</h3>
            <Button @click="handleClick" variant="outline" class="mr-2">
              Clicked {{ clickCount }} times
            </Button>
            <Button @click="clickCount = 0" variant="ghost" size="sm">
              Reset
            </Button>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">Store Demo</h3>
            <div class="text-sm space-y-2">
              <p>Dock visible: {{ store.isVisible }}</p>
              <p>Panel count: {{ store.panels.length }}</p>
              <div class="space-x-2">
                <Button @click="store.toggleVisibility" size="sm">
                  Toggle Dock
                </Button>
                <Button @click="store.addPanel({ id: `panel-${Date.now()}`, title: 'New Panel' })" size="sm">
                  Add Panel
                </Button>
                <Button @click="store.reset" size="sm" variant="outline">
                  Reset Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>