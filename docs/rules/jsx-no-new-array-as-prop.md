# Prevent `[...]` as JSX prop values (jsx-no-new-object-as-prop)

Prevent Arrays that are local to the current method from being used as values of JSX props

## Rule Details

The following patterns are considered warnings:

```jsx
<Item list={[]} />

<Item list={new Array()} />

<Item list={Array()} />

<Item list={this.props.list || []} />

<Item list={this.props.list ? this.props.list : []} />
```

The following patterns are not considered warnings:

```jsx
<Item list={this.props.list} />
```
