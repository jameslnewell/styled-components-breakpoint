'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(['@media (min-width: ', ') {\n      ', '\n    }'], ['@media (min-width: ', ') {\n      ', '\n    }']);

var _styledComponents = require('styled-components');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var defaultBreakpoints = {
  mobile: 0, //targeting all devices
  tablet: 737, //targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode)
  desktop: 1025 //targeting devices that are LARGER than the iPad (which is 1024px in landscape mode)
};

/**
 * @param   {string}    name
 * @param   {object}    [breakpoints]
 * @returns {*}
 */
var breakpoint = function breakpoint(name) {
  var breakpoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultBreakpoints;

  var breakpoint = breakpoints[name];

  if (typeof breakpoint === 'number') {
    breakpoint = breakpoint / 16 + 'em'; //assume number is px and convert to 'em's
  }

  //special case for 0 to avoid wrapping in an unnecessary @media
  if (parseInt(breakpoint, 10) === 0) {
    return function () {
      if (!arguments.length) {
        return '';
      }
      return _styledComponents.css.apply(undefined, arguments);
    };
  }

  return function () {
    if (!arguments.length) {
      return '';
    }
    return (0, _styledComponents.css)(_templateObject, breakpoint, _styledComponents.css.apply(undefined, arguments));
  };
};

/**
 * @param   {*|object}  value
 * @param   {function}  mapValueToCSS
 * @param   {object}    [breakpoints]
 * @returns {*}
 */
var map = exports.map = function map(value, mapValueToCSS, breakpoints) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  if (type === 'object') {
    return [mapValueToCSS(undefined)].concat(_toConsumableArray(Object.keys(value).map(function (key) {
      return breakpoint(key, breakpoints)([].concat(mapValueToCSS(value[key])));
    })));
  } else {
    return mapValueToCSS(value);
  }
};

exports.default = breakpoint;