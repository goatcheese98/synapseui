import { tv } from 'tailwind-variants'
import { interactionStates } from '@/tokens/design-system'

export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap font-medium',
    interactionStates.default,
    interactionStates.focus,
    interactionStates.disabled
  ],
  variants: {
    variant: {
      // Solid variants using unified color system
      neutral: 'bg-[rgb(15_23_42)] text-white hover:bg-[rgb(2_6_23)]',
      primary: 'bg-[rgb(51_65_85)] text-white hover:bg-[rgb(30_41_59)]',
      secondary: 'bg-[rgb(67_56_202)] text-white hover:bg-[rgb(55_48_163)]',
      accent: 'bg-[rgb(249_115_22)] text-[rgb(15_23_42)] hover:bg-[rgb(234_88_12)]',
      success: 'bg-[rgb(21_128_61)] text-white hover:bg-[rgb(22_101_52)]',
      warning: 'bg-[rgb(245_158_11)] text-[rgb(15_23_42)] hover:bg-[rgb(217_119_6)]',
      error: 'bg-[rgb(220_38_38)] text-white hover:bg-[rgb(185_28_28)]',
      
      // Outline variants
      outline: 'border border-[rgb(100_116_139)] bg-transparent hover:bg-[rgb(248_250_252)] text-[rgb(51_65_85)]',
      'outline-primary': 'border border-[rgb(51_65_85)] bg-transparent hover:bg-[rgb(248_250_252)] text-[rgb(51_65_85)]',
      'outline-success': 'border border-[rgb(22_163_74)] bg-transparent hover:bg-[rgb(240_253_244)] text-[rgb(21_128_61)]',
      'outline-error': 'border border-[rgb(220_38_38)] bg-transparent hover:bg-[rgb(254_242_242)] text-[rgb(185_28_28)]',
      
      // Ghost variants
      ghost: 'bg-transparent hover:bg-[rgb(241_245_249)] text-[rgb(51_65_85)] border border-transparent hover:border-[rgb(241_245_249)]',
      'ghost-primary': 'bg-transparent hover:bg-[rgb(248_250_252)] text-[rgb(51_65_85)] border border-transparent hover:border-[rgb(241_245_249)]',
      link: 'bg-transparent hover:underline text-[rgb(51_65_85)] underline-offset-4 border-none shadow-none h-auto p-2'
    },
    size: {
      xs: 'h-7 text-xs rounded-sm px-2',
      sm: 'h-9 text-sm rounded-md px-3', 
      md: 'h-10 text-sm rounded-lg px-4',
      lg: 'h-12 text-base rounded-xl px-6',
      xl: 'h-14 text-lg rounded-2xl px-8',
      
      // Icon variants - perfectly square
      'icon-xs': 'h-6 w-6 p-0 text-xs rounded-sm',
      'icon-sm': 'h-8 w-8 p-0 text-sm rounded-md',
      'icon-md': 'h-10 w-10 p-0 text-base rounded-lg',
      'icon-lg': 'h-12 w-12 p-0 text-lg rounded-xl',
      'icon-xl': 'h-16 w-16 p-0 text-xl rounded-2xl'
    },
    // NEW: Context-aware variants for interconnectedness
    context: {
      // When used inside different container contexts
      'in-card': 'shadow-sm',
      'in-form': 'w-full justify-center',
      'in-nav': 'rounded-full px-3',
      'in-hero': 'text-lg px-8 py-4 shadow-lg',
      'in-dialog': 'min-w-[100px]'
    }
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md'
  },
  // Compound variants for complex relationships
  compoundVariants: [
    // When small size + in-card context
    {
      size: ['xs', 'sm'],
      context: 'in-card',
      class: 'shadow-none border-0'
    },
    // When in form context + error variant
    {
      variant: ['error', 'outline-error'],
      context: 'in-form',
      class: 'border-2 border-red-500'
    },
    // Hero buttons get special treatment
    {
      context: 'in-hero',
      class: 'transform hover:scale-105 transition-transform'
    }
  ]
})

export type ButtonVariants = NonNullable<Parameters<typeof buttonVariants>[0]>

// Helper to determine context automatically
export function getButtonContext(parentComponent?: string, _parentVariant?: string): ButtonVariants['context'] {
  if (!parentComponent) return undefined
  
  const contextMap: Record<string, ButtonVariants['context']> = {
    'Card': 'in-card',
    'Form': 'in-form', 
    'NavBar': 'in-nav',
    'Dialog': 'in-dialog',
    'Hero': 'in-hero'
  }
  
  return contextMap[parentComponent]
}