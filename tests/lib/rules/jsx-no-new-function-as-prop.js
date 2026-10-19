"use strict";
const { testRule}  = require("../utils/common");

var invalidFunctionExpressions = [
  { code: "<Item prop={function(){return true}} />", line: 1, column: 13 },
].map(function ({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
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
      },
    ],
  };
});

var validExpressions = [{ code: "<Item onClick={bind(foo)} />" }];

module.exports = testRule(
  "../../../lib/rules/jsx-no-new-function-as-prop",
  "jsx-no-new-function-as-prop",
  "JSX attribute values should not contain functions created in the same scope",
  "function(){}",
  [].concat(
    invalidFunctionExpressions,
    invalidArrowFunctionExpressions,
    invalidNewExpressions,
    invalidCallExpressions
  ),
  validExpressions
);
