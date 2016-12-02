'use strict'

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
      function checkValueExpression (expression) {
        if (['Literal'].indexOf(expression.type) > -1) {
          return
        }

        if (expression.type === 'LogicalExpression') {
          return checkValueExpression(expression.left) ||
            checkValueExpression(expression.right)
        }
        if (expression.type === 'ConditionalExpression') {
          return checkValueExpression(expression.consequent) ||
            checkValueExpression(expression.alternate)
        }

        if (expression.type === expressionType) {
          return report(expression)
        }

        if (expression.callee && expression.callee.name === className) {
          if (['NewExpression', 'CallExpression'].indexOf(expression.type) !== -1) {
            return report(expression)
          }
        }

        // console.info('expression', expression)
      }

      function report (node) {
        context.report(node, errorMessage)
        return true
      }

      function isNativeElement (node) {
        const nodeName = node.parent.name.name
        const firstChar = nodeName.charAt(0)
        return firstChar === firstChar.toLowerCase()
      }

      return {
        JSXAttribute: function (node) {
          if (!node.value || node.value.type !== 'JSXExpressionContainer' || isNativeElement(node)) {
            return
          }

          checkValueExpression(node.value.expression)
        }
      }
    }
  }
}

module.exports = {
  createRule: createRule
}
