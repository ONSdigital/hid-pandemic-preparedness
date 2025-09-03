// Reccommended set-up following https://github.com/ota-meshi/eslint-plugin-astro
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";

export default [
  // Base JS/TS recommended rules
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
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
      "no-console": "off",
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
      "astro/no-conflict-set-directives": "error", // Ensure no scoping conflicts within Astro files through `set:` directives
      "astro/no-unused-define-vars-in-style": "error", // Ensure variables defined in Astro frontmatter are used in style tags
    },
  },
  {
    rules: {
      "prettier/prettier": "off", // Disable formatting rules that might conflict with Prettier
    },
  },
];
