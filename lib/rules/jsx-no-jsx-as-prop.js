'use strict'

module.exports = require('../utils/common').createRule(
  'Prevent JSX as JSX prop value',
  'prop value should not be JSX created in render()',
  function(node) {
    return node.type === 'JSXElement'
  })
