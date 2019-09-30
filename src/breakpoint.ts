import {SimpleInterpolation, StyledProps, CSSObject} from 'styled-components';
import {ThemeBreakpoint, Breakpoints} from './types';
import {defaults} from './defaults';
import {createBreakpoint} from './createBreakpoint';

export const breakpoint = (
  breakpointA: ThemeBreakpoint,
  breakpointB?: ThemeBreakpoint,
) => {
  return (
    strings: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ) => {
    return <P extends object>({theme}: StyledProps<P>) => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      // casting because we can't really do anything better when the theme is defined but no theme values are defined
      const breakpoints: Breakpoints<ThemeBreakpoint> =
        theme && theme.breakpoints ? theme.breakpoints : (defaults as any);
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return createBreakpoint(breakpoints)(breakpointA, breakpointB)(
        strings,
        interpolations,
      );
    };
  };
};
