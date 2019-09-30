import 'jest-styled-components';
import * as React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {defaults} from './defaults';
import {convertPxToEm} from './convertPxToEm';
import {createBreakpoint} from './createBreakpoint';

describe('createBreakpoint()', () => {
  const breakpoint = createBreakpoint(defaults);
  const consoleErrorSpy = jest.spyOn(console, 'error');

  afterEach(() => consoleErrorSpy.mockReset());

  test('rendered styles using a CSSObject', () => {
    const GreaterThanOrEqualExample = styled.p`

      ${breakpoint('mobile')({
        fontSize: '12px',
      })}

      ${breakpoint('tablet')({
        fontSize: '16px',
      })}

      ${breakpoint('desktop')({
        fontSize: '24px',
      })}

    `;
    const {container} = render(<GreaterThanOrEqualExample />);
    expect(container.firstChild).toHaveStyleRule('font-size', '12px');
    expect(container.firstChild).toHaveStyleRule('font-size', '16px', {
      media: `screen and (min-width:${convertPxToEm(defaults.tablet)}em)`,
    });
    expect(container.firstChild).toHaveStyleRule('font-size', '24px', {
      media: `screen and (min-width:${convertPxToEm(defaults.desktop)}em)`,
    });
  });

  test('rendered styles from each breakpoint', () => {
    const GreaterThanOrEqualExample = styled.p`

      ${breakpoint('mobile')`
        font-size: 12px;
      `}

      ${breakpoint('tablet')`
        font-size: 16px;
      `}

      ${breakpoint('desktop')`
        font-size: 24px;
      `}

  `;
    const {container} = render(<GreaterThanOrEqualExample />);
    expect(container.firstChild).toHaveStyleRule('font-size', '12px');
    expect(container.firstChild).toHaveStyleRule('font-size', '16px', {
      media: `screen and (min-width:${convertPxToEm(defaults.tablet)}em)`,
    });
    expect(container.firstChild).toHaveStyleRule('font-size', '24px', {
      media: `screen and (min-width:${convertPxToEm(defaults.desktop)}em)`,
    });
  });

  test('rendered styles between breakpoints', () => {
    const BetweenExample = styled.p`

      ${breakpoint('mobile', 'tablet')`
        font-size: 12px;
      `}

      ${breakpoint('tablet', 'desktop')`
        font-size: 16px;
      `}

      ${breakpoint('desktop')`
        font-size: 24px;
      `}

  `;
    const {container} = render(<BetweenExample />);
    expect(container.firstChild).toHaveStyleRule('font-size', '12px', {
      media: `screen and (min-width:${convertPxToEm(
        defaults.mobile,
      )}em) and (max-width:${convertPxToEm(defaults.tablet - 1)}em)`,
    });
    expect(container.firstChild).toHaveStyleRule('font-size', '16px', {
      media: `screen and (min-width:${convertPxToEm(
        defaults.tablet,
      )}em) and (max-width:${convertPxToEm(defaults.desktop - 1)}em)`,
    });
    expect(container.firstChild).toHaveStyleRule('font-size', '24px', {
      media: `screen and (min-width:${convertPxToEm(defaults.desktop)}em)`,
    });
  });

  test('logged a warning if a breakpoint does not exist', () => {
    const NonExistentExample = styled.p`
      ${breakpoint('foobar' as any)`
        font-size: 12px;
      `}
    `;
    render(<NonExistentExample />);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'styled-components-breakpoint: Breakpoint "foobar" was not found.',
    );
  });
});
