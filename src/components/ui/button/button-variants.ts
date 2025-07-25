/**
 * Button Variants Using Design Tokens
 * This replaces the old variants.ts with a token-based approach
 */

import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: [
    // Layout & positioning
    'inline-flex items-center justify-center whitespace-nowrap',
    
    // Typography
    'text-sm font-medium',
    
    // Interactions - using token classes
    'transition-colors duration-token-normal',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    
    // Border radius from tokens
    'rounded-token-md',
  ],
  variants: {
    variant: {
      // ✅ Using Tailwind token classes (clean and concise!)
      primary: [
        'text-primary-text',
        'bg-primary', 
        'border border-primary-border',
        'hover:bg-primary-hover',
        'focus-visible:ring-primary'
      ],
      secondary: [
        'text-secondary-text',
        'bg-secondary', 
        'border border-secondary-border',
        'hover:bg-secondary-hover',
        'focus-visible:ring-secondary'
      ],
      success: [
        'text-success-text',
        'bg-success', 
        'border border-success-border',
        'hover:bg-success-hover',
        'focus-visible:ring-success'
      ],
      warning: [
        'text-warning-text',
        'bg-warning', 
        'border border-warning-border',
        'hover:bg-warning-hover',
        'focus-visible:ring-warning'
      ],
      error: [
        'text-error-text',
        'bg-error', 
        'border border-error-border',
        'hover:bg-error-hover',
        'focus-visible:ring-error'
      ],
      
      // Outline variants - use primary colors with transparency
      outline: [
        'text-primary',
        'bg-transparent', 
        'border border-primary',
        'hover:bg-primary hover:text-primary-text',
      ],
      
      // Ghost variants - subtle with hover effects
      ghost: [
        'text-text-primary',
        'bg-transparent', 
        'border border-transparent',
        'hover:bg-background-muted hover:text-text-primary',
      ],
      
      // Link variant
      link: [
        'text-primary',
        'bg-transparent border-none shadow-none h-auto p-2',
        'hover:underline underline-offset-4',
      ]
    },
    size: {
      // Using spacing token classes
      xs: 'h-7 px-token-sm text-xs',
      sm: 'h-9 px-token-md text-sm',
      md: 'h-10 px-token-lg text-sm',
      lg: 'h-12 px-token-xl text-base',
      xl: 'h-14 px-token-2xl text-lg',
      
      // Icon button sizes
      'icon-xs': 'h-6 w-6 p-0 text-xs',
      'icon-sm': 'h-8 w-8 p-0 text-sm',
      'icon-md': 'h-10 w-10 p-0 text-base',
      'icon-lg': 'h-12 w-12 p-0 text-lg',
      'icon-xl': 'h-16 w-16 p-0 text-xl'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})

export type ButtonVariants = Parameters<typeof buttonVariants>[0]