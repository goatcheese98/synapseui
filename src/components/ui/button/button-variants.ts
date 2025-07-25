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
    
    // Interactions
    'ring-offset-background transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    
    // Border radius from tokens
    'rounded-md',
  ],
  variants: {
    variant: {
      // ✅ Using CSS custom properties (design tokens)
      primary: [
        'text-[var(--primary-text)]',
        'bg-[var(--primary-bg)]', 
        'border border-[var(--primary-border)]',
        'hover:bg-[var(--primary-hover)]',
        'focus-visible:ring-[var(--primary-bg)]'
      ],
      secondary: [
        'text-[var(--secondary-text)]',
        'bg-[var(--secondary-bg)]', 
        'border border-[var(--secondary-border)]',
        'hover:bg-[var(--secondary-hover)]',
        'focus-visible:ring-[var(--secondary-bg)]'
      ],
      success: [
        'text-[var(--success-text)]',
        'bg-[var(--success-bg)]', 
        'border border-[var(--success-border)]',
        'hover:bg-[var(--success-hover)]',
        'focus-visible:ring-[var(--success-bg)]'
      ],
      warning: [
        'text-[var(--warning-text)]',
        'bg-[var(--warning-bg)]', 
        'border border-[var(--warning-border)]',
        'hover:bg-[var(--warning-hover)]',
        'focus-visible:ring-[var(--warning-bg)]'
      ],
      error: [
        'text-[var(--error-text)]',
        'bg-[var(--error-bg)]', 
        'border border-[var(--error-border)]',
        'hover:bg-[var(--error-hover)]',
        'focus-visible:ring-[var(--error-bg)]'
      ],
      
      // Outline variants - use primary colors with transparency
      outline: [
        'text-[var(--primary-bg)]',
        'bg-transparent', 
        'border border-[var(--primary-bg)]',
        'hover:bg-[var(--primary-bg)] hover:text-[var(--primary-text)]',
      ],
      
      // Ghost variants - subtle with hover effects
      ghost: [
        'text-[var(--text-primary)]',
        'bg-transparent', 
        'border border-transparent',
        'hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]',
      ],
      
      // Link variant
      link: [
        'text-[var(--primary-bg)]',
        'bg-transparent border-none shadow-none h-auto p-2',
        'hover:underline underline-offset-4',
      ]
    },
    size: {
      // Using spacing tokens
      xs: 'h-7 px-[var(--spacing-sm)] text-xs',
      sm: 'h-9 px-[var(--spacing-md)] text-sm',
      md: 'h-10 px-[var(--spacing-lg)] text-sm',
      lg: 'h-12 px-[var(--spacing-xl)] text-base',
      xl: 'h-14 px-[var(--spacing-2xl)] text-lg',
      
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