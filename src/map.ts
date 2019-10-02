import {StyledProps} from 'styled-components';
import {
  DefaultThemeBreakpointName,
  ValueOrValueMap,
  ValueToStyleFunction,
  BreakpointMap,
  ValueConstraint,
} from './types';
import {defaults} from './defaults';
import {createMap} from './createMap';

export const map = <V extends ValueConstraint>(
  valueOrValues: ValueOrValueMap<DefaultThemeBreakpointName, V>,
  mapValueToStyle: ValueToStyleFunction<V>,
) => {
  return <P extends object>({theme}: StyledProps<P>) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    // casting because we can't really do anything better when the theme is defined but no theme values are defined
    const breakpoints: BreakpointMap<DefaultThemeBreakpointName> =
      theme && theme.breakpoints ? theme.breakpoints : (defaults as any);
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return createMap<DefaultThemeBreakpointName, V>(breakpoints)(
      valueOrValues,
      mapValueToStyle,
    );
  };
};
