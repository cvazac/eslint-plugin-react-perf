'use strict'

var invalidFunctionExpressions = [
  {code: '<Item prop={function(){return true}} />', line: 1, column: 13}
].map(function({code, line, column}) {
  return {
    code,
    errors: [{
      line,
      column,
      type: 'FunctionExpression'
    }]
  }
})

var invalidNewExpressions = [
  {code: "<Item prop={new Function('a', 'alert(a)')}/>", line: 1, column: 13}
].map(function({code, line, column}) {
  return {
    code,
    errors: [{
      line,
      column,
      type: 'NewExpression'
    }]
  }
})

module.exports = require('../utils/common').testRule(
  '../../../lib/rules/jsx-no-new-function-as-prop',
  'jsx-no-new-function-as-prop',
  'prop value should not be an Array created in render()',
  'function(){}',
  'FunctionExpression',
  [].concat(
    invalidFunctionExpressions,
    invalidNewExpressions))
