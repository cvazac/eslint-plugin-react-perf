# Changelog

## Unreleased

### Added

- ESLint 10 support (PR #81).

### Fixed

- Detect JSX fragments passed as props with `jsx-no-jsx-as-prop` (PR #72). This can produce new diagnostics when that rule is enabled explicitly or through `all`.
- Correct the README: `recommended` enables the object, array, and function rules. `jsx-no-jsx-as-prop` remains opt-in (issue #55).
- Update development dependency lockfile entries for js-yaml security fixes (PR #80).

### Development

- Add contributor instructions and CI for ESLint 9/10 on Node.js 22/24.
- Configure weekly npm and GitHub Actions dependency updates.
- Ignore generated coverage reports and restrict rule-export discovery to JavaScript files.
- Update development dependencies through PRs #87, #88, and #89.

Historical release entries will be reconstructed separately.
