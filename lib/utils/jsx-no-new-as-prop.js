'use strict'

var isNativeElement = require('./node').isNativeElement
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
        MethodDefinition: function() {
          console.info('MethodDefinition', arguments.length, arguments[0].loc)
          debugger;
        },
        FunctionDeclaration: function() {
          console.info('FunctionDeclaration', arguments.length, arguments[0].loc)
          debugger;
        },
        FunctionExpression: function() {
          console.info('FunctionExpression', arguments.length, arguments[0].loc)
          debugger;
        },
        JSXAttribute: function (node) {
          if (!node.value || node.value.type !== 'JSXExpressionContainer' || isNativeElement(node)) {
            return
          }

          console.info('1')
          debugger;
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
