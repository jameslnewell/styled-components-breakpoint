import {ThemeWithBreakpoints} from '../types';

const defaultBreakpoints = {
  mobile: 0, // targeting all devices
  tablet: 737, // targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode)
  desktop: 1025, // targeting devices that are LARGER than the iPad (which is 1024px in landscape mode)
};

export const getBreakpointValue = (
  name: string,
  theme: ThemeWithBreakpoints | undefined,
) => {
  const breakpoints =
    theme && theme.breakpoints ? theme.breakpoints : defaultBreakpoints;
  const value = breakpoints[name];
  if (value === undefined) {
    console.error(`Breakpoint "${name}" was not found.`);
    return 0;
  }
  return value;
};
