/* eslint-env mocha */
"use strict";

var plugin = require("..");

var assert = require("assert");
var fs = require("fs");
var path = require("path");

var ruleFiles = fs
  .readdirSync(path.resolve(__dirname, "../lib/rules/"))
  .map(function(f) {
    return path.basename(f, ".js");
  });

describe("all rule files should be exported by the plugin", function() {
  ruleFiles.forEach(function(ruleName) {
    it("should export " + ruleName, function() {
      assert.equal(
        plugin.rules[ruleName],
        require(path.join("../lib/rules", ruleName))
      );
    });
  });
});

describe("configurations", function() {
  it("should export a 'all' configuration", function() {
    assert(plugin.configs.all);
    Object.keys(plugin.configs.all.rules).forEach(function(configName) {
      assert.equal(configName.indexOf("react-perf/"), 0);
      assert.equal(plugin.configs.all.rules[configName], 2);
    });
    ruleFiles.forEach(function(ruleName) {
      assert(Boolean(plugin.configs.all.rules["react-perf/" + ruleName]));
    });
  });
});
