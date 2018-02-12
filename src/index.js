// @flow
import {
  type StyledComponentsInterpolation,
  type StyledComponentsTemplateLiteral,
  type BreakpointMap,
  type BreakpointValueMap,
  type BreakpointMapValueToCSSFunction,
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

function breakpoint(gte: string, lt?: string) {
  return function (strings: string[], ...interpolations: StyledComponentsInterpolation[]) {
    return function ({ theme = {} }: ComponentProps) {
      return _breakpoint(theme.breakpoints || defaultBreakpoints, gte, lt)(strings, ...interpolations);
    };
  };
}

export function map<T>(value: BreakpointValueMap<T>, mapValueToCSS: BreakpointMapValueToCSSFunction<T>) {
  return function ({ theme = {} }: ComponentProps) {
    return _map(theme.breakpoints || defaultBreakpoints, value, mapValueToCSS);
  };
}

export type StaticBreakpoints = {
  [name: string]: StyledComponentsTemplateLiteral;
  breakpoint: (gte: string, lt?: string) => StyledComponentsTemplateLiteral;
  map: <T: string | number > (value: BreakpointValueMap < T >, mapValueToCSS: BreakpointMapValueToCSSFunction<T>) => StyledComponentsInterpolation; // eslint-disable-line no-undef
};

export function createStatic(breakpoints: BreakpointMap = defaultBreakpoints): StaticBreakpoints {
  return Object.keys(breakpoints).reduce((accum, name) => {
    accum[name] = _breakpoint(breakpoints, name);
    return accum;
  }, {
      breakpoint: (gte: string, lt?: string) => _breakpoint(breakpoints, gte, lt),
      map: <T: string | number > (value: BreakpointValueMap<T>, mapValueToCSS: BreakpointMapValueToCSSFunction<T>) => _map(breakpoints, value, mapValueToCSS),
    });
}

export default breakpoint;
