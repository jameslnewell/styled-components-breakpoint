import {css} from 'styled-components';
import {
  BreakpointMap,
  BreakpointNameConstraint,
  BreakpointFunction,
} from './types';
import {convertPxToEm} from './convertPxToEm';

const getBreakpointSize = <B extends BreakpointNameConstraint>(
  breakpoints: BreakpointMap<B>,
  breakpoint: B,
): number => {
  if (!(breakpoint in breakpoints)) {
    console.error(
      `styled-components-breakpoint: Breakpoint "${breakpoint}" was not found.`,
    );
    return 0;
  }
  return breakpoints[breakpoint];
};

export const createBreakpoint = <B extends BreakpointNameConstraint>(
  breakpoints: BreakpointMap<B>,
): BreakpointFunction<B> => (breakpointA, breakpointB) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (strings: any, ...interpolations: any[]) => {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    if (breakpointA && breakpointB) {
      const pixelsA = getBreakpointSize(breakpoints, breakpointA);
      const pixelsB = getBreakpointSize(breakpoints, breakpointB);
      return css`
        @media screen and (min-width: ${convertPxToEm(
            pixelsA,
          )}em) and (max-width: ${convertPxToEm(pixelsB - 1)}em) {
          ${css(strings, ...interpolations)}
        }
      `;
    } else {
      const pixelsA = getBreakpointSize(breakpoints, breakpointA);
      if (pixelsA === 0) {
        return css(strings, ...interpolations);
      } else {
        return css`
          @media screen and (min-width: ${convertPxToEm(pixelsA)}em) {
            ${css(strings, ...interpolations)}
          }
        `;
      }
    }
  };
};
