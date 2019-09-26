import {SimpleInterpolation, StyledProps} from 'styled-components';
import {ThemeBreakpoint, Breakpoints} from './types';
import {defaults} from './defaults';
import {createBreakpoint} from './createBreakpoint';

export const breakpoint = (
  breakpointA: ThemeBreakpoint,
  breakpointB?: ThemeBreakpoint,
) => {
  return (
    strings: TemplateStringsArray,
    ...interpolations: SimpleInterpolation[]
  ) => {
    return <P extends object>({theme}: StyledProps<P>) => {
      const breakpoints: Breakpoints<ThemeBreakpoint> =
        theme && theme.breakpoints ? theme.breakpoints : (defaults as any);
      return createBreakpoint(breakpoints)(breakpointA, breakpointB)(
        strings,
        interpolations,
      );
    };
  };
};
