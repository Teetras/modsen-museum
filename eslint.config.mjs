import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";
import simpleImportSort from "eslint-plugin-simple-import-sort";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginJest.configs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      jest: pluginJest,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "tsconfig.json",
        },
        alias: {
          map: [
            ["@", "./src"],
            ["@assets", "./src/assets"],
            ["@components", "./src/components"],
            ["@constants", "./src/constants"],
            ["@context", "./src/context"],
            ["@pages", "./src/pages"],
            ["@tests", "./src/tests"],
            ["@types", "./src/types"],
            ["@utils", "./src/utils"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  {
    ignores: ["**/node_modules/*"],
  },
];

