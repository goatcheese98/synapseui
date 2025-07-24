### `VISION.md`

# Synapse UI: Project Vision

## 1. The Core Philosophy: "Living Interfaces"

Synapse UI is not just another component library. It is a toolkit for building **living, breathing interfaces** that are intelligent, reactive, and fluid.

The core problem we are solving is that most UI components are static. They don't provide meaningful feedback or adapt to user activity and changing data. Synapse UI is founded on the principle that a modern UI should be in a constant, fluid conversation with the user. Components should **morph, animate, and reconfigure themselves** based on the application's state and the user's context.

This makes Synapse UI perfectly suited for the next generation of applications, especially **AI-driven apps** and **complex data dashboards**, where the interface must gracefully handle dynamic, unpredictable, and real-time information.

## 2. The Architectural Model: The ShadCN/UI Approach

To achieve maximum flexibility and empower developers, we will adopt the **ShadCN/UI architectural model**.

* **Headless First**: Components will be built using headless primitives (from **Reka UI**) to separate logic and accessibility from styling.
* **Styled with Tailwind CSS**: All styling will be done with Tailwind CSS utilities, making components fully customizable by the end-user.
* **CLI-Based Distribution**: Synapse UI will **not** be published as a traditional NPM package. Instead, we will build a CLI tool (`npx create-synapse-ui ...`) that allows users to copy the full source code of each component directly into their projects. This gives them **complete ownership and control**.

## 3. Key Differentiators

Synapse UI will stand out from other libraries by focusing on specialized, high-value features.

* **Animation as a First-Class Citizen**: Our primary differentiator. We will use **GSAP** to create high-fidelity, physics-based, and meaningful animations for every component. The UI should feel tangible and responsive.
* **Headless Data Visualization Toolkit**: We will provide a suite of beautiful, animated, and fully customizable charting components (bar races, scatter plots, etc.), a category underserved by existing headless libraries.
* **Intelligent & Composable Toolkits**: We will build advanced "recipes" like the **Floating Dock System**. This isn't just one component, but a collection of interconnected parts (panels, sliders, controls) and a state store (`useDockStore`) that work together to create a context-aware UI element.
* **Superior Developer Experience (DX)**: Through our CLI and consistent component API (powered by `tailwind-variants`), using Synapse UI will be a fast, intuitive, and joyful experience.

### 4. Target Audience: Empowering Developers to Build for Analysts

Our focus is twofold. We serve the developers who build the applications, and we empower them to delight their end-users: the analysts and AI users.

#### The Direct Customer: The "Data-Centric" Developer

This is the person who will choose to use `Synapse UI`. They are:
* Building data-heavy applications, dashboards, and admin panels.
* Tired of fighting with clunky, static charting libraries and want to deliver a premium, interactive experience without spending weeks on custom D3.js and GSAP code.
* They value excellent **Developer Experience (DX)**, beautiful design out-of-the-box, and the deep flexibility to customize every component to their specific needs.

#### The End-User: The AI User & Business Analyst

This is the person whose problems we are ultimately solving. Their needs dictate our design philosophy. They:
* Work with large, complex, and often real-time datasets.
* Need to understand data and discover insights quickly.
* Require **fluid and intuitive ways to interact with data**—scrubbing timelines, filtering, and seeing the UI morph and react to their actions instantly.

**Our Strategic Focus:**
Therefore, our mission is to **empower 'Data-Centric' Developers to build applications that delight 'AI Users and Business Analysts.'** Every component and animation we design for `Synapse UI` will be judged by one standard: "Does this help make complex data feel tangible, intuitive, and alive?"

## 5. The Ideal Technology Stack

The stack is deliberately chosen to support our core philosophy.

* **Core Framework**: **Vue 3 + TypeScript** (for a modern, type-safe foundation).
* **Styling Engine**: **Tailwind CSS v4** (for maximum customizability).
* **Headless Primitives**: **Reka UI** (for accessible, unstyled component logic).
* **Component Variants**: **`tailwind-variants`** (for a clean, type-safe API for all component styles).
* **Animation Engine**: **GSAP** (for high-fidelity, complex animations).
* **Distribution**: **Vite (Library Mode)** for bundling and **Commander.js** for the CLI.
* **Documentation**: **Histoire** (for an interactive, Vite-native component workshop).
* **Testing**: **Vitest** (for ensuring component reliability).

## 6. Initial Component Roadmap

Development should proceed in the following order to build from a solid foundation.

1.  **The Core Pattern**: Build the foundational **Button** component. This will establish the architecture using `tailwind-variants`, Reka UI primitives (where applicable), and the testing/documentation workflow.
2.  **The Signature Feature**: Build the **Floating Dock System**. This includes the base Panel, Timeline Slider, and other controls. This will prove the concept of "recipes" and complex, animated compositions.
3.  **The Niche**: Begin building the **Data Visualization** suite, starting with an animated Bar Chart Race component.
4.  **The Workflow**: Develop the initial version of the **CLI tool** to allow for the distribution of the first components.
