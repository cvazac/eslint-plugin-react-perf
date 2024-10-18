"use strict";

var pkg = require('./package.json');

var allRules = {
  "jsx-no-new-object-as-prop": require("./lib/rules/jsx-no-new-object-as-prop"),
  "jsx-no-new-array-as-prop": require("./lib/rules/jsx-no-new-array-as-prop"),
  "jsx-no-new-function-as-prop": require("./lib/rules/jsx-no-new-function-as-prop"),
  "jsx-no-jsx-as-prop": require("./lib/rules/jsx-no-jsx-as-prop")
};

function configureAsError(rules) {
  var result = {};
  for (var key in rules) {
    if (!rules.hasOwnProperty(key)) {
      continue;
    }
    result["react-perf/" + key] = 2;
  }
  return result;
}

var plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version
  },
  rules: allRules,
  configs: {
    recommended: {
      plugins: ["react-perf"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        "react-perf/jsx-no-new-object-as-prop": 2,
        "react-perf/jsx-no-new-array-as-prop": 2,
        "react-perf/jsx-no-new-function-as-prop": 2
      }
    },
    all: {
      plugins: ["react-perf"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: configureAsError(allRules)
    }
  }
};

plugin.configs.flat = {
  recommended: {
    plugins: { "react-perf": plugin },
    rules: plugin.configs.recommended.rules,
    languageOptions: { parserOptions: plugin.configs.recommended.parserOptions },
  },
  all: {
    plugins: { "react-perf": plugin },
    rules: plugin.configs.all.rules,
    languageOptions: { parserOptions: plugin.configs.all.parserOptions },
  },
};

module.exports = plugin;
