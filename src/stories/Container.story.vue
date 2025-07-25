<script setup lang="ts">
import Container from '@/components/ui/container/Container.vue'
</script>

<template>
  <Story title="Layout/Container" :layout="{ type: 'single', iframe: false }">
    <Variant title="Different Sizes">
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium mb-2">Small (max-w-screen-sm)</h3>
          <Container size="sm" class="bg-accent/20 border rounded-lg py-4">
            <p class="text-sm">This is a small container with responsive max-width.</p>
          </Container>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Medium (max-w-screen-md)</h3>
          <Container size="md" class="bg-accent/20 border rounded-lg py-4">
            <p class="text-sm">This is a medium container with responsive max-width.</p>
          </Container>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Large (max-w-screen-lg) - Default</h3>
          <Container size="lg" class="bg-accent/20 border rounded-lg py-4">
            <p class="text-sm">This is a large container with responsive max-width.</p>
          </Container>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Extra Large (max-w-screen-xl)</h3>
          <Container size="xl" class="bg-accent/20 border rounded-lg py-4">
            <p class="text-sm">This is an extra large container with responsive max-width.</p>
          </Container>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">2X Large (max-w-screen-2xl)</h3>
          <Container size="2xl" class="bg-accent/20 border rounded-lg py-4">
            <p class="text-sm">This is a 2xl container with responsive max-width.</p>
          </Container>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Full Width (max-w-none)</h3>
          <Container size="full" class="bg-accent/20 border rounded-lg py-4">
            <p class="text-sm">This is a full-width container that takes the entire available width.</p>
          </Container>
        </div>
      </div>
    </Variant>

    <Variant title="With and Without Padding">
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium mb-2">With Padding (Default)</h3>
          <Container class="bg-accent/20 border rounded-lg py-4">
            <div class="bg-primary/10 rounded p-2">
              <p class="text-sm">Content with automatic horizontal padding</p>
            </div>
          </Container>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Without Padding</h3>
          <Container :padding="false" class="bg-accent/20 border rounded-lg py-4">
            <div class="bg-primary/10 rounded p-2">
              <p class="text-sm">Content without horizontal padding - extends to edges</p>
            </div>
          </Container>
        </div>
      </div>
    </Variant>

    <Variant title="Nested Content Example">
      <Container class="bg-background border rounded-lg">
        <div class="py-8">
          <h1 class="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
          <p class="text-muted-foreground mb-6">
            This is an example of content inside a container. The container provides consistent
            max-width and horizontal padding across different screen sizes.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-card border rounded-lg p-4">
              <h3 class="font-semibold mb-2">Feature 1</h3>
              <p class="text-sm text-muted-foreground">Description of the first feature.</p>
            </div>
            <div class="bg-card border rounded-lg p-4">
              <h3 class="font-semibold mb-2">Feature 2</h3>
              <p class="text-sm text-muted-foreground">Description of the second feature.</p>
            </div>
            <div class="bg-card border rounded-lg p-4">
              <h3 class="font-semibold mb-2">Feature 3</h3>
              <p class="text-sm text-muted-foreground">Description of the third feature.</p>
            </div>
          </div>
        </div>
      </Container>
    </Variant>

    <Variant title="Responsive Behavior">
      <div class="space-y-4">
        <p class="text-sm text-muted-foreground">
          Resize your browser window to see how containers adapt to different screen sizes.
          Each container size has specific breakpoints:
        </p>
        
        <div class="space-y-4 text-xs">
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-red-200 rounded"></div>
            <span><strong>sm:</strong> max-width: 640px</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-orange-200 rounded"></div>
            <span><strong>md:</strong> max-width: 768px</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-yellow-200 rounded"></div>
            <span><strong>lg:</strong> max-width: 1024px</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-green-200 rounded"></div>
            <span><strong>xl:</strong> max-width: 1280px</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-blue-200 rounded"></div>
            <span><strong>2xl:</strong> max-width: 1536px</span>
          </div>
        </div>

        <Container size="md" class="bg-gradient-to-r from-blue-50 to-purple-50 border rounded-lg py-8">
          <div class="text-center">
            <h2 class="text-xl font-bold mb-2">Medium Container</h2>
            <p class="text-muted-foreground">
              This container will never exceed 768px width and centers itself on larger screens.
            </p>
          </div>
        </Container>
      </div>
    </Variant>
  </Story>
</template>