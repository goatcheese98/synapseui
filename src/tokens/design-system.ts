/**
 * Unified Design System
 * Connects all components through shared semantic tokens
 */

import { spacing, typography, borderRadius, shadows } from './base-tokens'

// Semantic size system - used across ALL components
export const sizes = {
  xs: {
    spacing: spacing.xs,
    fontSize: typography.fontSize.xs,
    borderRadius: borderRadius.sm,
    shadow: shadows.sm,
  },
  sm: {
    spacing: spacing.sm,
    fontSize: typography.fontSize.sm,
    borderRadius: borderRadius.md,
    shadow: shadows.sm,
  },
  md: {
    spacing: spacing.md,
    fontSize: typography.fontSize.base,
    borderRadius: borderRadius.lg,
    shadow: shadows.md,
  },
  lg: {
    spacing: spacing.lg,
    fontSize: typography.fontSize.lg,
    borderRadius: borderRadius.xl,
    shadow: shadows.lg,
  },
  xl: {
    spacing: spacing.xl,
    fontSize: typography.fontSize.xl,
    borderRadius: borderRadius['2xl'],
    shadow: shadows.xl,
  }
} as const

// Semantic color intents - consistent across components
export const colorIntents = {
  neutral: {
    50: 'rgb(248 250 252)',
    100: 'rgb(241 245 249)', 
    500: 'rgb(100 116 139)',
    600: 'rgb(71 85 105)',
    700: 'rgb(51 65 85)',
    900: 'rgb(15 23 42)',
    950: 'rgb(2 6 23)'
  },
  primary: {
    50: 'rgb(248 250 252)',
    100: 'rgb(241 245 249)',
    500: 'rgb(100 116 139)',
    600: 'rgb(71 85 105)', 
    700: 'rgb(51 65 85)',
    800: 'rgb(30 41 59)',
    900: 'rgb(15 23 42)'
  },
  secondary: {
    50: 'rgb(238 242 255)',
    100: 'rgb(224 231 255)',
    500: 'rgb(99 102 241)',
    600: 'rgb(79 70 229)',
    700: 'rgb(67 56 202)',
    800: 'rgb(55 48 163)'
  },
  accent: {
    50: 'rgb(255 247 237)',
    100: 'rgb(255 237 213)',
    500: 'rgb(249 115 22)',
    600: 'rgb(234 88 12)',
    700: 'rgb(194 65 12)'
  },
  success: {
    50: 'rgb(240 253 244)',
    100: 'rgb(220 252 231)',
    600: 'rgb(22 163 74)',
    700: 'rgb(21 128 61)',
    800: 'rgb(22 101 52)'
  },
  warning: {
    50: 'rgb(255 251 235)',
    100: 'rgb(254 243 199)',
    500: 'rgb(245 158 11)',
    600: 'rgb(217 119 6)'
  },
  error: {
    50: 'rgb(254 242 242)',
    100: 'rgb(254 226 226)',
    600: 'rgb(220 38 38)',
    700: 'rgb(185 28 28)'
  }
} as const

// Component connection system
export const componentScale = {
  // Maps component size to actual values
  button: {
    xs: { height: '1.75rem', padding: `0 ${spacing.sm}`, ...sizes.xs },
    sm: { height: '2.25rem', padding: `0 ${spacing.md}`, ...sizes.sm },
    md: { height: '2.5rem', padding: `0 ${spacing.lg}`, ...sizes.md },
    lg: { height: '3rem', padding: `0 ${spacing.xl}`, ...sizes.lg },
    xl: { height: '3.5rem', padding: `0 ${spacing['2xl']}`, ...sizes.xl }
  },
  card: {
    xs: { padding: spacing.sm, gap: spacing.xs, ...sizes.xs },
    sm: { padding: spacing.md, gap: spacing.sm, ...sizes.sm },
    md: { padding: spacing.lg, gap: spacing.md, ...sizes.md },
    lg: { padding: spacing.xl, gap: spacing.lg, ...sizes.lg },
    xl: { padding: spacing['2xl'], gap: spacing.xl, ...sizes.xl }
  },
  input: {
    xs: { height: '1.75rem', padding: `0 ${spacing.sm}`, ...sizes.xs },
    sm: { height: '2.25rem', padding: `0 ${spacing.md}`, ...sizes.sm },
    md: { height: '2.5rem', padding: `0 ${spacing.lg}`, ...sizes.md },
    lg: { height: '3rem', padding: `0 ${spacing.xl}`, ...sizes.lg },
    xl: { height: '3.5rem', padding: `0 ${spacing['2xl']}`, ...sizes.xl }
  }
} as const

// Interaction states - shared across all interactive components
export const interactionStates = {
  default: 'transition-all duration-200 ease-out',
  hover: 'hover:scale-105 hover:shadow-md',
  active: 'active:scale-95',
  focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  disabled: 'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'
} as const

// Variant system - how components relate to each other
export const variantRelationships = {
  // When card is "primary", what should buttons inside be?
  card: {
    default: { preferredButton: 'primary', preferredText: 'neutral' },
    primary: { preferredButton: 'accent', preferredText: 'primary' },
    secondary: { preferredButton: 'primary', preferredText: 'secondary' },
    accent: { preferredButton: 'primary', preferredText: 'accent' },
    muted: { preferredButton: 'neutral', preferredText: 'neutral' }
  },
  // When form is in "error" state, what should inputs be?
  form: {
    default: { preferredInput: 'default', preferredButton: 'primary' },
    success: { preferredInput: 'success', preferredButton: 'success' },
    error: { preferredInput: 'error', preferredButton: 'error' },
    warning: { preferredInput: 'warning', preferredButton: 'warning' }
  }
} as const

export type Size = keyof typeof sizes
export type ColorIntent = keyof typeof colorIntents
export type ComponentType = keyof typeof componentScale

// Helper to get consistent sizing across components
export function getComponentSize(component: ComponentType, size: Size) {
  return componentScale[component][size]
}

// Helper to get related variants
export function getPreferredVariant(
  parentComponent: keyof typeof variantRelationships, 
  parentVariant: string, 
  childComponent: string
): string | undefined {
  const componentRelationships = variantRelationships[parentComponent]
  if (!componentRelationships) return undefined
  
  const relationship = componentRelationships[parentVariant as keyof typeof componentRelationships]
  if (!relationship) return undefined
  
  const key = `preferred${childComponent.charAt(0).toUpperCase() + childComponent.slice(1)}` as keyof typeof relationship
  return relationship[key] as string
}