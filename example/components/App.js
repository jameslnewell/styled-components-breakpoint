import React from 'react';
import createComponentFromTagProp from 'react-create-component-from-tag-prop';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import breakpoint, { map } from 'styled-components-breakpoint';

const BOOTSTRAP_BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

/* eslint-disable no-unused-expressions */
injectGlobal`

  body {

    margin: auto;
    padding: 0 1em;
    min-width: 500px;
    max-width: 800px;

    color: #444;
    font-size: 0.9em;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;

    ${breakpoint('tablet') `
      font-size: 1em;
    `({})}
    
    ${breakpoint('desktop') `
      font-size: 1.1em;
    `({})}
    
  }

`;
/* eslint-enable no-unused-expressions */

const whitelistedDiv = createComponentFromTagProp({
  tag: 'div',
  propsToOmit: ['name', 'color', 'operator', 'visible']
});

const Main = styled.main`
`;

const H1 = styled.h1`
  margin: 1em 0;
`;

const H2 = styled.h2`
  margin: 1em 0;
`;

const P = styled.p`
  margin: 1em 0;
`;

const Instruction = styled.blockquote`
  margin: 1em 3em;
  font-size: 0.9em;
  font-weight: bold;
  text-align: right;
`;

const Breakpoint = styled(whitelistedDiv) `
  display: flex;
  align-items: center;
  padding: 1em;
  :after {
    content: '❌';
    text-align: right;
  }
  ${({ gte, lt }) => breakpoint(gte, lt) `
    background-color: ${({ color }) => color};
    :after {
      content: '✅';
    }
  `}
`;

const BreakpointMap = styled(whitelistedDiv) `
  display: flex;
  align-items: center;
  padding: 1em;
  :after {
    content: '✅';
    text-align: right;
  }
  ${({ color }) => map(color, (val = 'transparent') => {
    return `background-color: ${val};`;
  })}
`;

const BreakpointTitle = styled.div`
  flex-shrink: 0;
  width: 5em;
  font-weight: bold;
  ${({ text = {} }) => map(text, (val = '') => {
    return `:before {
      content: '${val}';
    }`;
  })}
`;

const BreakpointCode = styled.pre`
  margin-right: 1em;
  flex-grow: 1;
  color: #666;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default function App() {
  return (
    <Main>
      <H1>styled-components-breakpoint</H1>

      <H2 id="default-breakpoints">Default Breakpoints</H2>
      <Breakpoint gte="mobile" color="#FFE7AC">
        <BreakpointTitle>Mobile</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('mobile') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Breakpoint gte="tablet" color="#EAFFAC">
        <BreakpointTitle>Tablet</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('tablet') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Breakpoint gte="desktop" color="#AFEBFF">
        <BreakpointTitle>Desktop</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('desktop') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Instruction>Try resizing the page. 👉</Instruction>

      <H2 id="custom-breakpoints">Custom Breakpoints</H2>
      <ThemeProvider theme={{ breakpoints: BOOTSTRAP_BREAKPOINTS }}>
        <div>
          <Breakpoint gte="xs" color="FFE7AC">
            <BreakpointTitle>XS</BreakpointTitle>
            <BreakpointCode>{"${breakpoint('xs') `/* styles go here */`}"}</BreakpointCode>
          </Breakpoint>
          <Breakpoint gte="sm" color="#EAFFAC">
            <BreakpointTitle>SM</BreakpointTitle>
            <BreakpointCode>{"${breakpoint('sm') `/* styles go here */`}"}</BreakpointCode>
          </Breakpoint>
          <Breakpoint gte="lg" color="#AFEBFF">
            <BreakpointTitle>LG</BreakpointTitle>
            <BreakpointCode>{"${breakpoint('lg') `/* styles go here */`}"}</BreakpointCode>
          </Breakpoint>
          <Breakpoint gte="xl" color="#FFACE8">
            <BreakpointTitle>XL</BreakpointTitle>
            <BreakpointCode>{"${breakpoint('xl') `/* styles go here */`}"}</BreakpointCode>
          </Breakpoint>
          <Instruction>Try resizing the page. 👉</Instruction>
        </div>
      </ThemeProvider>

      <H2 id="gte">gte</H2>
      <P>Greater than or equal to.</P>
      <Breakpoint gte="mobile" color="FFE7AC">
        <BreakpointTitle>Mobile</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('mobile') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Breakpoint gte="tablet" color="EAFFAC">
        <BreakpointTitle>Tablet</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('tablet') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Breakpoint gte="desktop" color="AFEBFF">
        <BreakpointTitle>Desktop</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('desktop') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Instruction>Try resizing the page. 👉</Instruction>

      <H2 id="gte-and-lt">gte and lt</H2>
      <P>Greater than or equal to X but less than Y.</P>
      <Breakpoint gte="mobile" lt="tablet" color="FFE7AC">
        <BreakpointTitle>Mobile</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('mobile', 'tablet') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Breakpoint gte="tablet" lt="desktop" color="EAFFAC">
        <BreakpointTitle>Tablet</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('tablet', 'desktop') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Breakpoint gte="desktop" color="AFEBFF">
        <BreakpointTitle>Desktop</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('desktop') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Instruction>Try resizing the page. 👉</Instruction>

      <H2 id="map">map</H2>
      <P>Map a value to styles for each breakpoint where a value is specified.</P>
      <BreakpointMap color={{ mobile: '#FFE7AC', tablet: '#EAFFAC', desktop: '#AFEBFF' }}>
        <BreakpointTitle text={{ mobile: 'Mobile', tablet: 'Tablet', desktop: 'Desktop' }} />
        <BreakpointCode>{"${map({ mobile: '#FFE7AC', tablet: '#EAFFAC', desktop: '#AFEBFF' }, val => `/* styles go here */`)}"}</BreakpointCode>
      </BreakpointMap>
      <Instruction>Try resizing the page. 👉</Instruction>

    </Main>
  );
}