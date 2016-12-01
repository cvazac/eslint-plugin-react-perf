'use strict'

// var variableUtil = require('../util/variable')

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce style prop value is an object',
      category: '',
      recommended: false
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

      if (['ArrayExpression', 'ObjectExpression'].indexOf(expression.type) > -1) {
        return report(expression)
      }

      if (expression.callee && ['Array', 'Object'].indexOf(expression.callee.name) > -1) {
        if (['NewExpression', 'CallExpression'].indexOf(expression.type) !== -1) {
          return report(expression)
        }
      }

      // console.info('expression', expression)
    }
    function report (node) {
      context.report(node, 'prop value should not be an Object created in render()')
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

        /*

        if (node.value.expression.type === 'Identifier') {
          var variable = variableUtil.variablesInScope(context).find(function (item) {
            return item.name === node.value.expression.name
          })
          if (!variable) console.info('not found')
          if (variable) {
            // console.info('FOUND', Object.keys(variable))//, variable.scope)
          }
        }
        */
      }
    }
  }
}
