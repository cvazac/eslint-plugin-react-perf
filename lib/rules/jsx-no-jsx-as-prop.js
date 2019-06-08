"use strict";

module.exports = require("../utils/common").createRule(
  "Prevent JSX as JSX prop value",
  "JSX attribute values should not contain other JSX",
  function(node) {
    return node.type === "JSXElement";
  }
);
