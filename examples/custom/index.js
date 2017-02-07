import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {styleSheet, ThemeProvider} from 'styled-components';
import Heading from './Heading';

const theme = {
  breakpoints: {
    sm: 600,
    md: 900,
    lg: 1200
  }
};

// styleSheet.reset();
const html = renderToStaticMarkup(
  <ThemeProvider theme={theme}>
    <Heading>Hello World!</Heading>
  </ThemeProvider>
);
const css = styleSheet.getCSS();

console.log(`HTML\n----------------------------------------------\n${html}\n`);
console.log(`CSS \n----------------------------------------------\n${css}\n`);