import {DefaultTheme, css} from 'styled-components';

export type BreakpointMap<B extends string | number> = Record<B, number>;

export type ValueOrValueMap<
  B extends string | number,
  V extends string | number
> = V | Partial<Record<B, V>>;

export type ValueToStyleFunction = <V extends string | number>(
  value: V,
) => string | ReturnType<typeof css>;

type ThemeShape<B extends string | number> = {breakpoints: BreakpointMap<B>};

export type DefaultBreakpointName = 'mobile' | 'tablet' | 'desktop';

export type DefaultThemeBreakpointName = DefaultTheme extends ThemeShape<
  infer B
>
  ? B
  : DefaultBreakpointName;
