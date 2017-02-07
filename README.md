# styled-components-breakpoint

Utility function for using breakpoints with `styled-components`.

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
    sm: 600,
    md: 900,
    lg: 1200
  }
};

<ThemeProvider theme={theme}>
  <Heading>Hello World!</Heading>
</ThemeProvider>

```

## API

### `breakpoint(name, [breakpoints])`

Wraps rules in a breakpoint.

**Properties:**
- `name` - A `string`. Must be the name of a configured breakpoint.
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


### `map(val, fn, [breakpoints])`

Maps an object to CSS where:
  - the object keys map to breakpoint names 
  - the object values map to a value at the named breakpoint

**Properties:**
- `val` - An `object` or `*`. Object keys must be the names of configured breakpoints.
- `fn` - A `function`. The function is called for each breakpoint and is passed the object value.
- `breakpoints` - An `object`.

##### Example:

```js
import styled from 'styled-components';
import {map} from 'styled-components-breakpoint';

const Thing = styled.div`
  ${({width, theme}) => map(width, w => `width: ${Math.round(w * 100)}%;`)}
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

## Defaults

```js
{
    mobile: 0,      //targeting all devices
    tablet: 737,    //targeting devices that are larger than the iPhone 6 Plus (which is 736px in landscape mode)
    desktop: 1025   //targeting devices that are larger than the iPad (which is 1024px in landscape mode)
}
```
