import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
    'ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  ],
  variants: {
    variant: {
      // Solid variants
      neutral: 'bg-neutral-900 text-white hover:bg-neutral-950',
      primary: 'bg-slate-700 text-white hover:bg-slate-800',
      secondary: 'bg-indigo-700 text-white hover:bg-indigo-800',
      accent: 'bg-orange-500 text-white hover:bg-orange-600',
      info: 'bg-cyan-700 text-white hover:bg-cyan-800',
      success: 'bg-green-700 text-white hover:bg-green-800',
      warning: 'bg-amber-500 text-white hover:bg-amber-600',
      error: 'bg-red-600 text-white hover:bg-red-700',
      
      // Outline variants
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700',
      'outline-primary': 'border border-slate-800 bg-transparent hover:bg-slate-50 text-slate-800',
      'outline-success': 'border border-green-600 bg-transparent hover:bg-green-50 text-green-600',
      'outline-error': 'border border-red-600 bg-transparent hover:bg-red-50 text-red-600',
      
      // Ghost variants - more visible
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent hover:border-gray-200',
      'ghost-primary': 'bg-transparent hover:bg-slate-50 text-slate-800 border border-transparent hover:border-slate-200',
      link: 'bg-transparent hover:underline text-slate-800 underline-offset-4 border-none shadow-none h-auto p-2'
    },
    size: {
      xs: 'h-7 px-2 text-xs',
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      xl: 'h-14 px-8 text-lg',
      
      // Icon button sizes with clear visual differences
      'icon-xs': 'h-6 w-6 p-0 text-xs',
      'icon-sm': 'h-8 w-8 p-0 text-sm',
      'icon-md': 'h-10 w-10 p-0 text-base',
      'icon-lg': 'h-12 w-12 p-0 text-lg',
      'icon-xl': 'h-16 w-16 p-0 text-xl'
    }
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md'
  }
})

export type ButtonVariants = Parameters<typeof buttonVariants>[0]