<script setup lang="ts">
import Stack from '@/components/ui/stack/Stack.vue'
import HStack from '@/components/ui/stack/HStack.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import Button from '@/components/ui/button/Button.vue'

const sampleItems = [
  { id: 1, text: 'Item 1', color: 'bg-red-100 text-red-800' },
  { id: 2, text: 'Item 2', color: 'bg-blue-100 text-blue-800' },
  { id: 3, text: 'Item 3', color: 'bg-green-100 text-green-800' },
  { id: 4, text: 'Item 4', color: 'bg-yellow-100 text-yellow-800' }
]
</script>

<template>
  <Story title="Layout/Stack" :layout="{ type: 'single', iframe: false }">
    <Variant title="Basic Vertical Stack (VStack)">
      <div class="space-y-6">
        <VStack>
          <div v-for="item in sampleItems" :key="item.id" 
               :class="`p-3 rounded ${item.color} text-center`">
            {{ item.text }}
          </div>
        </VStack>
      </div>
    </Variant>

    <Variant title="Basic Horizontal Stack (HStack)">
      <div class="space-y-6">
        <HStack>
          <div v-for="item in sampleItems" :key="item.id" 
               :class="`p-3 rounded ${item.color} text-center flex-1`">
            {{ item.text }}
          </div>
        </HStack>
      </div>
    </Variant>

    <Variant title="Different Spacing">
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium mb-2">Extra Small (xs)</h3>
          <HStack spacing="xs">
            <Button size="sm">Button 1</Button>
            <Button size="sm">Button 2</Button>
            <Button size="sm">Button 3</Button>
          </HStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Small (sm)</h3>
          <HStack spacing="sm">
            <Button size="sm">Button 1</Button>
            <Button size="sm">Button 2</Button>
            <Button size="sm">Button 3</Button>
          </HStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Medium (md) - Default</h3>
          <HStack spacing="md">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </HStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Large (lg)</h3>
          <HStack spacing="lg">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </HStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Extra Large (xl)</h3>
          <HStack spacing="xl">
            <Button>Button 1</Button>
            <Button>Button 2</Button>
            <Button>Button 3</Button>
          </HStack>
        </div>
      </div>
    </Variant>

    <Variant title="Alignment Options">
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium mb-2">Horizontal - Justify Center</h3>
          <HStack justify="center" class="border rounded-lg p-4">
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </HStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Horizontal - Align Between</h3>
          <HStack align="between" class="border rounded-lg p-4">
            <Button variant="outline">Left</Button>
            <Button>Center</Button>
            <Button variant="destructive">Right</Button>
          </HStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Vertical - Align Center</h3>
          <VStack align="center" class="border rounded-lg p-4">
            <div class="w-24 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">Wide</div>
            <div class="w-12 h-8 bg-secondary/20 rounded flex items-center justify-center text-xs">Small</div>
            <div class="w-32 h-8 bg-accent/20 rounded flex items-center justify-center text-xs">Very Wide</div>
          </VStack>
        </div>
      </div>
    </Variant>

    <Variant title="Direction Variants">
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium mb-2">Horizontal Reverse</h3>
          <Stack direction="horizontal-reverse" class="border rounded-lg p-4">
            <div class="p-2 bg-red-100 rounded text-center text-sm">First</div>
            <div class="p-2 bg-blue-100 rounded text-center text-sm">Second</div>
            <div class="p-2 bg-green-100 rounded text-center text-sm">Third</div>
          </Stack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Vertical Reverse</h3>
          <Stack direction="vertical-reverse" class="border rounded-lg p-4">
            <div class="p-2 bg-red-100 rounded text-center text-sm">First</div>
            <div class="p-2 bg-blue-100 rounded text-center text-sm">Second</div>
            <div class="p-2 bg-green-100 rounded text-center text-sm">Third</div>
          </Stack>
        </div>
      </div>
    </Variant>

    <Variant title="Wrapping Behavior">
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-medium mb-2">No Wrap (Default)</h3>
          <HStack class="border rounded-lg p-4 w-64">
            <Button class="flex-shrink-0">Button 1</Button>
            <Button class="flex-shrink-0">Button 2</Button>
            <Button class="flex-shrink-0">Button 3</Button>
            <Button class="flex-shrink-0">Button 4</Button>
            <Button class="flex-shrink-0">Button 5</Button>
          </HStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">With Wrap</h3>
          <HStack wrap class="border rounded-lg p-4 w-64">
            <Button class="flex-shrink-0">Button 1</Button>
            <Button class="flex-shrink-0">Button 2</Button>
            <Button class="flex-shrink-0">Button 3</Button>
            <Button class="flex-shrink-0">Button 4</Button>
            <Button class="flex-shrink-0">Button 5</Button>
          </HStack>
        </div>
      </div>
    </Variant>

    <Variant title="Real-world Examples">
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium mb-4">Form Actions</h3>
          <div class="border rounded-lg p-6 bg-card">
            <VStack spacing="lg">
              <div>
                <label class="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" class="w-full px-3 py-2 border rounded-md" placeholder="john@example.com" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Password</label>
                <input type="password" class="w-full px-3 py-2 border rounded-md" placeholder="••••••••" />
              </div>
              <HStack align="between" class="pt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Sign In</Button>
              </HStack>
            </VStack>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-4">Navigation Bar</h3>
          <HStack align="between" justify="center" class="border rounded-lg p-4 bg-card">
            <div class="font-bold text-lg">Logo</div>
            <HStack>
              <Button variant="ghost" size="sm">Home</Button>
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </HStack>
            <Button size="sm">Sign Up</Button>
          </HStack>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-4">Card Layout</h3>
          <VStack class="border rounded-lg p-6 bg-card max-w-sm">
            <div class="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
            <VStack spacing="sm" align="start">
              <h4 class="font-semibold text-lg">Card Title</h4>
              <p class="text-muted-foreground text-sm">This is a description of the card content that explains what this item is about.</p>
            </VStack>
            <HStack align="between" class="w-full pt-2">
              <span class="text-sm text-muted-foreground">$99</span>
              <Button size="sm">Add to Cart</Button>
            </HStack>
          </VStack>
        </div>
      </div>
    </Variant>
  </Story>
</template>