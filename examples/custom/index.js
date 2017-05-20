import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet, ThemeProvider} from 'styled-components';
import Heading from './Heading';

const theme = {
  breakpoints: {
    sm: 600,
    md: 900,
    lg: 1200
  }
};

const sheet = new ServerStyleSheet();
const html = renderToStaticMarkup(sheet.collectStyles(
  <ThemeProvider theme={theme}>
    <Heading>Hello World!</Heading>
  </ThemeProvider>
));
const css = sheet.getStyleTags();

console.log(`HTML\n----------------------------------------------\n${html}\n`);
console.log(`CSS \n----------------------------------------------\n${css}\n`);