import {StyledProps, css} from 'styled-components';
import {DefaultThemeBreakpointName, BreakpointMap} from './types';
import {defaults} from './defaults';
import {createBreakpoint} from './createBreakpoint';

type CSSFunction = (
  ...params: Parameters<typeof css>
) => <P extends object>({theme}: StyledProps<P>) => ReturnType<typeof css>;

type DefaultThemeBreakpointMap = BreakpointMap<DefaultThemeBreakpointName>;

/* eslint-disable @typescript-eslint/no-explicit-any */
// casting because we can't really do anything better when the theme is defined but no theme values are defined
const getThemeBreakpoints = <P extends object>({
  theme,
}: StyledProps<P>): DefaultThemeBreakpointMap =>
  theme && theme.breakpoints ? theme.breakpoints : (defaults as any);
/* eslint-enable @typescript-eslint/no-explicit-any */

export const breakpoint = (
  breakpointA: DefaultThemeBreakpointName,
  breakpointB?: DefaultThemeBreakpointName,
): CSSFunction => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (strings: any, ...interpolations: any[]) => {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return <P extends object>(props: StyledProps<P>) => {
      return createBreakpoint(getThemeBreakpoints(props))(
        breakpointA,
        breakpointB,
      )(strings, interpolations);
    };
  };
};
