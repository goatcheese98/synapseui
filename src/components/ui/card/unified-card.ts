import { tv } from 'tailwind-variants'
import { getComponentSize, interactionStates, colorIntents, variantRelationships } from '@/tokens/design-system'
import { provide, computed, inject, type ComputedRef } from 'vue'

export const cardVariants = tv({
  base: [
    'rounded-lg transition-all duration-200',
    interactionStates.default
  ],
  variants: {
    variant: {
      default: `border bg-white text-[${colorIntents.neutral[900]}] shadow-sm`,
      outline: `border-2 bg-transparent text-[${colorIntents.neutral[900]}]`,
      filled: `border-0 bg-[${colorIntents.primary[700]}] text-white shadow-md`,
      ghost: `border-0 bg-transparent text-[${colorIntents.neutral[900]}] hover:bg-[${colorIntents.neutral[50]}]`,
      
      // Intent-based variants
      primary: `border border-[${colorIntents.primary[200]}] bg-[${colorIntents.primary[50]}] text-[${colorIntents.primary[900]}]`,
      secondary: `border border-[${colorIntents.secondary[200]}] bg-[${colorIntents.secondary[50]}] text-[${colorIntents.secondary[900]}]`,
      accent: `border border-[${colorIntents.accent[200]}] bg-[${colorIntents.accent[50]}] text-[${colorIntents.accent[900]}]`,
      success: `border border-[${colorIntents.success[200]}] bg-[${colorIntents.success[50]}] text-[${colorIntents.success[700]}]`,
      warning: `border border-[${colorIntents.warning[200]}] bg-[${colorIntents.warning[50]}] text-[${colorIntents.warning[700]}]`,
      error: `border border-[${colorIntents.error[200]}] bg-[${colorIntents.error[50]}] text-[${colorIntents.error[700]}]`,
      muted: `border border-[${colorIntents.neutral[200]}] bg-[${colorIntents.neutral[100]}] text-[${colorIntents.neutral[600]}]`
    },
    size: {
      sm: 'text-sm max-w-sm',
      md: 'text-base max-w-md', 
      lg: 'text-lg max-w-lg',
      xl: 'text-xl max-w-xl'
    },
    // Interactive states
    interactive: {
      true: 'cursor-pointer hover:shadow-md hover:-translate-y-1',
      false: ''
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    interactive: false
  }
})

export type CardVariants = Parameters<typeof cardVariants>[0]

// Card Context Provider - this is the magic!
export interface CardContext {
  variant: CardVariants['variant']
  size: CardVariants['size']
  preferredButtonVariant: string
  preferredInputVariant: string
}

export const CARD_CONTEXT_KEY = Symbol('card-context')

// Helper to create card context that child components can use
export function createCardContext(variant: CardVariants['variant'] = 'default', size: CardVariants['size'] = 'md'): ComputedRef<CardContext> {
  return computed(() => {
    // Get preferred child variants based on card variant
    const relationships = variantRelationships.card[variant as keyof typeof variantRelationships.card] || variantRelationships.card.default
    
    return {
      variant,
      size,
      preferredButtonVariant: relationships.preferredButton,
      preferredInputVariant: 'default' // Could extend this
    }
  })
}

// Hook for child components to access card context
export function useCardContext(): CardContext | null {
  try {
    const context = inject(CARD_CONTEXT_KEY, null)
    return context?.value || null
  } catch {
    return null
  }
}