import {css, SimpleInterpolation, CSSObject} from 'styled-components';
import {Breakpoints} from './types';
import {convertPxToEm} from './convertPxToEm';

const getBreakpointPixels = <B extends string | number>(
  breakpoints: Breakpoints<B>,
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

export const createBreakpoint = <B extends string | number>(
  breakpoints: Breakpoints<B>,
) => (breakpointA: B, breakpointB?: B) => {
  return (
    strings: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => {
    if (breakpointA && breakpointB) {
      const pixelsA = getBreakpointPixels(breakpoints, breakpointA);
      const pixelsB = getBreakpointPixels(breakpoints, breakpointB);
      return css`
        @media screen and (min-width: ${convertPxToEm(
            pixelsA,
          )}em) and (max-width: ${convertPxToEm(pixelsB - 1)}em) {
          ${css(strings, ...interpolations)}
        }
      `;
    } else {
      const pixelsA = getBreakpointPixels(breakpoints, breakpointA);
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
