const pluginVue = require("eslint-plugin-vue");

module.exports = [
  { files: ["**/*.ts"], languageOptions: { parser: require("@typescript-eslint/parser"), parserOptions: { sourceType: "module" } } },
  ...pluginVue.configs["flat/recommended"],
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      ".histoire/**",
    ],
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: require("vue-eslint-parser"),
      parserOptions: {
        parser: require.resolve("@typescript-eslint/parser"),
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
    rules: {
      "vue/multi-word-component-names": "warn",
    },
  },
];