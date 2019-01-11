'use strict'

const {checkConstructor, createRule} = require('../utils/common')

module.exports = createRule(
  'Prevent {...} as JSX prop value',
  'prop value should not be an Object created in render()',
  function(node) {
    return node.type === 'ObjectExpression' || checkConstructor(node, 'Object')
  })
