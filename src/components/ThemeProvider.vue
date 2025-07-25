<!--
  Theme Provider Component
  Wrap your app with this to enable theming
-->

<template>
  <div 
    class="theme-provider"
    :class="themeClasses"
    :data-theme="currentTheme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { provideTheme } from '@/composables/useTheme'
import type { ThemeName } from '@/tokens/themes'

interface Props {
  theme?: ThemeName
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light',
})

// Provide theme context to all child components
const { currentTheme, theme, setTheme } = provideTheme(props.theme)

// Dynamic classes based on current theme
const themeClasses = computed(() => [
  `theme-${currentTheme.value}`,
  props.class,
  // Apply theme-specific background
  'min-h-screen transition-colors duration-200',
])

// Update theme when prop changes
watch(() => props.theme, (newTheme) => {
  if (newTheme) {
    setTheme(newTheme)
  }
})
</script>

<style>
.theme-provider {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

/* Theme-specific classes for components that need them */
.theme-light {
  color-scheme: light;
}

.theme-dark {
  color-scheme: dark;
}

.theme-brand {
  color-scheme: light;
}
</style>