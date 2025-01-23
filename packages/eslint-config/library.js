const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended-legacy",
  ],
  plugins: ["sonarjs"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [".*.js", "node_modules/", "dist/"],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
  rules: {
    curly: "error",
    quotes: ["error", "double"],
    "import/no-default-export": "off",
    "sonarjs/todo-tag": "off",
    "no-template-curly-in-string": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "no-use-before-define": "error",
    "no-console": "error",
    "no-empty-function": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
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
