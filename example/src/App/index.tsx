import * as React from 'react';
import {ThemeProvider} from 'styled-components';
import {
  ExampleBreakpointMapName,
  ExampleBreakpointName,
  customBreakpoints,
  defaultBreakpoints,
  breakpointColors,
  breakpointTitles,
} from './breakpoints';
import {
  GlobalStyle,
  Main,
  H1,
  Grid,
  Col1,
  Button,
  Col2,
  Instruction,
  H2,
  P,
  Breakpoint,
  BreakpointCode,
  BreakpointTitle,
  BreakpointMap,
} from './index.style';

export type AppState = {
  breakpoints: {[name: string]: number};
};

export const App: React.FC = () => {
  const [breakpoints, setBreakpoints] = React.useState<
    ExampleBreakpointMapName
  >(defaultBreakpoints);

  const handleToggleBreakpoints = () =>
    setBreakpoints(breakpoints =>
      breakpoints !== defaultBreakpoints
        ? defaultBreakpoints
        : customBreakpoints,
    );

  const names: ExampleBreakpointName[] = Object.keys(
    breakpoints,
  ) as ExampleBreakpointName[];

  const colors = names.reduce(
    (accum, name) => {
      accum[name] = breakpointColors[name];
      return accum;
    },
    {} as Partial<{[b in ExampleBreakpointName]: string}>,
  );

  const titles = names.reduce(
    (accum, name) => {
      accum[name] = breakpointTitles[name];
      return accum;
    },
    {} as Partial<{[b in ExampleBreakpointName]: string}>,
  );

  return (
    <ThemeProvider theme={{breakpoints}}>
      <>
        <GlobalStyle />
        <Main>
          <H1>styled-components-breakpoint</H1>

          <Grid>
            <Col1>
              <Button onClick={handleToggleBreakpoints}>
                {breakpoints === defaultBreakpoints
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
          {names.map(name => (
            <Breakpoint key={name} gte={name} color={breakpointColors[name]}>
              <BreakpointTitle>{breakpointTitles[name]}</BreakpointTitle>
              <BreakpointCode>{`$\{ breakpoint('${name}') \`/* styles go here */\`}`}</BreakpointCode>
            </Breakpoint>
          ))}

          <H2 id="gte-and-lt">gte and lt</H2>
          <P>Greater than or equal to X but less than Y.</P>
          {names.map((name, index) => {
            const nextName = names[index + 1];
            return (
              <Breakpoint
                key={name}
                gte={name}
                lt={nextName}
                color={breakpointColors[name]}
              >
                <BreakpointTitle>{breakpointTitles[name]}</BreakpointTitle>
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
          <BreakpointMap colorX={colors}>
            <BreakpointTitle text={titles} />
            <BreakpointCode>{`$\{map(${JSON.stringify(
              colors,
              null,
              2,
            )}, (color) => \`/* styles go here */\`}`}</BreakpointCode>
          </BreakpointMap>
        </Main>
      </>
    </ThemeProvider>
  );
};
