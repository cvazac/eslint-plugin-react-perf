"use strict";

const { checkConstructor, createRule } = require("../utils/common");

module.exports = createRule(
  "Prevent [...] as JSX prop value",
  "JSX attribute values should not contain Arrays created in the same scope",
  function(node) {
    return node.type === "ArrayExpression" || checkConstructor(node, "Array");
  }
);
