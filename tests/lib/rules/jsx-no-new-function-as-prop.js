'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/jsx-no-new-function-as-prop')
var RuleTester = require('eslint').RuleTester
var errorMessage = 'prop value should not be a function created in render()'

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
ruleTester.run('jsx-no-new-function-as-prop', rule, {
  valid: [{
    code: '<div prop={this.props.callback} />',
    parserOptions: parserOptions
  }],
  invalid: [{
    code: '<Item prop={function(){}}/>',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 13,
      type: 'FunctionExpression'
    }],
    parserOptions: parserOptions
  }, {
    code: "<Item prop={new Function('a', 'alert(a)')}/>",
    errors: [{
      message: errorMessage,
      line: 1,
      column: 13,
      type: 'NewExpression'
    }],
    parserOptions: parserOptions
  }, {
    code: '<Item prop={this.props.callback || function(){}}/>',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 36,
      type: 'FunctionExpression'
    }],
    parserOptions: parserOptions
  }, {
    code: '<Item prop={this.props.callback ? this.props.callback : function(){}}/>',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 57,
      type: 'FunctionExpression'
    }],
    parserOptions: parserOptions
  }, {
    code: '<Item prop={this.props.callback ? function(){} : this.props.callback}/>',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 35,
      type: 'FunctionExpression'
    }],
    parserOptions: parserOptions
  }, {
    code: '<Item.tag prop={function(){}}/>',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 17,
      type: 'FunctionExpression'
    }],
    parserOptions: parserOptions
  }]
})
