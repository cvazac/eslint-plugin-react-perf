eslint-plugin-react-perf
========================

Performance-minded React linting rules for ESLint

# Installation

```sh
$ npm i eslint-plugin-react-perf
```

# Configuration

Add `plugins` section and specify eslint-plugin-react-perf as a plugin.

```json
{
  "plugins": [
    "react-perf"
  ]
}
```

# List of supported rules

* [react-perf/jsx-no-new-object-as-prop](docs/rules/jsx-no-new-object-as-prop.md): Prevent {...} as JSX props
* [react-perf/jsx-no-new-array-as-prop](docs/rules/jsx-no-new-array-as-prop.md): Prevent [...] as JSX props

## Recommended

This plugin exports a `recommended` configuration that enforce React good practices.

To enable this configuration use the `extends` property in your `.eslintrc` config file:

```js
{
  "extends": ["plugin:react-perf/recommended"]
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

The rules enabled in this configuration are:

* [react-perf/jsx-no-new-object-as-prop](docs/rules/jsx-no-new-object-as-prop.md)
* [react-perf/jsx-no-new-array-as-prop](docs/rules/jsx-no-new-array-as-prop.md)

## All

This plugin also exports an `all` configuration that includes every available rule.

```js
{
  "plugins": [
    "react-perf"
  ],
  "extends": ["plugin:react-perf/all"]
}
```

# License

eslint-plugin-react-perf is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
