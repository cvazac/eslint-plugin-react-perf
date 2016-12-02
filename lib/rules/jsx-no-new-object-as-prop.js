'use strict'

module.exports = require('../utils/jsx-no-new-as-prop').createRule(
  'Prevent {...} as JSX prop value',
  'prop value should not be an Object created in render()',
  'ObjectExpression',
  'Object')
