import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,}"] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ["node_modules/*", "dist/*"] },

  // Base TypeScript configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    files: ["**/*.ts", "**/*.tsx"], // type sche will only apply to ts and tsx files
    ...tseslint.configs["recommended-type-checked"],
    ...tseslint.configs["stylistic-type-checked"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["*.astro"],
    languageOptions: {
      parser: tseslint.parser, // The Astro plugin does not require a specific parser
    },
    plugins: {
      astro: eslintPluginAstro,
    },
    rules: {
      ...eslintPluginAstro.configs.recommended.rules,
    },
  },
  {
    files: ["*.js", "*.ts", "*.astro", "*.tsx"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...prettierConfig.rules, // Disable ESLint rules that conflict with Prettier
      "prettier/prettier": "error", // Display Prettier issues as warnings
    },
  },
];
