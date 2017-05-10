'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/jsx-no-jsx-as-prop')
var RuleTester = require('eslint').RuleTester
var errorMessage = 'prop value should not be JSX created in render()'

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
ruleTester.run('jsx-no-jsx-as-prop', rule, {
  valid: [{
    code: '<div prop={this.props.jsx} />',
    parserOptions: parserOptions
  }],
  invalid: [{
    code: '<Item prop={<SubItem />}/>',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 13,
      type: 'JSXElement'
    }],
    parserOptions: parserOptions
  }, {
    code: '<Item.tag prop={<SubItem />}/>',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 17,
      type: 'JSXElement'
    }],
    parserOptions: parserOptions
  }]
})
