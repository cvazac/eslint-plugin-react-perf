# eslint-plugin-react-perf 3.4.0

Release date: 2026-10-18

This minor release adds ESLint 10 support, fixes JSX fragment detection, and improves contributor tooling and dependency maintenance.

## ESLint 10 support

The plugin now accepts ESLint 10 as a peer dependency while retaining its existing ESLint peer dependency ranges (#81). CI checks ESLint 9 and 10 on Node.js 22 and 24.

ESLint 10 requires Node.js `^20.19.0`, `^22.13.0`, or `>=24`. The plugin's declared Node.js engine range is unchanged.

## JSX fragment detection

`react-perf/jsx-no-jsx-as-prop` now detects fragment shorthand as well as JSX elements (#72):

```jsx
<Item prop={<>Content</>} />
```

**Users enabling this rule explicitly or through `all` may see new lint errors.** Review these diagnostics when upgrading.

The `recommended` preset continues to enable only the object, array, and function rules. Its settings are unchanged; the README now accurately reflects them (#55, #95). Adding `jsx-no-jsx-as-prop` to `recommended` is planned for a future major release.

## Contributor tooling and dependency updates

- Add contributor setup instructions, a Node.js/ESLint CI matrix, and weekly Dependabot updates (#95).
- Ignore generated coverage reports and limit rule-export discovery to JavaScript files (#95).
- Upgrade Mocha to 12 and adapt coverage generation to its supported CLI entry point (#91).
- Update development dependencies to address reported security vulnerabilities (#80, #87, #88, #89, #91, #92, #94, #97).
- Upgrade `actions/checkout` and `actions/setup-node` to v7 (#96).
- Correct the object-rule name in its documentation (#70).

## Versioning

Existing-rule fixes that report additional violations ship in minor releases. Additions to `recommended` ship in major releases. The fragment-detection fix follows this minor-release policy.

## Thanks

Thanks to @azat-io for ESLint 10 support, @huynhducduy for the fragment-detection fix, and everyone who reported issues and contributed improvements.
