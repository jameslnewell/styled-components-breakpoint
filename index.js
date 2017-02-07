import {css} from 'styled-components';

const defaultBreakpoints = {
  tablet: 737,    //targeting devices that are larger than the iPhone 6 Plus (which is 736px in landscape mode)
  desktop: 1025   //targeting devices that are larger than the iPad (which is 1024px in landscape mode)
};

export default (name, breakpoints = defaultBreakpoints) => {
  const ems = breakpoints[name] / 16;
  return (...args) => css`@media (min-width: ${ems}em) {
    ${css(...args)}
  }`;
};
