import 'jest-styled-components';
import * as React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {ValueOrValueMap, DefaultBreakpointName} from './types';
import {defaults} from './defaults';
import {convertPxToEm} from './convertPxToEm';
import {createMap} from './createMap';

describe('createMap()', () => {
  const map = createMap(defaults);
  const consoleWarnSpy = jest.spyOn(console, 'warn');

  const Text = styled.p<{size: ValueOrValueMap<DefaultBreakpointName, number>}>`
    ${({size}) => map(size, s => `font-size: ${s}px;`)}
  `;

  afterEach(() => consoleWarnSpy.mockReset());

  test('rendered static styles', () => {
    const {container} = render(<Text size={12} />);
    expect(container.firstChild).toHaveStyleRule('font-size', '12px');
  });

  test('rendered responsive styles', () => {
    const {container} = render(
      <Text size={{mobile: 12, tablet: 16, desktop: 24}} />,
    );
    expect(container.firstChild).toHaveStyleRule('font-size', '12px');
    expect(container.firstChild).toHaveStyleRule('font-size', '16px', {
      media: `screen and (min-width:${convertPxToEm(defaults.tablet)}em)`,
    });
    expect(container.firstChild).toHaveStyleRule('font-size', '24px', {
      media: `screen and (min-width:${convertPxToEm(defaults.desktop)}em)`,
    });
  });

  test('logged a warning if breakpoints were not ordered', () => {
    render(<Text size={{tablet: 16, mobile: 12, desktop: 24}} />);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'styled-components-breakpoint: Values for {"tablet":16,"mobile":12,"desktop":24} are not keyed in order ("mobile", "tablet", "desktop") and may result in specificity issues.',
    );
  });
});
