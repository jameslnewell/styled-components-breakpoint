// @flow
import React from 'react';
import createComponentFromTagProp from 'react-create-component-from-tag-prop';
import styled, {injectGlobal, ThemeProvider} from 'styled-components';
import breakpoint, {map, createStatic} from '../../src';

const DEFAULT_BREAKPOINTS = {
  mobile: 0,
  tablet: 737,
  desktop: 1025,
};

const CUSTOM_BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const BREAKPOINT_TITLES = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
  xs: 'XS',
  sm: 'SM',
  md: 'MD',
  lg: 'LG',
  xl: 'XL',
};

const BREAKPOINT_COLORS = {
  mobile: '#D7F2BA',
  tablet: '#BDE4A8',
  desktop: '#9CC69B',
  xs: '#D7F2BA',
  sm: '#BDE4A8',
  md: '#9CC69B',
  lg: '#79B4A9',
  xl: '#556C70',
};

const STATIC_BREAKPOINTS = createStatic();

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

    ${STATIC_BREAKPOINTS.tablet`
      font-size: 1em;
    `}
    
    ${STATIC_BREAKPOINTS.desktop`
      font-size: 1.1em;
    `}
    
  }

`;

/* eslint-enable no-unused-expressions */

const whitelistedDiv = createComponentFromTagProp({
  tag: 'div',
  propsToOmit: ['name', 'color', 'operator', 'visible'],
});

const Main = styled.main`
  padding-bottom: 1em;
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

const Grid = styled.div`
  display: flex;
  align-items: center;
`;

const Col1 = styled.div`
  flex-grow: 1;
`;

const Col2 = styled.div``;

const Button = styled.button`
  padding: 0.5em;
  font-size: 1em;
  border-radius: 3px;
`;

const Instruction = styled.blockquote`
  margin: 0;
  font-size: 0.9em;
  font-weight: bold;
  text-align: right;
`;

const Breakpoint = styled(whitelistedDiv)`
  display: flex;
  align-items: center;
  padding: 1em;
  :after {
    content: '❌';
    text-align: right;
  }
  ${({gte, lt}) => breakpoint(gte, lt)`
    background-color: ${({color}) => color};
    :after {
      content: '✅';
    }
  `}
`;

const BreakpointMap = styled(whitelistedDiv)`
  display: flex;
  align-items: center;
  padding: 1em;
  :after {
    content: '✅';
    text-align: right;
  }
  ${({color}) =>
    map(color, (val = 'transparent') => `background-color: ${val || ''};`)}
`;

const BreakpointTitle = styled.div`
  flex-shrink: 0;
  width: 5em;
  font-weight: bold;
  ${({text = {}}) =>
    map(text, (val = '') => {
      return `:before {
        content: '${val || ''}';
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

export type AppProps = {};

export type AppState = {
  breakpoints: {[name: string]: number},
};

export default class App extends React.Component<AppProps, AppState> {
  state = {
    breakpoints: DEFAULT_BREAKPOINTS,
  };

  handleToggleBreakpoints = () => {
    this.setState(state => ({
      breakpoints:
        state.breakpoints !== DEFAULT_BREAKPOINTS
          ? DEFAULT_BREAKPOINTS
          : CUSTOM_BREAKPOINTS,
    }));
  };

  render() {
    const {breakpoints} = this.state;
    const colors = Object.keys(breakpoints).reduce((accum, name) => {
      accum[name] = BREAKPOINT_COLORS[name];
      return accum;
    }, {});
    const titles = Object.keys(breakpoints).reduce((accum, name) => {
      accum[name] = BREAKPOINT_TITLES[name];
      return accum;
    }, {});
    return (
      <ThemeProvider theme={{breakpoints}}>
        <Main>
          <H1>styled-components-breakpoint</H1>

          <Grid>
            <Col1>
              <Button onClick={this.handleToggleBreakpoints}>
                {breakpoints === DEFAULT_BREAKPOINTS
                  ? 'Use custom breakpoints'
                  : 'Use default breakpoints'}
              </Button>
            </Col1>
            <Col2>
              <Instruction>Try resizing the window. 👉</Instruction>
            </Col2>
          </Grid>

          <H2 id="gte">gte</H2>
          <P>Greater than or equal to.</P>
          {Object.keys(breakpoints).map(name => (
            <Breakpoint key={name} gte={name} color={BREAKPOINT_COLORS[name]}>
              <BreakpointTitle>{BREAKPOINT_TITLES[name]}</BreakpointTitle>
              <BreakpointCode>{`$\{ breakpoint('${name}') \`/* styles go here */\`}`}</BreakpointCode>
            </Breakpoint>
          ))}

          <H2 id="gte-and-lt">gte and lt</H2>
          <P>Greater than or equal to X but less than Y.</P>
          {Object.keys(breakpoints).map((name, index) => {
            const nextName = Object.keys(breakpoints)[index + 1];
            return (
              <Breakpoint
                key={name}
                gte={name}
                lt={nextName}
                color={BREAKPOINT_COLORS[name]}
              >
                <BreakpointTitle>{BREAKPOINT_TITLES[name]}</BreakpointTitle>
                <BreakpointCode>{`$\{breakpoint('${name}'${
                  nextName ? `, '${nextName}'` : ''
                }) \`/* styles go here */\`}`}</BreakpointCode>
              </Breakpoint>
            );
          })}

          <H2 id="map">map</H2>
          <P>
            Map a value to styles for each breakpoint where a value is
            specified.
          </P>
          <BreakpointMap color={colors}>
            <BreakpointTitle text={titles} />
            <BreakpointCode>{`$\{map(${JSON.stringify(
              colors,
              null,
              2,
            )}, (color) => \`/* styles go here */\`}`}</BreakpointCode>
          </BreakpointMap>
        </Main>
      </ThemeProvider>
    );
  }
}
