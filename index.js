'use strict'

var allRules = {
  'no-new-objects-as-props': require('./lib/rules/no-new-objects-as-props')
}

function configureAsError (rules) {
  var result = {}
  for (var key in rules) {
    if (!rules.hasOwnProperty(key)) {
      continue
    }
    result['react-perf/' + key] = 2
  }
  return result
}

module.exports = {
  rules: allRules,
  configs: {
    all: {
      plugin: [
        'react-perf'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: configureAsError(allRules)
    }
  }
}
