import {css} from 'styled-components';

const defaultBreakpoints = {
  mobile: 0,      // Targeting all devices.
  tablet: 737,    // Targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode).
  desktop: 1025   // Targeting devices that are LARGER than the iPad (which is 1024px in landscape mode).
};

const defaultEm = 16; // One em in pixels.

/**
 * @param   {string}    name
 * @param   {object}    [breakpoints]
 * @param   {number}    em
 * @returns {*}
 */
const breakpoint = (name, breakpoints = defaultBreakpoints, em = defaultEm) => {
  let breakpoint = breakpoints[name];

  if (typeof breakpoint === 'number') {
    breakpoint = `${breakpoint / em}em`; //assume number is px and convert to 'em's
  }

  //special case for 0 to avoid wrapping in an unnecessary @media
  if (parseInt(breakpoint, 10) === 0) {
    return (...args) => css(...args);
  }

  return (...args) => css`@media (min-width: ${breakpoint}) {
    ${css(...args)}
  }`;

};

/**
 * @param   {*|object}  value
 * @param   {function}  mapValueToCSS
 * @param   {object}    [breakpoints]
 * @param   {number}    em
 * @returns {*}
 */
export const map = (value, mapValueToCSS, breakpoints, em) => {
  const type = typeof value;

  if (type === 'object') {
    return [
      mapValueToCSS(undefined), //set the default value
      ...Object.keys(value).map(key => breakpoint(key, breakpoints, em)(...mapValueToCSS(value[key])))
    ];
  } else {
    return mapValueToCSS(value);
  }

};

export default breakpoint;
