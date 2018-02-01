import { css } from 'styled-components';

const defaultBreakpoints = {
  mobile: 0,      // targeting all devices
  tablet: 737,    // targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode)
  desktop: 1025   // targeting devices that are LARGER than the iPad (which is 1024px in landscape mode)
};

/**
 * @param   {string}    name
 * @param   {object}    [breakpoints]
 * @returns {*}
 */
function breakpoint(name, breakpoints = defaultBreakpoints) {
  let breakpointValue = breakpoints[name];

  if (typeof breakpointValue === 'number') {
    breakpointValue = `${breakpointValue / 16}em`; // assume number is px and convert to 'em's
  }

  // special case for 0 to avoid wrapping in an unnecessary @media
  if (parseInt(breakpointValue, 10) === 0) {
    return (...args) => {
      if (!args.length) {
        return '';
      }
      return css(...args);
    }
  }

  return (...args) => {
    if (!args.length) {
      return '';
    }
    return css`@media (min-width: ${breakpointValue}) {
      ${css(...args)}
    }`;
  };

};

/**
 * @param   {*|object}  value
 * @param   {function}  mapValueToCSS
 * @param   {object}    [breakpoints]
 * @returns {*}
 */
export const map = (value, mapValueToCSS, breakpoints) => {
  const type = typeof value;

  if (type === 'object') {
    return [
      // eslint-disable-next-line no-undefined
      mapValueToCSS(undefined), // set the default value
      ...Object.keys(value).map(key => {
        return breakpoint(key, breakpoints)([].concat(mapValueToCSS(value[key])))
      })
    ];
  } else {
    return mapValueToCSS(value);
  }

};

export default breakpoint;
