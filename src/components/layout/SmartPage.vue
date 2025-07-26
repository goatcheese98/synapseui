<template>
  <LayoutProvider :pattern="pattern">
    <div :class="cn(pageClasses, $attrs.class)" v-bind="$attrs">
      
      <!-- Header -->
      <header v-if="showHeader || $slots.header" :class="headerClasses">
        <slot name="header">
          <div class="container mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
              <div>
                <h1 v-if="title" :class="titleClasses">{{ title }}</h1>
                <p v-if="subtitle" :class="subtitleClasses">{{ subtitle }}</p>
              </div>
              <div v-if="$slots.headerActions" class="flex gap-2">
                <slot name="headerActions" />
              </div>
            </div>
          </div>
        </slot>
      </header>

      <!-- Main Content -->
      <main :class="mainClasses">
        <div :class="containerClasses">
          <slot 
            :pattern="pattern"
            :density="density"
            :spacing="spacing"
          />
        </div>
      </main>

      <!-- Footer -->
      <footer v-if="showFooter || $slots.footer" :class="footerClasses">
        <slot name="footer">
          <div class="container mx-auto px-4 py-6 text-center text-muted-foreground">
            <p>&copy; {{ new Date().getFullYear() }} Your App. All rights reserved.</p>
          </div>
        </slot>
      </footer>

    </div>
  </LayoutProvider>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { cn } from '@/lib/utils'
import { 
  createLayoutContext, 
  LAYOUT_CONTEXT_KEY,
  type LayoutComposition 
} from '@/composables/useComposition'

export interface SmartPageProps {
  pattern: LayoutComposition['pattern']
  title?: string
  subtitle?: string
  showHeader?: boolean
  showFooter?: boolean
  fullWidth?: boolean
  centered?: boolean
  // Styling overrides
  headerClass?: string
  mainClass?: string
  footerClass?: string
  containerClass?: string
}

const props = withDefaults(defineProps<SmartPageProps>(), {
  pattern: 'article',
  showHeader: true,
  showFooter: false,
  fullWidth: false,
  centered: false
})

// Get layout configuration
const layoutContext = createLayoutContext(props.pattern)
provide(LAYOUT_CONTEXT_KEY, layoutContext)

const { density, spacing } = layoutContext.value.components

// Page structure classes
const pageClasses = computed(() => {
  const baseClasses = ['min-h-screen flex flex-col']
  
  const patternClasses = {
    hero: 'bg-gradient-to-br from-background to-muted',
    dashboard: 'bg-muted/30',
    article: 'bg-background',
    landing: 'bg-background',
    modal: 'bg-background'
  }

  return cn(baseClasses, patternClasses[props.pattern])
})

const headerClasses = computed(() => {
  const baseClasses = ['flex-shrink-0']
  
  const patternClasses = {
    hero: 'bg-transparent',
    dashboard: 'bg-background border-b shadow-sm',
    article: 'bg-background border-b',
    landing: 'bg-transparent',
    modal: 'bg-muted/50'
  }

  return cn(baseClasses, patternClasses[props.pattern], props.headerClass)
})

const mainClasses = computed(() => {
  const baseClasses = ['flex-1']
  
  const patternClasses = {
    hero: 'flex items-center justify-center',
    dashboard: 'overflow-auto',
    article: '',
    landing: '',
    modal: 'overflow-auto'
  }

  return cn(baseClasses, patternClasses[props.pattern], props.mainClass)
})

const containerClasses = computed(() => {
  const baseClasses = []
  
  // Width control
  if (!props.fullWidth) {
    baseClasses.push('container mx-auto px-4')
  }

  // Centering
  if (props.centered && props.pattern !== 'hero') {
    baseClasses.push('flex items-center justify-center min-h-full')
  }

  // Pattern-specific container styling
  const patternClasses = {
    hero: props.fullWidth ? 'w-full' : 'max-w-4xl mx-auto px-4',
    dashboard: 'py-6 space-y-6',
    article: 'py-8 max-w-4xl mx-auto',
    landing: 'py-12 space-y-16',
    modal: 'py-4'
  }

  // Spacing based on layout density
  const spacingClasses = {
    tight: 'space-y-4',
    normal: 'space-y-6',
    loose: 'space-y-8'
  }

  return cn(
    baseClasses,
    patternClasses[props.pattern],
    spacing !== 'normal' && spacingClasses[spacing as keyof typeof spacingClasses],
    props.containerClass
  )
})

const footerClasses = computed(() => {
  const baseClasses = ['flex-shrink-0 mt-auto']
  
  const patternClasses = {
    hero: 'bg-transparent text-muted-foreground',
    dashboard: 'bg-muted/50 border-t',
    article: 'bg-muted/30 border-t',
    landing: 'bg-muted/50 border-t',
    modal: 'bg-muted/50 border-t'
  }

  return cn(baseClasses, patternClasses[props.pattern], props.footerClass)
})

const titleClasses = computed(() => {
  const patternClasses = {
    hero: 'text-4xl md:text-6xl font-bold tracking-tight',
    dashboard: 'text-2xl font-semibold',
    article: 'text-3xl font-bold',
    landing: 'text-4xl md:text-5xl font-bold',
    modal: 'text-xl font-semibold'
  }

  return patternClasses[props.pattern]
})

const subtitleClasses = computed(() => {
  const patternClasses = {
    hero: 'text-lg md:text-xl text-muted-foreground mt-4',
    dashboard: 'text-muted-foreground',
    article: 'text-lg text-muted-foreground mt-2',
    landing: 'text-lg md:text-xl text-muted-foreground mt-4',
    modal: 'text-sm text-muted-foreground'
  }

  return patternClasses[props.pattern]
})

// Layout Provider component
const LayoutProvider = {
  props: ['pattern'],
  setup(props: any, { slots }: any) {
    const layoutContext = createLayoutContext(props.pattern)
    provide(LAYOUT_CONTEXT_KEY, layoutContext)
    return () => slots.default()
  }
}

// Expose layout information
defineExpose({
  pattern: computed(() => props.pattern),
  layoutContext: computed(() => layoutContext.value)
})
</script>