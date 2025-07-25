/**
 * Component Families - Elegant APIs for component variants
 * 
 * This provides a beautiful developer experience with intuitive component APIs:
 * - Button.Primary, Button.Ghost, Button.Icon
 * - Card.User, Card.Interactive, Card.Compact  
 * - Form.Field, Form.Section, Form.Login
 */

// Export all Button family components
import * as ButtonComponents from './Button.vue'
export const Button = ButtonComponents

// Export all Card family components  
import * as CardComponents from './Card.vue'
export const Card = CardComponents

// Export all Form family components
import * as FormComponents from './Form.vue'
export const Form = FormComponents

// Export individual families for direct import
export { ButtonComponents, CardComponents, FormComponents }

// Type exports for better TypeScript support
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost' | 'link'
export type CardVariant = 'default' | 'interactive' | 'compact' | 'wide' | 'elevated' | 'outlined'
export type FormAlignment = 'start' | 'center' | 'end' | 'between'

// Family configuration for auto-registration
export const familyConfig = {
  Button: {
    variants: ['Primary', 'Secondary', 'Success', 'Warning', 'Error', 'Outline', 'Ghost', 'Link', 'Icon', 'Small', 'Large'],
    description: 'Interactive button components with semantic variants'
  },
  Card: {
    variants: ['Default', 'Interactive', 'Compact', 'Wide', 'Elevated', 'Outlined', 'User', 'Profile', 'Feature', 'Simple'],
    description: 'Container components for grouping related content'
  },
  Form: {
    variants: ['Field', 'Section', 'Actions', 'Login', 'Contact', 'Profile'],
    description: 'Form components for user input and data collection'
  }
} as const