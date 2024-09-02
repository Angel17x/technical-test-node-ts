const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");

module.exports = {
  env: {
    browser: true,
    node: true
  },
  globals: {
    myCustomGlobal: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module"
  },
  overrides: [
    {
      files: ["src/**/*.{js,ts}"],
      rules: {
        semi: ["warn", "always"]
      }
    },
    {
      files: ["test/**/*"],
      rules: {
        "no-console": "off"
      }
    }
  ]
};