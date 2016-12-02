'use strict'

module.exports = require('../jsx-no-new-as-prop').createRule(
  'Prevent {...} as JSX prop values',
  'prop value should not be an Object created in render()',
  'ObjectExpression',
  'Object')
