"use strict";
const { testRule}  = require("../utils/common");

var invalidObjectExpressions = [
  { code: "<Item prop={{foo: 123}} />", line: 1, column: 13 }
].map(function({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
      }
    ]
  };
});

var invalidNewExpressions = [
  { code: "<Item prop={new Object} />", line: 1, column: 13 },
  { code: "<Item prop={new Object()} />", line: 1, column: 13 }
].map(function({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
      }
    ]
  };
});

var invalidCallExpressions = [
  { code: "<Item prop={Object()} />", line: 1, column: 13 }
].map(function({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
      }
    ]
  };
});

module.exports = testRule(
  "../../../lib/rules/jsx-no-new-object-as-prop",
  "jsx-no-new-object-as-prop",
  "JSX attribute values should not contain objects created in the same scope",
  "{}",
  [].concat(
    invalidObjectExpressions,
    invalidNewExpressions,
    invalidCallExpressions
  )
);
