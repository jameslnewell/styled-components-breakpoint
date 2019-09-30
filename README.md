# styled-components-breakpoint

![npm](https://img.shields.io/npm/v/styled-components-breakpoint.svg) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/styled-components-breakpoint.svg) ![npm](https://img.shields.io/npm/dm/styled-components-breakpoint.svg) [![Build Status](https://travis-ci.org/jameslnewell/styled-components-breakpoint.svg?branch=master)](https://travis-ci.org/jameslnewell/styled-components-breakpoint)

Utility functions for creating breakpoints in `styled-components` 💅.

> [Change log](https://github.com/jameslnewell/styled-components-breakpoint/blob/master/CHANGELOG.md)

> Have a look 👀 at [`styled-components-spacing`](https://github.com/jameslnewell/styled-components-spacing) and [`styled-components-grid`](https://github.com/jameslnewell/styled-components-grid) which both work well with this package.

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

`Heading.js`: Create a component using some breakpoints

```jsx
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const Heading = styled.h1`
  color: #444;
  font-family: sans-serif;
  font-size: 12px;

  ${breakpoint('md')`
    font-size: 16px;
  `}

  ${breakpoint('xl')`
    font-size: 24px;
  `}
`;
```

`App.js`: Configure the breakpoints

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';
import {Heading} from './Heading';

const theme = {
  breakpoints: {
    xs: 0,
    sm: 300,
    md: 600,
    lg: 900,
    xl: 1200,
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Heading>Hello World!</Heading>
  </ThemeProvider>,
  document.getElementById('app'),
);
```

## API

### breakpoint(a, b)

Generate a media query using using the set of breakpoints defined in the `styled-components` theme.

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

Map a set of values to a set of media queries using the set of breakpoints defined in the `styled-components` theme.

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

export const Heading = styled.h1`
  ${({size}) => map(size, s => `font-size: ${sizes[s]};`)}
`;

// font-size will remain the same size
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

### defaults

If you don't provide any breakpoints, the default breakpoints that are used by the `breakpoint()` and `map()` functions are are:

```js
export const defaults = {
  // targeting all devices
  mobile: 0,

  // targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode)
  tablet: 737,

  // targeting devices that are LARGER than the 11" iPad Pro (which is 1194px in landscape mode)
  desktop: 1195,
};
```

## How to

### Using Typescript

[Follow the `styled-components` documentation for setting up a theme](https://www.styled-components.com/docs/api#typescript). Be sure to include some breakpoints in the type definition!

1. Create the declaration file:

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

2. Create the theme:

   `theme.ts`

   ```tsx
   import {DefaultTheme} from 'styled-components';

   export const theme: DefaultTheme = {
     breakpoints: {
       xs: 0,
       sm: 300,
       md: 600,
       lg: 900,
       xl: 1200,
     },
   };
   ```

3. Use the theme in your application:

   `App.js`

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import {ThemeProvider} from 'styled-components';
   import {theme} from './theme';

   ReactDOM.render(
     <ThemeProvider theme={theme}>
       {/* other components go here */}
     </ThemeProvider>,
     document.getElementById('app'),
   );
   ```
