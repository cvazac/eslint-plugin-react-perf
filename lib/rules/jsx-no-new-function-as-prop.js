"use strict";

const { checkConstructor, createRule } = require("../utils/common");

module.exports = createRule(
  "Prevent `function` as JSX prop value",
  "JSX attribute values should not contain functions created in the same scope",
  function(node) {
    if (
      node.type === "FunctionExpression" ||
      node.type === "ArrowFunctionExpression" ||
      checkConstructor(node, "Function")
    ) {
      return true;
    }

    // <Item onClick={this.clickHandler.bind(this)} />
    if (
      node.type === "CallExpression" &&
      node.callee.property &&
      node.callee.property.name === "bind"
    ) {
      return true;
    }

    return false;
  }
);
