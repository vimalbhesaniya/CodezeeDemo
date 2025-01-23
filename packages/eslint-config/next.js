const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended-legacy",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/next"),
    "plugin:@typescript-eslint/recommended",
    "turbo",
  ],
  plugins: ["sonarjs"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [".*.js", "node_modules/"],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules: {
    curly: "error",
    quotes: ["error", "double"],
    "import/no-default-export": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "no-template-curly-in-string": "error",
    "no-use-before-define": "error",
    "no-console": "error",
    "no-empty-function": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "sonarjs/todo-tag": "off",
    "no-else-return": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["case", "default"], next: "*" },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "any", prev: "directive", next: "directive" },
      {
        blankLine: "always",
        prev: ["var", "let", "const"],
        next: "*",
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["var", "let", "const"],
      },
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "if",
      },
    ],
  },
};
