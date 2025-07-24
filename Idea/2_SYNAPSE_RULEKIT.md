### `SYNAPSE_RULEKIT.md`

## description: Project conventions and standards for the Synapse UI component library. globs: alwaysApply: true

# Synapse UI: The Technical Rulekit

This document defines the technical standards, conventions, and architectural patterns for the **Synapse UI** component library. Its purpose is to ensure every component we build is consistent, high-quality, maintainable, and adheres to our core philosophy of creating "living interfaces."

## Standards

  - **Stack**: Vue 3, TypeScript, Tailwind CSS v4, Reka UI, `tailwind-variants`, and GSAP.
  - **Patterns**: ALWAYS use the Composition API with `<script setup>`, NEVER use the Options API.
  - **Type Safety**: ALWAYS use TypeScript for all props, emits, and internal logic. Prefer `interface` over `type` for defining prop shapes.
  - **Testing**: ALWAYS create unit and integration tests for each component. Test files must be kept alongside the component they test (e.g., `src/components/ui/button/Button.spec.ts`).
  - **Styling**: ALWAYS use Tailwind CSS utility classes for styling. Use `tailwind-variants` to manage all component style variations. DO NOT write scoped CSS unless absolutely necessary for complex animations that utilities cannot handle.
  - **Colors**: DO NOT hard-code colors. Use Tailwind's theme system (`bg-primary`, `text-destructive`, etc.) so end-users can easily theme the components.
  - **Development Environment**: ALWAYS develop and test components in isolation using our documentation environment (Histoire).
  - **Exports**: ALWAYS prefer named exports for individual modules. The main library entry point (`src/index.ts`) will group these exports for consumers.

## Project Structure

This structure is designed for a distributable component library, not a web application.

```
src/
├── components/ # All UI components
│   ├── ui/ # Core, standalone components (Button, Card, Input, etc.)
│   │   └── button/
│   │       ├── Button.vue         # The Vue component
│   │       ├── variants.ts        # Style definitions using tailwind-variants
│   │       ├── Button.spec.ts     # Unit tests
│   │       └── index.ts           # Exports the component and types
│   └── patterns/ # Complex, multi-part "recipes" (FloatingDock, Chart, etc.)
│       └── floating-dock/
│           ├── FloatingDock.vue
│           ├── TimelineSlider.vue
│           └── ...
├── composables/ # Reusable Vue composables (e.g., for animation logic)
├── lib/ # Core library logic, types, and utilities
│   ├── stores/ # Optional Pinia stores for complex component state (e.g., useDockStore)
│   └── utils.ts
├── stories/ # Histoire files for documenting and testing components
│   └── Button.story.vue
├── index.ts # The main entry point that exports the library's public API
└── style.css # Global base styles (if any) and Tailwind directives
```

## Project Commands

  - `pnpm run dev`: Starts the Histoire documentation server for isolated component development.
  - `pnpm run build`: Bundles the entire library for production using Vite's Library Mode.
  - `pnpm run test`: Runs all unit tests with Vitest.

## Component Development Workflow

1.  **Plan the Component API**: Define the component's `props`, `slots`, and `emits`. For visual components, define the variants (e.g., `variant`, `size`) in a `variants.ts` file.
2.  **Develop in Isolation**: Create a `.story.vue` file and use Histoire to build and test the component visually.
3.  **Prioritize Headless Logic**: For complex components, start with a Reka UI primitive to handle functionality and accessibility. Then, apply styling using Tailwind classes and `tailwind-variants`.
4.  **Write Tests**: Create a `.spec.ts` file and write unit tests with Vitest to cover the component's props, events, and core logic.
5.  **Export the Component**: Add the component to the main `src/index.ts` file to make it part of the library's public API.

## Best Practices for Vue Components

  - **Naming**: ALWAYS use PascalCase for component file names (`Button.vue`). Compose names from general to specific (`SearchButtonClear.vue`, not `ClearSearchButton.vue`).
  - **Props**: ALWAYS define props with `defineProps<{ propOne: number }>()` and TypeScript types.
  - **Emits**: ALWAYS define emits with `const emit = defineEmits<{ eventName: [argOne: type] }>()` for type safety.
  - **V-Model**: ALWAYS use `defineModel<type>()` to handle `v-model` bindings. For multiple bindings, use named models (e.g., `defineModel<string>('firstName')`).
  - **Templates**:
      - ALWAYS use kebab-case for props and emits in the template (`<MyComponent :prop-one="..." @event-name="..." />`).
      - ALWAYS use the prop shorthand when possible (`<MyComponent :count />` instead of `:count="count"`).
      - ALWAYS use the slot shorthand (`<template #default>`).

-----
