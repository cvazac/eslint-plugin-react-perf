"use strict";

var invalidFunctionExpressions = [
  { code: "<Item prop={function(){return true}} />", line: 1, column: 13 },
].map(function ({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
        type: "FunctionExpression",
      },
    ],
  };
});

var invalidArrowFunctionExpressions = [
  { code: "<Item prop={() => true} />", line: 1, column: 13 },
].map(function ({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
        type: "ArrowFunctionExpression",
      },
    ],
  };
});

var invalidNewExpressions = [
  { code: "<Item prop={new Function('a', 'alert(a)')}/>", line: 1, column: 13 },
].map(function ({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
        type: "NewExpression",
      },
    ],
  };
});

var invalidCallExpressions = [
  {
    code: "<Item onClick={this.clickHandler.bind(this)} />",
    line: 1,
    column: 16,
  },
].map(function ({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
        type: "CallExpression",
      },
    ],
  };
});

var validExpressions = [{ code: "<Item onClick={bind(foo)} />" }];

module.exports = require("../utils/common").testRule(
  "../../../lib/rules/jsx-no-new-function-as-prop",
  "jsx-no-new-function-as-prop",
  "JSX attribute values should not contain functions created in the same scope",
  "function(){}",
  "FunctionExpression",
  [].concat(
    invalidFunctionExpressions,
    invalidArrowFunctionExpressions,
    invalidNewExpressions,
    invalidCallExpressions
  ),
  validExpressions
);
