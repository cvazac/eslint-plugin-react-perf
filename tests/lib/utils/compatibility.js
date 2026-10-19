"use strict";

const assert = require("assert");
const { createRule } = require("../../../lib/utils/common");

describe("legacy ESLint context compatibility", function() {
  it("uses legacy source and scope APIs and skips detached references", function() {
    const value = { type: "ObjectExpression" };
    const identifier = { type: "Identifier", name: "config" };
    const reports = [];
    let sourceReads = 0;
    let scopeReads = 0;
    const rule = createRule("test", "unstable prop", node => node === value);
    const visitor = rule.create({
      options: [],
      getSourceCode() {
        sourceReads++;
        return {};
      },
      getScope() {
        scopeReads++;
        return {
          variables: [{
            name: "config",
            references: [
              { identifier: {} },
              { identifier: { parent: { type: "VariableDeclarator", init: value } } }
            ]
          }]
        };
      },
      report(node, message) {
        reports.push({ node, message });
      }
    });

    visitor.JSXAttribute({
      value: { type: "JSXExpressionContainer", expression: identifier },
      parent: { name: { type: "JSXIdentifier", name: "Item" } }
    });

    assert.strictEqual(sourceReads, 1);
    assert.strictEqual(scopeReads, 1);
    assert.deepStrictEqual(reports, [{ node: value, message: "unstable prop" }]);
  });
});
