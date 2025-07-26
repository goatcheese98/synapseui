/**
 * Composition Patterns - Higher-level component relationships
 */

import { provide, inject, computed, ref, type ComputedRef, type Ref } from 'vue'

// Form composition context
export interface FormContext {
  state: 'default' | 'loading' | 'success' | 'error'
  size: 'sm' | 'md' | 'lg'
  spacing: 'tight' | 'normal' | 'loose'
  preferredButtonVariant: string
  preferredInputVariant: string
}

export const FORM_CONTEXT_KEY = Symbol('form-context')

export function createFormContext(
  state: FormContext['state'] = 'default',
  size: FormContext['size'] = 'md'
): ComputedRef<FormContext> {
  return computed(() => ({
    state,
    size,
    spacing: size === 'sm' ? 'tight' : size === 'lg' ? 'loose' : 'normal',
    preferredButtonVariant: state === 'error' ? 'error' : state === 'success' ? 'success' : 'primary',
    preferredInputVariant: state === 'error' ? 'error' : 'default'
  }))
}

export function useFormContext(): FormContext | null {
  return inject(FORM_CONTEXT_KEY, null)?.value || null
}

// Navigation composition context
export interface NavContext {
  variant: 'horizontal' | 'vertical' | 'sidebar'
  size: 'sm' | 'md' | 'lg'
  theme: 'light' | 'dark'
  preferredButtonVariant: string
}

export const NAV_CONTEXT_KEY = Symbol('nav-context')

export function createNavContext(
  variant: NavContext['variant'] = 'horizontal',
  size: NavContext['size'] = 'md',
  theme: NavContext['theme'] = 'light'
): ComputedRef<NavContext> {
  return computed(() => ({
    variant,
    size,
    theme,
    preferredButtonVariant: theme === 'dark' ? 'ghost' : variant === 'sidebar' ? 'ghost-primary' : 'outline'
  }))
}

export function useNavContext(): NavContext | null {
  return inject(NAV_CONTEXT_KEY, null)?.value || null
}

// Layout composition patterns
export interface LayoutComposition {
  pattern: 'hero' | 'dashboard' | 'article' | 'landing' | 'modal'
  density: 'compact' | 'comfortable' | 'spacious'
  components: {
    preferredCardVariant: string
    preferredButtonVariant: string
    preferredTextSize: string
    spacing: string
  }
}

export const layoutCompositions: Record<LayoutComposition['pattern'], LayoutComposition> = {
  hero: {
    pattern: 'hero',
    density: 'spacious',
    components: {
      preferredCardVariant: 'filled',
      preferredButtonVariant: 'primary',
      preferredTextSize: 'lg',
      spacing: 'loose'
    }
  },
  dashboard: {
    pattern: 'dashboard',
    density: 'compact',
    components: {
      preferredCardVariant: 'outline',
      preferredButtonVariant: 'ghost',
      preferredTextSize: 'sm',
      spacing: 'tight'
    }
  },
  article: {
    pattern: 'article',
    density: 'comfortable',
    components: {
      preferredCardVariant: 'default',
      preferredButtonVariant: 'outline',
      preferredTextSize: 'md',
      spacing: 'normal'
    }
  },
  landing: {
    pattern: 'landing',
    density: 'spacious',
    components: {
      preferredCardVariant: 'ghost',
      preferredButtonVariant: 'accent',
      preferredTextSize: 'lg',
      spacing: 'loose'
    }
  },
  modal: {
    pattern: 'modal',
    density: 'comfortable',
    components: {
      preferredCardVariant: 'default',
      preferredButtonVariant: 'primary',
      preferredTextSize: 'md',
      spacing: 'normal'
    }
  }
}

export const LAYOUT_CONTEXT_KEY = Symbol('layout-context')

export function createLayoutContext(pattern: LayoutComposition['pattern']): ComputedRef<LayoutComposition> {
  return computed(() => layoutCompositions[pattern])
}

export function useLayoutContext(): LayoutComposition | null {
  return inject(LAYOUT_CONTEXT_KEY, null)?.value || null
}


// Dialog composition context
export interface DialogContext {
  variant: 'default' | 'destructive' | 'warning' | 'success'
  size: 'sm' | 'md' | 'lg' | 'xl'
  density: 'compact' | 'comfortable' | 'spacious'
  preferredButtonVariant: string
  preferredInputVariant: string
}

export const DIALOG_CONTEXT_KEY = Symbol('dialog-context')

export function createDialogContext(
  variant: DialogContext['variant'] = 'default',
  size: DialogContext['size'] = 'md'
): ComputedRef<DialogContext> {
  return computed(() => ({
    variant,
    size,
    density: size === 'sm' ? 'compact' : size === 'lg' || size === 'xl' ? 'spacious' : 'comfortable',
    preferredButtonVariant: variant === 'destructive' ? 'error' : variant === 'warning' ? 'warning' : variant === 'success' ? 'success' : 'primary',
    preferredInputVariant: variant === 'destructive' ? 'error' : variant === 'warning' ? 'warning' : 'default'
  }))
}

export function useDialogContext(): DialogContext | null {
  return inject(DIALOG_CONTEXT_KEY, null)?.value || null
}

// Table composition context
export interface TableContext {
  variant: 'default' | 'bordered' | 'striped' | 'compact'
  size: 'sm' | 'md' | 'lg'
  density: 'compact' | 'comfortable' | 'spacious'
  interactive: boolean
  preferredButtonVariant: string
}

export const TABLE_CONTEXT_KEY = Symbol('table-context')

export function createTableContext(
  variant: TableContext['variant'] = 'default',
  size: TableContext['size'] = 'md',
  interactive: boolean = false
): ComputedRef<TableContext> {
  return computed(() => ({
    variant,
    size,
    density: size === 'sm' ? 'compact' : size === 'lg' ? 'spacious' : 'comfortable',
    interactive,
    preferredButtonVariant: interactive ? 'ghost' : size === 'sm' ? 'outline' : 'default'
  }))
}

export function useTableContext(): TableContext | null {
  return inject(TABLE_CONTEXT_KEY, null)?.value || null
}

// Multi-level composition - components can inherit from multiple contexts
export function useMultiContext() {
  const card = inject(CARD_CONTEXT_KEY, null)
  const form = inject(FORM_CONTEXT_KEY, null) 
  const nav = inject(NAV_CONTEXT_KEY, null)
  const layout = inject(LAYOUT_CONTEXT_KEY, null)
  const dialog = inject(DIALOG_CONTEXT_KEY, null)
  const table = inject(TABLE_CONTEXT_KEY, null)

  return computed(() => ({
    card: card?.value || null,
    form: form?.value || null,
    nav: nav?.value || null,
    layout: layout?.value || null,
    dialog: dialog?.value || null,
    table: table?.value || null,
    
    // Priority resolution - which context takes precedence
    getPrimaryContext(): string {
      if (dialog?.value) return 'dialog'  // Dialogs have highest priority
      if (form?.value) return 'form'
      if (table?.value) return 'table'
      if (card?.value) return 'card'
      if (nav?.value) return 'nav'
      if (layout?.value) return 'layout'
      return 'none'
    },

    // Smart variant selection based on all available contexts
    getSmartVariant(componentType: 'button' | 'input' | 'card'): string {
      const contexts = [dialog?.value, form?.value, table?.value, card?.value, nav?.value, layout?.value].filter(Boolean)
      
      // Dialog context takes highest priority
      if (dialog?.value && componentType === 'button') {
        return dialog.value.preferredButtonVariant
      }
      
      if (dialog?.value && componentType === 'input') {
        return dialog.value.preferredInputVariant
      }

      // Form context second priority
      if (form?.value && componentType === 'button') {
        return form.value.preferredButtonVariant
      }
      
      if (form?.value && componentType === 'input') {
        return form.value.preferredInputVariant
      }

      // Table context for data-focused components
      if (table?.value && componentType === 'button') {
        return table.value.preferredButtonVariant
      }

      // Card context for general content
      if (card?.value && componentType === 'button') {
        return card.value.preferredButtonVariant
      }

      // Layout context for general guidance
      if (layout?.value) {
        const key = `preferred${componentType.charAt(0).toUpperCase() + componentType.slice(1)}Variant` as keyof typeof layout.value.components
        return layout.value.components[key]
      }

      // Nav context for navigation-specific components
      if (nav?.value && componentType === 'button') {
        return nav.value.preferredButtonVariant
      }

      return 'default'
    }
  }))
}

// Import the missing symbol
import { CARD_CONTEXT_KEY } from '@/components/ui/card/unified-card'