# Prevent `{...}` as JSX prop values (jsx-no-new-object-as-prop)

Prevent Objects that are local to the current method from being used as values of JSX props

## Rule Details

The following patterns are considered warnings:

```jsx
<Item config={{}} />

<Item config={new Object()} />

<Item config={Object()} />

<Item config={this.props.config || {}} />

<Item config={this.props.config ? this.props.config : {}} />

<div style={{display: 'none'}} />
```

The following patterns are not considered warnings:

```jsx
<Item config={staticConfig} />
```
