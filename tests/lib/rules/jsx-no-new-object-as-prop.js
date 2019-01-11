'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/jsx-no-new-object-as-prop')
var RuleTester = require('eslint').RuleTester
var errorMessage = 'prop value should not be an Object created in render()'

var parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var validExpressions = [
  '<div prop={{}} />', // TODO(cvazac) https://github.com/cvazac/eslint-plugin-react-perf/issues/10
  'var a;<div prop={a} />',
  'var a;a = 1;<div prop={a} />',
  'var a;a = a;<div prop={a} />',
  'var a;a = b;<div prop={a} />'
].map(function(code) {
  return {
    code,
    parserOptions
  }
})

var invalidObjectExpressions = [
  {code: '<Item prop={{}} />', line: 1, column: 13},
  {code: 'var a = {};<Item prop={a} />', line: 1, column: 13},
  {code: '<Item prop={false || {}} />', line: 1, column: 22},
  {code: '<Item prop={false ? foo : {}} />', line: 1, column: 27},
  {code: '<Item prop={false ? {} : foo} />', line: 1, column: 21},
  {code: '<Item prop={{foo: 123}} />', line: 1, column: 13},
  {code: '<Item.tag prop={{}} />', line: 1, column: 17}
].map(function({code, line, column}) {
  return {
    code,
    errors: [{
      message: errorMessage,
      line,
      column,
      type: 'ObjectExpression'
    }],
    parserOptions
  }
})

var invalidNewExpressions = [
  {code: '<Item prop={new Object} />', line: 1, column: 13},
  {code: '<Item prop={new Object()} />', line: 1, column: 13}
].map(function({code, line, column}) {
  return {
    code,
    errors: [{
      message: errorMessage,
      line,
      column,
      type: 'NewExpression'
    }],
    parserOptions
  }
})

var invalidCallExpressions = [
  {code: '<Item prop={Object()} />', line: 1, column: 13}
].map(function({code, line, column}) {
  return {
    code,
    errors: [{
      message: errorMessage,
      line,
      column,
      type: 'CallExpression'
    }],
    parserOptions
  }
})

new RuleTester().run('jsx-no-new-object-as-prop', rule, {
  valid: validExpressions,
  invalid: [].concat(
    invalidObjectExpressions,
    invalidNewExpressions,
    invalidCallExpressions)
})
