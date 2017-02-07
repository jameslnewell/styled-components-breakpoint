import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {styleSheet} from 'styled-components';
import Thing from './Thing';

// styleSheet.reset();
const html = renderToStaticMarkup(
  <Thing width={{mobile: 1, tablet: 1/2, desktop: 1/4}}/>
);
const css = styleSheet.getCSS();

console.log(`HTML\n----------------------------------------------\n${html}\n`);
console.log(`CSS \n----------------------------------------------\n${css}\n`);