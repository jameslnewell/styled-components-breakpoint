import {css} from 'styled-components';

const defaultBreakpoints = {
  mobile: 0,      //targeting all devices
  tablet: 737,    //targeting devices that are larger than the iPhone 6 Plus (which is 736px in landscape mode)
  desktop: 1025   //targeting devices that are larger than the iPad (which is 1024px in landscape mode)
};

/**
 * @param   {string}    name
 * @param   {object}    breakpoints
 * @returns {*}
 */
const breakpoint = (name, breakpoints = defaultBreakpoints) => {
  const px = breakpoints[name];
  const ems = px / 16;

  //special case for 0 to avoid wrapping in an unnecessary @media
  if (px === 0) {
    return (...args) => css(...args);
  }

  return (...args) => css`@media (min-width: ${ems}em) {
    ${css(...args)}
  }`;

};

/**
 * @param   {*|object}  val
 * @param   {function}  fn
 * @param   {object}    breakpoints
 * @returns {*}
 */
const map = (val, fn, breakpoints) => {
  const type = typeof val;

  if (type === 'undefined') {
    return null;
  }

  if (type === 'object') {
    return Object.keys(val).map(key => breakpoint(key, breakpoints)(...fn(val[key])));
  } else {
    return fn(val);
  }

};

export default breakpoint;
export {map};

