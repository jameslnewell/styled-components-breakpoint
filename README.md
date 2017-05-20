# styled-components-breakpoint

Utility functions for creating breakpoints in `styled-components` 💅.

## Installation

    npm install --save styled-components styled-components-breakpoint
    
## Usage

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

<Heading>Hello World!</Heading>

```

### Using custom breakpoints

You can customise the provided breakpoint names and values. If you would like to use the same breakpoints as [Bootstrap](https://v4-alpha.getbootstrap.com/layout/overview/#responsive-breakpoints), you can do so like this:

`./Heading.jsx`
```js
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Heading = styled.h1`

  color: #444;
  font-family: sans-serif;
  
  ${({theme}) => breakpoint('sm', theme.breakpoints)`
    font-size: 12px;
  `}
  
  ${({theme}) => breakpoint('md', theme.breakpoints)`
    font-size: 16px;
  `}
  
  ${({theme}) => breakpoint('lg', theme.breakpoints)`
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

### `breakpoint(name, [breakpoints])`

Wraps rules in a `@media` block.

**Properties:**
- `name` - A `string`. The name of a configured breakpoint.
- `breakpoints` - An `object`.

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


### `map(value, mapValueToCSS, [breakpoints])`

Maps rules at multiple breakpoints to `@media` blocks.

**Properties:**
- `value` - An `object` or `*`. A map of values to names of configured breakpoints.
- `mapValueToCSS` - A `function`. The function is called for each breakpoint and is passed the value for the specific breakpoint.
- `breakpoints` - An `object`.

**Returns:**

##### Example:

```js
import styled from 'styled-components';
import {map} from 'styled-components-breakpoint';

const Thing = styled.div`
  ${({width}) => map(width, w => `width: ${Math.round(w * 100)}%;`)}
`;

<Thing width={{mobile: 1, tablet: 1/2, desktop: 1/4}}/>

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

## Default breakpoints

These are the default breakpoints provided:

```js
{
    mobile: 0,      //targeting all devices
    tablet: 737,    //targeting devices that are larger than the iPhone 6 Plus (which is 736px in landscape mode)
    desktop: 1025   //targeting devices that are larger than the iPad (which is 1024px in landscape mode)
}
```

## Change log

### 1.0.1

Updated the docs.

### 1.0.0

New features:

- You're now able to specify breakpoints in any type of units if you use a string. Breakpoints that are numbers will still be considered to be `px` and will be converted to `ems`.

Breaking changes:

- `map(value, mapValueToCSS, [breakpoints])` will now call `mapValueToCSS` with `undefined` so you can set any necessary styles for all breakpoints when:
  - `value` is `undefined`
  - `value` is an `object`

  before:
  
  ```js
  const Grid = styled.div`
    ${({wrap}) => map(wrap, value => `flex-wrap: ${value && 'wrap' || 'nowrap'};`)}
  `;

  Grid.defaultProps = {
    wrap: true
  };

  <Grid/> //works
  <Grid wrap={true}/> //works
  <Grid wrap={false}/> //works
  <Grid wrap={{mobile: true, tablet: false}}/> //works
  
  /*
    This breaks because no value is set for the `mobile` breakpoint and CSS defaults to `nowrap`. This is easily fixed
    by manually setting `flex-wrap: wrap;` outside of the `map()` for all breakpoints... but for complex fns this may require
    additional interpolation.
   */
  <Grid wrap={{tablet: false}}/>

  ```

  after:
  
  ```js
  const Grid = styled.div`
    ${({wrap}) => map(wrap, (value = true) => `flex-wrap: ${value && 'wrap' || 'nowrap'};`)}
  `;

  <Grid/> //works
  <Grid wrap={true}/> //works
  <Grid wrap={false}/> //works
  <Grid wrap={{mobile: true, tablet: false}}/> //works

  <Grid wrap={{tablet: false}}/> //works

  ```
