import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  setupFile: '/src/histoire.setup.ts',
  tree: {
    groups: [
      {
        id: 'top',
        title: '',
      },
    ],
  },
  // Background presets for testing components in different environments
  backgroundPresets: [
    {
      label: 'Transparent',
      color: 'transparent',
      contrastColor: 'hsl(222.2 84% 4.9%)', // Dark text for light backgrounds
    },
    {
      label: 'White',
      color: '#ffffff',
      contrastColor: 'hsl(222.2 84% 4.9%)', // Dark text
    },
    {
      label: 'Light Gray',
      color: '#f8f9fa',
      contrastColor: 'hsl(222.2 84% 4.9%)', // Dark text
    },
    {
      label: 'Dark Gray',
      color: '#343a40',
      contrastColor: 'hsl(210 40% 98%)', // Light text
    },
    {
      label: 'Black',
      color: '#000000',
      contrastColor: 'hsl(210 40% 98%)', // Light text
    },
  ],
  // Automatically apply contrast colors
  autoApplyContrastColor: true,
  // Vite configuration with GSAP/JSDOM compatibility fixes
  vite: {
    define: {
      __VUE_PROD_DEVTOOLS__: false,
      // Polyfill for GSAP in Node.js environment
      global: 'globalThis',
    },
    optimizeDeps: {
      include: ['gsap', 'gsap/Draggable']
    },
    ssr: {
      noExternal: ['gsap']
    }
  },
})