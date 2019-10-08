import {StyledProps} from 'styled-components';
import {
  ThemedBreakpointName,
  ValueOrValueMap,
  ValueToStyleFunction,
  BreakpointMap,
  ValueConstraint,
} from './types';
import {defaults} from './defaults';
import {createMap} from './createMap';

export const map = <V extends ValueConstraint>(
  valueOrValues: ValueOrValueMap<ThemedBreakpointName, V>,
  mapValueToStyle: ValueToStyleFunction<V>,
) => {
  return <P extends object>({theme}: StyledProps<P>) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    // casting because we can't really do anything better when the theme is defined but no theme values are defined
    const breakpoints: BreakpointMap<ThemedBreakpointName> =
      theme && theme.breakpoints ? theme.breakpoints : (defaults as any);
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return createMap<ThemedBreakpointName>(breakpoints)(
      valueOrValues,
      mapValueToStyle,
    );
  };
};
