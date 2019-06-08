"use strict";

var invalidArrayExpressions = [
  { code: "<Item prop={[1, 2, 3]} />", line: 1, column: 13 }
].map(function({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
        type: "ArrayExpression"
      }
    ]
  };
});

var invalidNewExpressions = [
  { code: "<Item prop={new Array} />", line: 1, column: 13 },
  { code: "<Item prop={new Array()} />", line: 1, column: 13 }
].map(function({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
        type: "NewExpression"
      }
    ]
  };
});

var invalidCallExpressions = [
  { code: "<Item prop={Array()} />", line: 1, column: 13 }
].map(function({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
        type: "CallExpression"
      }
    ]
  };
});

module.exports = require("../utils/common").testRule(
  "../../../lib/rules/jsx-no-new-array-as-prop",
  "jsx-no-new-array-as-prop",
  "JSX attribute values should not contain Arrays created in the same scope",
  "[]",
  "ArrayExpression",
  [].concat(
    invalidArrayExpressions,
    invalidNewExpressions,
    invalidCallExpressions
  )
);
