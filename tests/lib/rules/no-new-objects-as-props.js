/**
 * @fileoverview Enforce style prop value is an object
 * @author David Petersen
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-new-objects-as-props')
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

var validDegenerateCases = [
  {
    code: '<div prop={[]} />',
    parserOptions: parserOptions
  },
  {
    code: '<div prop={{}} />',
    parserOptions: parserOptions
  }
]

var invalidArrayCases = [
  {
    code: '<Div prop={[]} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 12,
      type: 'ArrayExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={false || []} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 21,
      type: 'ArrayExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={false ? foo : []} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 26,
      type: 'ArrayExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={false ? [] : foo} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 20,
      type: 'ArrayExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={[1, 2, 3]} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 12,
      type: 'ArrayExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={new Array()} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 12,
      type: 'NewExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={Array()} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 12,
      type: 'CallExpression'
    }],
    parserOptions: parserOptions
  }/*,
  {
    code: [
      'const propValue = []',
      'function getDiv() {',
      '  return <Div prop={propValue} />',
      '}'
    ].join('\n'),
    errors: [{
      message: errorMessage,
      line: 1,
      column: 12,
      type: 'CallExpression'
    }],
    parserOptions: parserOptions
  }*/
]

var invalidObjectCases = [
  {
    code: '<Div prop={{}} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 12,
      type: 'ObjectExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={false || {}} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 21,
      type: 'ObjectExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={false ? foo : {}} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 26,
      type: 'ObjectExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={false ? {} : foo} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 20,
      type: 'ObjectExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={{foo: 123}} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 12,
      type: 'ObjectExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={new Object()} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 12,
      type: 'NewExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Div prop={Object()} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 12,
      type: 'CallExpression'
    }],
    parserOptions: parserOptions
  }
]

var ruleTester = new RuleTester()
ruleTester.run('no-prop-arrays', rule, {
  valid: []
    .concat(validDegenerateCases),
    /* {
      code: '<Div style={{ color: "red" }} />',
      parserOptions: parserOptions
    },
    {
      code: '<Hello style={{ color: "red" }} />',
      parserOptions: parserOptions
    },
    {
      code: [
        'function redDiv() {',
        '  const styles = { color: "red" };',
        '  return <Div style={styles} />;',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'function redDiv() {',
        '  const styles = { color: "red" };',
        '  return <Hello style={styles} />;',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'const styles = { color: "red" };',
        'function redDiv() {',
        '  return <Div style={styles} />;',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'function redDiv(props) {',
        '  return <Div style={props.styles} />;',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'import styles from \'./styles\';',
        'function redDiv() {',
        '  return <Div style={styles} />;',
        '}'
      ].join('\n'),
      parserOptions: Object.assign({sourceType: 'module'}, parserOptions)
    },
    {
      code: [
        'import mystyles from \'./styles\';',
        'const styles = Object.assign({ color: \'red\' }, mystyles);',
        'function redDiv() {',
        '  return <Div style={styles} />;',
        '}'
      ].join('\n'),
      parserOptions: Object.assign({sourceType: 'module'}, parserOptions)
    },
    {
      code: [
        'const otherProps = { style: { color: "red" } };',
        'const { a, b, ...props } = otherProps;',
        '<Div {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'const styles = Object.assign({ color: \'red\' }, mystyles);',
        'React.createElement("Div", { style: styles });'
      ].join('\n'),
      parserOptions: Object.assign({sourceType: 'module'}, parserOptions)
    },
    {
      code: '<Div style></Div>',
      parserOptions: parserOptions
    },
    {
      code: [
        'React.createElement(MyCustomElem, {',
        '  [style]: true',
        '}, \'My custom Elem\')'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'let style;',
        '<Div style={style}></Div>'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: '<Div style={undefined}></Div>',
      parserOptions: parserOptions
    },
    {
      code: [
        'const props = { style: undefined };',
        '<Div {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'const otherProps = { style: undefined };',
        'const { a, b, ...props } = otherProps;',
        '<Div {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'React.createElement("Div", {',
        '  style: undefined',
        '})'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'let style;',
        'React.createElement("Div", {',
        '  style',
        '})'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: '<Div style={null}></Div>',
      parserOptions: parserOptions
    },
    {
      code: [
        'const props = { style: null };',
        '<Div {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'const otherProps = { style: null };',
        'const { a, b, ...props } = otherProps;',
        '<Div {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'React.createElement("Div", {',
        '  style: null',
        '})'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'const MyComponent = (props) => {',
        '  React.createElement(MyCustomElem, {',
        '    ...props',
        '  });',
        '};'
      ].join('\n'),
      parserOptions: parserOptions
    } */
  invalid: []
    .concat(invalidArrayCases)
    .concat(invalidObjectCases)
})
