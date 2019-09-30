import {defaults, Breakpoints} from '../../../src';

export type DefaultBreakpoint = 'mobile' | 'tablet' | 'desktop';
export type CustomBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ExampleBreakpoint = DefaultBreakpoint | CustomBreakpoint;
export type ExampleBreakpoints =
  | Breakpoints<DefaultBreakpoint>
  | Breakpoints<CustomBreakpoint>;

export const defaultBreakpoints: Breakpoints<DefaultBreakpoint> = defaults;
export const customBreakpoints: Breakpoints<CustomBreakpoint> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const breakpointTitles: Record<
  DefaultBreakpoint | CustomBreakpoint,
  string
> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
  xs: 'XS',
  sm: 'SM',
  md: 'MD',
  lg: 'LG',
  xl: 'XL',
};

export const breakpointColors: Record<
  DefaultBreakpoint | CustomBreakpoint,
  string
> = {
  mobile: '#D7F2BA',
  tablet: '#BDE4A8',
  desktop: '#9CC69B',
  xs: '#D7F2BA',
  sm: '#BDE4A8',
  md: '#9CC69B',
  lg: '#79B4A9',
  xl: '#556C70',
};
