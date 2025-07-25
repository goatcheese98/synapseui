// Mock for tailwindcss/resolveConfig.js to fix Histoire compatibility
export default function resolveConfig(config) {
  return {
    theme: config?.theme || {},
    plugins: config?.plugins || [],
    content: config?.content || [],
    variants: config?.variants || {},
    corePlugins: config?.corePlugins || {},
    ...config
  };
}