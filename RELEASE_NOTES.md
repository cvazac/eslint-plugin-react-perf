# Draft release notes

Status: draft for proposed version 3.4.0. ESLint 10 support (#81) is merged. Confirm the final version and publication date before release.

## Changes

- Add ESLint 10 support. Rule tests and preset smoke checks passed against ESLint 9 and 10.
- Fix `jsx-no-jsx-as-prop` to detect fragment shorthand such as `<Item prop={<>Content</>} />` (PR #72). Users enabling this rule explicitly or through `all` may see new lint errors.
- Correct the documented `recommended` rule list. The preset still enables only the object, array, and function rules; its settings have not changed.
- Update development dependency lockfile entries for js-yaml security fixes (PR #80).

## Compatibility

ESLint 10 requires Node.js ^20.19.0, ^22.13.0, or >=24. This is ESLint 10's requirement; this release does not intentionally raise the plugin's Node.js minimum.

## Versioning

Proposed policy: existing-rule fixes that report additional violations ship in minor releases; additions to `recommended` ship in major releases. The fragment fix is included in proposed version 3.4.0. Adding `jsx-no-jsx-as-prop` to `recommended` is planned for a future major release and is not part of this release.

## Release checklist

- PR #81 is merged with a backwards-compatible own-property check.
- Validate rule tests, preset integration, lint, and package contents on ESLint 9 and 10 using supported Node.js versions.
- Review full and production-only dependency audit results.
- Confirm the js-yaml fixes remain in the merged lockfile.
- Select the release version, update package metadata, and finalize these notes before publishing.
