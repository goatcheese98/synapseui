# Component Organization Guidelines

## Folder Structure

### `/ui/` - Atomic UI Components
**Purpose**: Single-responsibility, reusable components  
**Examples**: Button, Input, Badge, Card
**Rules**:
- Each component gets its own folder
- Must have `index.ts` for exports
- Can have variants/specs files
- No business logic

### `/composite/` - Multi-Component Compositions  
**Purpose**: Components that combine multiple UI components  
**Examples**: LoginForm, UserCard, SearchBox
**Rules**:
- Business-specific logic allowed
- Can use multiple UI components
- Should be reusable across pages

### `/patterns/` - Complex Interactive Patterns
**Purpose**: Advanced behaviors, animations, complex interactions  
**Examples**: FloatingDock, DragAndDrop, DataTable
**Rules**:
- Can have their own state management
- Complex animations/interactions
- May include composables

## File Naming

- **Components**: PascalCase (e.g., `Button.vue`)
- **Composables**: camelCase with `use` prefix (e.g., `useTooltip.ts`)
- **Types**: PascalCase with `Props`/`Emit` suffix (e.g., `ButtonProps`)
- **Variants**: kebab-case (e.g., `button-variants.ts`)

## Export Pattern

Each folder must have an `index.ts`:

```typescript
// ui/button/index.ts
export { default as Button } from './Button.vue'
export { type ButtonProps } from './Button.vue'
export { buttonVariants } from './variants.ts'
```

## Story Organization

### Root Level - Production Components
Components ready for end users

### `_dev/` - Development & Debugging
Testing, debugging, work-in-progress stories

### `_system/` - System Demonstrations  
Overall system showcases, theme demos

### `_experiments/` - Experimental Features
Unstable, experimental components

## Component Dependencies

- **UI components**: Can only import from `lib/`, other UI components
- **Composite components**: Can import UI components, composables
- **Pattern components**: Can import anything

## Interconnectedness Philosophy

Components connect through:
1. **Design tokens** (shared colors, sizes, spacing)
2. **Composition** (slots, not prop drilling)
3. **Shared composables** (behaviors, not state)

❌ **Avoid**: Components controlling other components' variants  
✅ **Prefer**: Each component owns its own variants, composes naturally