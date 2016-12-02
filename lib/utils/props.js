'use strict'

function checkValueExpression (expression, callback) {
  function _checkValueExpression (expression) {
    if (['Literal'].indexOf(expression.type) > -1) {
      return
    }

    if (expression.type === 'LogicalExpression') {
      return _checkValueExpression(expression.left) ||
        _checkValueExpression(expression.right)
    }
    if (expression.type === 'ConditionalExpression') {
      return _checkValueExpression(expression.consequent) ||
        _checkValueExpression(expression.alternate)
    }

    return callback(expression)
  }

  return _checkValueExpression(expression)
}

function checkConstructor (expression, className) {
  if (expression.callee && expression.callee.name === className) {
    if (['NewExpression', 'CallExpression'].indexOf(expression.type) !== -1) {
      return true
    }
  }
}

module.exports = {
  checkValueExpression: checkValueExpression,
  checkConstructor: checkConstructor
}
