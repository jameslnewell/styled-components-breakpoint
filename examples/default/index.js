import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {styleSheet} from 'styled-components';
import Heading from './Heading';

// styleSheet.reset();
const html = renderToStaticMarkup(<Heading>Hello World!</Heading>);
const css = styleSheet.getCSS();

console.log(`HTML\n----------------------------------------------\n${html}\n`);
console.log(`CSS \n----------------------------------------------\n${css}\n`);