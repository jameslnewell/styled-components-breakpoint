// @flow
/* global process */
import { css } from 'styled-components';

export type BreakpointMap = { [name: string]: number };
export type BreakpointValueMap = string | { [name: string]: any };
export type MapBreakpointValueToCSSFunction = (value: ?any) => string | (...args: any[]) => string;

function convertPxToEm(pixels: number): number {
  // @media is always calculated off 16px regardless of whether the root font size is the default or not
  return pixels / 16;
}

function getValueFromName(breakpoints: BreakpointMap, name: string): number {
  const value = breakpoints[name];
  if (process.env.NODE_ENV !== 'production' && typeof value === 'undefined') {
    console.error(`A breakpoint named "${name}" does not exist.`);
    return 0;
  }
  return value;
}

function withSingleCriteria(breakpoints: BreakpointMap, name: string, operator: 'min-width' | 'max-width', offset: number = 0) {
  const value = getValueFromName(breakpoints, name);

  // special case for 0 to avoid wrapping styles in an unnecessary @media block
  // FIXME: typings
  // if (operator === 'max-width' && value === 0) {
  //   return () => '';
  // }

  // special case for 0 to avoid wrapping styles in an unnecessary @media block
  if (operator === 'min-width' && value === 0) {
    return (...args: any[]) => {
      return css(...args);
    }
  }

  return (...args: any) => {
    return css`@media (${operator}: ${convertPxToEm(value + offset)}em) {
      ${css(...args)}
    }`;
  };
}

export function _gt(breakpoints: BreakpointMap, name: string) {
  return withSingleCriteria(breakpoints, name, 'min-width', +1);
}

export function _gte(breakpoints: BreakpointMap, name: string) {
  return withSingleCriteria(breakpoints, name, 'min-width');
}

export function _lt(breakpoints: BreakpointMap, name: string) {
  return withSingleCriteria(breakpoints, name, 'max-width', -1);
}

export function _lte(breakpoints: BreakpointMap, name: string) {
  return withSingleCriteria(breakpoints, name, 'max-width');
}

export function _between(breakpoints: BreakpointMap, gte: string, lt: string) {
  const gteValue = getValueFromName(breakpoints, gte);
  const ltValue = getValueFromName(breakpoints, lt);
  return (...args: any) => {
    return css`@media (min-width: ${convertPxToEm(gteValue)}em) and (max-width: ${convertPxToEm(ltValue - 1)}em) {
      ${css(...args)}
    }`;
  };
}

export function _breakpoint(breakpoints: BreakpointMap, gte: string, lt?: string) {
  if (typeof lt === 'undefined') {
    return _gte(breakpoints, gte);
  } else {
    return _between(breakpoints, gte, lt);
  }
};

// TODO: allow the operator to be customised
export function _map(breakpoints: BreakpointMap, value: BreakpointValueMap, mapValueToCSS: MapBreakpointValueToCSSFunction) {
  const values = value;

  if (typeof values === 'string') {
    return mapValueToCSS(value);
  }

  return [
    // eslint-disable-next-line no-undefined
    mapValueToCSS(undefined), // set the default value
    ...Object.keys(values).map((name: string) => {
      const tag = _gte(breakpoints, name);
      const val = values[name];
      const styles = tag([].concat(mapValueToCSS(val)));
      return styles;
    })
  ];

};

