export { default as Card } from './BaseCard.vue'
export { default as CardHeader } from './CardHeader.vue'
export { default as CardContent } from './CardContent.vue'
export { default as CardFooter } from './CardFooter.vue'
export { default as CardTitle } from './CardTitle.vue'
export { default as CardDescription } from './CardDescription.vue'

// New interconnected components
export { default as InterconnectedCard } from './InterconnectedCard.vue'

export {
  useCardPreset,
  createCardVariant,
  cardPresets,
  type CardPreset,
  type CardCompositionProps,
  type CardProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps,
  type CardTitleProps,
  type CardDescriptionProps
} from './composables'

// New interconnected exports
export {
  cardVariants,
  createCardContext,
  useCardContext,
  CARD_CONTEXT_KEY,
  type CardVariants,
  type CardContext
} from './unified-card'