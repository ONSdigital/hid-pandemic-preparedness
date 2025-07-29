// Reccommended set-up following https://github.com/ota-meshi/eslint-plugin-astro
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  // Base JS/TS recommended rules
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-undef": "error", // catch undefined variables
    },
  },

  // Astro plugin recommended config (includes base rules + recommended rules)
  ...eslintPluginAstro.configs["flat/recommended"],

  // Accessibility rules extended for Astro components
  ...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],

  // Override for .astro files specifically
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
        project: "./tsconfig.json", // Ensure this tsconfig includes astro files (else use a dedicated tsconfig.eslint.json)
      },
    },
    rules: {
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",
    },
  },
  {
    rules: {
      "prettier/prettier": "off", // Disable formatting rules that might conflict with Prettier
    },
  },
];
