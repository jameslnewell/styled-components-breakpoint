import styled, {css, createGlobalStyle} from 'styled-components';
import {breakpoint, map, createBreakpoint, ValueOrValues} from '../../../src';
import {defaultBreakpoints, ExampleBreakpoint} from './breakpoints';

const staticBreakpoint = createBreakpoint(defaultBreakpoints);

export const Global = createGlobalStyle`
  body {
    margin: auto;
    padding: 0 1em;
    min-width: 500px;
    max-width: 800px;
    color: #444;
    font-size: 0.9em;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    ${staticBreakpoint('tablet')`
      font-size: 1em;
    `}
    
    ${staticBreakpoint('desktop')`
      font-size: 1.1em;
    `}
    
  }
`;

export const Main = styled.main`
  padding-bottom: 1em;
`;

export const H1 = styled.h1`
  margin: 1em 0;
`;

export const H2 = styled.h2`
  margin: 1em 0;
`;

export const P = styled.p`
  margin: 1em 0;
`;

export const Grid = styled.div`
  display: flex;
  align-items: center;
`;

export const Col1 = styled.div`
  flex-grow: 1;
`;

export const Col2 = styled.div``;

export const Button = styled.button`
  padding: 0.5em;
  font-size: 1em;
  border-radius: 3px;
`;

export const Instruction = styled.blockquote`
  margin: 0;
  font-size: 0.9em;
  font-weight: bold;
  text-align: right;
`;

export const Breakpoint = styled.div<{
  gte: ExampleBreakpoint;
  lt?: ExampleBreakpoint;
  color: string;
}>`
  display: flex;
  align-items: center;
  padding: 1em;
  :after {
    content: '❌';
    text-align: right;
  }
  ${({gte, lt, color}) => breakpoint(gte as any, lt as any)`
    background-color: ${color};
    :after {
      content: '✅';
    }
  `}
`;

export interface BreakpointMapProps {
  colorX: ValueOrValues<ExampleBreakpoint, string>;
}

export const BreakpointMap = styled.div<BreakpointMapProps>`
  display: flex;
  align-items: center;
  padding: 1em;
  :after {
    content: '✅';
    text-align: right;
  }
  ${({colorX}) =>
    css`
      background-color: transparent;
      ${map(colorX, val => `background-color: ${val};`)}
    `}
`;

export interface BreakpointTitleProps {
  text?: ValueOrValues<ExampleBreakpoint, string>;
}

export const BreakpointTitle = styled.div<BreakpointTitleProps>`
  flex-shrink: 0;
  width: 5em;
  font-weight: bold;
  ${({text}) =>
    text &&
    map(text, val => {
      return `:before {
      content: '${val}';
    }`;
    })}
`;

export const BreakpointCode = styled.pre`
  margin-right: 1em;
  flex-grow: 1;
  color: #666;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
