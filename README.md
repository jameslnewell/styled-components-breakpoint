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

## Defaults

```js
{
    tablet: 737,    //targeting devices that are larger than the iPhone 6 Plus (which is 736px in landscape mode)
    desktop: 1025   //targeting devices that are larger than the iPad (which is 1024px in landscape mode)
}
```