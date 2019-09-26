import 'jest-styled-components';
import * as React from 'react';
import styled, {DefaultTheme, ThemeProvider} from 'styled-components';
import {render} from '@testing-library/react';
import {defaults} from './defaults';
import {convertPxToEm} from './convertPxToEm';
import {map} from './map';

describe('map()', () => {
  const Example = styled.div`
    ${map(
      {mobile: 'red', tablet: 'green', desktop: 'blue'},
      color => `color: ${color};`,
    )}
  `;

  test('use of default breakpoints', () => {
    const {container} = render(<Example />);
    expect(container.firstChild).toHaveStyleRule('color', 'red');
    expect(container.firstChild).toHaveStyleRule('color', 'green', {
      media: `screen and (min-width:${convertPxToEm(defaults.tablet)}em)`,
    });
    expect(container.firstChild).toHaveStyleRule('color', 'blue', {
      media: `screen and (min-width:${convertPxToEm(defaults.desktop)}em)`,
    });
  });

  test('use of custom breakpoints', () => {
    const customTheme: DefaultTheme = {
      breakpoints: {
        mobile: 0 * 16,
        tablet: 1 * 16,
        desktop: 2 * 16,
      },
    };
    const {container} = render(
      <ThemeProvider theme={customTheme}>
        <Example />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveStyleRule('color', 'red');
    expect(container.firstChild).toHaveStyleRule('color', 'green', {
      media: `screen and (min-width:1em)`,
    });
    expect(container.firstChild).toHaveStyleRule('color', 'blue', {
      media: `screen and (min-width:2em)`,
    });
  });
});
