# Contributing

Use Node.js 22.13+ (22.x) or Node.js 24.x to work on this repository. This is the development toolchain requirement; it does not change the published plugin's Node.js engine range.

## Setup and checks

```sh
npm ci
npm test
npm run lint
npm run test:coverage
npm pack --dry-run
```

`npm ci` installs the exact locked dependencies. CI runs the suite on Node.js 22 and 24 with ESLint 9 and 10. Run the default checks before changing dependency versions. Coverage output goes in `reports/`, which is ignored by Git and ESLint.

For ESLint 9 validation, use a separate checkout and install temporary overrides:

```sh
npm install --no-save --package-lock=false eslint@9 @eslint/js@9
npm test
npm run lint
```

Use `npm ci` to restore the locked toolchain afterward. Do not commit compatibility-test overrides.

## Rule changes

Rule implementations live in `lib/rules/`, shared analysis in `lib/utils/`, tests in `tests/`, and rule documentation in `docs/rules/`. Add valid and invalid examples for behavior changes. Update the relevant rule documentation and the Unreleased section of `CHANGELOG.md`.

## Dependency updates

Dependabot checks npm and GitHub Actions weekly. Minor and patch development updates are grouped; major npm updates remain separate. Security updates may arrive separately from scheduled version updates.

Review dependency changes and run the checks above. Use `npm audit` for the full development tree and `npm audit --omit=dev` for production dependencies. Audit findings require triage; do not use forced upgrades without reviewing breaking changes.

## Releases

`CHANGELOG.md` records user-facing changes; `RELEASE_NOTES.md` holds the upcoming release draft. Historical reconstruction will be handled separately.

Proposed versioning policy: patches do not intentionally add lint errors; minor versions may add diagnostics through existing-rule fixes; major versions may enable additional rules in `recommended` or change compatibility requirements.

Before publishing, review remaining dependency findings, confirm CI, inspect `npm pack --dry-run`, finalize release notes, and update the version in both package files. Publishing to npm and creating the release/tag are separate maintainer actions.
