# Prevent JSX as JSX prop values (jsx-no-jsx-as-prop)

Prevent JSX that are local to the current method from being used as values of JSX props

## Rule Details

The following patterns are considered warnings:

```jsx
<Item jsx={<SubItem />} />

<Item jsx={this.props.jsx || <SubItem />} />

<Item jsx={this.props.jsx ? this.props.jsx : <SubItem />} />
```

The following patterns are not considered warnings:

```jsx
<Item callback={this.props.jsx} />
```
