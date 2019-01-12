'use strict'

var props = require('./props')
var checkValueExpression = props.checkValueExpression
var checkConstructor = props.checkConstructor

function createRule (description, errorMessage, expressionType, className) {
  return {
    meta: {
      docs: {
        description: description,
        category: '',
        recommended: true
      },
      schema: []
    },

    create: function (context) {
      function report (node) {
        context.report(node, errorMessage)
        return true
      }

      return {
        JSXAttribute: function (node) {
          if (!node.value || node.value.type !== 'JSXExpressionContainer') {
            return
          }

          return checkValueExpression(node.value.expression, function (expression) {
            if (expression.type === expressionType) {
              return report(expression)
            }

            if (checkConstructor(expression, className)) {
              return report(expression)
            }
          })
        }
      }
    }
  }
}

module.exports = {
  createRule: createRule
}
