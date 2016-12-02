'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/jsx-no-new-array-as-prop')
var RuleTester = require('eslint').RuleTester
var errorMessage = 'prop value should not be an Array created in render()'

var parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalArrayRestSpread: true,
    jsx: true
  }
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('jsx-no-new-array-as-prop', rule, {
  valid: []
    .concat({
      code: '<div prop={[]} />',
      parserOptions: parserOptions
    }),

  invalid: []
    .concat([
      {
        code: '<Item prop={[]} />',
        errors: [{
          message: errorMessage,
          line: 1,
          column: 13,
          type: 'ArrayExpression'
        }],
        parserOptions: parserOptions
      },
      {
        code: '<Item prop={false || []} />',
        errors: [{
          message: errorMessage,
          line: 1,
          column: 22,
          type: 'ArrayExpression'
        }],
        parserOptions: parserOptions
      },
      {
        code: '<Item prop={false ? foo : []} />',
        errors: [{
          message: errorMessage,
          line: 1,
          column: 27,
          type: 'ArrayExpression'
        }],
        parserOptions: parserOptions
      },
      {
        code: '<Item prop={false ? [] : foo} />',
        errors: [{
          message: errorMessage,
          line: 1,
          column: 21,
          type: 'ArrayExpression'
        }],
        parserOptions: parserOptions
      },
      {
        code: '<Item prop={[1, 2, 3]} />',
        errors: [{
          message: errorMessage,
          line: 1,
          column: 13,
          type: 'ArrayExpression'
        }],
        parserOptions: parserOptions
      },
      {
        code: '<Item prop={new Array()} />',
        errors: [{
          message: errorMessage,
          line: 1,
          column: 13,
          type: 'NewExpression'
        }],
        parserOptions: parserOptions
      },
      {
        code: '<Item prop={Array()} />',
        errors: [{
          message: errorMessage,
          line: 1,
          column: 13,
          type: 'CallExpression'
        }],
        parserOptions: parserOptions
      }
    ])
})
