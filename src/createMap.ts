import {
  BreakpointMap,
  ValueOrValueMap,
  BreakpointNameConstraint,
  ValueConstraint,
  ValueToStyleFunction,
  ScaleConstraint,
  MapFunction,
} from './types';
import {createBreakpoint} from './createBreakpoint';
import {css, CSSObject, StyledProps, DefaultTheme} from 'styled-components';

// ensure the values are keyed in breakpoint order, otherwise specificity issues may occur
const checkValuesOrdering = <
  B extends BreakpointNameConstraint,
  V extends ValueConstraint
>(
  breakpoints: BreakpointMap<B>,
  values: ValueOrValueMap<B, V>,
): void => {
  const breakpointKeys = Object.keys(breakpoints);
  let previousIndex = -1;
  Object.keys(values).some(k => {
    const index = breakpointKeys.indexOf(k);
    if (index !== -1 && index <= previousIndex) {
      console.warn(
        `styled-components-breakpoint: Values for ${JSON.stringify(
          values,
        )} are not keyed in order (${breakpointKeys
          .map(n => `"${n}"`)
          .join(', ')}) and may result in specificity issues.`,
      );
      return true;
    } else {
      previousIndex = index;
      return false;
    }
  });
};

function map<
  B extends BreakpointNameConstraint,
  V extends ValueConstraint,
  S extends ScaleConstraint
>(
  breakpoints: BreakpointMap<B>,
  valueOrValues: ValueOrValueMap<B, V>,
  mapValueToStyle: ValueToStyleFunction<V, S>,
  scale?: S,
): string | ReturnType<typeof css> {
  const fn = createBreakpoint<B>(breakpoints);

  if (typeof valueOrValues !== 'object') {
    const style = mapValueToStyle(valueOrValues);
    // @see https://github.com/microsoft/TypeScript/issues/17002
    return typeof style === 'string' || Array.isArray(style)
      ? style
      : css(style as CSSObject);
  }

  // check the ordering of breakpoints
  if (process.env.NODE_ENV !== 'production') {
    checkValuesOrdering(breakpoints, valueOrValues);
  }

  // map the value at each breakpoint to styles
  const keys = Object.keys(valueOrValues) as B[];
  return keys.map((key: B) => {
    const tag = fn(key);
    // FIXME: not sure why the type isn't correctly inferred here
    const val: V | undefined = valueOrValues[key];
    if (val === undefined) return '';
    const style = mapValueToStyle(val, scale);
    if (typeof style === 'string' || Array.isArray(style)) {
      /* eslint-disable @typescript-eslint/ban-ts-ignore */
      // @ts-ignore - ignore inability to create a real TemplateStringsArray
      return tag([], style);
      /* eslint-enable @typescript-eslint/ban-ts-ignore */
    } else {
      // @see https://github.com/microsoft/TypeScript/issues/17002
      return tag(style as CSSObject);
    }
  });
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const createMap = <B extends BreakpointNameConstraint>(
  breakpoints: BreakpointMap<B> | ((theme: DefaultTheme) => BreakpointMap<B>),
): MapFunction<B> => {
  return <V extends ValueConstraint, S extends ScaleConstraint>(
    valueOrValues: ValueOrValueMap<B, V>,
    mapValueToStyle: ValueToStyleFunction<V, S>,
    scale?: S | ((theme: DefaultTheme) => S),
  ) => {
    if (typeof breakpoints !== 'object' || typeof scale !== 'object') {
      return <P>(props: StyledProps<P>) => {
        const b =
          typeof breakpoints !== 'object'
            ? breakpoints(props.theme)
            : breakpoints;
        const s =
          scale !== undefined && typeof scale !== 'object'
            ? scale(props.theme)
            : scale;
        return map(b, valueOrValues, mapValueToStyle, s);
      };
    } else {
      return map(breakpoints, valueOrValues, mapValueToStyle, scale);
    }
  };
};
/* eslint-enable @typescript-eslint/explicit-function-return-type */
