import {css} from 'styled-components';
import {ThemeWithBreakpoints} from './types';
import {convertPixelsToEm} from './utils/convertPixelsToEm';
import {getBreakpointValue} from './utils/getBreakpointValue';

const single = (operator: string, offset: number) => {
  return (name: string) => {
    return (strings: TemplateStringsArray, ...interpolations: string[]) => {
      return ({theme}: {theme: ThemeWithBreakpoints | undefined}) => {
        const value = getBreakpointValue(name, theme) + offset;

        // special case where we don't need the extra media block
        if (operator === 'min-width' && value === 0) {
          return css(strings, ...interpolations);
        }

        return css`@media (${operator}: ${convertPixelsToEm(value)}em) {
          ${css(strings, ...interpolations)}
        }`;
      };
    };
  };
};

export const gt = single('min-width', +1);
export const gte = single('min-width', 0);
export const lt = single('max-width', -1);
export const lte = single('max-width', 0);

export const between = (a: string, b: string) => {
  return (strings: TemplateStringsArray, ...interpolations: string[]) => {
    return ({theme}: {theme: ThemeWithBreakpoints | undefined}) => {
      const valueA = getBreakpointValue(a, theme);
      const valueB = getBreakpointValue(b, theme) - 1;
      console.log(
        `@media (min-width: ${convertPixelsToEm(
          valueA,
        )}em) and (max-width: ${convertPixelsToEm(valueB)}em) `,
      );
      return css`
        @media (min-width: ${convertPixelsToEm(
            valueA,
          )}em) and (max-width: ${convertPixelsToEm(valueB)}em) {
          ${css(strings, ...interpolations)}
        }
      `;
    };
  };
};

export const map = (valueOrValues, mapValueToCSS) => {
  // handle single value
  if (valueOrValues === null || typeof valueOrValues !== 'object') {
    return mapValueToCSS(valueOrValues);
  }

  // handle multiple values
  return [
    // eslint-disable-next-line no-undefined
    mapValueToCSS(undefined), // set the default value
    ...Object.keys(valueOrValues).map((name: string) => {
      const tag = gte(name);
      const val = valueOrValues[name];
      const styles = tag([], [].concat(mapValueToCSS(val)));
      return styles;
    }),
  ];
};

export default (a: string, b?: string) => {
  if (!b) {
    return gte(a);
  } else {
    return between(a, b);
  }
};
