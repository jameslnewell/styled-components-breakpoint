# styled-components-breakpoint

![npm](https://img.shields.io/npm/v/styled-components-breakpoint.svg) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/styled-components-breakpoint.svg) ![npm](https://img.shields.io/npm/dm/styled-components-breakpoint.svg) [![Build Status]![GithubActions](https://github.com/jameslnewell/styled-components-breakpoint/workflows/main/badge.svg)](https://github.com/jameslnewell/styled-components-breakpoint/actions)

Utility functions for creating breakpoints in `styled-components` 💅.

> 🕸 [Website](https://jameslnewell.github.io/styled-components-breakpoint/)

> 📘 [Change log](https://github.com/jameslnewell/styled-components-breakpoint/blob/master/CHANGELOG.md)

> 👀 Have a look at [`styled-components-spacing`](https://github.com/jameslnewell/styled-components-spacing) and [`styled-components-grid`](https://github.com/jameslnewell/styled-components-grid) which both work well with this package.

## Installation

NPM:

```
npm install styled-components-breakpoint
```

Yarn:

```bash
yarn add styled-components-breakpoint
```

## Usage

### Using the themable mixins

```jsx
import styled from 'styled-components';
import breakpoint, {map} from 'styled-components-breakpoint';

const Heading = styled.h1`
  color: #444;
  font-family: sans-serif;
  font-size: 12px;

  ${breakpoint('md')`
    font-size: 16px;
  `}

  ${breakpoint('xl')`
    font-size: 24px;
  `}

  ${map({mobile: 'red', desktop: 'green'}, color => `color: ${color};`)}

`;
```

### Using custom breakpoints for the themable mixins

The themable breakpoints can be customised using `ThemeProvider`. For example, to use the same breakpoints as [Bootstrap](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints), you can do so like this:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';

const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>{/* ... */}</ThemeProvider>,
  document.getElementById('app'),
);
```

If you're using Typescript, you'll also need to define the breakpoints and spacings on the theme.

`styled.d.ts`

```tsx
import {DefaultTheme} from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      [name in 'xs' | 'sm' | 'md' | 'lg' | 'xl']: number;
    };
  }
}
```

### Using the mixin factories

If your breakpoints and spacings don't need to be themable then you can use the static mixin factories.

`breakpoints.js`: Configure the breakpoints

```jsx
import styled from 'styled-components';
import {createBreakpoint, createMap} from 'styled-components-breakpoint';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const breakpoint = createBreakpoint(breakpoints);
const map = createMap(breakpoints);

const Heading = styled.h1`
  color: #444;
  font-family: sans-serif;
  font-size: 12px;

  ${breakpoint('md')`
    font-size: 16px;
  `}

  ${breakpoint('xl')`
    font-size: 24px;
  `}

  ${map({md: 'red', xl: 'green'}, color => `color: ${color};`)}

`;
```

## API

### breakpoint(a, b)

Generate a media query using using the set of breakpoints defined in the theme.

**Parameters:**

- `a` - Required - The breakpoint name at which the style applies.
- `b` - Optional - The breakpoint name at which the style stops applying.

**Example:**

```jsx
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const Heading = styled.h1`
  font-size: 12px;
  ${breakpoint('tablet')`
    font-size: 16px;
  `}
  ${breakpoint('desktop')`
    font-size: 24px;
  `}
`;

// font-size will increase/decrease with the window size
<Heading>The quick brown fox jumps over the lazy dog</Heading>;
```

### map(valueOrValues, mapValueToStyle)

Map a set of values to a set of media queries using the set of breakpoints defined in the theme.

**Parameters:**

- `valueOrValues` - Required - The value or a map of values to style at each breakpoint.
- `mapValueToStyle` - Required - The function used to map a value to style.

**Example:**

```jsx
import styled from 'styled-components';
import {map} from 'styled-components-breakpoint';

const sizes = {
  sm: '12px',
  md: '16px',
  lg: '20px',
}

const fontSize = ({size}) => map(size, s => `font-size: ${sizes[s]};`);

export const Heading = styled.h1`
  ${fontSize}
`;

// font-size will always remain the same size
<Heading size="sm">The quick brown fox jumps over the lazy dog</Heading>

// font-size will increase/decrease with the window size
<Heading size={{mobile: 'sm', tablet: 'lg'}}>The quick brown fox jumps over the lazy dog</Heading>
```

### createBreakpoint(breakpoints)

Create a `breakpoint(a, b)` function to generate a media query using a set of pre-defined breakpoints.

**Parameters:**

- `breakpoints` - Required - A set of breakpoints.

**Example:**

```js
import {createBreakpoint} from 'styled-components-breakpoint';

export const breakpoint = createBreakpoint({
  xs: 0,
  sm: 300,
  md: 600,
  lg: 900,
  xl: 1200,
});
```

### createMap(breakpoints)

Create a `map(valueOrValues, mapValueToStyle)` function to map a set of values to a set of media queries using a set of pre-defined breakpoints.

**Parameters:**

- `breakpoints` - Required - A set of breakpoints.

**Example:**

```js
import {createMap} from 'styled-components-breakpoint';

export const map = createMap({
  xs: 0,
  sm: 300,
  md: 600,
  lg: 900,
  xl: 1200,
});
```

## Default breakpoints

If you don't provide any breakpoints, the default breakpoints used by the `breakpoint()` and `map()` functions are:

| Breakpoint | Size                   | Description                                                                                 |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------------- |
| `mobile`   | `0px` (`0em`)          | Targeting all devices                                                                       |
| `tablet`   | `737px` (`46.0625em`)  | Targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode) |
| `desktop`  | `1195px` (`74.6875em`) | Targeting devices that are LARGER than the 11" iPad Pro (which is 1194px in landscape mode) |

## FAQ

### Q. How do I use CSS objects?

```jsx
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const RainbowButton = styled.button(
  {
    color: 'white',
    backgroundColor: 'red',
  },
  breakpoint('tablet')({
    backgroundColor: 'blue',
  }),
  breakpoint('desktop')({
    backgroundColor: 'green',
  }),
);

<RainbowButton>I am RGB!</RainbowButton>;
```
