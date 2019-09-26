# Change log

### 3.0.0

#### Breaking changes

- Split `createStatic()` into two individual functions, `createBreakpoint()` and `createMap()` to improve code-splitting.
- Changed the `map()` behaviour to be a little less magic. It no longer calls the `mapValueToStyle` function with `undefined` to set a default style - you should set a default style manually.
- Increased the `desktop` breakpoint in the default breakpoints to start from larger devices
- Changed media queries to only target `screen`.
- Rewrote the library in Typescript. This is a huge enhancement for anyone using Typescript but for anyone using FlowType, you will lose typings.

#### Additions

- Increased the supported version range for `styled-components` to support `v4`
- Added a warning during development when the `valueOrValues` passed to the `map()` function aren't specified in increasing order - [#16](https://github.com/jameslnewell/styled-components-breakpoint/issues/16)
- Added a license file - [#19](https://github.com/jameslnewell/styled-components-breakpoint/issues/19)

### 2.1.0

- added the `module` field
- added badges to README

### 2.0.2

- fixed use of multiple expressions [#11](https://github.com/jameslnewell/styled-components-breakpoint/issues/11)

### 2.0.1

- added missing `./dist` files 😬

#### 2.0.0

- **breaking change:** removed support for non-numeric breakpoint values (so we can perform numerical operations on the breakpoint values)
- **breaking change:** simplified the use of custom breakpoints with `breakpoint()` and `map()` e.g. ` ${({theme}) => breakpoint('xs', theme.breakpoints)``} ` is now ` ${(breakpoint('xs')``} `
- added the `lt` param in `breakpoint(gte, lt)`
- added the `createStatic()` function
- added a handful of tests

#### 1.0.3

- changed how the package is built
- added a demo page

#### 1.0.2

- updated `peerDependency` for `styled-components` to support v3 - 👏 Thanks [@ApacheEx](https://github.com/ApacheEx) ([#10](https://github.com/jameslnewell/styled-components-breakpoint/pull/10))
- fixed a bug in the `map()` fn

#### 1.0.1

Updated the docs.

#### 1.0.0

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
