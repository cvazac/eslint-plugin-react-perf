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

var ruleTester = new RuleTester()
ruleTester.run('jsx-no-new-object-as-prop', rule, {
  valid: [{
    code: '<div prop={{}} />',
    parserOptions: parserOptions
  }],
  invalid: [
    {
      code: '<Item prop={{}} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 13,
        type: 'ObjectExpression'
      }],
      parserOptions: parserOptions
    }, {
      code: '<Item prop={false || {}} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 22,
        type: 'ObjectExpression'
      }],
      parserOptions: parserOptions
    }, {
      code: '<Item prop={false ? foo : {}} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 27,
        type: 'ObjectExpression'
      }],
      parserOptions: parserOptions
    }, {
      code: '<Item prop={false ? {} : foo} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 21,
        type: 'ObjectExpression'
      }],
      parserOptions: parserOptions
    }, {
      code: '<Item prop={{foo: 123}} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 13,
        type: 'ObjectExpression'
      }],
      parserOptions: parserOptions
    },
    {
      code: '<Item prop={new Object} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 13,
        type: 'NewExpression'
      }],
      parserOptions: parserOptions
    },
    {
      code: '<Item prop={new Object()} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 13,
        type: 'NewExpression'
      }],
      parserOptions: parserOptions
    }, {
      code: '<Item prop={Object()} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 13,
        type: 'CallExpression'
      }],
      parserOptions: parserOptions
    }, {
      code: '<Item.tag prop={{}} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 17,
        type: 'ObjectExpression'
      }],
      parserOptions: parserOptions
    }
  ]
})
