// @flow
import {
  type BreakpointMap,
  type BreakpointValueMap,
  type MapBreakpointValueToCSSFunction,
  // _gt,
  // _gte,
  // _lt,
  // _lte,
  // _between,
  _breakpoint,
  _map
} from './core';

const defaultBreakpoints = {
  mobile: 0,      // targeting all devices
  tablet: 737,    // targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode)
  desktop: 1025   // targeting devices that are LARGER than the iPad (which is 1024px in landscape mode)
};

type ComponentProps = {
  theme: {
    breakpoints?: BreakpointMap
  }
};

// export function gt(name: string) {
//   return (strings: string[], ...args: any[]) => ({ theme = {} }: ComponentProps) => _gt(theme.breakpoints || defaultBreakpoints, name)(strings, ...args);
// }

// export function gte(name: string) {
//   return (strings: string[], ...args: any[]) => ({ theme = {} }: ComponentProps) => _gte(theme.breakpoints || defaultBreakpoints, name)(strings, ...args);
// }

// export function lt(name: string) {
//   return (strings: string[], ...args: any[]) => ({ theme = {} }: ComponentProps) => _lt(theme.breakpoints || defaultBreakpoints, name)(strings, ...args);
// }

// export function lte(name: string) {
//   return (strings: string[], ...args: any[]) => ({ theme = {} }: ComponentProps) => _lte(theme.breakpoints || defaultBreakpoints, name)(strings, ...args);
// }

function breakpoint(gte: string, lt?: string) {
  return (strings: string[], ...args: any[]) => ({ theme = {} }: ComponentProps) => _breakpoint(theme.breakpoints || defaultBreakpoints, gte, lt)(strings, ...args);
}

export function map(value: BreakpointValueMap, mapValueToCSS: MapBreakpointValueToCSSFunction) {
  return ({ theme = {} }: ComponentProps) => _map(theme.breakpoints || defaultBreakpoints, value, mapValueToCSS);
}

export function createStatic(breakpoints: BreakpointMap = defaultBreakpoints) {
  return Object.keys(breakpoints).reduce((accum, name) => {
    accum[name] = _breakpoint(breakpoints, name);
    return accum;
  }, {
      breakpoint: (gte: string, lt?: string) => _breakpoint(breakpoints, gte, lt),
      map: (value: BreakpointValueMap, mapValueToCSS: MapBreakpointValueToCSSFunction) => _map(breakpoints, value, mapValueToCSS),
    });
}

export default breakpoint;
