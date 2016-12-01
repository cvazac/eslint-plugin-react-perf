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
]

var invalidObjectCases = [
  {
    code: '<Item prop={{}} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 13,
      type: 'ObjectExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Item prop={false || {}} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 22,
      type: 'ObjectExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Item prop={false ? foo : {}} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 27,
      type: 'ObjectExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Item prop={false ? {} : foo} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 21,
      type: 'ObjectExpression'
    }],
    parserOptions: parserOptions
  },
  {
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
    code: '<Item prop={new Object()} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 13,
      type: 'NewExpression'
    }],
    parserOptions: parserOptions
  },
  {
    code: '<Item prop={Object()} />',
    errors: [{
      message: errorMessage,
      line: 1,
      column: 13,
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
      code: '<Item style={{ color: "red" }} />',
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
        '  return <Item style={styles} />;',
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
        '  return <Item style={styles} />;',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'function redDiv(props) {',
        '  return <Item style={props.styles} />;',
        '}'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'import styles from \'./styles\';',
        'function redDiv() {',
        '  return <Item style={styles} />;',
        '}'
      ].join('\n'),
      parserOptions: Object.assign({sourceType: 'module'}, parserOptions)
    },
    {
      code: [
        'import mystyles from \'./styles\';',
        'const styles = Object.assign({ color: \'red\' }, mystyles);',
        'function redDiv() {',
        '  return <Item style={styles} />;',
        '}'
      ].join('\n'),
      parserOptions: Object.assign({sourceType: 'module'}, parserOptions)
    },
    {
      code: [
        'const otherProps = { style: { color: "red" } };',
        'const { a, b, ...props } = otherProps;',
        '<Item {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'const styles = Object.assign({ color: \'red\' }, mystyles);',
        'React.createElement("Item", { style: styles });'
      ].join('\n'),
      parserOptions: Object.assign({sourceType: 'module'}, parserOptions)
    },
    {
      code: '<Item style></Item>',
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
        '<Item style={style}></Item>'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: '<Item style={undefined}></Item>',
      parserOptions: parserOptions
    },
    {
      code: [
        'const props = { style: undefined };',
        '<Item {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'const otherProps = { style: undefined };',
        'const { a, b, ...props } = otherProps;',
        '<Item {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'React.createElement("Item", {',
        '  style: undefined',
        '})'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'let style;',
        'React.createElement("Item", {',
        '  style',
        '})'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: '<Item style={null}></Item>',
      parserOptions: parserOptions
    },
    {
      code: [
        'const props = { style: null };',
        '<Item {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'const otherProps = { style: null };',
        'const { a, b, ...props } = otherProps;',
        '<Item {...props} />'
      ].join('\n'),
      parserOptions: parserOptions
    },
    {
      code: [
        'React.createElement("Item", {',
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
