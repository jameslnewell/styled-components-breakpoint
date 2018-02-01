import React from 'react';
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
    `}
    
    ${breakpoint('desktop') `
      font-size: 1.1em;
    `}
    
  }

`;
/* eslint-enable no-unused-expressions */

const Main = styled.main`
`;

const H1 = styled.h1`
  margin: 1em 0;
`;

const H2 = styled.h2`
  margin: 1em 0;
`;

const Breakpoint = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
  :after {
    content: '❌';
    text-align: right;
  }
  ${({ name, theme }) => breakpoint(name, theme.breakpoints) `
    background-color: ${({ color }) => color};
    :after {
      content: '✅';
    }
  `}
`;

const BreakpointMap = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
  :after {
    text-align: right;
  }
  ${({ visible, color }) => map(visible, (value = false) => {
    if (value) {
      return `
        background-color: ${color};
        :after {
          content: '✅';
        }
      `;
    } else {
      return `
        background-color: transparent;
        :after {
          content: '❌';
        }
      `;
    }
  })}
`;

const BreakpointTitle = styled.div`
  width: 5em;
  font-weight: bold;
`;

const BreakpointCode = styled.pre`
  flex-grow: 1;
  color: #666;
`;

export default function App() {
  return (
    <Main>
      <H1>styled-components-breakpoint</H1>

      <H2 id="default-breakpoints">Default Breakpoints</H2>
      <Breakpoint name="mobile" color="#FFE7AC">
        <BreakpointTitle>Mobile</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('mobile') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Breakpoint name="tablet" color="#EAFFAC">
        <BreakpointTitle>Tablet</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('tablet') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <Breakpoint name="desktop" color="#AFEBFF">
        <BreakpointTitle>Desktop</BreakpointTitle>
        <BreakpointCode>{"${breakpoint('desktop') `/* styles go here */`}"}</BreakpointCode>
      </Breakpoint>
      <blockquote>Try resizing the page. 👉</blockquote>

      <H2 id="custom-breakpoints">Custom Breakpoints</H2>
      <ThemeProvider theme={{ breakpoints: BOOTSTRAP_BREAKPOINTS }}>
        <div>
          <Breakpoint name="xs" color="FFE7AC">
            <BreakpointTitle>XS</BreakpointTitle>
            <BreakpointCode>{"${breakpoint('xs') `/* styles go here */`}"}</BreakpointCode>
          </Breakpoint>
          <Breakpoint name="sm" color="#EAFFAC">
            <BreakpointTitle>SM</BreakpointTitle>
            <BreakpointCode>{"${breakpoint('sm') `/* styles go here */`}"}</BreakpointCode>
          </Breakpoint>
          <Breakpoint name="lg" color="#AFEBFF">
            <BreakpointTitle>LG</BreakpointTitle>
            <BreakpointCode>{"${breakpoint('lg') `/* styles go here */`}"}</BreakpointCode>
          </Breakpoint>
          <Breakpoint name="xl" color="#FFACE8">
            <BreakpointTitle>XL</BreakpointTitle>
            <BreakpointCode>{"${breakpoint('xl') `/* styles go here */`}"}</BreakpointCode>
          </Breakpoint>
          <blockquote>Try resizing the page. 👉</blockquote>
        </div>
      </ThemeProvider>

      <H2 id="map">Map</H2>
      <BreakpointMap visible={{ mobile: true, tablet: false }} color="#FFE7AC">
        <BreakpointTitle>Mobile</BreakpointTitle>
        <BreakpointCode>{"${map({ mobile: true, tablet: false }, val => `/* styles go here */`)}"}</BreakpointCode>
      </BreakpointMap>
      <BreakpointMap visible={{ tablet: true, desktop: false }} color="#EAFFAC">
        <BreakpointTitle>Tablet</BreakpointTitle>
        <BreakpointCode>{"${map({ tablet: true, desktop: false }, val => `/* styles go here */`)}"}</BreakpointCode>
      </BreakpointMap>
      <BreakpointMap visible={{ desktop: true }} color="#AFEBFF">
        <BreakpointTitle>Desktop</BreakpointTitle>
        <BreakpointCode>{"${map({desktop: true}, val => `/* styles go here */`)}"}</BreakpointCode>
      </BreakpointMap>
      <blockquote>Try resizing the page. 👉</blockquote>

    </Main>
  );
}