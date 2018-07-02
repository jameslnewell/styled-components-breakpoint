# styled-components-breakpoint

![npm](https://img.shields.io/npm/v/styled-components-breakpoint.svg) ![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/styled-components-breakpoint.svg) ![npm](https://img.shields.io/npm/dm/styled-components-breakpoint.svg) [![Build Status](https://travis-ci.org/jameslnewell/styled-components-breakpoint.svg?branch=master)](https://travis-ci.org/jameslnewell/styled-components-breakpoint)

Utility functions for creating breakpoints in `styled-components` 💅.

> [Change log](https://github.com/jameslnewell/styled-components-breakpoint/blob/master/CHANGELOG.md)

> Have a look 👀 at [`styled-components-spacing`](https://github.com/jameslnewell/styled-components-spacing) and [`styled-components-grid`](https://github.com/jameslnewell/styled-components-grid) which both work well with this package.

## Installation

```bash
yarn add styled-components styled-components-breakpoint
```
    
## Usage

> [Examples](https://jameslnewell.github.io/styled-components-breakpoint/)

### Using the default breakpoints

`./Heading.jsx`

```js
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Heading = styled.h1`

  color: #444;
  font-family: sans-serif;
  
  font-size: 12px;
  
  ${breakpoint('tablet')`
    font-size: 16px;
  `}
  
  ${breakpoint('desktop')`
    font-size: 24px;
  `}
  
`;

export default Heading;

```

`./index.jsx`

```js
import React from 'react';
import Heading from './Heading';

<Heading>Hello World!</Heading>

```

### Using custom breakpoints

Breakpoints may be customised using `ThemeProvider`. For example, to use the same breakpoints as [Bootstrap](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints), you can do so like this:

`./Heading.jsx`
```js
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Heading = styled.h1`

  color: #444;
  font-family: sans-serif;
  
  ${breakpoint('sm')`
    font-size: 12px;
  `}
  
  ${breakpoint('md')`
    font-size: 16px;
  `}
  
  ${breakpoint('lg')`
    font-size: 24px;
  `}
  
`;

export default Heading;

```

`./index.jsx`

```js
import React from 'react';
import {ThemeProvider} from 'styled-components';

const theme = {
  breakpoints: { 
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
};

<ThemeProvider theme={theme}>
  <Heading>Hello World!</Heading>
</ThemeProvider>

```

## API

### `breakpoint(gte)`
### `breakpoint(gte, lt)`

Wraps styles in a `@media` block.

**Properties:**
- `gte` - Required. A `string`. The name of the breakpoint from which the styles will apply.
- `lt` - Optional. A `string`. The name of the breakpoint at which the styles will no longer apply.

**Returns:**

The `@media` block.

##### Example:
```js
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Thing = styled.div`

  font-size: 12px;

  ${breakpoint('tablet')`
    font-size: 16px;
  `};

  ${breakpoint('desktop')`
    font-size: 24px;
  `};
  
`;

<Thing/>

```

##### Output:
```css
.cESAFm {
  font-size: 12px;
}

@media (min-width: 46.0625em) {
  .cESAFm {
    font-size: 16px;
  }
}

@media (min-width: 64.0625em) {
  .cESAFm {
    font-size: 24px;
  }
}
```


### `map(value, mapValueToCSS)`

Maps values to styles in `@media` blocks.

**Properties:**
- `value` - Required. `{[string]: T}` or `T`. A map of values to breakpoint names.
- `mapValueToCSS` - Required. `T => string`. A function to map a value to styles at the specified breakpoint.

**Returns:**

The `@media` blocks.

##### Example:

```js
import styled from 'styled-components';
import {map} from 'styled-components-breakpoint';

const Thing = styled.div`
  ${({size}) => map(size, val => `width: ${Math.round(val * 100)}%;`)}
`;

<Thing size={{mobile: 1, tablet: 1/2, desktop: 1/4}}/>

```

##### Output:

```css
.cESAFm {
  width: 100%;
}

@media (min-width: 46.0625em) {
  .cESAFm {
    width: 50%;
  }
}

@media (min-width: 64.0625em) {
  .cESAFm {
    width: 25%;
  }
}
```

### `createStatic()`
### `createStatic(breakpoints)`

Creates a static set of breakpoints which aren't themable.

**Properties:**
- `breakpoints` - Optional. `{[string]: number}`. A map of breakpoint names and sizes.

**Returns:**

- an `object` containing the breakpoints, the `breakpoint` and `map` functions

##### Example:

```js
import styled from 'styled-components';
import {createStatic} from 'styled-components-breakpoint';

const breakpoints = createStatic();

const Thing = styled.div`

  font-size: 12px;

  ${breakpoints.tablet`
    font-size: 16px;
  `};

  ${breakpoints.desktop`
    font-size: 24px;
  `};
  
`;

<Thing/>

```

##### Output:

```css
.cESAFm {
  font-size: 12px;
}

@media (min-width: 46.0625em) {
  .cESAFm {
    font-size: 16px;
  }
}

@media (min-width: 64.0625em) {
  .cESAFm {
    font-size: 24px;
  }
}
```

## Default breakpoints

The default breakpoints are:

```js
{
    mobile: 0,      // targeting all devices
    tablet: 737,    // targeting devices that are larger than the iPhone 6 Plus (which is 736px in landscape mode)
    desktop: 1025   // targeting devices that are larger than the iPad (which is 1024px in landscape mode)
}
```
