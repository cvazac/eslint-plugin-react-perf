"use strict";

function testRule(
  path,
  ruleName,
  errorMessage,
  ruleCode,
  ruleType,
  invalid,
  valid
) {
  var rule = require(path);
  var RuleTester = require("eslint").RuleTester;

  var parserOptions = {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  };

  invalid = [
    { code: `<div style={${ruleCode}} />`, line: 1, column: 13 },
    {
      code: `<div style={${ruleCode}} />`,
      options: [{ nativeAllowList: ["styleX"] }],
      line: 1,
      column: 13,
    },
    { code: `<Item prop={${ruleCode}} />`, line: 1, column: 13 },
    { code: `<Item.tag prop={${ruleCode}} />`, line: 1, column: 17 },
    { code: `<Item prop={${ruleCode} || true} />`, line: 1, column: 13 },
    { code: `<Item prop={false || ${ruleCode}} />`, line: 1, column: 22 },
    { code: `<Item prop={false ? foo : ${ruleCode}} />`, line: 1, column: 27 },
    { code: `<Item prop={false ? ${ruleCode} : foo} />`, line: 1, column: 21 },
    { code: `<Item.tag prop={${ruleCode}} />`, line: 1, column: 17 },
    { code: `var a = ${ruleCode};<Item prop={a} />`, line: 1, column: 9 },
    { code: `let a = ${ruleCode};<Item prop={a} />`, line: 1, column: 9 },
    { code: `const a = ${ruleCode};<Item prop={a} />`, line: 1, column: 11 },
    { code: `var a; a = ${ruleCode};<Item prop={a} />`, line: 1, column: 12 },
    { code: `let a; a = ${ruleCode};<Item prop={a} />`, line: 1, column: 12 },
    {
      code: `let a; a = ${ruleCode}; a = 1;<Item prop={a} />`,
      line: 1,
      column: 12,
    },
    {
      code: `let a; a = 1; a = ${ruleCode};<Item prop={a} />`,
      line: 1,
      column: 19,
    },
    {
      code: `function foo ({prop = ${ruleCode}}) {
      return <Comp prop={prop} />
    }
    `,
      line: 1,
      column: 23,
    },
    {
      code: `({prop = ${ruleCode}}) => {
      return <Comp prop={prop} />
    }
    `,
      line: 1,
      column: 10,
    },
  ]
    .map(function ({ code, options = [], line, column }) {
      return {
        code,
        options,
        errors: [
          {
            line,
            column,
            type: ruleType,
          },
        ],
      };
    })
    .concat(invalid);

  valid = [
    {
      code: `<div style={${ruleCode}} />`,
      options: [{ nativeAllowList: "all" }],
    },
    {
      code: `<div style={${ruleCode}} />`,
      options: [{ nativeAllowList: ["style"] }],
    },
    { code: "<Item prop={0} />" },
    { code: "var a;<Item prop={a} />" },
    { code: "var a;a = 1;<Item prop={a} />" },
    { code: "var a;a = a;<Item prop={a} />" },
    { code: "var a;a = b;<Item prop={a} />" },
    {
      code: `function foo ({prop1, prop2 = ${ruleCode}}) {
      return <Comp prop={prop1} />
    }`,
    },
    {
      code: `function foo ({prop1 = ${ruleCode}, prop2}) {
      return <Comp prop={prop2} />
    }`,
    },
    {
      code: `({prop1, prop2 = ${ruleCode}}) => {
      return <Comp prop={prop1} />
    }`,
    },
    {
      code: `({prop1 = ${ruleCode}, prop2}) => {
      return <Comp prop={prop2} />
    }`,
    },
  ].concat(valid || []);

  new RuleTester().run(ruleName, rule, {
    valid: valid.map(({ code, options = [] }) => {
      return {
        code,
        options,
        parserOptions,
      };
    }),
    invalid: invalid.map((e) => {
      e.parserOptions = parserOptions;
      e.errors.message = errorMessage;
      return e;
    }),
  });
}

module.exports = {
  testRule,
};
