'use strict'

const {checkConstructor, createRule} = require('../utils/common')

module.exports = createRule(
  'Prevent `function` as JSX prop value',
  'prop value should not be a function created in render()',
  function(node) {
    return node.type === 'FunctionExpression' || checkConstructor(node, 'Function')
  })
