import type { CardProps } from './Card.vue'
import type { CardHeaderProps } from './CardHeader.vue'
import type { CardContentProps } from './CardContent.vue'
import type { CardFooterProps } from './CardFooter.vue'
import type { CardTitleProps } from './CardTitle.vue'
import type { CardDescriptionProps } from './CardDescription.vue'

export interface CardCompositionProps {
  card?: CardProps
  header?: CardHeaderProps
  content?: CardContentProps
  footer?: CardFooterProps
  title?: CardTitleProps
  description?: CardDescriptionProps
}

export const cardPresets = {
  simple: {
    card: { variant: 'default', size: 'md' },
    header: { size: 'md', spacing: 'normal' },
    content: { size: 'md' },
    title: { size: 'md' },
    description: { size: 'sm' }
  } as CardCompositionProps,

  compact: {
    card: { variant: 'outline', size: 'sm' },
    header: { size: 'sm', spacing: 'tight' },
    content: { size: 'sm' },
    title: { size: 'sm' },
    description: { size: 'xs' }
  } as CardCompositionProps,

  feature: {
    card: { variant: 'filled', size: 'lg', colorScheme: 'primary' },
    header: { size: 'lg', spacing: 'loose', align: 'center' },
    content: { size: 'lg' },
    footer: { size: 'lg', justify: 'center' },
    title: { size: 'lg', colorScheme: 'primary' },
    description: { size: 'md' }
  } as CardCompositionProps,

  ghost: {
    card: { variant: 'ghost', size: 'md' },
    header: { size: 'md', spacing: 'normal' },
    content: { size: 'md' },
    title: { size: 'md', colorScheme: 'accent' },
    description: { size: 'sm', colorScheme: 'muted' }
  } as CardCompositionProps,

  dashboard: {
    card: { variant: 'default', size: 'md', colorScheme: 'muted' },
    header: { size: 'md', spacing: 'tight' },
    content: { size: 'md', noPadding: true },
    footer: { size: 'sm', justify: 'between' },
    title: { size: 'sm', colorScheme: 'muted' },
    description: { size: 'xs', colorScheme: 'muted' }
  } as CardCompositionProps
}

export type CardPreset = keyof typeof cardPresets

export function useCardPreset(preset: CardPreset): CardCompositionProps {
  return cardPresets[preset]
}

export function createCardVariant(
  basePreset: CardPreset,
  overrides: Partial<CardCompositionProps>
): CardCompositionProps {
  const base = cardPresets[basePreset]
  return {
    card: { ...base.card, ...overrides.card },
    header: { ...base.header, ...overrides.header },
    content: { ...base.content, ...overrides.content },
    footer: { ...base.footer, ...overrides.footer },
    title: { ...base.title, ...overrides.title },
    description: { ...base.description, ...overrides.description }
  }
}

export { type CardProps, type CardHeaderProps, type CardContentProps, type CardFooterProps, type CardTitleProps, type CardDescriptionProps }