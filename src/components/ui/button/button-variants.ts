import { tv } from 'tailwind-variants'
export const buttonVariants = tv({
  base: 'synapse-button inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary: 'synapse-primary', neutral: 'synapse-neutral', secondary: 'synapse-secondary',
      accent: 'synapse-accent', info: 'synapse-info', success: 'synapse-success',
      warning: 'synapse-warning', error: 'synapse-error', outline: 'synapse-outline',
      'outline-primary': 'synapse-outline-primary', 'outline-success': 'synapse-outline-success',
      'outline-error': 'synapse-outline-error', ghost: 'synapse-ghost',
      'ghost-primary': 'synapse-ghost-primary', link: 'synapse-link'
    },
    size: {
      xs: 'h-7 px-2 text-xs', sm: 'h-9 px-3 text-sm', md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base', xl: 'h-14 px-8 text-lg',
      'icon-xs': 'h-6 w-6 p-0 text-xs', 'icon-sm': 'h-8 w-8 p-0 text-sm',
      'icon-md': 'h-10 w-10 p-0 text-base', 'icon-lg': 'h-12 w-12 p-0 text-lg',
      'icon-xl': 'h-16 w-16 p-0 text-xl'
    }
  },
  defaultVariants: { variant: 'primary', size: 'md' }
})
export type ButtonVariants = NonNullable<Parameters<typeof buttonVariants>[0]>
