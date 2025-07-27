<script setup lang="ts">
import { ref } from 'vue'
import ThemeProvider from '@/components/ThemeProvider.vue'
import Button from '@/components/ui/button/BaseButton.vue'
import Card from '@/components/ui/card/BaseCard.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import Badge from '@/components/ui/badge/BaseBadge.vue'
import VStack from '@/components/ui/stack/VStack.vue'
import HStack from '@/components/ui/stack/HStack.vue'
import type { ThemeName } from '@/tokens/themes'

const currentTheme = ref<ThemeName>('light')

const themes: { name: ThemeName; label: string; description: string }[] = [
  { name: 'light', label: 'Light Theme', description: 'Clean and modern light theme' },
  { name: 'dark', label: 'Dark Theme', description: 'Easy on the eyes dark theme' },
  { name: 'brand', label: 'Brand Theme', description: 'Custom purple brand theme' },
]
</script>

<template>
  <Story
    title="Design System/Theme Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Multi-Theme System">
      <div class="space-y-8">
        <!-- Theme Selector -->
        <div class="p-6 border rounded-lg bg-gray-50">
          <h3 class="text-lg font-semibold mb-4">
            Theme Selector
          </h3>
          <HStack spacing="sm">
            <Button 
              v-for="theme in themes" 
              :key="theme.name"
              :variant="currentTheme === theme.name ? 'primary' : 'outline'"
              @click="currentTheme = theme.name"
            >
              {{ theme.label }}
            </Button>
          </HStack>
        </div>

        <!-- Themed Component Demo -->
        <ThemeProvider :theme="currentTheme">
          <div class="p-8 rounded-lg border-2 border-dashed border-gray-300">
            <VStack spacing="lg">
              <div class="text-center">
                <h2 class="text-2xl font-bold mb-2">
                  {{ themes.find(t => t.name === currentTheme)?.label }}
                </h2>
                <p class="opacity-70">
                  {{ themes.find(t => t.name === currentTheme)?.description }}
                </p>
              </div>

              <!-- Button Variants -->
              <div>
                <h3 class="text-lg font-semibold mb-4">
                  Button Variants
                </h3>
                <HStack spacing="sm">
                  <Button variant="primary">
                    Primary
                  </Button>
                  <Button variant="secondary">
                    Secondary
                  </Button>
                  <Button variant="success">
                    Success
                  </Button>
                  <Button variant="warning">
                    Warning
                  </Button>
                  <Button variant="error">
                    Error
                  </Button>
                  <Button variant="outline">
                    Outline
                  </Button>
                  <Button variant="ghost">
                    Ghost
                  </Button>
                </HStack>
              </div>

              <!-- Card Example -->
              <div>
                <h3 class="text-lg font-semibold mb-4">
                  Card Component
                </h3>
                <div class="max-w-md">
                  <Card>
                    <CardHeader>
                      <CardTitle>Design Tokens in Action</CardTitle>
                      <CardDescription>
                        This card automatically adapts to the current theme using design tokens.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VStack spacing="sm">
                        <HStack align="between">
                          <span>Current Theme:</span>
                          <Badge>{{ currentTheme }}</Badge>
                        </HStack>
                        <HStack align="between">
                          <span>Using Tokens:</span>
                          <Badge>CSS Variables</Badge>
                        </HStack>
                        <HStack align="between">
                          <span>Responsive:</span>
                          <Badge>Yes</Badge>
                        </HStack>
                      </VStack>
                    </CardContent>
                    <CardFooter>
                      <Button class="w-full">
                        Themed Action Button
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              <!-- Color Swatches -->
              <div>
                <h3 class="text-lg font-semibold mb-4">
                  Theme Colors
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="text-center">
                    <div
                      class="w-16 h-16 rounded-lg mx-auto mb-2"
                      style="background: var(--primary-bg, #0ea5e9)"
                    />
                    <p class="text-sm">
                      Primary
                    </p>
                  </div>
                  <div class="text-center">
                    <div
                      class="w-16 h-16 rounded-lg mx-auto mb-2"
                      style="background: var(--secondary-bg, #f1f5f9)"
                    />
                    <p class="text-sm">
                      Secondary
                    </p>
                  </div>
                  <div class="text-center">
                    <div
                      class="w-16 h-16 rounded-lg mx-auto mb-2"
                      style="background: var(--success-bg, #22c55e)"
                    />
                    <p class="text-sm">
                      Success
                    </p>
                  </div>
                  <div class="text-center">
                    <div
                      class="w-16 h-16 rounded-lg mx-auto mb-2"
                      style="background: var(--error-bg, #ef4444)"
                    />
                    <p class="text-sm">
                      Error
                    </p>
                  </div>
                </div>
              </div>
            </VStack>
          </div>
        </ThemeProvider>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
/* Fallback styles for when CSS custom properties aren't loaded yet */
.theme-fallback {
  background-color: #f8fafc;
  color: #0f172a;
}
</style>