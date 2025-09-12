import js from "@eslint/js";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react,
      prettier,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {},
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": ["off", { tabWidth: 2 }],
    },
  },
];