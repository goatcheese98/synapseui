import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: [
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-semibold text-sm leading-none select-none',
    'border border-transparent rounded-lg',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-95 active:duration-75',
    'overflow-hidden cursor-pointer',
    'no-animation:transform-none no-animation:transition-none'
  ],
  variants: {
    variant: {
      // Primary - DaisyUI style primary button
      primary: [
        'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-blue-500'
      ],
      // Secondary - DaisyUI neutral button
      secondary: [
        'bg-gray-200 hover:bg-gray-300 text-gray-900 border-gray-200 hover:border-gray-300',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-gray-500'
      ],
      // Accent - DaisyUI accent color
      accent: [
        'bg-purple-600 hover:bg-purple-700 text-white border-purple-600 hover:border-purple-700',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-purple-500'
      ],
      // Success - Green semantic color
      success: [
        'bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-green-500'
      ],
      // Warning - Yellow/Orange semantic color
      warning: [
        'bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-orange-500'
      ],
      // Error - Red semantic color
      error: [
        'bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-red-500'
      ],
      // Info - Blue info color
      info: [
        'bg-sky-500 hover:bg-sky-600 text-white border-sky-500 hover:border-sky-600',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-sky-500'
      ],
      // Outline variants
      outline: [
        'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-gray-500'
      ],
      'outline-primary': [
        'bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600 hover:border-blue-700 hover:text-blue-700',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-blue-500'
      ],
      'outline-success': [
        'bg-transparent hover:bg-green-50 text-green-600 border-green-600 hover:border-green-700 hover:text-green-700',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-green-500'
      ],
      'outline-error': [
        'bg-transparent hover:bg-red-50 text-red-600 border-red-600 hover:border-red-700 hover:text-red-700',
        'shadow-sm hover:shadow-md',
        'focus-visible:ring-red-500'
      ],
      // Ghost variants
      ghost: [
        'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
        'hover:shadow-sm',
        'focus-visible:ring-gray-500'
      ],
      'ghost-primary': [
        'bg-transparent hover:bg-blue-100 text-blue-600 border-transparent hover:text-blue-700',
        'hover:shadow-sm',
        'focus-visible:ring-blue-500'
      ],
      // Link variant
      link: [
        'bg-transparent hover:bg-transparent text-blue-600 hover:text-blue-700',
        'border-transparent underline-offset-4 hover:underline',
        'shadow-none hover:shadow-none p-0 h-auto',
        'focus-visible:ring-blue-500'
      ]
    },
    size: {
      xs: 'h-6 px-2 text-xs min-h-6',
      sm: 'h-8 px-3 text-sm min-h-8',
      md: 'h-10 px-4 text-sm min-h-10',
      lg: 'h-12 px-6 text-base min-h-12',
      xl: 'h-14 px-8 text-lg min-h-14',
      // Square icon buttons
      'icon-xs': 'h-6 w-6 p-0 min-h-6',
      'icon-sm': 'h-8 w-8 p-0 min-h-8',
      'icon-md': 'h-10 w-10 p-0 min-h-10',
      'icon-lg': 'h-12 w-12 p-0 min-h-12',
      'icon-xl': 'h-14 w-14 p-0 min-h-14'
    },
    loading: {
      true: 'cursor-wait'
    },
    fullWidth: {
      true: 'w-full'
    },
    shape: {
      square: 'rounded-none',
      rounded: 'rounded-lg',
      circle: 'rounded-full'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    loading: false,
    fullWidth: false,
    shape: 'rounded'
  }
})

export type ButtonVariants = Parameters<typeof buttonVariants>[0]