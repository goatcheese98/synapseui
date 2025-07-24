# Phase 2: Building the Signature Feature - The Floating Dock

**Objective:** To build the first "Intelligent & Composable Toolkit" as defined in the `VISION.md`. This phase focuses on creating the **Floating Dock System**, our signature feature. The goal is to prove the concept of "recipes"—complex, stateful patterns composed of multiple, interconnected components. This will also be the first implementation of our core animation and interaction philosophies.

The successful completion of this phase will be marked by a functional, animated, and interactive Floating Dock system, developed in isolation within Histoire.

---

## Key Initiatives (The "What")

### 1. **Establish UI State Management**
   - **Intent:** To create a centralized state management store for the dock system's *local UI state*. This store will handle synchronous operations like tracking the position, visibility, and internal state of the various panels and controls within the dock.
   - **Action:**
     - Create a new directory: `src/lib/stores/`.
     - Implement `useDockStore.ts` using **Pinia**, defining the core state and actions.
   - **Note on Technology Choice:** We are using core **Pinia** for this task as it is the official, lightweight standard for managing synchronous, local component state in Vue. For future components that require complex asynchronous data fetching and server-state synchronization, we will evaluate using **Pinia Colada**, a dedicated data-fetching layer.

### 2. **Develop Core Animation Composables**
   - **Intent:** To translate the physics-based principles from the `ANIMATION_GUIDE.md` into reusable Vue composables. This is where the "living" feel of the interface begins.
   - **Action:**
     - Create a new directory: `src/composables/`.
     - Develop an initial `useDraggable.ts` composable that incorporates GSAP-based physics (inertia, resistance) for floating elements.

### 3. **Build the Dock System Components**
   - **Intent:** To create the individual Vue components that make up the Floating Dock system. These will be the first components to live in the `patterns` directory.
   - **Action:**
     - Create a new directory: `src/components/patterns/floating-dock/`.
     - Create the following component files:
       - `FloatingDock.vue`: The main container that will use the `useDraggable` composable.
       - `DockPanel.vue`: A generic, reusable panel to be placed inside the dock.
       - `TimelineSlider.vue`: The first specialized control for the dock.

### 4. **Integrate and Document**
   - **Intent:** To bring all the pieces together into a single, interactive workshop environment. This ensures the components work together as a cohesive system.
   - **Action:**
     - Create a `FloatingDock.story.vue` file in the `src/stories/` directory.
     - Use the story to assemble the `FloatingDock` with several `DockPanel` and `TimelineSlider` instances.
     - Connect the components to the `useDockStore` to manage their collective state.

### 5. **Test the System**
   - **Intent:** To ensure the reliability and functionality of the new components and the state store.
   - **Action:**
     - Write unit tests for the `useDockStore` to validate its actions and state mutations.
     - Write basic integration tests for the `FloatingDock` component to ensure it renders its slots correctly.

---

**Outcome:** At the end of this phase, we will have a tangible, impressive, and functional example of what makes Synapse UI unique. This "recipe" will serve as a powerful demonstration of our core vision and provide a clear architectural pattern for building other complex, multi-part components.