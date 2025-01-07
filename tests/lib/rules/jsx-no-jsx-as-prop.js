"use strict";
const { testRule}  = require("../utils/common");

var invalidJSXElements = [
  { code: "<Item prop={<SubItem prop={val}/>} />", line: 1, column: 13 }
].map(function({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
        type: "JSXElement"
      }
    ]
  };
});

var invalidJSXFragments = [
  { code: "<Item prop={<>SubItem</>} />", line: 1, column: 13 },
].map(function ({ code, line, column }) {
  return {
    code,
    errors: [
      {
        line,
        column,
        type: "JSXFragment",
      },
    ],
  };
});

module.exports = testRule(
  "../../../lib/rules/jsx-no-jsx-as-prop",
  "jsx-no-jsx-as-prop",
  "JSX attribute values should not contain other JSX",
  "<SubItem />",
  "JSXElement",
  [].concat(invalidJSXElements, invalidJSXFragments)
);
