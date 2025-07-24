### `ANIMATION_GUIDE.md`

# Synapse UI: Animation Philosophy

## 1. Core Philosophy: The Living Interface

Our goal is to create a **"Living Interface."**

This is an environment that feels tangible, intelligent, and physically responsive. We are moving beyond static pages and building a dynamic digital space where elements have presence and purpose.

Animations are the physics of this space. They are not decoration; they are the visual language that communicates how the interface works and how the user can interact with it.

## 2. Guiding Principles

Instead of strict rules, follow these guiding principles. They are meant to inspire, not to limit.

*   **Responsive & Aware:** The interface should acknowledge the user's presence and input. Elements can react to the cursor's proximity, speed, and clicks in subtle or significant ways. The key is to make the UI feel alive and aware.

*   **Tangible & Physical:** Interactions should have a satisfying, physical feel. Draggable objects should have weight and inertia. Buttons should feel like they are being pressed. This creates an intuitive experience that users understand without explanation.

*   **Fluid & Cohesive:** Transitions between states should be smooth and natural, never abrupt. Animations should guide the user's eye and create a sense of flow throughout the application.

## 3. Technical Approach & Experimentation

Our stack is built on **Vue, Tailwind CSS, and GSAP**.

*   Use **CSS transitions** for simple, state-based animations (like hover and active states).
*   Use **GSAP** for complex, physics-based animations (like inertial dragging or orchestrated sequences).

**This guide is intentionally not prescriptive.** The goal is to provide a philosophical foundation. You are encouraged to experiment with new and creative ways to apply these principles to each component, discovering unique interactions that bring the Synapse UI vision to life.
