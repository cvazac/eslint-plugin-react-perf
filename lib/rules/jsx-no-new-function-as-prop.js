'use strict'

var isNativeElement = require('../utils/node').isNativeElement
var props = require('../utils/props')
var checkValueExpression = props.checkValueExpression
var checkConstructor = props.checkConstructor

module.exports = {
  meta: {
    docs: {
      description: 'Prevent `function` as JSX prop value',
      category: '',
      recommended: true
    },
    schema: []
  },

  create: function (context) {
    function report (node) {
      context.report(node, 'prop value should not be a function created in render()')
      return true
    }

    return {
      JSXAttribute: function (node) {
        if (!node.value || node.value.type !== 'JSXExpressionContainer' || isNativeElement(node)) {
          return
        }

        checkValueExpression(node.value.expression, function (expression) {
          if (expression.type === 'FunctionExpression') {
            return report(expression)
          }

          if (checkConstructor(expression, 'Function')) {
            return report(expression)
          }
        })
      }
    }
  }
}
