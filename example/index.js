// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const element = document.getElementById('app');
if (element) {
  ReactDOM.render(<App />, element);
}