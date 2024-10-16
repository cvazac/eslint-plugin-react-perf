# eslint-plugin-react-perf

Performance-minded React linting rules for ESLint (motivated by [esamatti](https://twitter.com/esamatti)'s post ["React.js pure render performance anti-pattern"](https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f)).

# Installation

```sh
$ npm i eslint-plugin-react-perf
```

Add `plugins` section and specify eslint-plugin-react-perf as a plugin.

```json
{
  "plugins": ["react-perf"]
}
```

# List of supported rules

- [react-perf/jsx-no-new-object-as-prop](docs/rules/jsx-no-new-object-as-prop.md): Prevent `{...}` as JSX prop value
- [react-perf/jsx-no-new-array-as-prop](docs/rules/jsx-no-new-array-as-prop.md): Prevent `[...]` as JSX prop value
- [react-perf/jsx-no-new-function-as-prop](docs/rules/jsx-no-new-function-as-prop.md): Prevent `function` as JSX prop value
- [react-perf/jsx-no-jsx-as-prop](docs/rules/jsx-no-jsx-as-prop.md): Prevent JSX as JSX prop value

# Configuration

As of v3.3.0, each eslint-plugin-react-perf rule supports configuration to control whether native elements (lower case first letter React components) are ignored.

With this configuration, all native elements are ignored for this rule:

```json
{
  "react-perf/jsx-no-new-object-as-prop": [
    "error",
    {
      "nativeAllowList": "all"
    }
  ]
}
```

With this configuration, the "style" attribute is ignored for native elements for this rule:

```json
{
  "react-perf/jsx-no-new-object-as-prop": [
    "error",
    {
      "nativeAllowList": ["style"]
    }
  ]
}
```

## Recommended

This plugin exports a `recommended` configuration that enforce React good practices.

### Flat configuration

To enable this configuration add the following to your eslint.config.js:
```js
import reactPerfPlugin from 'eslint-plugin-react-perf';

const config = [
  reactPerfPlugin.configs.flat.recommended
];

export default config;
```

### eslintrc configuration

To enable this configuration use the `extends` property in your `.eslintrc` config file:

```js
{
  "extends": ["plugin:react-perf/recommended"]
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

The rules enabled in this configuration are:

- [react-perf/jsx-no-new-object-as-prop](docs/rules/jsx-no-new-object-as-prop.md)
- [react-perf/jsx-no-new-array-as-prop](docs/rules/jsx-no-new-array-as-prop.md)
- [react-perf/jsx-no-new-function-as-prop](docs/rules/jsx-no-new-function-as-prop.md)
- [react-perf/jsx-no-jsx-as-prop](docs/rules/jsx-no-jsx-as-prop.md)

## All

This plugin also exports an `all` configuration that includes every available rule.

### Flat configuration

To enable this configuration add the following to your eslint.config.js:
```js
import reactPerfPlugin from 'eslint-plugin-react-perf';

const config = [
  reactPerfPlugin.configs.flat.all
];

export default config;
```

### eslintrc configuration

```js
{
  "plugins": [
    "react-perf"
  ],
  "extends": ["plugin:react-perf/all"]
}
```

# Test anti-patterns in runtime

Try out [cvazac/test-ref-pattern](https://github.com/cvazac/test-ref-pattern).

# License

eslint-plugin-react-perf is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
