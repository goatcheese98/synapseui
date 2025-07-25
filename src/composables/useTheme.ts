/**
 * Theme Composable
 * Provides theme functionality throughout the component library
 */

import { inject, provide, ref, computed, watch, type InjectionKey, type Ref } from 'vue'
import { themes, type ThemeName, type Theme } from '@/tokens/themes'
import { spacing, typography, borderRadius, shadows, animation } from '@/tokens/base-tokens'

// Theme context
interface ThemeContext {
  currentTheme: Ref<ThemeName>
  theme: Ref<Theme>
  setTheme: (themeName: ThemeName) => void
  toggleTheme: () => void
  spacing: typeof spacing
  typography: typeof typography
  borderRadius: typeof borderRadius
  shadows: typeof shadows
  animation: typeof animation
}

// Injection key
export const THEME_INJECTION_KEY: InjectionKey<ThemeContext> = Symbol('theme')

/**
 * Theme Provider Composable
 * Use this in your app root to provide theme context
 */
export function provideTheme(initialTheme: ThemeName = 'light') {
  const currentTheme = ref<ThemeName>(initialTheme)
  
  const theme = computed(() => themes[currentTheme.value])
  
  const setTheme = (themeName: ThemeName) => {
    currentTheme.value = themeName
    updateCSSCustomProperties(themes[themeName])
  }
  
  const toggleTheme = () => {
    const themeNames = Object.keys(themes) as ThemeName[]
    const currentIndex = themeNames.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themeNames.length
    setTheme(themeNames[nextIndex])
  }
  
  // Update CSS custom properties when theme changes
  watch(theme, (newTheme) => {
    updateCSSCustomProperties(newTheme)
  }, { immediate: true })
  
  const themeContext: ThemeContext = {
    currentTheme,
    theme,
    setTheme,
    toggleTheme,
    spacing,
    typography,
    borderRadius,
    shadows,
    animation,
  }
  
  provide(THEME_INJECTION_KEY, themeContext)
  
  return themeContext
}

/**
 * Theme Consumer Composable
 * Use this in components to access the current theme
 */
export function useTheme() {
  const themeContext = inject(THEME_INJECTION_KEY)
  
  if (!themeContext) {
    throw new Error('useTheme must be used within a theme provider')
  }
  
  return themeContext
}

/**
 * Update CSS Custom Properties
 * This allows components to use CSS variables for theming
 */
function updateCSSCustomProperties(theme: Theme) {
  const root = document.documentElement
  
  // Background colors
  root.style.setProperty('--bg-primary', theme.background.primary)
  root.style.setProperty('--bg-secondary', theme.background.secondary)
  root.style.setProperty('--bg-muted', theme.background.muted)
  root.style.setProperty('--bg-accent', theme.background.accent)
  
  // Text colors
  root.style.setProperty('--text-primary', theme.text.primary)
  root.style.setProperty('--text-secondary', theme.text.secondary)
  root.style.setProperty('--text-muted', theme.text.muted)
  root.style.setProperty('--text-inverse', theme.text.inverse)
  
  // Border colors
  root.style.setProperty('--border-primary', theme.border.primary)
  root.style.setProperty('--border-secondary', theme.border.secondary)
  root.style.setProperty('--border-muted', theme.border.muted)
  root.style.setProperty('--border-default', theme.border.primary) // Tailwind expects --border-default
  
  // Component colors
  Object.entries(theme.component).forEach(([variant, colors]) => {
    root.style.setProperty(`--${variant}-bg`, colors.bg)
    root.style.setProperty(`--${variant}-text`, colors.text)
    root.style.setProperty(`--${variant}-border`, colors.border)
    root.style.setProperty(`--${variant}-hover`, colors.hover)
  })
  
  // Base tokens
  // Spacing tokens
  Object.entries(spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value)
  })
  
  // Border radius tokens
  Object.entries(borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value)
  })
  
  // Typography tokens
  Object.entries(typography.fontFamily).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value.join(', '))
  })
  
  Object.entries(typography.fontSize).forEach(([key, [size, { lineHeight }]]) => {
    root.style.setProperty(`--text-${key}`, size)
    root.style.setProperty(`--leading-${key}`, lineHeight)
  })
  
  // Shadow tokens
  Object.entries(shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value)
  })
  
  // Animation tokens
  Object.entries(animation.duration).forEach(([key, value]) => {
    root.style.setProperty(`--duration-${key}`, value)
  })
  
  Object.entries(animation.easing).forEach(([key, value]) => {
    root.style.setProperty(`--easing-${key}`, value)
  })
}