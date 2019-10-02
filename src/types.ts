import {DefaultTheme, css, CSSObject} from 'styled-components';

export type BreakpointNameConstraint = string | number | symbol;
export type BreakpointMap<B extends BreakpointNameConstraint> = {
  [breakpoint in B]: number
};
type ThemeShape<B extends BreakpointNameConstraint> = {
  breakpoints: BreakpointMap<B>;
};

export type ValueConstraint = string | number;
export type ValueOrValueMap<
  B extends BreakpointNameConstraint,
  V extends ValueConstraint
> = V | {[breakpoint in B]?: V};

export type ValueToStyleFunction<V extends ValueConstraint> = (
  value: V,
) => string | CSSObject | ReturnType<typeof css>;

export type DefaultBreakpointName = 'mobile' | 'tablet' | 'desktop';
export type DefaultThemeBreakpointName = DefaultTheme extends ThemeShape<
  infer B
>
  ? B
  : DefaultBreakpointName;

export type BreakpointFunction<B extends BreakpointNameConstraint> = (
  breakpointA: B,
  breakpointB?: B,
) => typeof css;
export type MapFunction<
  B extends BreakpointNameConstraint,
  V extends ValueConstraint
> = (
  valueOrValues: ValueOrValueMap<B, V>,
  mapValueToStyle: ValueToStyleFunction<V>,
) => string | ReturnType<typeof css>;
