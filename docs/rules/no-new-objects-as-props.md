# Prevent [...], {...} as JSX props (no-new-objects-as-props)

Prevent Arrays and Objects from being created in your `render()` and used as JSX props  

## Rule Details

The following patterns are considered warnings:

```jsx
<Item config={{}} />

<Item list={[]} />

<Item config={config || {}} />

<Item list={list || []} />
```

The following patterns are not considered warnings:

```jsx
<Item config={staticConfig} />

<Item list={this.props.list} />

<div style={{display: 'none'}} />
```
