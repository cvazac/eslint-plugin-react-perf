'use strict'

const {checkConstructor, createRule} = require('../utils/common')

module.exports = createRule(
  'Prevent [...] as JSX prop value',
  'prop value should not be an Array created in render()',
  function(node) {
    return node.type === 'ArrayExpression' || checkConstructor(node, 'Array')
  })
