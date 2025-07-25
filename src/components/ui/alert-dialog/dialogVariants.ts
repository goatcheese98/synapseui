import { tv } from 'tailwind-variants'
import { buttonVariants } from '../button/variants'

export const dialogButtonVariants = tv({
  extend: buttonVariants,
  base: [
    'relative overflow-hidden',
    'transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1)',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
  ],
  variants: {
    variant: {
      'dialog-primary': 'bg-slate-700 text-white hover:bg-slate-800 transform hover:scale-102 hover:translateY-1',
      'dialog-secondary': 'bg-indigo-700 text-white hover:bg-indigo-800 transform hover:scale-102 hover:translateY-1', 
      'dialog-success': 'bg-green-700 text-white hover:bg-green-800 transform hover:scale-102 hover:translateY-1',
      'dialog-cancel': 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 transform hover:scale-102 hover:translateY-1',
      'dialog-destructive': 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-102 hover:translateY-1'
    },
    withIcon: {
      true: 'gap-2'
    }
  },
  defaultVariants: {
    variant: 'dialog-primary',
    size: 'md'
  }
})

export type DialogButtonVariants = Parameters<typeof dialogButtonVariants>[0]