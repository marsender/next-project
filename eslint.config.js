// /opt/git/marsender/next-project/eslint.config.js
import globals from "globals";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginPlaywright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";
import next from "eslint-config-next"; // This imports the flat config array from eslint-config-next

export default tseslint.config(
  // Base Next.js configuration.
  // This array includes configurations for React, TypeScript, etc.,
  // and replaces the old "next/core-web-vitals" and "next/typescript" extends.
  ...next,

  // Unicorn plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...eslintPluginUnicorn.configs.recommended,
    rules: {
      "unicorn/no-null": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prefer-string-raw": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          "allowList": {
            "e2e": true
          },
          "replacements": {
            "props": false,
            "ref": false,
            "params": false
          }
        }
      ]
    }
  },

  // Simple Import Sort plugin configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
    }
  },

  // Playwright plugin configuration for test files
  {
    files: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
    ...eslintPluginPlaywright.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "playwright/no-conditional-in-test": "off",
    }
  },

  // TypeScript specific rules.
  // `tseslint.config` already sets up the parser and recommended TS rules.
  // This block is for custom overrides for TypeScript files.
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    }
  },

  // Custom rules that were previously in .eslintrc.json
  // This includes rules from `plugin:import/recommended` that were overridden.
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "import/no-named-as-default": "off",
    }
  }
);