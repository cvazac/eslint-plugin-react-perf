"use strict";

function createRule(description, errorMessage, isViolation) {
  return {
    meta: {
      docs: {
        description,
        category: "",
        recommended: true,
      },
      schema: [
        {
          additionalProperties: false,
          properties: {
            nativeAllowList: {
              oneOf: [
                {
                  enum: ["all"],
                },
                {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              ],
            },
          },
          type: "object",
        },
      ],
    },

    create: function (context) {
      const { options } = context;
      const { nativeAllowList } = options[0] || {};
      return {
        JSXAttribute: function (node) {
          if (!node.value || node.value.type !== "JSXExpressionContainer") {
            return;
          }
          if (
            isNativeElement(node) &&
            (nativeAllowList === "all" ||
              (Array.isArray(nativeAllowList) &&
                nativeAllowList.find(function (nativeExclude) {
                  return (
                    node.name.name.toLowerCase() === nativeExclude.toLowerCase()
                  );
                })))
          ) {
            return;
          }

          var violationFound = false;
          findRelevantNodes(context, node.value.expression).forEach(function (
            node
          ) {
            if (isViolation(node)) {
              violationFound = true;
              context.report(node, errorMessage);
            }
          });
          return violationFound;
        },
      };
    },
  };
}

function findRelevantNodes(context, node) {
  function _findRelevantNodes(node) {
    if (node.type === "Literal") {
      // we have found a Literal (ex. 'foo', 1, false), bail
      return;
    }
    if (node.type === "Identifier") {
      var variable = context.getScope().variables.find(function (variable) {
        return variable.name === node.name;
      });
      if (variable) {
        variable.references.forEach(function (reference) {
          if (!reference.identifier.parent) return;
          switch (reference.identifier.parent.type) {
            case "AssignmentExpression":
              nodes.push(reference.identifier.parent.right);
              break;
            case "VariableDeclarator":
              nodes.push(reference.identifier.parent.init);
              break;
            case "AssignmentPattern":
              nodes.push(reference.identifier.parent.right);
              break;
          }
        });
      }
      return;
    }
    if (node.type === "LogicalExpression") {
      return _findRelevantNodes(node.left) || _findRelevantNodes(node.right);
    }
    if (node.type === "ConditionalExpression") {
      return (
        _findRelevantNodes(node.consequent) ||
        _findRelevantNodes(node.alternate)
      );
    }

    nodes.push(node);
  }

  var nodes = [];
  _findRelevantNodes(node);
  return nodes;
}

function checkConstructor(node, className) {
  if (node.callee && node.callee.name === className) {
    if (["NewExpression", "CallExpression"].indexOf(node.type) !== -1) {
      return true;
    }
  }
}

function isNativeElement(node) {
  if (node.parent.name.type !== "JSXIdentifier") {
    return false;
  }
  const nodeName = node.parent.name.name;
  const firstChar = nodeName.charAt(0);
  return firstChar === firstChar.toLowerCase();
}

module.exports = {
  createRule,
  checkConstructor,
};
