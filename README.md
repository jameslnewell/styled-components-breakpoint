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

```js
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const Heading = styled.h1`
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
```

## API

### breakpoint(a, b)

Define styles at a particular breakpoint.

### map(valueOrValues, mapValueToStyle)

Define styles across multiple breakpoints.

### createBreakpoint(breakpoints)(a, b)

Create a `breakpoint()` function for a static set of breakpoints.

### createMap(breakpoints)(valueOrValues, mapValueToStyle)

Create a `map()` function for a static set of breakpoints.

### defaults

The default breakpoints.
