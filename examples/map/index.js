import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ServerStyleSheet} from 'styled-components';
import Thing from './Thing';

const sheet = new ServerStyleSheet();
const html = renderToStaticMarkup(sheet.collectStyles(
  <Thing width={{tablet: 1/2, desktop: 1/4}}/>
));
const css = sheet.getStyleTags();

console.log(`HTML\n----------------------------------------------\n${html}\n`);
console.log(`CSS \n----------------------------------------------\n${css}\n`);

