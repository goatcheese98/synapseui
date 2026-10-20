import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  theme: {
    title: 'Synapse UI',
    logo: { light: './src/assets/synapse-light.svg', dark: './src/assets/synapse-dark.svg' },
    colors: { primary: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#52525b', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b' } }
  },
  plugins: [
    HstVue(),
    // Override built-in plugins to disable tailwind-tokens
    {
      name: 'tailwind-tokens',
      generate: () => {}
    }
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
    },
    // Resolve tailwind compatibility issue
    resolve: {
      alias: {
        'tailwindcss/resolveConfig.js': './tailwind-resolve-config-mock.js',
        'tailwindcss/resolveConfig': './tailwind-resolve-config-mock.js'
      }
    }
  },
})