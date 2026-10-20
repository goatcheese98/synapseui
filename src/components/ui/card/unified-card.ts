import { tv } from 'tailwind-variants'
import { interactionStates, variantRelationships } from '@/tokens/design-system'
import { computed, inject, toValue, type MaybeRefOrGetter, type ComputedRef, type InjectionKey } from 'vue'

export const cardVariants = tv({
  base: [
    'rounded-lg transition-all duration-200',
    interactionStates.default
  ],
  variants: {
    variant: {
      default: 'border bg-white text-[rgb(15_23_42)] shadow-sm',
      outline: 'border-2 bg-transparent text-[rgb(15_23_42)]',
      filled: 'border-0 bg-[rgb(51_65_85)] text-white shadow-md',
      ghost: 'border-0 bg-transparent text-[rgb(15_23_42)] hover:bg-[rgb(248_250_252)]',
      
      // Intent-based variants
      primary: 'border border-[rgb(226_232_240)] bg-[rgb(248_250_252)] text-[rgb(15_23_42)]',
      secondary: 'border border-[rgb(199_210_254)] bg-[rgb(238_242_255)] text-[rgb(49_46_129)]',
      accent: 'border border-[rgb(254_215_170)] bg-[rgb(255_247_237)] text-[rgb(124_45_18)]',
      success: 'border border-[rgb(187_247_208)] bg-[rgb(240_253_244)] text-[rgb(21_128_61)]',
      warning: 'border border-[rgb(253_230_138)] bg-[rgb(255_251_235)] text-[rgb(180_83_9)]',
      error: 'border border-[rgb(254_202_202)] bg-[rgb(254_242_242)] text-[rgb(185_28_28)]',
      muted: 'border border-[rgb(226_232_240)] bg-[rgb(241_245_249)] text-[rgb(71_85_105)]'
    },
    size: {
      xs: 'text-xs max-w-xs',
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

export type CardVariants = NonNullable<Parameters<typeof cardVariants>[0]>

// Card Context Provider - this is the magic!
export interface CardContext {
  variant: CardVariants['variant']
  size: CardVariants['size']
  preferredButtonVariant: string
  preferredInputVariant: string
}

export const CARD_CONTEXT_KEY: InjectionKey<ComputedRef<CardContext>> = Symbol('card-context')

// Helper to create card context that child components can use
export function createCardContext(variant: MaybeRefOrGetter<CardVariants['variant']> = 'default', size: MaybeRefOrGetter<CardVariants['size']> = 'md'): ComputedRef<CardContext> {
  return computed(() => {
    const currentVariant = toValue(variant)
    const currentSize = toValue(size)
    // Get preferred child variants based on card variant
    const relationships = variantRelationships.card[currentVariant as keyof typeof variantRelationships.card] || variantRelationships.card.default
    
    return {
      variant: currentVariant,
      size: currentSize,
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