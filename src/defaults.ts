import {Breakpoints, DefaultBreakpoint} from './types';

export const defaults: Breakpoints<DefaultBreakpoint> = {
  mobile: 0, // targeting all devices
  tablet: 737, // targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode)
  desktop: 1195, // targeting devices that are LARGER than the 11" iPad Pro (which is 1194px in landscape mode)
};
