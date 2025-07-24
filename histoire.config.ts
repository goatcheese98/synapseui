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