import {StyledProps, css} from 'styled-components';
import {DefaultThemeBreakpointName, BreakpointMap} from './types';
import {defaults} from './defaults';
import {createBreakpoint} from './createBreakpoint';

type CSSFunction = (
  ...params: Parameters<typeof css>
) => <P extends object>({theme}: StyledProps<P>) => ReturnType<typeof css>;

export const breakpoint = (
  breakpointA: DefaultThemeBreakpointName,
  breakpointB?: DefaultThemeBreakpointName,
): CSSFunction => {
  return (strings: any, ...interpolations: any[]) => {
    return <P extends object>({theme}: StyledProps<P>) => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      // casting because we can't really do anything better when the theme is defined but no theme values are defined
      const breakpoints: BreakpointMap<DefaultThemeBreakpointName> =
        theme && theme.breakpoints ? theme.breakpoints : (defaults as any);
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return createBreakpoint(breakpoints)(breakpointA, breakpointB)(
        strings,
        interpolations,
      );
    };
  };
};
