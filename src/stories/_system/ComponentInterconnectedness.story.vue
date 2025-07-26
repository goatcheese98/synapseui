<template>
  <Story title="System/Component Interconnectedness" :layout="{ type: 'single', iframe: false }">
    
    <Variant title="Magic Auto-Adaptation">
      <div class="p-8 space-y-8">
        <h2 class="text-2xl font-bold mb-4">🪄 Watch Components Adapt Automatically</h2>
        
        <!-- Demonstrate how buttons automatically adapt to card context -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Default Card -->
          <InterconnectedCard variant="default" size="md">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Buttons automatically become "primary"</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-gray-600 mb-4">
                The button below automatically adapts to this card's context.
              </p>
            </CardContent>
            <CardFooter>
              <SmartButton>Auto-Adapted Button</SmartButton>
              <SmartButton variant="secondary" class="ml-2">Manual Override</SmartButton>
            </CardFooter>
          </InterconnectedCard>

          <!-- Primary Card -->
          <InterconnectedCard variant="primary" size="md">
            <CardHeader>
              <CardTitle>Primary Card</CardTitle>
              <CardDescription>Buttons automatically become "accent"</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm mb-4">
                Notice how the button changes to complement this card.
              </p>
            </CardContent>
            <CardFooter>
              <SmartButton>Auto-Adapted Button</SmartButton>
            </CardFooter>
          </InterconnectedCard>

          <!-- Accent Card -->
          <InterconnectedCard variant="accent" size="md">
            <CardHeader>
              <CardTitle>Accent Card</CardTitle>
              <CardDescription>Buttons automatically become "primary"</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm mb-4">
                Each card suggests the best button variant for visual harmony.
              </p>
            </CardContent>
            <CardFooter>
              <SmartButton>Auto-Adapted Button</SmartButton>
            </CardFooter>
          </InterconnectedCard>

          <!-- Success Card -->
          <InterconnectedCard variant="success" size="lg">
            <CardHeader>
              <CardTitle size="lg">Success Card (Large)</CardTitle>
              <CardDescription>Notice button adapts size AND variant</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="mb-4">
                Not only does the button variant adapt, but the size matches the card size too!
              </p>
            </CardContent>
            <CardFooter>
              <SmartButton>Large Success Button</SmartButton>
            </CardFooter>
          </InterconnectedCard>

          <!-- Error Card -->
          <InterconnectedCard variant="error" size="sm">
            <CardHeader>
              <CardTitle size="sm">Error Card (Small)</CardTitle>
              <CardDescription size="xs">Everything scales down together</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm mb-3">Small card = small button automatically.</p>
            </CardContent>
            <CardFooter>
              <SmartButton>Small Error Button</SmartButton>
            </CardFooter>
          </InterconnectedCard>

          <!-- Manual Override Demo -->
          <InterconnectedCard variant="muted" size="md">
            <CardHeader>
              <CardTitle>Override Demo</CardTitle>
              <CardDescription>Auto-adaptation can be disabled</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm mb-4">
                Compare auto-adapted vs manual control:
              </p>
            </CardContent>
            <CardFooter class="flex flex-col gap-2">
              <SmartButton>Auto-Adapted</SmartButton>
              <SmartButton variant="error" :autoAdapt="false">Manual Override</SmartButton>
            </CardFooter>
          </InterconnectedCard>
        </div>

        <!-- Size Consistency Demo -->
        <div class="mt-12">
          <h3 class="text-xl font-semibold mb-4">🎯 Size Consistency Across Components</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <InterconnectedCard variant="outline" size="xs">
              <CardHeader size="xs">
                <CardTitle size="xs">XS Card</CardTitle>
              </CardHeader>
              <CardContent size="xs">
                <SmartButton size="xs">XS Button</SmartButton>
              </CardContent>
            </InterconnectedCard>

            <InterconnectedCard variant="outline" size="sm">
              <CardHeader size="sm">
                <CardTitle size="sm">SM Card</CardTitle>
              </CardHeader>
              <CardContent size="sm">
                <SmartButton size="sm">SM Button</SmartButton>
              </CardContent>
            </InterconnectedCard>

            <InterconnectedCard variant="outline" size="md">
              <CardHeader size="md">
                <CardTitle size="md">MD Card</CardTitle>
              </CardHeader>
              <CardContent size="md">
                <SmartButton size="md">MD Button</SmartButton>
              </CardContent>
            </InterconnectedCard>

            <InterconnectedCard variant="outline" size="lg">
              <CardHeader size="lg">
                <CardTitle size="lg">LG Card</CardTitle>
              </CardHeader>
              <CardContent size="lg">
                <SmartButton size="lg">LG Button</SmartButton>
              </CardContent>
            </InterconnectedCard>
          </div>
        </div>

        <!-- Philosophy Explanation -->
        <div class="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 class="text-lg font-semibold text-blue-900 mb-3">💡 The Interconnectedness Philosophy</h3>
          <div class="space-y-2 text-sm text-blue-800">
            <p><strong>Design Token Unity:</strong> All components share the same size, color, and spacing tokens.</p>
            <p><strong>Context Awareness:</strong> Child components automatically adapt to their parent's context.</p>
            <p><strong>Override Freedom:</strong> Auto-adaptation can be disabled when needed.</p>
            <p><strong>Visual Harmony:</strong> Components suggest variants that complement each other.</p>
          </div>
        </div>
      </div>
    </Variant>

  </Story>
</template>

<script setup lang="ts">
import InterconnectedCard from '@/components/ui/card/InterconnectedCard.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import SmartButton from '@/components/ui/button/SmartButton.vue'
</script>