# Prevent `function` as JSX prop values (jsx-no-new-function-as-prop)

Prevent Functions that are local to the current method from being used as values of JSX props

## Rule Details

The following patterns are considered warnings:

```jsx
<Item callback={function() {}} />

<Item callback={() => {}} />

<Item callback={new Function(...)} />

<Item callback={Function(...)} />

<Item callback={this.props.callback || function() {}} />

<Item callback={this.props.callback ? this.props.callback : function() {}} />
```

The following patterns are not considered warnings:

```jsx
<Item callback={this.props.callback} />
```
