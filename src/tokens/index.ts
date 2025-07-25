/**
 * Design Tokens - Main Export
 * Provides easy access to all design tokens and theme functionality
 */

// Export all base tokens
export * from './base-tokens'

// Export all themes and theme utilities
export * from './themes'

// Export theme composable
export { useTheme, provideTheme } from '@/composables/useTheme'

// Export theme provider component
export { default as ThemeProvider } from '@/components/ThemeProvider.vue'

// Re-export for convenience
export { spacing, typography, borderRadius, shadows, animation } from './base-tokens'
export { themes, lightTheme, darkTheme, brandTheme } from './themes'