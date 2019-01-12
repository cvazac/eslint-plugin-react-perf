'use strict'

const {checkConstructor, createRule} = require('../utils/common')

module.exports = createRule(
  'Prevent `function` as JSX prop value',
  'JSX attribute values should not contain functions created in the same scope',
  function(node) {
    return node.type === 'FunctionExpression' || checkConstructor(node, 'Function')
  })
