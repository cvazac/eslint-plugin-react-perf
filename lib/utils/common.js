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
            ignoreComponents: {
              type: "array",
              items: {
                type: "string",
              },
            },
            ignoreSources: {
              type: "array",
              items: {
                oneOf: [
                  { type: "string" },
                  {
                    type: "object",
                    properties: {
                      source: {
                        type: "string",
                      },
                      importNames: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                    additionalProperties: false,
                  },
                ],
              },
            },
          },
          type: "object",
        },
      ],
    },

    create: function (context) {
      const { options } = context;
      const { nativeAllowList, ignoreComponents, ignoreSources } =
        options[0] || {};

      const sourceMap = new Map();
      const ignoreComponentsSet = new Set();

      if (ignoreComponents) {
        ignoreComponents.forEach((component) => {
          ignoreComponentsSet.add(component);
        });
      }

      const ignoreSourcesSet = new Set();

      if (ignoreSources) {
        ignoreSources.forEach((config) => {
          if (typeof config === "string") {
            ignoreSourcesSet.add(config);
          } else {
            config.importNames.forEach((importName) => {
              ignoreSourcesSet.add(
                hashSourceAndImportName(config.source, importName)
              );
            });
          }
        });
      }

      return {
        ImportDeclaration: function (node) {
          node.specifiers.forEach((specifier) => {
            sourceMap.set(specifier.local.name, [
              node.source.value,
              specifier.imported.name,
            ]);
          });
        },
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

          if (ignoreComponentsSet.has(node.parent.name.name)) {
            return;
          }

          if (ignoreSources) {
            const source = sourceMap.get(node.parent.name.name);

            if (
              source &&
              (ignoreSourcesSet.has(source[0]) ||
                ignoreSourcesSet.has(
                  hashSourceAndImportName(source[0], source[1])
                ))
            ) {
              return;
            }
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
      const sourceCode = context.sourceCode || context.getSourceCode();
      const scope = sourceCode.getScope
        ? sourceCode.getScope(node)
        : context.getScope();

      var variable = scope.variables.find(function (variable) {
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

function hashSourceAndImportName(source, importName) {
  return source + "%%%" + importName;
}

module.exports = {
  createRule,
  checkConstructor,
};
