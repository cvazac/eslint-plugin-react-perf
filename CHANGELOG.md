# Changelog

## Unreleased

## 3.4.0 — 2026-10-18

### Added

- Support ESLint 10 while retaining the existing ESLint peer dependency ranges (#81).

### Fixed

- Detect JSX fragments passed as props with `jsx-no-jsx-as-prop` (#72). Users enabling this rule explicitly or through `all` may see new lint errors for code such as `<Item prop={<>Content</>} />`.
- Correct the README to match the three rules enabled by `recommended`: object, array, and function props. `jsx-no-jsx-as-prop` remains opt-in (#55, #95).
- Correct the object-rule name in its documentation (#70).

### Development

- Add contributor instructions and CI for ESLint 9 and 10 on Node.js 22 and 24 (#95).
- Configure weekly npm and GitHub Actions dependency updates (#95).
- Ignore generated coverage reports and restrict rule-export discovery to JavaScript files (#95).
- Upgrade Mocha to 12 and update the coverage command to use `mocha.js` (#91).
- Update development dependencies, including js-yaml, Handlebars, @humanfs/node, serialize-javascript, brace-expansion, minimatch, and flatted (#80, #87, #88, #89, #91, #92, #94, #97).
- Upgrade the checkout and setup-node GitHub Actions to v7 (#96).

Historical release entries will be reconstructed separately.
