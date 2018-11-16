# bulma-3pillar
Bulma themes with 3Pillar Global colors. These are not official themes, but derivative works.

# How it works

## Light Theme

- https://3pillarlabs.github.io/bulma-3pillar/default.html

### HTML

Include directly in your HTML template -

```html
<link rel="stylesheet" href="https://3pillarlabs.github.io/bulma-3pillar/default/bulma-3pillar.min.css">
```

### NPM

```bash
npm install git+ssh://git@github.com:3pillarlabs/bulma-3pillar.git
```

To import just the theme variables, in your SASS file:

```scss
@import "./node_modules/bulma-3pillar/src/default/theme";
```

To import the light Bulma theme:

```scss
@import "./node_modules/bulma-3pillar/src/default/default";
```

## Dark Theme

https://3pillarlabs.github.io/bulma-3pillar/dark.html

### HTML

Include directly in your HTML template -

```html
<link rel="stylesheet" href="https://3pillarlabs.github.io/bulma-3pillar/dark/bulma-3pillar.min.css">
```

### NPM

```bash
npm install git+ssh://git@github.com:3pillarlabs/bulma-3pillar.git
```

To import just the theme variables, in your SASS file:

```scss
@import "./node_modules/bulma-3pillar/src/dark/theme";
```

To import the dark Bulma theme:

```scss
@import "./node_modules/bulma-3pillar/src/dark/dark";
```

# LICENSE

The source code is distributed under the MIT license.
