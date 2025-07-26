import { tv } from 'tailwind-variants'
import { getComponentSize, interactionStates, colorIntents } from '@/tokens/design-system'

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
      neutral: `bg-[${colorIntents.neutral[900]}] text-white hover:bg-[${colorIntents.neutral[950]}]`,
      primary: `bg-[${colorIntents.primary[700]}] text-white hover:bg-[${colorIntents.primary[800]}]`,
      secondary: `bg-[${colorIntents.secondary[700]}] text-white hover:bg-[${colorIntents.secondary[800]}]`,
      accent: `bg-[${colorIntents.accent[500]}] text-white hover:bg-[${colorIntents.accent[600]}]`,
      success: `bg-[${colorIntents.success[600]}] text-white hover:bg-[${colorIntents.success[700]}]`,
      warning: `bg-[${colorIntents.warning[500]}] text-white hover:bg-[${colorIntents.warning[600]}]`,
      error: `bg-[${colorIntents.error[600]}] text-white hover:bg-[${colorIntents.error[700]}]`,
      
      // Outline variants
      outline: `border border-[${colorIntents.neutral[500]}] bg-transparent hover:bg-[${colorIntents.neutral[50]}] text-[${colorIntents.neutral[700]}]`,
      'outline-primary': `border border-[${colorIntents.primary[700]}] bg-transparent hover:bg-[${colorIntents.primary[50]}] text-[${colorIntents.primary[700]}]`,
      'outline-success': `border border-[${colorIntents.success[600]}] bg-transparent hover:bg-[${colorIntents.success[50]}] text-[${colorIntents.success[600]}]`,
      'outline-error': `border border-[${colorIntents.error[600]}] bg-transparent hover:bg-[${colorIntents.error[50]}] text-[${colorIntents.error[600]}]`,
      
      // Ghost variants
      ghost: `bg-transparent hover:bg-[${colorIntents.neutral[100]}] text-[${colorIntents.neutral[700]}] border border-transparent hover:border-[${colorIntents.neutral[100]}]`,
      'ghost-primary': `bg-transparent hover:bg-[${colorIntents.primary[50]}] text-[${colorIntents.primary[700]}] border border-transparent hover:border-[${colorIntents.primary[100]}]`,
      link: `bg-transparent hover:underline text-[${colorIntents.primary[700]}] underline-offset-4 border-none shadow-none h-auto p-2`
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

export type ButtonVariants = Parameters<typeof buttonVariants>[0]

// Helper to determine context automatically
export function getButtonContext(parentComponent?: string, parentVariant?: string): ButtonVariants['context'] {
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