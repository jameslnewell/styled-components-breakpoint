import {DefaultTheme, FlattenSimpleInterpolation} from 'styled-components';

export type Breakpoints<B extends string | number> = Record<B, number>;

export type ValueOrValues<
  B extends string | number,
  V extends string | number
> = V | Partial<Record<B, V>>;

export type MapValueToStyleFunction = <V extends string | number>(
  value: V,
) => string | FlattenSimpleInterpolation;

type ThemeShape<B extends string | number> = {breakpoints: Breakpoints<B>};

export type DefaultBreakpoint = 'mobile' | 'tablet' | 'desktop';

export type ThemeBreakpoint = DefaultTheme extends ThemeShape<infer B>
  ? B
  : DefaultBreakpoint;
