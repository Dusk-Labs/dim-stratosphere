module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["plugin:react/recommended", "standard"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-native"],
  rules: {
    "react-native/no-inline-styles": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" },
    ],
    "comma-dangle": ["error", "always-multiline"],
    "no-unused-vars": ["warn", { args: "none" }],
    "multiline-ternary": [1, "never"],
    "react/react-in-jsx-scope": "off",
    "import/newline-after-import": ["error", { count: 1 }],
  },
};
