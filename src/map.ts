import {StyledProps} from 'styled-components';
import {
  ThemeBreakpoint,
  ValueOrValues,
  MapValueToStyleFunction,
  Breakpoints,
} from './types';
import {defaults} from './defaults';
import {createMap} from './createMap';

export const map = <V extends string | number>(
  valueOrValues: ValueOrValues<ThemeBreakpoint, V>,
  mapValueToStyle: MapValueToStyleFunction,
) => {
  return <P extends object>({theme}: StyledProps<P>) => {
    const breakpoints: Breakpoints<ThemeBreakpoint> =
      theme && theme.breakpoints ? theme.breakpoints : (defaults as any);
    return createMap(breakpoints)(valueOrValues, mapValueToStyle);
  };
};
