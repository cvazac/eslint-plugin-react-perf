const js = require("@eslint/js");
const globals = require("globals");

const config = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "space-before-function-paren": 0
    },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    }
  }
];

module.exports = config;
