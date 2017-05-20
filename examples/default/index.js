import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Heading from './Heading';

const sheet = new ServerStyleSheet();
const html = renderToStaticMarkup(sheet.collectStyles(
  <Heading>Hello World!</Heading>
));
const css = sheet.getStyleTags();

console.log(`HTML\n----------------------------------------------\n${html}\n`);
console.log(`CSS \n----------------------------------------------\n${css}\n`);