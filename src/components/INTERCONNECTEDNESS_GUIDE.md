# Component Interconnectedness Guide

## 🌟 Philosophy

Your SynapseUI components are now **deeply interconnected** through a sophisticated context system. Components don't just exist in isolation - they form a **living ecosystem** that adapts and harmonizes automatically.

## 🎯 How It Works

### 1. **Unified Design Tokens**
All components share the same foundational tokens:
```typescript
// Semantic size system
sizes: { xs, sm, md, lg, xl }

// Semantic colors  
colorIntents: { neutral, primary, secondary, accent, success, warning, error }

// Component scaling
componentScale: { button, card, input } // Maps sizes to specific values
```

### 2. **Context Providers**
Parent components provide context that children automatically consume:

```vue
<!-- Card provides context -->
<InterconnectedCard variant="primary" size="lg">
  <!-- Button automatically becomes "accent" variant and "lg" size -->
  <SmartButton>Auto-Adapted</SmartButton>
</InterconnectedCard>
```

### 3. **Multi-Level Intelligence**
Components can adapt to multiple contexts simultaneously:

- **Form Context**: Error state → red buttons/inputs
- **Card Context**: Primary card → accent buttons  
- **Navigation Context**: Dark theme → ghost buttons
- **Layout Context**: Hero section → large, prominent styles

## 🔧 Component Types

### **Basic Components** (Manual Control)
```vue
<Button variant="primary" size="md">Manual Control</Button>
```

### **Smart Components** (Single Context)
```vue
<SmartButton>Adapts to immediate parent context</SmartButton>
```

### **Ultra-Smart Components** (Multi-Context)
```vue
<UltraSmartButton intelligence="full">
  Adapts to ALL available contexts with priority resolution
</UltraSmartButton>
```

## 🎨 Variant Relationships

Components suggest complementary variants:

| Card Variant | Preferred Button | Visual Logic |
|--------------|------------------|--------------|
| `default`    | `primary`        | Neutral base needs action color |
| `primary`    | `accent`         | Blue card + orange button = contrast |
| `accent`     | `primary`        | Orange card + blue button = balance |
| `success`    | `success`        | Semantic consistency |
| `error`      | `error`          | Semantic consistency |

## 📏 Size Consistency

All components scale together:

```vue
<!-- Everything scales to 'lg' automatically -->
<InterconnectedCard size="lg">
  <CardHeader size="lg">        <!-- Auto-sized -->
    <CardTitle size="lg">       <!-- Auto-sized -->
  <CardContent size="lg">       <!-- Auto-sized -->
    <SmartButton>Large Button</SmartButton>  <!-- Auto-sized -->
```

## 🧠 Intelligence Levels

### `intelligence="none"`
No auto-adaptation, full manual control

### `intelligence="basic"`  
Adapts to immediate parent only

### `intelligence="full"`
Multi-context awareness with priority resolution:
1. Form context (highest priority)
2. Card context
3. Navigation context  
4. Layout context (lowest priority)

## 🎭 Usage Examples

### Form with Context
```vue
<FormProvider state="error" size="lg">
  <InterconnectedCard variant="error">
    <CardContent>
      <SmartInput>          <!-- Becomes error variant, lg size -->
      <UltraSmartButton>    <!-- Becomes error variant, lg size -->
        Submit
      </UltraSmartButton>
    </CardContent>
  </InterconnectedCard>
</FormProvider>
```

### Navigation with Theme
```vue
<NavProvider theme="dark" variant="sidebar">
  <SmartButton>Menu Item</SmartButton>  <!-- Becomes ghost variant -->
</NavProvider>
```

### Layout Pattern
```vue
<LayoutProvider pattern="hero">
  <InterconnectedCard>     <!-- Becomes filled variant -->
    <UltraSmartButton>     <!-- Becomes primary variant, lg size -->
      Call to Action
    </UltraSmartButton>
  </InterconnectedCard>
</LayoutProvider>
```

## 🔄 Override System

Auto-adaptation can always be overridden:

```vue
<InterconnectedCard variant="primary">
  <!-- Auto-adapted -->
  <SmartButton>Becomes Accent</SmartButton>
  
  <!-- Manual override -->
  <SmartButton variant="error" :autoAdapt="false">
    Stays Error
  </SmartButton>
  
  <!-- Intelligence level override -->
  <UltraSmartButton intelligence="none" variant="warning">
    No Auto-Adaptation
  </UltraSmartButton>
</InterconnectedCard>
```

## 🏗️ Building New Interconnected Components

### 1. Create Context Interface
```typescript
export interface MyContext {
  variant: string
  size: string
  preferredChildVariant: string
}
```

### 2. Create Context Provider
```typescript
export function createMyContext(variant: string): ComputedRef<MyContext> {
  return computed(() => ({
    variant,
    size: 'md',
    preferredChildVariant: getPreferredVariant(variant)
  }))
}
```

### 3. Use Context in Component
```vue
<script setup>
import { useMultiContext } from '@/composables/useComposition'

const multiContext = useMultiContext()
const smartVariant = computed(() => 
  multiContext.value.getSmartVariant('myComponent')
)
</script>
```

## 🎯 Benefits Achieved

✅ **Visual Harmony**: Components automatically complement each other  
✅ **Consistency**: Sizes and spacing scale together  
✅ **Developer Experience**: Less manual variant management  
✅ **Semantic Logic**: Error states propagate logically  
✅ **Flexibility**: Can override when needed  
✅ **Scalability**: Easy to add new context types  

## 🚀 Advanced Patterns

### Context Composition
```vue
<!-- Multiple contexts stack and resolve with priority -->
<LayoutProvider pattern="dashboard">
  <FormProvider state="error">
    <InterconnectedCard variant="primary">
      <UltraSmartButton>
        <!-- Final result: error variant (form wins), compact size (layout), in-card context -->
      </UltraSmartButton>
    </InterconnectedCard>
  </FormProvider>
</LayoutProvider>
```

### Custom Context Resolution
```typescript
// In your component
const customVariant = computed(() => {
  const contexts = multiContext.value
  
  // Your custom logic
  if (contexts.form?.state === 'error' && contexts.card?.variant === 'primary') {
    return 'special-error-in-primary'
  }
  
  return contexts.getSmartVariant('button')
})
```

This system gives you the **deep interconnectedness** you wanted - components that truly work together as a unified system! 🎉